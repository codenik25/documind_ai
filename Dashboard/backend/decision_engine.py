import os
import time
import json
import re
from typing import Generator
from utils.logger import logger
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class DecisionEngine:
    """Orchestrates futuristic AI document intelligence using Google Gemini API."""
    
    def __init__(self):
        """
        Initializes the Gemini Client.
        """
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            logger.error("GEMINI_API_KEY environment variable is not set.")
        
        # Initialize the GenAI client. It will automatically use GEMINI_API_KEY from environment if available.
        self.client = genai.Client()
        logger.info(f"DecisionEngine initialized for DocuMind Intelligence using Gemini API")

    def get_active_model(self) -> str:
        """Returns the target Gemini model."""
        return "gemini-2.5-flash"

    def _get_intelligence_prompt(self, mode: str = "general") -> str:
        """Enforces a futuristic, structured, and analytical AI persona returning pure JSON."""
        base_prompt = (
            "You are the DocuMind Neural Intelligence Engine — a premium AI document analysis system.\n"
            "Analyze the uploaded document and generate a structured intelligence report in pure JSON format.\n\n"
            "REQUIREMENTS:\n"
            "1. You MUST return ONLY valid JSON. Do not include markdown code blocks, backticks, or explanatory text.\n"
            "2. The JSON object must strictly match this schema:\n"
            "{\n"
            "  \"recommendation\": \"READY_FOR_ANALYSIS\",\n"
            "  \"risks\": [\"risk 1\"],\n"
            "  \"suggestions\": [\"suggestion 1\"],\n"
            "  \"confidence\": 85,\n"
            "  \"metadata\": {\"key1\": \"value1\"},\n"
            "  \"semantic_insights\": [\"insight 1\"]\n"
            "}\n\n"
            "STRICT RULES:\n"
            "- \"recommendation\" MUST be exactly one of: READY, READY_FOR_ANALYSIS, ACCEPT, REVIEW_OPTIONAL, LOW_CONFIDENCE, or REQUIRES_REPROCESSING.\n"
            "- You MUST return ALL 6 top-level keys exactly as written above. Do NOT omit any keys.\n"
            "- Missing metadata is NOT a system risk. If informational fields (like faculty name or supervisor name) are missing, that is an informational gap, not a structural risk. Do not output false system warnings.\n"
            "- If there are no true risks or suggestions, return an empty array [] for those keys.\n"
            "- A document that successfully extracts text and contains readable content should get a high confidence (85-95%) and a positive recommendation (e.g. READY_FOR_ANALYSIS).\n"
            "- Only use LOW_CONFIDENCE or REQUIRES_REPROCESSING if the document is truly broken or unreadable.\n"
            "- Extract ONLY what is present. Do not hallucinate or make up fake warnings.\n"
            "- Maintain a calm, operational, and premium intelligence tone.\n"
        )
        
        mode_instructions = {
            "academic": "\nMODE: ACADEMIC. Extract student name, subject, semester, faculty, and academic year. Identify missing institutional metadata as risks.",
            "legal": "\nMODE: LEGAL. Extract parties, effective dates, clauses, and liabilities. Detect suspicious formatting or risky clauses as risks.",
            "business": "\nMODE: BUSINESS. Extract revenue figures, stakeholders, and market focus. Flag incomplete sections as risks.",
            "resume": "\nMODE: RESUME. Extract candidate name, skills, experience, and education. Note employment gaps or unusual structure as risks.",
            "research": "\nMODE: RESEARCH. Extract hypothesis, methodology, key citations, and contribution. Note methodology flaws as risks.",
            "technical": "\nMODE: TECHNICAL. Extract architecture, stack, dependencies, and endpoints. Note security risks or missing documentation as risks.",
            "general": "\nMODE: GENERAL SCAN. Extract document type, key themes, and core entities. Note any structural irregularities as risks."
        }
        
        return base_prompt + mode_instructions.get(mode.lower(), mode_instructions["general"])

    def _execute_with_retry(self, func, max_retries=3, initial_delay=1):
        """Executes a function with exponential backoff for API calls."""
        delay = initial_delay
        for attempt in range(1, max_retries + 1):
            try:
                return func()
            except Exception as e:
                logger.warning(f"API call failed (attempt {attempt}/{max_retries}): {e}")
                if attempt == max_retries:
                    logger.error(f"Max retries reached. Final error: {e}")
                    raise e
                time.sleep(delay)
                delay *= 2

    def generate_initial_scan(self, question: str, context: str, mode: str = "general") -> str:
        """Generates an advanced semantic analysis response using Gemini JSON mode."""
        if not context or context.strip() == "":
            logger.warning("Vector retrieval returned empty set. Proceeding with zero-context inference.")
            context = "No specific document context retrieved. Rely on general knowledge or state that information is missing."

        MAX_CONTEXT_CHARS = 30000 # Gemini can handle larger context
        if len(context) > MAX_CONTEXT_CHARS:
            logger.warning(f"Context exceeds limit. Truncating from {len(context)} to {MAX_CONTEXT_CHARS} characters.")
            context = context[:MAX_CONTEXT_CHARS] + "\n...[CONTEXT TRUNCATED FOR SAFETY]..."

        active_model = self.get_active_model()
        start_time = time.time()
        logger.info(f"Initiating Neural Synthesis for: '{question[:50]}...' using {active_model}")
        
        system_instruction = self._get_intelligence_prompt(mode)
        user_content = f"INPUT_CONTEXT:\n{context}\n\nUSER_QUERY: {question}"
        
        def _api_call():
            return self.client.models.generate_content(
                model=active_model,
                contents=user_content,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    response_mime_type="application/json",
                    temperature=0.2,
                )
            )

        try:
            logger.info("[GEMINI REQUEST] Starting initial scan synthesis...")
            response = self._execute_with_retry(_api_call)
            
            if not response or not response.text:
                raise ValueError("Gemini API returned empty response.")
                
            answer = response.text.strip()
            logger.info(f"[GEMINI RESPONSE] Received {len(answer)} chars.")
            
            # Robust JSON extraction
            json_match = re.search(r'\{.*\}', answer, re.DOTALL)
            if json_match:
                answer = json_match.group(0)
            
            # Validate and Normalize JSON
            try:
                parsed = json.loads(answer)
            except json.JSONDecodeError as e:
                logger.error(f"Invalid JSON returned by Gemini model: {e}. Raw response: {answer[:200]}")
                parsed = {}
                
            # Normalize response to ensure all required keys exist and provide safe fallback
            parsed.setdefault("recommendation", "READY_FOR_ANALYSIS")
            parsed.setdefault("risks", [])
            parsed.setdefault("suggestions", ["The document was processed but intelligence synthesis returned a non-standard format."])
            parsed.setdefault("confidence", 70)
            parsed.setdefault("metadata", {})
            parsed.setdefault("semantic_insights", ["Document parsed successfully."])
            
            # Enforce types
            if not isinstance(parsed["risks"], list): parsed["risks"] = [str(parsed["risks"])] if parsed["risks"] else []
            if not isinstance(parsed["suggestions"], list): parsed["suggestions"] = [str(parsed["suggestions"])] if parsed["suggestions"] else []
            if not isinstance(parsed["semantic_insights"], list): parsed["semantic_insights"] = [str(parsed["semantic_insights"])] if parsed["semantic_insights"] else []
            if not isinstance(parsed["metadata"], dict): parsed["metadata"] = {}
                
            answer = json.dumps(parsed)
            duration = time.time() - start_time
            logger.info(f"Neural Synthesis completed in {duration:.2f}s")
            return answer
            
        except Exception as e:
            logger.error(f"Neural Synthesis failed: {str(e)}")
            # Return safe fallback object instead of crashing
            fallback = {
                "recommendation": "REQUIRES_REPROCESSING",
                "risks": ["System error during intelligence synthesis.", str(e)],
                "suggestions": ["Try re-uploading the document.", "Check API connectivity."],
                "confidence": 0,
                "metadata": {"error": "true"},
                "semantic_insights": []
            }
            return json.dumps(fallback)

    def generate_query_answer(self, question: str, context: str) -> str:
        """Generates a fast conversational text response bypassing JSON parsing."""
        if not context or context.strip() == "":
            logger.warning("Vector retrieval returned empty set. Proceeding with zero-context inference.")
            context = "No specific document context retrieved. Rely on general knowledge."

        MAX_CONTEXT_CHARS = 30000
        if len(context) > MAX_CONTEXT_CHARS:
            context = context[:MAX_CONTEXT_CHARS] + "\n...[CONTEXT TRUNCATED]..."

        active_model = self.get_active_model()
        start_time = time.time()
        logger.info(f"Initiating Conversational Query for: '{question[:50]}...' using {active_model}")
        
        system_instruction = (
            "You are an intelligent document assistant.\n"
            "Answer the user question using the retrieved context.\n"
            "Be concise, accurate, and natural. Return plain text only. Do not generate JSON."
        )
        user_content = f"INPUT_CONTEXT:\n{context}\n\nUSER_QUERY: {question}"

        def _api_call():
            return self.client.models.generate_content(
                model=active_model,
                contents=user_content,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    temperature=0.3,
                )
            )

        try:
            logger.info("[GEMINI REQUEST] Starting conversational query...")
            response = self._execute_with_retry(_api_call)
            
            if not response or not response.text:
                raise ValueError("Gemini API returned empty response.")
                
            answer = response.text.strip()
            logger.info(f"[GEMINI RESPONSE] Received {len(answer)} chars.")
            
            duration = time.time() - start_time
            logger.info(f"Conversational Query completed in {duration:.2f}s")
            return answer
            
        except Exception as e:
            logger.error(f"Conversational Query failed: {str(e)}")
            return f"I encountered an error while processing your request: {str(e)}"

    def analyze_document(self, text: str, requested_mode: str = "general") -> str:
        """Performs automatic document intelligence scan on upload."""
        valid_modes = ["academic", "legal", "resume", "business", "research", "technical", "general"]
        mode = requested_mode.lower() if requested_mode.lower() in valid_modes else "general"
        
        if mode == "general":
            text_lower = text.lower()
            if any(w in text_lower for w in ["student", "semester", "grade", "university", "faculty"]):
                mode = "academic"
            elif any(w in text_lower for w in ["clause", "agreement", "party", "liability", "hereby"]):
                mode = "legal"
            elif any(w in text_lower for w in ["experience", "education", "skills", "projects", "resume"]):
                mode = "resume"
            elif any(w in text_lower for w in ["revenue", "market", "business", "q1", "q2", "q3", "q4"]):
                mode = "business"
            elif any(w in text_lower for w in ["abstract", "methodology", "citation", "hypothesis", "et al"]):
                mode = "research"
            elif any(w in text_lower for w in ["api", "endpoint", "architecture", "deployment", "repository"]):
                mode = "technical"

        logger.info(f"Auto-detecting document mode: {mode.upper()}")
        
        prompt = (
            f"PERFORM INITIAL NEURAL SCAN. Extract all key metadata, identify document architecture, "
            f"and provide 3 deep semantic insights. Use {mode.upper()} mode and heavily populate the Anomalies section."
        )
        
        # Increased limit for Gemini
        return self.generate_initial_scan(prompt, text[:30000], mode=mode)

    def stream_response(self, question: str, context: str) -> Generator[str, None, None]:
        """Generates a fast conversational text response natively streaming from Gemini."""
        if not context or context.strip() == "":
            logger.warning("Vector retrieval returned empty set. Proceeding with zero-context inference.")
            context = "No specific document context retrieved. Rely on general knowledge."

        MAX_CONTEXT_CHARS = 30000
        if len(context) > MAX_CONTEXT_CHARS:
            context = context[:MAX_CONTEXT_CHARS] + "\n...[CONTEXT TRUNCATED]..."

        active_model = self.get_active_model()
        logger.info(f"Initiating Streaming Query for: '{question[:50]}...' using {active_model}")
        
        system_instruction = (
            "You are an intelligent document assistant.\n"
            "Answer ONLY using the provided context.\n"
            "If the answer is unavailable in context, explicitly say:\n"
            "\"The answer was not found in the uploaded document.\"\n\n"
            "Be concise and document-grounded."
        )
        user_content = f"INPUT_CONTEXT:\n{context}\n\nUSER_QUERY: {question}"

        def _api_stream_call():
            return self.client.models.generate_content_stream(
                model=active_model,
                contents=user_content,
                config=types.GenerateContentConfig(
                    system_instruction=system_instruction,
                    temperature=0.1,
                )
            )

        try:
            logger.info("[GEMINI REQUEST] Starting native streaming query...")
            # Note: Exponential backoff on streaming initialization
            response_stream = self._execute_with_retry(_api_stream_call)
            
            for chunk in response_stream:
                if hasattr(chunk, "text") and chunk.text:
                    yield chunk.text
            
            logger.info("[GEMINI RESPONSE] Streaming complete.")
            
        except Exception as e:
            logger.error(f"Streaming Query failed: {str(e)}")
            yield f"Error: The connection to the AI engine was interrupted ({str(e)})."

# Singleton instance
decision_engine = DecisionEngine()
