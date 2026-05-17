import time
from typing import List, Dict

class ChatMemory:
    """Lightweight in-memory chat history manager."""
    
    def __init__(self, max_history: int = 50):
        self.history: List[Dict] = []
        self.max_history = max_history

    def add_message(self, question: str, answer: str, document_id: str = None):
        """Adds a message pair to history."""
        message = {
            "question": question,
            "answer": answer,
            "document_id": document_id,
            "timestamp": time.time()
        }
        self.history.append(message)
        
        # Trim history if it exceeds max_history
        if len(self.history) > self.max_history:
            self.history.pop(0)

    def get_history(self) -> List[Dict]:
        """Returns the current chat history."""
        return self.history

    def clear_history(self):
        """Clears all stored history."""
        self.history = []

# Singleton instance
chat_memory = ChatMemory()
