import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Scissors, Fingerprint, Search, Cpu, CheckCircle, Activity, ShieldCheck, Zap, Target, BrainCircuit } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- SUB-COMPONENTS --- //

const EventStream = () => {
  const feed = [
    "SYSTEM INITIALIZED",
    "AWAITING INGESTION",
    "PDF BYTES DETECTED",
    "OCR VERIFICATION PASS",
    "SEMANTIC CHUNKING ACTIVE",
    "CHUNKS GENERATED: 156",
    "VECTOR EMBEDDING QUEUED",
    "MODEL: all-MiniLM-L6-v2",
    "VECTORS MAPPED TO DB",
    "QUERY VECTOR GENERATED",
    "RETRIEVAL MATCH FOUND",
    "CONTEXT WINDOW EXPANDED",
    "INFERENCE STREAM ACTIVE",
    "TOKEN GEN: 42/sec",
    "DECISION SYNTHESIS RUNNING",
    "CONFIDENCE SCORE LOCKED: 96.4%"
  ];
  
  return (
    <div className="border-card" style={{ padding: '1rem', height: '120px', display: 'flex', flexDirection: 'column' }}>
      <div className="text-xs text-muted" style={{ marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px', position: 'relative', zIndex: 2 }}>LIVE AI EVENT STREAM</div>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div className="event-stream-container" style={{ position: 'relative' }}>
          {feed.map((msg, i) => (
            <div key={i} className="mono text-xs event-msg" style={{ opacity: 0, padding: '2px 0', color: i > 12 ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
              &gt; {msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InferenceCore = () => {
  return (
    <div className="inference-core border-card" style={{ 
      position: 'relative', 
      width: '100%', 
      height: '180px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'radial-gradient(circle, rgba(157,255,34,0.1) 0%, rgba(0,0,0,0) 70%)',
      borderColor: 'var(--accent-green)'
    }}>
      <div className="core-ring-1" style={{ position: 'absolute', width: '120px', height: '120px', border: '1px dashed var(--accent-green)', borderRadius: '50%', opacity: 0.5 }}></div>
      <div className="core-ring-2" style={{ position: 'absolute', width: '90px', height: '90px', border: '2px solid rgba(157, 255, 34, 0.3)', borderRadius: '50%' }}></div>
      <div className="core-sphere" style={{ position: 'relative', zIndex: 10, width: '40px', height: '40px', background: 'var(--accent-green)', borderRadius: '50%', boxShadow: '0 0 20px var(--accent-green), inset 0 0 10px #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Cpu size={20} color="#000" />
      </div>
      <div className="mono text-xs text-accent" style={{ position: 'absolute', bottom: '10px' }}>[INFERENCE ACTIVE]</div>
    </div>
  );
};

const NodeGraph = () => {
  // SVG representation of a neural web
  return (
    <div className="border-card" style={{ padding: '1.5rem', height: '240px', position: 'relative' }}>
      <div className="flex-between" style={{ marginBottom: '1rem' }}>
        <span className="text-sm font-medium">Pipeline Visualization</span>
        <div className="flex-center" style={{ gap: '6px' }}><div className="status-dot online"></div></div>
      </div>
      
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        <path className="graph-path" d="M 50 120 Q 200 60 400 120 T 800 120" fill="none" stroke="rgba(157, 255, 34, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
        <path className="graph-path" d="M 50 120 Q 200 180 400 120 T 800 120" fill="none" stroke="rgba(157, 255, 34, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
        
        {/* Nodes */}
        <circle cx="50" cy="120" r="16" fill="var(--bg-panel)" stroke="#ef4444" strokeWidth="2"/>
        <circle cx="200" cy="90" r="4" fill="#fbbf24" />
        <circle cx="200" cy="150" r="4" fill="#fbbf24" />
        <circle cx="280" cy="120" r="6" fill="#fbbf24" />
        <circle cx="400" cy="120" r="12" fill="var(--accent-green)" style={{ filter: 'drop-shadow(0 0 10px var(--accent-green))' }} />
        <circle cx="550" cy="80" r="4" fill="var(--accent-green)" />
        <circle cx="550" cy="160" r="4" fill="var(--accent-green)" />
        <circle cx="800" cy="120" r="16" fill="var(--bg-panel)" stroke="var(--accent-green)" strokeWidth="2"/>
      </svg>
      
      <div style={{ position: 'absolute', left: '38px', top: '108px' }}><FileText size={16} color="#ef4444" /></div>
      <div style={{ position: 'absolute', left: '788px', top: '108px' }}><MessageSquareIcon /></div>
    </div>
  );
};

const MessageSquareIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;

// --- MAIN COMPONENT --- //

export default function NeuralPipeline() {
  const containerRef = useRef(null);

  const modules = [
    { id: 1, title: 'Document Ingestion', icon: FileText, state: 'WAITING', color: '#ef4444', telemetry: { 'Pages': '42', 'Size': '8.2MB', 'OCR': 'VERIFIED' }, label: 'RAW PDF BYTES' },
    { id: 2, title: 'Semantic Chunking', icon: Scissors, state: 'WAITING', color: '#fbbf24', telemetry: { 'Chunks': '156', 'Overlap': '150', 'Density': 'HIGH' }, label: 'TEXT CHUNKS' },
    { id: 3, title: 'Vector Embeddings', icon: Fingerprint, state: 'WAITING', color: '#fbbf24', telemetry: { 'Model': 'MiniLM-L6', 'Vectors': '156', 'Latency': '42ms' }, label: 'VECTOR EMBEDDINGS' },
    { id: 4, title: 'Context Retrieval', icon: Search, state: 'WAITING', color: 'var(--accent-green)', telemetry: { 'Score': '0.92', 'Rank': 'Top-K', 'Match': 'Semantic' }, label: 'RELEVANT CONTEXT' },
    { id: 5, title: 'LM Studio Core', isCenterpiece: true, color: 'var(--accent-green)', label: 'AI REASONING' },
    { id: 6, title: 'Decision Synthesis', icon: CheckCircle, state: 'WAITING', color: 'var(--accent-green)', telemetry: { 'Confidence': 'CALC...', 'Risk': 'Pending', 'Rec': 'Pending' }, label: 'FINAL RESPONSE' }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
      }
    });

    // 1. Reveal header
    tl.fromTo('.pipeline-header > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 });

    // 2. SVG Connectors draw in
    tl.to('.bracket-path', { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' });

    // 3. Boot up modules sequentially
    tl.fromTo('.module-card', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'back.out(1.2)' },
      "-=0.5"
    );

    // 4. Centerpiece spin
    gsap.to('.core-ring-1', { rotation: 360, duration: 8, repeat: -1, ease: 'linear' });
    gsap.to('.core-ring-2', { rotation: -360, duration: 12, repeat: -1, ease: 'linear' });
    gsap.to('.core-sphere', { scale: 1.1, duration: 1, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    // 5. Data Flow (Energy Packets)
    gsap.to('.energy-packet', {
      left: '100%',
      duration: 3,
      ease: 'none',
      repeat: -1,
      stagger: 1
    });

    // 6. Event Stream scrolling simulation
    tl.to('.event-msg', {
      opacity: 1,
      y: -20,
      stagger: 0.15,
      duration: 0.2,
      onUpdate: function() {
        gsap.set('.event-stream-container', { y: -this.progress() * 300 });
      }
    }, "+=1");

    // 7. Graph path continuous pulse
    gsap.to('.graph-path', {
      strokeDashoffset: -20,
      duration: 1,
      repeat: -1,
      ease: 'linear'
    });

  }, []);

  return (
    <section id="how-it-works" ref={containerRef} style={{ padding: '6rem 4rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Neural Grid */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: 0 }}></div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* HEADER AREA */}
        <div className="pipeline-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '5rem' }}>
          <div className="flex-center" style={{ gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent-green)', filter: 'blur(4px)' }}></div>
            </div>
            <div className="text-sm font-medium" style={{ letterSpacing: '2px', color: 'var(--accent-green)' }}>THE RAG PIPELINE</div>
            <div className="border-card flex-center text-xs" style={{ padding: '4px 10px', gap: '6px' }}>
              AI ENGINE <div className="status-dot online"></div> ONLINE
            </div>
          </div>
          
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>How DocuMind AI Thinks</h2>
          <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>From raw documents to intelligent answers. <br/>Inside our Retrieval-Augmented Generation pipeline.</p>
          
          <div className="badge badge-outline" style={{ display: 'inline-flex', gap: '1rem', padding: '8px 20px', borderRadius: '30px', background: 'var(--bg-panel)' }}>
            <div className="flex-center" style={{ gap: '6px' }}><div className="status-dot online"></div> <span className="text-accent">PIPELINE STATUS: ACTIVE</span></div>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <div className="text-muted">DATA FLOW: REAL-TIME</div>
          </div>
        </div>

        {/* BRACKETS (SVG) */}
        <div style={{ position: 'relative', height: '40px', marginBottom: '1rem' }}>
          <svg width="100%" height="40" style={{ position: 'absolute', top: 0, left: 0 }}>
            {/* Group 2 & 3 */}
            <path className="bracket-path" d="M 280 40 L 280 20 L 480 20 L 480 40" fill="none" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="4,4" strokeDashoffset="100" />
            <text x="380" y="12" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" letterSpacing="1">SEMANTIC UNDERSTANDING</text>
            
            {/* Group 4 & 5 */}
            <path className="bracket-path" d="M 750 40 L 750 20 L 980 20 L 980 40" fill="none" stroke="var(--accent-green)" strokeWidth="1" strokeDasharray="4,4" strokeDashoffset="100" />
            <text x="865" y="12" fill="var(--accent-green)" fontSize="10" textAnchor="middle" letterSpacing="1">RETRIEVAL AUGMENTATION</text>
          </svg>
        </div>

        {/* 6-STAGE PIPELINE GRID */}
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
          
          {/* Continuous Flow Background */}
          <div style={{ position: 'absolute', top: '50%', left: '0', width: '100%', height: '4px', background: 'linear-gradient(90deg, #ef4444 0%, #fbbf24 40%, var(--accent-green) 100%)', transform: 'translateY(-50%)', zIndex: 0, filter: 'blur(2px)' }}></div>
          
          {/* Energy Packets */}
          <div style={{ position: 'absolute', top: '50%', left: '0', width: '100%', height: '4px', transform: 'translateY(-50%)', zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="energy-packet" style={{ position: 'absolute', left: '-5%', width: '30px', height: '4px', background: '#fff', boxShadow: '0 0 10px #fff', borderRadius: '10px', opacity: 0.8 }}></div>
            ))}
          </div>

          {modules.map((mod) => (
            <div key={mod.id} className="module-card border-card" style={{ 
              position: 'relative', 
              zIndex: 5, 
              background: 'var(--bg-panel)',
              display: 'flex', 
              flexDirection: 'column', 
              padding: '1.5rem',
              height: '380px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'crosshair',
              boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
              borderTop: `2px solid ${mod.color}`
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = `0 20px 40px ${mod.color}33`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.5)`; }}
            >
              <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <span className="mono text-muted" style={{ fontSize: '0.8rem' }}>0{mod.id}</span>
                {mod.state && <div className="status-dot" style={{ background: mod.color, boxShadow: `0 0 8px ${mod.color}` }}></div>}
              </div>
              
              {!mod.isCenterpiece ? (
                <>
                  <div className="flex-center border-card" style={{ width: '48px', height: '48px', marginBottom: '1rem', borderColor: `${mod.color}55` }}>
                    <mod.icon size={24} color={mod.color} />
                  </div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{mod.title}</h4>
                  
                  {/* Telemetry */}
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    {Object.entries(mod.telemetry).map(([key, val]) => (
                      <div key={key} className="flex-between text-xs">
                        <span className="text-muted">{key}</span>
                        <span className="mono" style={{ color: 'var(--text-primary)' }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{mod.title}</h4>
                  <InferenceCore />
                </div>
              )}

              <div className="border-card flex-center text-xs mono" style={{ padding: '6px', marginTop: 'auto', background: 'rgba(255,255,255,0.02)', color: mod.color, borderColor: `${mod.color}33` }}>
                {mod.label}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM DASHBOARD */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
          
          {/* Visualizer & Feeds */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <NodeGraph />
            
            {/* Features Bar */}
            <div className="border-card" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between' }}>
              {[
                { l: 'SECURE', s: 'End-to-end encrypted', icon: ShieldCheck },
                { l: 'FAST', s: 'Sub-second retrieval', icon: Zap },
                { l: 'ACCURATE', s: 'High quality responses', icon: Target },
                { l: 'INTELLIGENT', s: 'Continuously learning', icon: BrainCircuit }
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <f.icon size={18} className={i >= 2 ? 'text-accent' : 'text-muted'} />
                  <div>
                    <div className="text-sm font-medium">{f.l}</div>
                    <div className="text-xs text-muted">{f.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* What's Happening */}
            <div className="border-card" style={{ padding: '1.5rem', flex: 1 }}>
              <h4 className="text-sm" style={{ marginBottom: '1rem' }}>What's Happening?</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <div className="text-sm text-muted">1. Your document is processed</div>
                <div className="text-sm text-muted">2. Content is converted to vectors</div>
                <div className="text-sm text-muted">3. Relevant information is retrieved</div>
                <div className="text-sm text-accent">4. AI generates intelligent response</div>
              </div>
              
              <div className="border-card" style={{ padding: '1rem', background: 'rgba(157, 255, 34, 0.02)', borderColor: 'rgba(157, 255, 34, 0.1)' }}>
                <div className="text-xs text-muted" style={{ marginBottom: '4px' }}>Confidence Score</div>
                <div className="flex-between">
                  <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--accent-green)' }}>96.4%</div>
                  {/* Sparkline */}
                  <svg width="80" height="30">
                    <path d="M0 25 L10 20 L20 28 L30 15 L40 18 L50 5 L60 12 L70 2 L80 10" fill="none" stroke="var(--accent-green)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>

            <EventStream />
          </div>

        </div>

      </div>
    </section>
  );
}
