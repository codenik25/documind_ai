import os
import uuid

def generate_unique_id():
    """Generates a unique string ID."""
    return str(uuid.uuid4())

def ensure_directory_exists(path: str):
    """Ensures that a directory exists, creating it if necessary."""
    if not os.path.exists(path):
        os.makedirs(path)
