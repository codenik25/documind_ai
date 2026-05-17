from fastapi import FastAPI, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from models.request_models import QueryRequest, QueryResponse, HealthCheck, UploadResponse
from utils.logger import logger
from utils.chat_memory import chat_memory
from rag_pipeline import rag_pipeline
from decision_engine import decision_engine
import os
import shutil
import time
import json
import uuid

app = FastAPI(
    title="DocuMind AI API",
    description="Production-grade Backend API for Document-based AI Chat",
    version="1.1.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@app.get("/", tags=["Health"])
async def root():
    return {"message": "Welcome to DocuMind AI v1.1.0"}

@app.get("/health", response_model=HealthCheck, tags=["Health"])
async def health():
    return HealthCheck(status="healthy", version="1.1.0")

@app.get("/system-status", tags=["System"])
async def get_system_status():
    """Returns dynamic telemetry for the frontend dashboard."""
    try:
        active_model = decision_engine.get_active_model()
        engine_online = active_model != "disconnected-or-unknown-model"
        
        return {
            "active_model": active_model,
            "engine_online": engine_online,
            "status": "operational" if engine_online else "degraded"
        }
    except Exception as e:
        logger.error(f"System status error: {e}")
        return {
            "active_model": "OFFLINE",
            "engine_online": False,
            "status": "offline",
            "error": str(e)
        }

def process_document_task(file_path: str, filename: str, document_id: str):
    """Background task to extract text and ingest."""
    try:
        from services.pdf_service import pdf_service
        text = pdf_service.extract_text(file_path)
        if not text:
            rag_pipeline.ingestion_status[document_id] = {
                "stage": "ERROR", "progress": 0, "status": "error", "error": "Empty or unreadable PDF"
            }
            return
            
        # 1. Vectorization
        rag_pipeline.ingest_document_background(text, filename, document_id)
        
        # Check if vectorization was successful before auto-analysis
        status = rag_pipeline.ingestion_status[document_id].get("status")
        if status == "error":
            return
            
        # 2. Auto-Synthesis
        rag_pipeline.ingestion_status[document_id]["status"] = "processing" # Prevent frontend from thinking it's done immediately
        rag_pipeline.ingestion_status[document_id]["stage"] = "PERFORMING INITIAL NEURAL SCAN"
        rag_pipeline.ingestion_status[document_id]["progress"] = 90
        
        logger.info("[AUTO_SYNTHESIS_STARTED]")
        
        from decision_engine import decision_engine
        logger.info(f"[ACTIVE_MODEL] {decision_engine.get_active_model()}")
        
        prompt = "Perform an initial neural intelligence scan of the uploaded document. Generate operational intelligence analysis including recommendations, risks, semantic insights, metadata extraction, and confidence evaluation."
        
        chunks = rag_pipeline.retrieve_context(prompt, document_id=document_id)
        logger.info(f"[RETRIEVED_CHUNKS] Count: {len(chunks)}")
        
        context = "\n\n".join(chunks)
        
        logger.info("[LM_STUDIO_REQUEST_SENT]")
        analysis_summary = decision_engine.generate_initial_scan(prompt, context, mode="general")
        logger.info("[INFERENCE_COMPLETE]")
        
        # Update final status with the analysis result so frontend can grab it
        rag_pipeline.ingestion_status[document_id] = {
            "stage": "VECTOR SPACE READY",
            "progress": 100,
            "chunks_processed": rag_pipeline.ingestion_status[document_id].get("chunks_processed", 0),
            "total_chunks": rag_pipeline.ingestion_status[document_id].get("total_chunks", 0),
            "status": "complete",
            "analysis": analysis_summary
        }
        
    except Exception as e:
        logger.error(f"Background extraction/analysis failed: {e}")
        rag_pipeline.ingestion_status[document_id] = {
            "stage": "ERROR", "progress": 0, "status": "error", "error": str(e)
        }

@app.post("/upload", tags=["Documents"])
async def upload_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...)
):
    """Handles PDF uploads instantly and starts background ingestion."""
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    document_id = str(uuid.uuid4())[:8]
    file_path = os.path.join(UPLOAD_DIR, f"{document_id}_{file.filename}")
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Set initial status
        rag_pipeline.ingestion_status[document_id] = {
            "stage": "INITIALIZING NEURAL INGESTION",
            "progress": 5,
            "chunks_processed": 0,
            "total_chunks": 0,
            "status": "processing"
        }
        
        # Start background task
        background_tasks.add_task(process_document_task, file_path, file.filename, document_id)

        return {
            "status": "processing",
            "document_id": document_id,
            "filename": file.filename,
            "message": "Neural ingestion initiated."
        }
        
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to process file: {str(e)}")

