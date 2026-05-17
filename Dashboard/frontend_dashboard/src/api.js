const API_BASE_URL = 'http://127.0.0.1:8000';

export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) throw new Error('Backend unhealthy');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchSystemStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/system-status`);
    if (!response.ok) throw new Error('System status fetch failed');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const uploadDocument = async (file, mode = 'general') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('mode', mode);
  
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Upload failed');
  return await response.json();
};

export const getProcessingStatus = async (documentId) => {
  const response = await fetch(`${API_BASE_URL}/processing-status/${documentId}`);
  if (!response.ok) throw new Error('Failed to fetch status');
  return await response.json();
};

export const fetchDocuments = async () => {
  const response = await fetch(`${API_BASE_URL}/documents`);
  if (!response.ok) throw new Error('Failed to fetch documents');
  return await response.json();
};

export const fetchChatHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/chat-history`);
  if (!response.ok) throw new Error('Failed to fetch chat history');
  return await response.json();
};

export const resetSystem = async () => {
  const response = await fetch(`${API_BASE_URL}/reset`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Reset failed');
  return await response.json();
};

export const askQuestion = async (question, documentId, onChunk, onSources) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, document_id: documentId, mode: 'general' }),
    });

    if (!response.ok) {
      throw new Error(`Failed to stream: ${response.statusText}`);
    }

    // Read sources from header
    const chunksHeader = response.headers.get('X-Retrieved-Chunks');
    if (chunksHeader && onSources) {
      try {
        const decoded = atob(chunksHeader);
        const sources = JSON.parse(decoded);
        onSources(sources);
      } catch (e) {
        console.error('Failed to parse sources header:', e);
      }
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    let fullAnswer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullAnswer += chunk;
      if (onChunk) {
        onChunk(chunk);
      }
    }
    
    return fullAnswer;
  } catch (error) {
    throw error;
  }
};
