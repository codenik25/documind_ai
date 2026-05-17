# DocuMind AI

> A cinematic Neural Intelligence Operating System for document understanding, retrieval, and AI-powered decision synthesis.

![DocuMind AI Banner](./preview/banner.png)

## Overview

DocuMind AI transforms traditional document interaction into a real-time AI intelligence experience.

Instead of static PDF reading, DocuMind AI uses:

* Retrieval-Augmented Generation (RAG)
* Semantic Vector Search
* Local LLM Inference
* Neural Telemetry Interfaces
* Real-Time Streaming Responses
* Cinematic Intelligence Visualization

The platform analyzes uploaded documents, retrieves relevant semantic context, and generates grounded AI responses using locally hosted language models through LM Studio.

---

# Core Features

## Neural Intelligence Dashboard

A futuristic AI operating environment featuring:

* Live telemetry streams
* Neural background systems
* Semantic activity visualization
* Confidence propagation engines
* AI decision synthesis panels
* Real-time response streaming

---

## Retrieval-Augmented Generation (RAG)

DocuMind AI uses a fully local RAG pipeline:

1. PDF ingestion
2. Semantic chunking
3. Embedding generation
4. ChromaDB vector storage
5. Context retrieval
6. LM Studio inference
7. AI decision synthesis

---

## Local AI Inference

All inference runs locally using:

* LM Studio
* Qwen2.5 Models
* GGUF Quantized Models

No cloud APIs are required.

This ensures:

* privacy
* offline operation
* low operational cost
* secure document handling

---

## Real-Time Streaming Responses

The system supports token streaming using:

* FastAPI StreamingResponse
* Server-Sent Events (SSE)
* Incremental frontend rendering

Responses appear progressively in real time.

---

## Document Isolation Engine

Every uploaded document receives:

* unique document identifiers
* isolated vector retrieval
* cache-safe embeddings
* contamination-free semantic search

This prevents retrieval overlap across documents.

---

# Tech Stack

## Frontend

* React + Vite
* GSAP
* Framer Motion
* CSS Glassmorphism
* Canvas + SVG Animation Systems

## Backend

* FastAPI
* Python
* Uvicorn

## AI & Retrieval

* LM Studio
* Qwen2.5 Instruct Models
* Sentence Transformers
* ChromaDB
* Semantic Retrieval Pipeline

---

# System Architecture

```text
PDF Upload
    ↓
Document Parsing
    ↓
Semantic Chunking
    ↓
Embedding Generation
    ↓
ChromaDB Vector Storage
    ↓
Semantic Retrieval
    ↓
LM Studio Local Inference
    ↓
Decision Intelligence Output
```

---

# Project Structure

```text
Final_Documind/
├── Dashboard/
│   └── backend/
│       ├── main.py
│       ├── decision_engine.py
│       ├── rag_pipeline.py
│       └── chroma_storage/
│
└── Frontend_Main/
    ├── public/
    ├── src/
    │   ├── dashboard/
    │   ├── pages/
    │   ├── layouts/
    │   ├── components/
    │   ├── styles/
    │   └── lib/
    │
    ├── package.json
    └── vite.config.js
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/documind-ai.git
cd documind-ai
```

---

## 2. Setup Backend

```bash
cd Dashboard/backend
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

## 3. Setup Frontend

```bash
cd Frontend_Main
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# LM Studio Setup

## Install LM Studio

Download:

[https://lmstudio.ai/](https://lmstudio.ai/)

---

## Recommended Model

Recommended local model:

```text
Qwen2.5-1.5B-Instruct-Q4_K_M
```

Recommended settings:

| Setting        | Value |
| -------------- | ----- |
| Context Length | 4096  |
| Temperature    | 0.2   |
| Max Tokens     | 256   |

---

## Start Local Server

Inside LM Studio:

1. Load model
2. Open Developer tab
3. Enable Local Server
4. Confirm:

```text
http://127.0.0.1:1234
```

is active.

---

# Environment Variables

Create:

```text
Frontend_Main/.env
```

Add:

```env
VITE_API_BASE=http://127.0.0.1:8000
```

---

# Key Innovations

## Cinematic Neural UI

A fully immersive AI operating environment featuring:

* ambient neural systems
* intelligent cursor engines
* holographic transitions
* semantic telemetry streams
* neural synthesis visualization

---

## Strict Local Inference Enforcement

The platform removes:

* mock responses
* cloud APIs
* hardcoded fallbacks
* fake intelligence outputs

All responses originate directly from LM Studio.

---

## Persistent Intelligence Timeline

The dashboard maintains:

* query history
* intelligence events
* semantic response chains
* retrieval continuity

---

# Performance Optimizations

* Lazy-loaded dashboard routes
* Adaptive particle rendering
* GPU-accelerated animations
* Optimized semantic retrieval
* Context window reduction
* Chunk overlap optimization
* Dynamic vector filtering

---

# Future Enhancements

Planned future features:

* OCR integration
* Multi-modal RAG
* Voice interaction
* Agentic AI workflows
* Semantic citations
* GPU inference optimization
* Multi-user authentication
* Enterprise telemetry systems

---

# Security & Privacy

DocuMind AI is designed as a local-first AI platform.

All:

* document processing
* vector storage
* semantic retrieval
* AI inference

occur entirely on local hardware.

No external APIs are required.

---

# Screenshots

## Landing Page

![Landing](./preview/landing.png)

---

## Neural Dashboard

![Dashboard](./preview/dashboard.png)

---

## Intelligence Engine

![Engine](./preview/intelligence.png)

---

# Challenges Solved

During development, several advanced engineering challenges were resolved:

* retrieval contamination from duplicate uploads
* malformed model JSON outputs
* streaming synchronization instability
* semantic retrieval mismatch
* frontend rendering collapse
* model routing inconsistencies
* latency optimization for CPU inference

These refinements significantly improved reliability and retrieval accuracy.

---

# Author

Nikunj Rathi

JECRC University

---

# License

This project is developed for educational and research purposes.

---

# Final Vision

DocuMind AI is not designed as a traditional chatbot.

It is built as:

* a Neural Intelligence Operating System
* a Retrieval Intelligence Workspace
* a Local AI Decision Platform
* a Cinematic AI Experience Layer

designed to transform how humans interact with documents using local artificial intelligence.
