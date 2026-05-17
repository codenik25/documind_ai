import requests
import time
import json
import re
from typing import Generator
from utils.logger import logger

class DecisionEngine:
    """Orchestrates futuristic AI document intelligence using direct LM Studio REST API calls."""
    
    def __init__(self, base_url: str = "http://127.0.0.1:1234"):
        """
        Initializes the LM Studio configuration without a hardcoded model.
        """
        self.base_url = base_url
        self.endpoint = f"{self.base_url}/v1/chat/completions"
        self.models_endpoint = f"{self.base_url}/v1/models"
        logger.info(f"DecisionEngine initialized for DocuMind Intelligence at {self.base_url}")

    def get_active_model(self) -> str:
        """Fetches the currently loaded model from LM Studio dynamically."""
        try:
            response = requests.get(self.models_endpoint, timeout=5.0)
            response.raise_for_status()
            data = response.json()
            if data and "data" in data and len(data["data"]) > 0:
                # Return the ID of the first loaded model
                active_model = data["data"][0]["id"]
                return active_model
        except Exception as e:
            logger.error(f"Failed to fetch active model from LM Studio: {e}")
        
        # Fallback if LM Studio is unreachable or no models are loaded
        return "disconnected-or-unknown-model"

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

    def generate_initial_scan(self, question: str, context: str, mode: str = "general") -> str:
        """Generates an advanced semantic analysis response."""
        if not context or context.strip() == "":
            logger.warning("Vector retrieval returned empty set. Proceeding with zero-context inference.")
            context = "No specific document context retrieved. Rely on general knowledge or state that information is missing."

        # HARD CONTEXT LIMIT: Prevent prompt explosion and inference timeout
        MAX_CONTEXT_CHARS = 6000
        if len(context) > MAX_CONTEXT_CHARS:
            logger.warning(f"Context exceeds limit. Truncating from {len(context)} to {MAX_CONTEXT_CHARS} characters.")
            context = context[:MAX_CONTEXT_CHARS] + "\n...[CONTEXT TRUNCATED FOR SAFETY]..."

        active_model = self.get_active_model()
        start_time = time.time()
        logger.info(f"Initiating Neural Synthesis for: '{question[:50]}...' using {active_model}")
        logger.info(f"[ACTIVE MODEL] {active_model}")
        logger.info(f"Payload context size: {len(context)} chars")
        
        payload = {
            "model": active_model,
            "messages": [
                {"role": "system", "content": self._get_intelligence_prompt(mode)},
                {"role": "user", "content": f"INPUT_CONTEXT:\n{context}\n\nUSER_QUERY: {question}"}
            ],
            "temperature": 0.2, # Lower temperature for JSON precision
            "max_tokens": 1000,
            "stream": False
        }

        try:
            logger.info("[LM STUDIO REQUEST] Starting initial scan synthesis...")
            response = requests.post(
                self.endpoint,
                json=payload,
                timeout=300.0 # Increased timeout for large document inference
            )
            response.raise_for_status()
            
            data = response.json()
            if not data.get("choices") or not data["choices"][0].get("message", {}).get("content"):
                logger.error("NEURAL INFERENCE FAILURE: LM Studio returned empty content.")
                raise ValueError("LM Studio returned empty or invalid choices array.")
                
            answer = data["choices"][0]["message"]["content"].strip()
            logger.info(f"[LM STUDIO RESPONSE] Received {len(answer)} chars.")
            
            # Robust JSON extraction using regex in case model adds conversation fluff
            json_match = re.search(r'\{.*\}', answer, re.DOTALL)
            if json_match:
                answer = json_match.group(0)
            
            # Validate JSON
            try:
                parsed = json.loads(answer)
                # Normalize response to ensure all required keys exist
                parsed.setdefault("recommendation", "ANALYZE")
                parsed.setdefault("risks", [])
                parsed.setdefault("suggestions", [])
                parsed.setdefault("confidence", 50)
                parsed.setdefault("metadata", {})
                parsed.setdefault("semantic_insights", [])
                
                # Enforce types
                if not isinstance(parsed["risks"], list): parsed["risks"] = [str(parsed["risks"])] if parsed["risks"] else []
                if not isinstance(parsed["suggestions"], list): parsed["suggestions"] = [str(parsed["suggestions"])] if parsed["suggestions"] else []
                if not isinstance(parsed["semantic_insights"], list): parsed["semantic_insights"] = [str(parsed["semantic_insights"])] if parsed["semantic_insights"] else []
                if not isinstance(parsed["metadata"], dict): parsed["metadata"] = {}
                
                # If the answer was just a raw string embedded somewhere, put it in semantic insights
                if "answer" in parsed and isinstance(parsed["answer"], str) and not parsed["semantic_insights"]:
                    parsed["semantic_insights"].append(parsed["answer"])
                    
                answer = json.dumps(parsed)
                
            except json.JSONDecodeError as e:
                logger.error(f"Invalid JSON returned by LM Studio model: {e}. Raw response: {answer[:200]}")
                raise ValueError(f"Model returned invalid JSON: {answer[:100]}...")
            
            duration = time.time() - start_time
            logger.info(f"Neural Synthesis completed in {duration:.2f}s")
            return answer
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Neural Synthesis connection failed: {str(e)}")
            raise ConnectionError(f"LM STUDIO OFFLINE: {str(e)}")
        except Exception as e:
            logger.error(f"Neural Synthesis failed: {str(e)}")
            raise e

    def generate_query_answer(self, question: str, context: str) -> str:
        """Generates a fast conversational text response bypassing JSON parsing."""
        if not context or context.strip() == "":
            logger.warning("Vector retrieval returned empty set. Proceeding with zero-context inference.")
            context = "No specific document context retrieved. Rely on general knowledge."

        MAX_CONTEXT_CHARS = 6000
        if len(context) > MAX_CONTEXT_CHARS:
            context = context[:MAX_CONTEXT_CHARS] + "\n...[CONTEXT TRUNCATED]..."

        active_model = self.get_active_model()
        start_time = time.time()
        logger.info(f"Initiating Conversational Query for: '{question[:50]}...' using {active_model}")
        
        system_prompt = (
            "You are an intelligent document assistant.\n"
            "Answer the user question using the retrieved context.\n"
            "Be concise, accurate, and natural. Return plain text only. Do not generate JSON."
        )

        payload = {
            "model": active_model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"INPUT_CONTEXT:\n{context}\n\nUSER_QUERY: {question}"}
            ],
            "temperature": 0.3, 
            "max_tokens": 1000,
            "stream": False
        }

        try:
            logger.info("[LM STUDIO REQUEST] Starting conversational query...")
            response = requests.post(
                self.endpoint,
                json=payload,
                timeout=120.0
            )
            response.raise_for_status()
            
            data = response.json()
            if not data.get("choices") or not data["choices"][0].get("message", {}).get("content"):
                raise ValueError("LM Studio returned empty or invalid choices array.")
                
            answer = data["choices"][0]["message"]["content"].strip()
            logger.info(f"[LM STUDIO RESPONSE] Received {len(answer)} chars.")
            
            duration = time.time() - start_time
            logger.info(f"Conversational Query completed in {duration:.2f}s")
            return answer
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Conversational Query connection failed: {str(e)}")
            raise ConnectionError(f"LM STUDIO OFFLINE: {str(e)}")
        except Exception as e:
            logger.error(f"Conversational Query failed: {str(e)}")
            raise e

    def analyze_document(self, text: str, requested_mode: str = "general") -> str:
        """Performs automatic document intelligence scan on upload."""
        # Use requested mode if provided and valid, else heuristic
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
        
        # Use first 6000 characters for the overview scan to prevent massive document crash
        return self.generate_initial_scan(prompt, text[:6000], mode=mode)

    def stream_lmstudio_response(self, question: str, context: str) -> Generator[str, None, None]:
        """Generates a fast conversational text response natively streaming from LM Studio."""
        if not context or context.strip() == "":
            logger.warning("Vector retrieval returned empty set. Proceeding with zero-context inference.")
            context = "No specific document context retrieved. Rely on general knowledge."

        MAX_CONTEXT_CHARS = 6000
        if len(context) > MAX_CONTEXT_CHARS:
            context = context[:MAX_CONTEXT_CHARS] + "\n...[CONTEXT TRUNCATED]..."

        active_model = self.get_active_model()
        logger.info(f"Initiating Streaming Query for: '{question[:50]}...' using {active_model}")
        
        prompt_content = (
            f"Context:\n"
            f"{context}\n\n"
            f"User Question:\n"
            f"{question}\n\n"
            f"Instructions:\n"
            f"Answer ONLY using the provided context.\n"
            f"If the answer is unavailable in context, explicitly say:\n"
            f"\"The answer was not found in the uploaded document.\"\n\n"
            f"Be concise and document-grounded."
        )

        payload = {
            "model": active_model,
            "messages": [
                {"role": "user", "content": prompt_content}
            ],
            "temperature": 0.1, 
            "max_tokens": 1000,
            "stream": True
        }

        try:
            logger.info("[LM STUDIO REQUEST] Starting native streaming query...")
            response = requests.post(
                self.endpoint,
                json=payload,
                timeout=120.0,
                stream=True
            )
            response.raise_for_status()
            
            for line in response.iter_lines():
                if line:
                    decoded_line = line.decode('utf-8')
                    if decoded_line.startswith('data: '):
                        data_str = decoded_line[6:]
                        if data_str == '[DONE]':
                            break
                        try:
                            data = json.loads(data_str)
                            delta = data.get("choices", [{}])[0].get("delta", {})
                            content = delta.get("content", "")
                            if content:
                                yield content
                        except json.JSONDecodeError:
                            continue
            
            logger.info("[LM STUDIO RESPONSE] Streaming complete.")
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Streaming Query connection failed: {str(e)}")
            raise ConnectionError(f"LM STUDIO OFFLINE: {str(e)}")
        except Exception as e:
            logger.error(f"Streaming Query failed: {str(e)}")
            raise e

# Singleton instance
decision_engine = DecisionEngine()
