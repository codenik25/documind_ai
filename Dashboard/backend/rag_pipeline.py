import os
import uuid
import time
import hashlib
import json
import math
from typing import List, Dict, Any
from utils.logger import logger
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Try importing real embeddings
try:
    from sentence_transformers import SentenceTransformer
    import numpy as np
except ImportError:
    raise ImportError("sentence-transformers is required for vector embeddings. Please install it.")

class RealEmbeddings:
    def __init__(self):
        logger.info("Loading lightweight embedding model: all-MiniLM-L6-v2")
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        
    def embed_documents(self, texts, batch_size=32):
        logger.info(f"Batch embedding {len(texts)} chunks...")
        embeddings = self.model.encode(texts, batch_size=batch_size, show_progress_bar=False)
        return embeddings.tolist()
        
    def embed_query(self, text):
        return self.model.encode([text], show_progress_bar=False)[0].tolist()

class RAGPipeline:
    """Handles the Retrieval-Augmented Generation logic with Caching & Background processing."""
    
    def __init__(self):
        logger.info("Initializing RAG Pipeline with Real Embeddings.")
        self.persist_directory = "chroma_db"
        self.embeddings = RealEmbeddings()
        self.documents: List[Dict[str, Any]] = [] # In-memory storage fallback
        self.cache_file = os.path.join(self.persist_directory, "document_cache.json")
        
        # Ingestion status tracker for the frontend
        self.ingestion_status = {}

        if not os.path.exists(self.persist_directory):
            os.makedirs(self.persist_directory)
            
        self.load_cache()
        
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=800,
            chunk_overlap=150,
            length_function=len
        )

    def load_cache(self):
        """Loads cached document hashes and embeddings."""
        if os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, "r") as f:
                    self.documents = json.load(f)
                logger.info(f"Loaded {len(self.documents)} cached chunks.")
            except Exception as e:
                logger.error(f"Failed to load cache: {e}")

    def save_cache(self):
        """Saves current chunks and embeddings to disk."""
        try:
            with open(self.cache_file, "w") as f:
                json.dump(self.documents, f)
        except Exception as e:
            logger.error(f"Failed to save cache: {e}")

    def compute_hash(self, text: str) -> str:
        return hashlib.md5(text.encode('utf-8')).hexdigest()

    def ingest_document_background(self, text: str, filename: str, document_id: str):
        """Asynchronously processes and stores a document."""
        try:
            self.ingestion_status[document_id] = {
                "stage": "EXTRACTING DOCUMENT STRUCTURE",
                "progress": 10,
                "chunks_processed": 0,
                "total_chunks": 0
            }
            
            doc_hash = self.compute_hash(text)
            upload_timestamp = time.time()
            
            # 1. Check Cache
            cached_chunks = [d for d in self.documents if d.get("metadata", {}).get("hash") == doc_hash]
            if cached_chunks:
                logger.info(f"Cache hit for {filename}. Duplicating vectors for new document_id: {document_id}")
                
                new_chunks = []
                for chunk in cached_chunks:
                    new_chunk = chunk.copy()
                    new_chunk["metadata"] = chunk["metadata"].copy()
                    new_chunk["metadata"]["document_id"] = document_id
                    new_chunk["metadata"]["upload_timestamp"] = upload_timestamp
                    new_chunks.append(new_chunk)
                
                self.documents.extend(new_chunks)
                self.save_cache()
                
                self.ingestion_status[document_id] = {
                    "stage": "VECTOR SPACE READY",
                    "progress": 100,
                    "chunks_processed": len(cached_chunks),
                    "total_chunks": len(cached_chunks),
                    "status": "complete"
                }
                return

            self.ingestion_status[document_id] = {
                "stage": "CHUNKING SEMANTIC BLOCKS",
                "progress": 30,
                "chunks_processed": 0,
                "total_chunks": 0
            }

            chunks = self.text_splitter.split_text(text)
            if not chunks:
                self.ingestion_status[document_id] = {"stage": "ERROR", "progress": 0, "status": "error"}
                return
                
            total = len(chunks)
            self.ingestion_status[document_id]["total_chunks"] = total

            # 2. Batched Embeddings Generation
            self.ingestion_status[document_id]["stage"] = "GENERATING VECTOR EMBEDDINGS"
            
            # We will process in chunks of 32 to update progress
            batch_size = 32
            embedded_data = []
            
            for i in range(0, total, batch_size):
                batch = chunks[i:i+batch_size]
                batch_embeddings = self.embeddings.embed_documents(batch)
                
                for j, chunk in enumerate(batch):
                    embedded_data.append({
                        "content": chunk,
                        "embedding": batch_embeddings[j],
                        "metadata": {
                            "source": filename, 
                            "document_id": document_id, 
                            "upload_timestamp": upload_timestamp,
                            "hash": doc_hash
                        }
                    })
                
                # Update progress
                processed = min(i + batch_size, total)
                progress_pct = 40 + math.floor((processed / total) * 50) # 40% to 90%
                self.ingestion_status[document_id]["progress"] = progress_pct
                self.ingestion_status[document_id]["chunks_processed"] = processed

            # 3. Index Stabilization
            self.ingestion_status[document_id]["stage"] = "INDEXING SEMANTIC SPACE"
            self.documents.extend(embedded_data)
            self.save_cache()
            
            self.ingestion_status[document_id] = {
                "stage": "VECTOR SPACE READY",
                "progress": 100,
                "chunks_processed": total,
                "total_chunks": total,
                "status": "complete"
            }
            logger.info(f"Stored {total} chunks in memory & cache for {document_id}")
            
        except Exception as e:
            logger.error(f"Background ingestion failed: {e}")
            self.ingestion_status[document_id] = {
                "stage": "INGESTION FAILED",
                "progress": 0,
                "status": "error",
                "error": str(e)
            }

    def retrieve_context(self, question: str, document_id: str = None, k: int = 6) -> List[str]:
        """Retrieves chunks using strict document isolation and deduplication."""
        start_time = time.time()
        logger.info(f"[ACTIVE DOCUMENT] {document_id}")
        logger.info(f"[RETRIEVAL FILTER] where = {{ 'document_id': '{document_id}' }}")
        
        # Semantic Vector Search
        results = []
        try:
            q_emb = self.embeddings.embed_query(question)
            
            for doc in self.documents:
                doc_meta_id = doc.get("metadata", {}).get("document_id")
                if document_id and doc_meta_id != document_id:
                    continue
                
                if "embedding" in doc:
                    # Cosine similarity
                    doc_emb = doc["embedding"]
                    dot_product = sum(a*b for a, b in zip(q_emb, doc_emb))
                    norm_a = sum(a*a for a in q_emb) ** 0.5
                    norm_b = sum(b*b for b in doc_emb) ** 0.5
                    score = dot_product / (norm_a * norm_b) if (norm_a * norm_b) > 0 else 0
                else:
                    # Fallback to keyword overlap
                    q_words = set(question.lower().split())
                    content_words = set(doc["content"].lower().split())
                    score = len(q_words & content_words)
                
                results.append((score, doc["content"]))
        except Exception as e:
            logger.error(f"Retrieval error: {e}")
        
        # Sort by score descending
        results.sort(key=lambda x: x[0], reverse=True)
        
        # Deduplicate and strictly limit to top k
        top_chunks = []
        seen_chunks = set()
        for score, content in results:
            if content not in seen_chunks:
                top_chunks.append(content)
                seen_chunks.add(content)
            if len(top_chunks) >= k:
                break
        
        duration = time.time() - start_time
        logger.info(f"Retrieved {len(top_chunks)} unique chunks in {duration:.2f}s")
        
        for idx, chunk in enumerate(top_chunks):
            logger.info(f"[RETRIEVED CHUNKS] [{idx+1}/{len(top_chunks)}] (Len: {len(chunk)}) -> {chunk[:100]}...")
            logger.info(f"[RETRIEVED DOCUMENT ID] {document_id}")
            
        return top_chunks

    def reset_system(self):
        """Clears the in-memory storage."""
        logger.info("Resetting In-Memory Store...")
        self.documents = []
        logger.info("Reset complete.")

# Singleton instance
rag_pipeline = RAGPipeline()
