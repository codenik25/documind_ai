import logging
import sys

def setup_logger(name: str):
    """
    Configures a professional logger for the application.
    """
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)

    # Console Handler
    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(logging.INFO)
    
    # Formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    handler.setFormatter(formatter)
    
    if not logger.handlers:
        logger.addHandler(handler)
        
    return logger

# Create a default logger instance
logger = setup_logger("DocuMind-AI")