@app.get("/processing-status/{document_id}", tags=["Documents"])
async def get_processing_status(document_id: str):
    """Returns the current ingestion status of a document."""
    if document_id not in rag_pipeline.ingestion_status:
        raise HTTPException(status_code=404, detail="Document ID not found in active tasks.")
    
    return rag_pipeline.ingestion_status[document_id]

import base64

@app.post("/ask", tags=["AI"])
async def ask_question(request: QueryRequest):
    """Streaming endpoint for AI answers with context sources."""
    logger.info(f"Received question: {request.question[:50]}... for doc: {request.document_id}")
    
    try:
        # 1. Retrieve
        chunks = rag_pipeline.retrieve_context(request.question, document_id=request.document_id)
        context = "\n\n".join(chunks)
        
        # Serialize chunks to header
        encoded_chunks = base64.b64encode(json.dumps([c[:300] + "..." for c in chunks]).encode('utf-8')).decode('utf-8')
        headers = {
            "X-Retrieved-Chunks": encoded_chunks,
            "Access-Control-Expose-Headers": "X-Retrieved-Chunks"
        }
        
        def stream_generator():
            full_answer = ""
            for token in decision_engine.stream_lmstudio_response(request.question, context):
                full_answer += token
                yield token
            
            # Store in Memory after completion
            chat_memory.add_message(request.question, full_answer, request.document_id)
            
        return StreamingResponse(stream_generator(), media_type="text/plain", headers=headers)
        
    except Exception as e:
        logger.error(f"Ask error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/chat-history", tags=["AI"])
async def get_chat_history():
    """Returns the current session chat history."""
    return {"history": chat_memory.get_history()}

@app.delete("/reset", tags=["System"])
async def reset_system():
    """Clears all documents, vectors, and chat history."""
    logger.info("System reset initiated.")
    try:
        # Clear Files
        if os.path.exists(UPLOAD_DIR):
            shutil.rmtree(UPLOAD_DIR)
            os.makedirs(UPLOAD_DIR)
        
        # Clear Vector Store
        rag_pipeline.reset_system()
        
        # Clear Memory
        chat_memory.clear_history()
        
        logger.info("System reset successful.")
        return {"message": "System reset successful"}
    except Exception as e:
        logger.error(f"Reset error: {str(e)}")
        raise HTTPException(status_code=500, detail="Reset failed.")

@app.get("/documents", tags=["Documents"])
async def list_documents():
    """Lists all unique documents indexed with enriched metadata."""
    try:
        # Extract unique document info from in-memory store
        unique_docs = {}
        for doc in rag_pipeline.documents:
            meta = doc.get("metadata", {})
            doc_id = meta.get("document_id")
            if doc_id and doc_id not in unique_docs:
                unique_docs[doc_id] = {
                    "document_id": doc_id,
                    "filename": meta.get("source"),
                    "upload_timestamp": meta.get("upload_timestamp")
                }
        
        return {"documents": list(unique_docs.values())}
    except Exception as e:
        logger.error(f"List documents error: {str(e)}")
        return {"documents": []}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
