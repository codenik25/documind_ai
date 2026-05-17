import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, XCircle, AlertTriangle, Lightbulb, Target, Activity, 
  Zap, Clock, Database, Eye, Shield, Server, FileJson, Cpu
} from 'lucide-react';

// ────────────────────────────────────────
// Parsers
// ────────────────────────────────────────

function parseIntelligenceData(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse JSON intelligence data:", e);
    // Fallback
    return {
      recommendation: "IMPROVE",
      risks: ["System parsing error: Output is not valid JSON.", "Possible degradation in neural synthesis."],
      suggestions: ["Check backend log for raw output.", "Verify model instruction compliance."],
      confidence: 15,
      metadata: {},
      semantic_insights: []
    };
  }
}

// ────────────────────────────────────────
// Timeline Component
// ────────────────────────────────────────
const TIMELINE_STEPS = [
  "Parsing Document Structure",
  "Extracting Semantic Entities",
  "Building Vector Embeddings",
  "Running Context Retrieval",
  "Generating Neural Intelligence",
  "Evaluating Confidence Score"
];

function AnalysisTimeline({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= TIMELINE_STEPS.length) {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      } else {
        setCurrentStep(step);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(200,255,69,0.2)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}
    >
      <div className="mono-text neon-text" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '0.8rem' }}>
        <Activity size={16} className="animate-pulse" /> SYSTEM OVERRIDE: NEURAL SCAN IN PROGRESS
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {TIMELINE_STEPS.map((step, idx) => {
          const isActive = idx === currentStep;
          const isDone = idx < currentStep;
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: isDone || isActive ? 1 : 0.3 }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: isDone ? 'var(--neon-lime)' : isActive ? 'transparent' : 'rgba(255,255,255,0.1)', border: isActive ? '2px solid var(--neon-lime)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isDone && <CheckCircle size={12} color="#000" />}
                {isActive && <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: '6px', height: '6px', background: 'var(--neon-lime)', borderRadius: '50%' }} />}
              </div>
              <span className="mono-text" style={{ fontSize: '0.75rem', color: isDone ? 'var(--text-muted)' : isActive ? 'white' : 'var(--text-muted)' }}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────
// Confidence Radial
// ────────────────────────────────────────
function RadialConfidence({ score }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = 'var(--neon-lime)';
  if (score < 40) color = '#ff4444';
  else if (score < 70) color = '#ffb020';

  return (
    <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <motion.circle 
          cx="50" cy="50" r={radius} fill="none" 
          stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span className="mono-text" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white' }}>{score}%</span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────
// Panel Components
// ────────────────────────────────────────
function EnginePanel({ number, title, icon: Icon, children, delay = 0, highlighted = false, gridArea, borderColor = "rgba(255,255,255,0.08)" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{
        background: highlighted ? 'rgba(200,255,69,0.03)' : 'rgba(10,10,12,0.6)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${highlighted ? 'rgba(200,255,69,0.3)' : borderColor}`,
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: highlighted ? '0 0 20px rgba(200,255,69,0.05) inset' : 'none',
        gridArea,
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {highlighted && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--neon-lime), transparent)' }} />
      )}
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="mono-text" style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6rem', color: 'white' }}>
          0{number}
        </div>
        <Icon size={14} style={{ color: highlighted ? 'var(--neon-lime)' : 'var(--text-muted)' }} />
        <span className="mono-text" style={{ fontSize: '0.7rem', color: highlighted ? 'var(--neon-lime)' : 'var(--text-muted)', letterSpacing: '0.1em' }}>
          {title.toUpperCase()}
        </span>
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </motion.div>
  );
}

