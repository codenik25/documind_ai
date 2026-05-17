import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Database, History, Cpu, Settings, 
  UploadCloud, Send, FileText, Zap, Shield, 
  Activity, ArrowRight, CheckCircle, ChevronRight, BarChart2,
  Loader, Radio, Signal, Network, Wifi
} from 'lucide-react';
import { checkHealth, uploadDocument, getProcessingStatus, fetchDocuments, fetchChatHistory, resetSystem, askQuestion, fetchSystemStatus } from './api';
import IntelligenceResponse from './IntelligenceResponse';
import './dashboard.css';

const Dashboard = () => {
  const [inputText, setInputText] = useState('');
  
  // Intelligence Timeline State
  const [intelligenceEvents, setIntelligenceEvents] = useState([]);
  
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [intelligenceMode, setIntelligenceMode] = useState('general');
  
  // Backend State
  const [backendOnline, setBackendOnline] = useState(false);
  const [activeModel, setActiveModel] = useState('DETECTING...');
  const [engineStatus, setEngineStatus] = useState('offline');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStage, setUploadStage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [activeDocument, setActiveDocument] = useState(null);
  const [systemMetrics, setSystemMetrics] = useState({ latency: '0ms', confidence: '0%' });
  
  const [telemetryFeed, setTelemetryFeed] = useState([]);
  
  const fileInputRef = useRef(null);

  // Helper to add telemetry
  const addTelemetry = (msg) => {
    setTelemetryFeed(prev => [{ id: Date.now() + Math.random(), msg, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 15));
  };

  useEffect(() => {
    const initData = async () => {
      try {
        addTelemetry('Initializing System Diagnostics...');
        const health = await checkHealth();
        setBackendOnline(health.status === 'healthy');
        
        try {
          const sysStatus = await fetchSystemStatus();
          setActiveModel(sysStatus.active_model.toUpperCase());
          setEngineStatus(sysStatus.status);
          if (sysStatus.engine_online) {
            addTelemetry(`Neural Engine: ONLINE (${sysStatus.active_model})`);
          } else {
            addTelemetry('WARNING: Inference Model Offline');
            setActiveModel('NO ACTIVE MODEL');
          }
        } catch (e) {
          console.error("System status failed", e);
          setActiveModel('NO ACTIVE MODEL');
        }
        
        const docs = await fetchDocuments();
        if (docs.documents) {
          setDocuments(docs.documents);
          if (docs.documents.length > 0) {
            setActiveDocument(docs.documents[0].document_id);
            addTelemetry(`Mounted Vector Store: ${docs.documents[0].filename}`);
          }
        }
        
        // We fetch history but only grab the latest for the active workspace
        const historyResponse = await fetchChatHistory();
        if (historyResponse.history && historyResponse.history.length > 0) {
          const events = historyResponse.history.map((item, idx) => ({
            id: `hist-${idx}`,
            type: idx === 0 ? 'root' : 'follow_up',
            timestamp: new Date().toLocaleTimeString(),
            query: item.question,
            response: { text: item.answer, chunks: [] },
            displayMode: 'full',
            collapsed: idx !== historyResponse.history.length - 1
          }));
          setIntelligenceEvents(events);
          addTelemetry('Restored last active session state.');
        }
      } catch (e) {
        console.error("Backend connection failed:", e);
        setBackendOnline(false);
        addTelemetry('CRITICAL: Neural Engine Offline');
      }
    };
    
    initData();
  }, []);

  // Ambient telemetry updates when idle
  useEffect(() => {
    let statusInterval;
    let ambientInterval;

    if (backendOnline) {
      statusInterval = setInterval(async () => {
        try {
          const sysStatus = await fetchSystemStatus();
          setActiveModel(sysStatus.active_model.toUpperCase());
          setEngineStatus(sysStatus.status);
          setBackendOnline(sysStatus.engine_online || sysStatus.status === 'operational');
          if (!sysStatus.engine_online && sysStatus.status !== 'operational') {
            setActiveModel('NO ACTIVE MODEL');
          }
        } catch (e) {
          setBackendOnline(false);
          setActiveModel('NO ACTIVE MODEL');
        }
      }, 10000);

      if (!isStreaming) {
        ambientInterval = setInterval(() => {
          if (Math.random() > 0.8) {
            const ambientMsgs = [
              'Optimizing vector embeddings...',
              'Re-aligning semantic graph weights...',
              'Background cache cleared.',
              'Maintaining neural bridge connection...',
              'Scanning for schema drifts...'
            ];
            addTelemetry(ambientMsgs[Math.floor(Math.random() * ambientMsgs.length)]);
          }
        }, 5000);
      }
    }
    return () => {
      clearInterval(statusInterval);
      clearInterval(ambientInterval);
    };
  }, [isStreaming, backendOnline]);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    setUploadStage('INITIALIZING NEURAL INGESTION...');
    setUploadProgress(0);
    addTelemetry(`Initiating async upload for ${file.name}...`);
    
    try {
      const res = await uploadDocument(file, intelligenceMode);
      const documentId = res.document_id;
      
      const newDoc = {
        document_id: documentId,
        filename: file.name,
        upload_timestamp: Date.now()
      };
      setDocuments(prev => [...prev, newDoc]);
      setActiveDocument(documentId);
      
      // Start polling status
      const pollInterval = setInterval(async () => {
        try {
          const statusRes = await getProcessingStatus(documentId);
          setUploadStage(statusRes.stage);
          setUploadProgress(statusRes.progress || 0);
          
          if (statusRes.status === 'complete') {
            clearInterval(pollInterval);
            setIsUploading(false);
            setUploadProgress(100);
            
            addTelemetry(`Vectorization complete. ${statusRes.total_chunks} chunks stored.`);
            
            let responseObj;
            if (statusRes.analysis) {
               responseObj = { text: statusRes.analysis, chunks: [] };
            } else {
               responseObj = { 
                text: JSON.stringify({
                  recommendation: "READY_FOR_ANALYSIS",
                  risks: ["No immediate structural anomalies detected."],
                  suggestions: ["Vector space initialized.", "Ready for targeted semantic queries.", "Commence intelligence operations."],
                  confidence: 100,
                  metadata: { chunks: statusRes.total_chunks, status: "Indexed", optimization: "Optimal" },
                  semantic_insights: ["Document successfully vectorized and mapped into memory.", "Semantic neural bindings established across all document layers."]
                }), 
                chunks: [] 
              };
            }

            const rootEvent = {
              id: Date.now().toString(),
              type: 'root',
              timestamp: new Date().toLocaleTimeString(),
              query: `SYSTEM NOTIFICATION: ${file.name}`,
              response: responseObj,
              displayMode: 'full',
              collapsed: false
            };
            setIntelligenceEvents(prev => [...prev.map(e => ({...e, collapsed: true})), rootEvent]);
            if (fileInputRef.current) fileInputRef.current.value = '';
          } else if (statusRes.status === 'error') {
            clearInterval(pollInterval);
            throw new Error(statusRes.error);
          }
        } catch (pollErr) {
          console.error("Polling error:", pollErr);
        }
      }, 500);

    } catch (e) {
        console.error(e);
        const errorEvent = {
          id: Date.now().toString(),
          type: 'error',
          timestamp: new Date().toLocaleTimeString(),
          query: `SYSTEM PROTOCOL EXCEPTION`,
          response: { 
            text: JSON.stringify({
              recommendation: "REJECT",
              risks: ["VECTOR INGESTION FAILED", "Unable to process document structural integrity."],
              suggestions: ["Verify document format.", "Retry ingestion sequence."],
              confidence: 0,
              metadata: { "system_fault": e.message },
              semantic_insights: []
            }), 
            chunks: [] 
          },
          displayMode: 'full',
          collapsed: false
        };
        setIntelligenceEvents(prev => [...prev.map(e => ({...e, collapsed: true})), errorEvent]);
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleSend = async () => {
    if (!inputText.trim() || isStreaming) return;
    
    const question = inputText;
    setInputText('');
    
    // Enforce full intelligence schema rendering for all queries
    const newEventId = Date.now().toString();
    const processingEvent = {
      id: newEventId,
      type: 'follow_up',
      timestamp: new Date().toLocaleTimeString(),
      query: question,
      response: null,
      displayMode: 'full',
      collapsed: false
    };

    setIntelligenceEvents(prev => [...prev.map(e => ({...e, collapsed: true})), processingEvent]);
    
    setIsStreaming(true);
    addTelemetry(`New Query: "${question.substring(0, 30)}..."`);
    addTelemetry('Engaging context retrieval pipeline...');
    
    const startTime = Date.now();
    let retrievedSources = [];

    try {
      await askQuestion(
        question, 
        activeDocument,
        // onChunk callback
        (chunk) => {
          setIntelligenceEvents(prev => prev.map(e => {
            if (e.id === newEventId) {
              const currentText = e.response ? e.response.text : '';
              return {
                ...e,
                response: {
                  ...e.response,
                  text: currentText + chunk,
                  chunks: retrievedSources
                }
              };
            }
            return e;
          }));
        },
        // onSources callback
        (sources) => {
          const latency = Date.now() - startTime;
          setSystemMetrics({ latency: `${latency}ms`, confidence: '98.4%' });
          addTelemetry(`Context retrieved. Latency: ${latency}ms`);
          addTelemetry('Generating neural response stream...');
          
          retrievedSources = sources.map((src, i) => ({ id: i + 1, text: src, page: 'N/A' }));
          
          setIntelligenceEvents(prev => prev.map(e => 
            e.id === newEventId 
              ? { 
                  ...e, 
                  response: { 
                    text: '', 
                    chunks: retrievedSources 
                  } 
                }
              : e
          ));
        }
      );
      
      addTelemetry('Synthesis complete.');
      
    } catch (e) {
      addTelemetry(`SYSTEM FAULT: ${e.message}`);
      setIntelligenceEvents(prev => prev.map(e => 
        e.id === newEventId 
          ? { 
              ...e, 
              response: { 
                text: `NEURAL STREAM INTERRUPTED\n\nSystem Error: ${e.message}`, 
                chunks: retrievedSources 
              },
              displayMode: 'full'
            }
          : e
      ));
    } finally {
      setIsStreaming(false);
    }
  };

  const toggleEventCollapse = (id) => {
    setIntelligenceEvents(prev => prev.map(e => 
      e.id === id ? { ...e, collapsed: !e.collapsed } : e
    ));
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar - Floating Layer */}
      <motion.div 
        className="sidebar glass-panel"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="logo">
          <div className="logo-icon"></div>
          <span>DocuMind <span className="neon-text">AI</span></span>
        </div>
        
        <ul className="nav-menu">
          {[
            { id: 'dashboard', icon: Terminal, label: 'Workspace' },
            { id: 'documents', icon: Database, label: 'Active Vectors' },
            { id: 'history', icon: History, label: 'Retrieval Logs' },
            { id: 'models', icon: Cpu, label: 'Neural Engine' },
            { id: 'settings', icon: Settings, label: 'System Config' },
          ].map(item => (
            <motion.li 
              key={item.id}
              className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => setActiveMenu(item.id)}
              whileHover={{ x: 4 }}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </motion.li>
          ))}
        </ul>

        {/* Dynamic Document List */}
        <div style={{ marginTop: '16px', flex: 1, overflowY: 'auto' }} className="custom-scrollbar">
          <div className="mono-text" style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>VECTORS IN MEMORY</div>
          {documents.map((doc, idx) => (
            <div 
              key={idx} 
              style={{
                padding: '8px', 
                borderRadius: '6px', 
                background: activeDocument === doc.document_id ? 'rgba(200, 255, 69, 0.1)' : 'transparent',
                border: activeDocument === doc.document_id ? '1px solid var(--panel-border)' : '1px solid transparent',
                cursor: 'pointer',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem'
              }}
              onClick={() => {
                setActiveDocument(doc.document_id);
                addTelemetry(`Switched active vector store to: ${doc.filename}`);
              }}
            >
              <FileText size={14} className={activeDocument === doc.document_id ? 'neon-text' : ''} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: activeDocument === doc.document_id ? 'white' : 'var(--text-muted)' }}>
                {doc.filename}
              </span>
            </div>
          ))}
        </div>

        <input 
          type="file" 
          accept=".pdf" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileUpload} 
        />
        
        <div className="upload-area glass-panel" onClick={triggerFileUpload} style={{ position: 'relative', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isUploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
              <Loader size={24} className="neon-text animate-spin" />
              <div className="mono-text neon-text" style={{ fontSize: '0.65rem', textAlign: 'center', marginTop: '4px' }}>
                {uploadStage}
              </div>
              <div style={{ width: '80%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${uploadProgress}%` }} 
                  transition={{ ease: "linear", duration: 0.5 }}
                  style={{ height: '100%', background: 'var(--neon-lime)' }} 
                />
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <UploadCloud size={32} className="neon-text" style={{ margin: '0 auto 12px' }} />
              <div className="mono-text">Inject New Source</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                Drag & Drop PDF
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Top System Bar - Floating Layer */}
      <motion.div 
        className="topbar glass-panel"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <div className="status-indicator mono-text">
          <div className="dot" style={{ background: backendOnline ? 'var(--neon-lime)' : '#ff4444', boxShadow: backendOnline ? '0 0 10px var(--neon-lime)' : '0 0 10px #ff4444' }}></div>
          <span className={backendOnline ? "neon-text" : ""} style={{ color: backendOnline ? undefined : '#ff4444' }}>
            {backendOnline ? 'AI ENGINE ONLINE' : 'AI ENGINE OFFLINE'}
          </span>
        </div>
        
        <div className="topbar-stats mono-text" style={{ alignItems: 'center' }}>
          <div className="stat-item" style={{ flexDirection: 'row', alignItems: 'center', gap: '12px', marginRight: '24px' }}>
            <span style={{ color: 'var(--text-muted)' }}>INTELLIGENCE MODE</span>
            <select 
              value={intelligenceMode} 
              onChange={(e) => setIntelligenceMode(e.target.value)}
              style={{
                background: 'rgba(0,0,0,0.5)', border: '1px solid var(--neon-lime)', 
                color: 'var(--neon-lime)', padding: '4px 8px', borderRadius: '4px',
                fontFamily: 'var(--font-mono)', fontSize: '0.75rem', outline: 'none', cursor: 'pointer'
              }}
            >
              <option value="general">GENERAL SCAN</option>
              <option value="academic">ACADEMIC</option>
              <option value="legal">LEGAL</option>
              <option value="resume">RESUME</option>
              <option value="research">RESEARCH</option>
              <option value="business">BUSINESS</option>
              <option value="technical">TECHNICAL</option>
            </select>
          </div>
          <div className="stat-item" style={{ maxWidth: '200px' }}>
            <span style={{ color: 'var(--text-muted)' }}>MODEL</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={activeModel}>{activeModel}</span>
          </div>
          <div className="stat-item">
            <span style={{ color: 'var(--text-muted)' }}>LATENCY</span>
            <span className="neon-text">{systemMetrics.latency}</span>
          </div>
        </div>
      </motion.div>

      {/* Main Canvas - The AI Core */}
      <div className="main-canvas">
        <div className="canvas-bg-motion" />

        <AnimatePresence mode="wait">
          {intelligenceEvents.length === 0 && !isStreaming && !isUploading && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}
            >
              <Network size={64} style={{ color: 'rgba(200,255,69,0.2)', marginBottom: '20px' }} />
              <div className="mono-text" style={{ fontSize: '1rem', letterSpacing: '0.2em' }}>SYSTEM STANDBY</div>
              <div style={{ marginTop: '8px', fontSize: '0.9rem' }}>Awaiting neural input commands...</div>
            </motion.div>
          )}

          {(intelligenceEvents.length > 0 || isStreaming || isUploading) && (
            <div style={{ width: '100%', height: '100%', overflowY: 'auto', paddingRight: '12px', paddingBottom: '80px' }} className="custom-scrollbar">
              <AnimatePresence>
                {intelligenceEvents.map((event, idx) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '24px', position: 'relative' }}
                  >
                    {/* Timeline connector line */}
                    {idx < intelligenceEvents.length - 1 && (
                      <div style={{ position: 'absolute', left: '24px', top: '100%', bottom: '-24px', width: '2px', background: 'rgba(200,255,69,0.2)' }} />
                    )}

                    <div style={{ marginBottom: event.collapsed ? '12px' : '24px', padding: '16px 24px', background: 'rgba(200,255,69,0.05)', borderLeft: '4px solid var(--neon-lime)', borderRadius: '0 12px 12px 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginBottom: '8px' }}>
                          {event.type === 'root' ? 'ROOT SCAN EVENT' : 'FOLLOW-UP QUERY'} • {event.timestamp}
                        </div>
                      </div>
                      <div style={{ fontSize: '1.1rem', color: 'white', fontWeight: 500 }}>{event.query}</div>
                    </div>

                    {!event.response ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', position: 'relative' }}>
                        <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.4, 0.1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle, var(--neon-lime) 0%, transparent 70%)', filter: 'blur(20px)', borderRadius: '50%' }} />
                          <div style={{ width: '40px', height: '40px', background: 'black', border: '2px solid var(--neon-lime)', borderRadius: '50%', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px var(--neon-lime)' }}>
                            <motion.div animate={{ scale: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: '12px', height: '12px', background: 'var(--neon-lime)', borderRadius: '50%' }} />
                          </div>
                          {[0, 1].map(i => (
                            <motion.div key={`orbit-${i}`} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3 + (i * 2), ease: "linear", delay: i }} style={{ position: 'absolute', inset: `${i * 20}px`, border: '1px dashed rgba(200,255,69,0.2)', borderRadius: '50%' }}>
                              <div style={{ position: 'absolute', top: '-4px', left: '50%', width: '8px', height: '8px', background: 'var(--neon-lime)', borderRadius: '50%', boxShadow: '0 0 10px var(--neon-lime)' }} />
                            </motion.div>
                          ))}
                        </div>
                        <div className="mono-text neon-text" style={{ fontSize: '1rem', marginBottom: '8px', letterSpacing: '0.1em' }}>NEURAL SYNTHESIS ACTIVE</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Traversing semantic vector space...</div>
                      </div>
                    ) : event.type === 'root' ? (
                      <IntelligenceResponse 
                        text={event.response.text} 
                        chunks={event.response.chunks} 
                        displayMode={event.displayMode} 
                        collapsed={event.collapsed}
                        onToggleCollapse={() => toggleEventCollapse(event.id)}
                      />
                    ) : (
                      <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: '#e0e0e0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--neon-lime)' }} className="mono-text">
                          <Terminal size={14} /> <span>NEURAL RESPONSE</span>
                        </div>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                          {event.response.text}
                          {isStreaming && idx === intelligenceEvents.length - 1 && (
                            <motion.span 
                              animate={{ opacity: [1, 0] }} 
                              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                              style={{ display: 'inline-block', width: '8px', height: '15px', background: 'var(--neon-lime)', marginLeft: '4px', verticalAlign: 'middle' }}
                            />
                          )}
                        </div>
                        {event.response.chunks && event.response.chunks.length > 0 && (
                          <details style={{ marginTop: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <summary style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--text-muted)' }} className="mono-text">VIEW SOURCE CHUNKS ({event.response.chunks.length})</summary>
                            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                              {event.response.chunks.map((chunk, i) => (
                                <div key={i} style={{ fontSize: '0.75rem', color: '#aaa', borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '8px' }}>
                                  {chunk.text || chunk}
                                </div>
                              ))}
                            </div>
                          </details>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>

        {/* Input Overlay Pill */}
        <motion.div 
          className="input-overlay"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <input 
            type="text" 
            className="input-box" 
            placeholder={!backendOnline ? "SYSTEM OFFLINE" : !activeDocument ? "AWAITING VECTOR INGESTION..." : "Execute semantic inquiry..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={!backendOnline || isStreaming || !activeDocument}
          />
          <button className="send-btn" onClick={handleSend} disabled={!backendOnline || isStreaming || !activeDocument || !inputText.trim()}>
            <Send size={18} />
          </button>
        </motion.div>
      </div>

      {/* Right Panel - Live Telemetry */}
      <motion.div 
        className="right-panel glass-panel"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '8px' }}>
          <Radio size={16} className="neon-text animate-pulse" />
          <span className="mono-text" style={{ color: 'white' }}>LIVE TELEMETRY STREAM</span>
        </div>
        
        {/* Radar Graph Mock */}
        <div style={{ height: '120px', border: '1px solid rgba(200,255,69,0.1)', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(200,255,69,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,69,0.05) 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
          <Wifi size={48} style={{ color: 'rgba(200,255,69,0.2)', position: 'absolute' }} />
          
          <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
            <motion.polyline 
              points="0,60 20,40 40,80 60,30 80,70 100,50 120,40 140,90 160,20 180,60 200,50 220,70 240,40 260,80 280,30 300,50 320,60"
              fill="none" stroke="var(--neon-lime)" strokeWidth="1" strokeDasharray="500"
              animate={{ strokeDashoffset: [500, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
          </svg>
          <div className="mono-text" style={{ position: 'absolute', bottom: '8px', right: '8px', fontSize: '0.6rem', color: 'var(--text-muted)', zIndex: 3 }}>SIGNAL NOISE RATIO</div>
        </div>

        {/* Vector Density Monitor */}
        <div style={{ marginTop: '8px' }}>
          <div className="mono-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <span>SEMANTIC NODE DENSITY</span>
            <span className="neon-text">92.4%</span>
          </div>
          <div style={{ display: 'flex', gap: '2px', height: '16px' }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div 
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                style={{ flex: 1, background: i < 18 ? 'var(--neon-lime)' : 'rgba(255,255,255,0.1)', borderRadius: '1px' }}
              />
            ))}
          </div>
        </div>

        {/* Active Semantic Feed */}
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="mono-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '12px' }}>EVENT LOG</div>
          
          <div className="telemetry-feed custom-scrollbar">
            <AnimatePresence>
              {telemetryFeed.map((item) => (
                <motion.div 
                  key={item.id}
                  className="telemetry-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Signal size={12} style={{ color: 'var(--neon-lime)', marginTop: '2px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: '#ccc', lineHeight: 1.3 }}>{item.msg}</span>
                    <span className="mono-text" style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: '4px' }}>{item.time}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

