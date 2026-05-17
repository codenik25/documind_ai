import os
from pypdf import PdfReader
from utils.logger import logger

class PDFService:
    """Service to handle PDF document operations."""
    
    def extract_text(self, file_path: str) -> str:
        """
        Extracts text from a PDF file safely.
        Handles empty or corrupted PDFs.
        """
        if not os.path.exists(file_path):
            logger.error(f"File not found: {file_path}")
            return ""

        try:
            logger.info(f"Extracting text from: {file_path}")
            reader = PdfReader(file_path)
            text = ""
            
            if len(reader.pages) == 0:
                logger.warning(f"PDF file is empty: {file_path}")
                return ""

            for page_num, page in enumerate(reader.pages):
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
                else:
                    logger.warning(f"No text found on page {page_num} of {file_path}")
            
            clean_text = text.strip()
            if not clean_text:
                logger.warning(f"Extraction resulted in empty text for: {file_path}")
                
            return clean_text
            
        except Exception as e:
            logger.error(f"Unexpected error during PDF extraction: {str(e)}")
            return ""

    def get_metadata(self, file_path: str) -> dict:
        """Extracts basic metadata from the PDF file."""
        if not os.path.exists(file_path):
            return {}
        
        try:
            reader = PdfReader(file_path)
            info = reader.metadata
            return {
                "page_count": len(reader.pages),
                "title": info.title if info and info.title else os.path.basename(file_path),
                "author": info.author if info and info.author else "Unknown"
            }
        except Exception as e:
            logger.error(f"Metadata extraction error: {str(e)}")
            return {"page_count": 0, "title": os.path.basename(file_path)}

pdf_service = PDFService()