// ────────────────────────────────────────
// Main Component
// ────────────────────────────────────────
export default function IntelligenceResponse({ text, chunks, displayMode = 'full', collapsed = false, onToggleCollapse }) {
  const [analyzing, setAnalyzing] = useState(true);
  
  useEffect(() => {
    if (!text || text.length < 50) {
      setAnalyzing(false);
    }
  }, [text]);

  if (!text) return null;

  const data = parseIntelligenceData(text);

  // If collapsed, we just return a small summary header
  if (collapsed) {
    return (
      <div 
        onClick={onToggleCollapse}
        style={{ 
          background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', 
          borderRadius: '8px', padding: '12px 16px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all 0.2s ease'
        }}
        className="collapsed-event-card hover-glow"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Zap size={14} className="neon-text" />
          <span className="mono-text text-muted" style={{ fontSize: '0.75rem' }}>INTELLIGENCE EVENT COLLAPSED</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }} className="mono-text text-muted">
           <span style={{ fontSize: '0.65rem' }}>{data.recommendation}</span>
           <span style={{ fontSize: '0.65rem' }}>CONF: {data.confidence}%</span>
        </div>
      </div>
    );
  }

  // Determine which sections to show based on displayMode
  const showRecommendation = displayMode === 'full' || displayMode === 'recommendation';
  const showRisks = displayMode === 'full' || displayMode === 'risk';
  const showSuggestions = displayMode === 'full' || displayMode === 'suggestion';
  const showConfidence = displayMode === 'full' || displayMode === 'recommendation' || displayMode === 'general';
  const showSemanticInsights = displayMode === 'full' || displayMode === 'summary' || displayMode === 'general';
  const showMetadata = displayMode === 'full' || displayMode === 'metadata';

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '10px 0' }}>
      
      <AnimatePresence mode="wait">
        {analyzing ? (
          <AnalysisTimeline key="timeline" onComplete={() => setAnalyzing(false)} />
        ) : (
          <motion.div 
            key="workspace"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          >
            {/* Thinking Status Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '8px 16px', background: 'rgba(200,255,69,0.05)', borderRadius: '8px', border: '1px solid rgba(200,255,69,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Zap size={16} className="neon-text" />
                <span className="mono-text neon-text" style={{ fontSize: '0.8rem' }}>NEURAL SYNTHESIS COMPLETE</span>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="mono-text text-muted">
                  <Clock size={12} /> <span style={{ fontSize: '0.7rem' }}>{new Date().toLocaleTimeString()}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="mono-text text-muted">
                  <Database size={12} /> <span style={{ fontSize: '0.7rem' }}>CHUNKS: {chunks?.length || 0}</span>
                </div>
              </div>
            </div>

            {/* AI Canvas Grid (Conditional) */}
            {(showRecommendation || showRisks || showSuggestions || showConfidence) && (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(12, 1fr)', 
              gap: '16px',
              marginBottom: '16px'
            }}>
              
              {/* 1. RECOMMENDATION ENGINE */}
              {showRecommendation && (
              <EnginePanel number={1} title="Recommendation Engine" icon={CheckCircle} highlighted={['ACCEPT', 'READY', 'READY_FOR_ANALYSIS', 'REVIEW_OPTIONAL'].includes(data.recommendation)} gridArea={displayMode === 'full' ? "1 / 1 / 2 / 4" : "1 / 1 / 2 / 7"} delay={0.1}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', textAlign: 'center' }}>
                  {['ACCEPT', 'READY', 'READY_FOR_ANALYSIS'].includes(data.recommendation) && <CheckCircle size={48} className="neon-text" style={{ filter: 'drop-shadow(0 0 10px rgba(200,255,69,0.5))' }} />}
                  {['REJECT', 'REQUIRES_REPROCESSING'].includes(data.recommendation) && <XCircle size={48} color="#ff4444" style={{ filter: 'drop-shadow(0 0 10px rgba(255,68,68,0.5))' }} />}
                  {['IMPROVE', 'REVIEW_OPTIONAL', 'LOW_CONFIDENCE', 'ANALYZE'].includes(data.recommendation) && <Activity size={48} color="#ffb020" style={{ filter: 'drop-shadow(0 0 10px rgba(255,176,32,0.5))' }} />}
                  
                  <div className="mono-text" style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 700,
                    color: ['ACCEPT', 'READY', 'READY_FOR_ANALYSIS'].includes(data.recommendation) ? 'var(--neon-lime)' : ['REJECT', 'REQUIRES_REPROCESSING'].includes(data.recommendation) ? '#ff4444' : '#ffb020',
                    textShadow: `0 0 20px ${['ACCEPT', 'READY', 'READY_FOR_ANALYSIS'].includes(data.recommendation) ? 'rgba(200,255,69,0.5)' : ['REJECT', 'REQUIRES_REPROCESSING'].includes(data.recommendation) ? 'rgba(255,68,68,0.5)' : 'rgba(255,176,32,0.5)'}`
                  }}>
                    {data.recommendation.replace(/_/g, ' ')}
                  </div>
                </div>
              </EnginePanel>
              )}

              {/* 2. RISK DETECTION ENGINE */}
              {showRisks && (
              <EnginePanel number={2} title="Risk Detection Engine" icon={Shield} borderColor={data.risks?.length > 0 ? "rgba(255,68,68,0.3)" : "rgba(255,255,255,0.08)"} gridArea={displayMode === 'full' ? "1 / 4 / 2 / 7" : "1 / 1 / 2 / 13"} delay={0.2}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <AlertTriangle size={24} color={data.risks?.length > 0 ? "#ff4444" : "var(--text-muted)"} />
                  <span className="mono-text" style={{ color: data.risks?.length > 0 ? "#ff4444" : "var(--text-muted)", fontSize: '1rem' }}>
                    {data.risks?.length || 0} RISKS DETECTED
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, maxHeight: '200px' }} className="custom-scrollbar">
                  {data.risks?.length > 0 ? data.risks.map((risk, idx) => (
                    <div key={idx} style={{ fontSize: '0.8rem', color: '#ffaaaa', background: 'rgba(255,68,68,0.05)', padding: '8px', borderRadius: '4px', borderLeft: '2px solid #ff4444' }}>
                      {risk}
                    </div>
                  )) : (
                    <div className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>No significant risks identified in current vector space.</div>
                  )}
                </div>
              </EnginePanel>
              )}

              {/* 3. SUGGESTION ENGINE */}
              {showSuggestions && (
              <EnginePanel number={3} title="Suggestion Engine" icon={Lightbulb} gridArea={displayMode === 'full' ? "1 / 7 / 2 / 10" : "1 / 1 / 2 / 13"} delay={0.3}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Lightbulb size={24} color="#66ccff" />
                  <span className="mono-text" style={{ color: "#66ccff", fontSize: '1rem' }}>
                    {data.suggestions?.length || 0} SUGGESTIONS
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, maxHeight: '200px' }} className="custom-scrollbar">
                  {data.suggestions?.length > 0 ? data.suggestions.map((sug, idx) => (
                    <div key={idx} style={{ fontSize: '0.8rem', color: '#dddddd', display: 'flex', gap: '8px' }}>
                      <span style={{ color: '#66ccff' }}>»</span> {sug}
                    </div>
                  )) : (
                    <div className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>No specific improvements suggested.</div>
                  )}
                </div>
              </EnginePanel>
              )}

              {/* 4. CONFIDENCE ENGINE */}
              {showConfidence && (
              <EnginePanel number={4} title="Confidence Engine" icon={Target} gridArea={displayMode === 'full' ? "1 / 10 / 2 / 13" : displayMode === 'recommendation' ? "1 / 7 / 2 / 13" : "1 / 1 / 2 / 13"} delay={0.4}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px' }}>
                  <RadialConfidence score={data.confidence || 0} />
                  <div className="mono-text" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    {data.confidence >= 90 ? 'Stable Semantic Alignment' : 
                     data.confidence >= 70 ? 'Moderate Context Certainty' : 
                     data.confidence >= 40 ? 'Weak Retrieval Confidence' : 
                     'Insufficient Semantic Evidence'}
                  </div>
                </div>
              </EnginePanel>
              )}
            </div>
            )}
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(12, 1fr)', 
              gap: '16px' 
            }}>
              {/* SEMANTIC INSIGHTS */}
              {showSemanticInsights && data.semantic_insights?.length > 0 && (
                <div style={{ gridColumn: displayMode === 'full' ? '1 / 7' : '1 / 13' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', height: '100%' }}>
                     <div className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <Cpu size={14} /> SEMANTIC INSIGHTS
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       {data.semantic_insights.map((insight, idx) => (
                         <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                           <div style={{ width: '4px', height: '4px', background: 'var(--neon-lime)', borderRadius: '50%', marginTop: '8px', flexShrink: 0 }} />
                           <div style={{ fontSize: '0.85rem', color: '#ccc', lineHeight: 1.5 }}>{insight}</div>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>
              )}

              {/* METADATA */}
              {showMetadata && data.metadata && Object.keys(data.metadata).length > 0 && (
                <div style={{ gridColumn: (displayMode === 'full' && data.semantic_insights?.length > 0) ? '7 / 13' : '1 / 13' }}>
                   <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', height: '100%' }}>
                     <div className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <FileJson size={14} /> EXTRACTED METADATA
                     </div>
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '8px' }}>
                       {Object.entries(data.metadata).map(([k, v], idx) => (
                         <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '6px' }}>
                           <div className="mono-text" style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{k.toUpperCase()}</div>
                           <div style={{ fontSize: '0.8rem', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v}</div>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>
              )}
            </div>

            {/* RETRIEVAL ANALYTICS (Full width) */}
            {chunks && chunks.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                  <details style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                    <summary style={{ padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', outline: 'none' }} className="mono-text">
                      <Server size={14} style={{ color: 'var(--text-muted)' }} />
                      <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>RETRIEVAL ANALYTICS & SOURCE EVIDENCE ({chunks.length} VECTORS)</span>
                    </summary>
                    <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      
                      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }} className="custom-scrollbar">
                         {chunks.map((_, i) => (
                           <div key={i} style={{ flexShrink: 0, width: '120px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(200,255,69,0.2)', borderRadius: '6px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                             <div className="mono-text" style={{ fontSize: '0.6rem', color: 'var(--neon-lime)' }}>CHUNK {i+1}</div>
                             <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${Math.random() * 40 + 60}%`, background: 'var(--neon-lime)' }} />
                             </div>
                             <div className="mono-text" style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>RELEVANCE HIGH</div>
                           </div>
                         ))}
                      </div>

                      {chunks.map((chunk, i) => (
                        <div key={i} style={{ background: 'rgba(0,0,0,0.5)', borderLeft: '2px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '0 8px 8px 0' }}>
                          <div className="mono-text" style={{ fontSize: '0.65rem', marginBottom: '8px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Eye size={12} /> SOURCE VECTOR #{i + 1}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#aaa', fontStyle: 'italic', lineHeight: 1.6 }}>
                            {chunk.text || chunk}
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                </motion.div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

