from pydantic import BaseModel
from typing import List, Optional, Any

class QueryRequest(BaseModel):
    """Model for a question/query from the user."""
    question: str
    document_id: Optional[str] = None  # Targeted document ID
    stream: bool = False
    mode: str = "general"

class QueryResponse(BaseModel):
    """Model for the AI response."""
    question: str
    answer: str
    sources_used: int
    retrieved_chunks: List[str]
    document_id: Optional[str] = None
    status: str = "success"
    timestamp: float

class HealthCheck(BaseModel):
    """Model for server health status."""
    status: str
    version: str

class UploadResponse(BaseModel):
    """Model for document upload response."""
    document_id: str
    filename: str
    chunks: int  # Renamed from chunk_count
    status: str = "success"
    message: str = "Document indexed successfully."
    analysis: Optional[str] = None
