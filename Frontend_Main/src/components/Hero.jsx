import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ShieldCheck, Zap, Target, ArrowRight, BrainCircuit, Home, FileText, BarChart2, MessageSquare, Clock, Settings, FileIcon, Activity, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);
  const mockupRef = useRef(null);
  const btnRef = useRef(null);
  const engineStatusRef = useRef(null);
  const chartRef = useRef(null);
  const scanLineRef = useRef(null);

  // Live Telemetry States
  const [docsProcessed, setDocsProcessed] = useState(12);
  const [analysesCompleted, setAnalysesCompleted] = useState(28);
  const [confidence, setConfidence] = useState(92.4);
  const [isScanning, setIsScanning] = useState(false);

  // Background Telemetry Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setConfidence(prev => {
        const jitter = (Math.random() - 0.5) * 0.4;
        return Number(Math.min(99.9, Math.max(90.0, prev + jitter)).toFixed(1));
      });
      if (Math.random() > 0.8) setDocsProcessed(prev => prev + 1);
      if (Math.random() > 0.7) setAnalysesCompleted(prev => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Cinematic Load Animations & Idle Floating
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.headline-line', 
      { opacity: 0, y: 30, rotationX: -20 }, 
      { opacity: 1, y: 0, rotationX: 0, stagger: 0.2, duration: 1, ease: 'power3.out' }
    )
    .fromTo('.neon-sweep',
      { backgroundPosition: '200% center' },
      { backgroundPosition: '-200% center', duration: 1.5, ease: 'power2.inOut' },
      "-=0.5"
    )
    .to('.neon-sweep', {
      textShadow: '0 0 20px rgba(157, 255, 34, 0.6)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    }, "+=0.5");

    gsap.fromTo('.hero-fade-up', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out', delay: 0.6 }
    );

    gsap.set('.mockup-stagger', { opacity: 0.2 });
    gsap.set('.chart-ring', { strokeDashoffset: 100 });
    gsap.set(engineStatusRef.current, { backgroundColor: '#333', boxShadow: 'none' });

    // Idle Floating
    gsap.to(mockupRef.current, {
      y: -15,
      rotationX: 2,
      rotationY: -1,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Idle Scanner (Slow)
    gsap.to(scanLineRef.current, {
      top: '100%',
      duration: 4,
      repeat: -1,
      ease: 'linear'
    });

  }, []);

  // Magnetic Button Physics
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    gsap.to(btnRef.current, {
      x: x * 0.2,
      y: y * 0.2,
      scale: 1.05,
      boxShadow: '0 15px 30px rgba(157, 255, 34, 0.4)',
      duration: 0.3,
      ease: 'power3.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      boxShadow: '0 10px 25px rgba(157, 255, 34, 0.3)',
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  // Initialize Engine Sequence
  const handleInitialize = () => {
    if (isScanning) return;
    setIsScanning(true);
    
    window.dispatchEvent(new CustomEvent('INITIALIZE_ENGINE'));

    const tl = gsap.timeline();

    tl.to(btnRef.current, { scale: 0.95, duration: 0.1 })
      .to(btnRef.current, { scale: 1, duration: 0.2 });

    // Intense Scan Line Speed
    gsap.to(scanLineRef.current, {
      top: '100%',
      duration: 1.5,
      repeat: 3, // fast scans
      ease: 'linear',
      onComplete: () => {
        // Return to steady scan
        gsap.to(scanLineRef.current, {
          top: '100%',
          duration: 3,
          repeat: -1,
          ease: 'linear'
        });
      }
    });

    // Dashboard Power On
    tl.to(engineStatusRef.current, {
      backgroundColor: 'var(--accent-green)',
      boxShadow: '0 0 15px rgba(157, 255, 34, 0.8)',
      duration: 0.3
    })
    .to('.engine-status-text', { textContent: 'ONLINE', color: 'var(--accent-green)', duration: 0.1 })
    .to('.engine-status-desc', { textContent: 'DocuMind AI Engine is operational and ready.', duration: 0.1 })
    
    // Stagger telemetry rows lighting up as scan line passes
    .to('.mockup-stagger', {
      opacity: 1,
      stagger: 0.1,
      duration: 0.4,
      ease: 'power2.out'
    })
    
    // Draw chart
    .to('.chart-ring', {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power3.out'
    }, "-=0.2");
  };

  return (
    <section ref={heroRef} style={{ padding: '4rem 4rem', position: 'relative', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center' }}>
      <div className="hero-glow-bg"></div>

      <div style={{ display: 'flex', gap: '4rem', width: '100%', maxWidth: '1600px', margin: '0 auto', alignItems: 'center' }}>
        
        {/* LEFT COLUMN */}
        <div className="hero-left" style={{ flex: '0 0 45%', position: 'relative', zIndex: 10 }}>
          
          <div className="badge badge-outline hero-fade-up" style={{ marginBottom: '2rem', display: 'inline-flex', gap: '0.75rem', padding: '6px 16px', borderRadius: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div className="status-dot online"></div>
              <span className="text-accent">Local RAG Engine</span>
            </div>
            <span style={{ color: 'var(--text-tertiary)' }}>|</span>
            <span>100% Private. 100% Local.</span>
          </div>

          <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, perspective: '1000px' }}>
            <div className="headline-line" style={{ transformOrigin: 'left bottom' }}>Intelligence from</div>
            <div className="headline-line neon-sweep" style={{ 
              transformOrigin: 'left bottom', 
              color: 'var(--accent-green)',
              background: 'linear-gradient(90deg, #9dff22 0%, #ffffff 50%, #9dff22 100%)',
              backgroundSize: '200% auto',
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              textShadow: '0 0 10px rgba(157, 255, 34, 0)'
            }}>Every Document.</div>
          </h1>

          <p className="hero-fade-up" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '90%', lineHeight: 1.6 }}>
            DocuMind AI transforms complex documents into clear decisions. Upload, analyze, and act with confidence using advanced local AI.
          </p>

          <div className="hero-fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <ShieldCheck size={20} className="text-accent" style={{ marginBottom: '8px' }} />
              <h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>100% Private</h4>
              <p className="text-xs text-muted">All processing happens locally.</p>
            </div>
            <div>
              <Zap size={20} className="text-accent" style={{ marginBottom: '8px' }} />
              <h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Instant Insights</h4>
              <p className="text-xs text-muted">Get structured analysis in real-time.</p>
            </div>
            <div>
              <Target size={20} className="text-accent" style={{ marginBottom: '8px' }} />
              <h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Actionable Decisions</h4>
              <p className="text-xs text-muted">Accept, Reject, or Improve.</p>
            </div>
          </div>

          <div className="hero-fade-up" style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            <button 
              ref={btnRef}
              onClick={handleInitialize}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="btn-primary" 
              style={{ padding: '12px 24px', position: 'relative', zIndex: 20 }}
            >
              <div style={{ textAlign: 'left', pointerEvents: 'none' }}>
                <div style={{ fontSize: '1.1rem' }}>Initialize Engine</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8, fontWeight: 400 }}>Trigger Neural Scan</div>
              </div>
              <ArrowRight size={20} style={{ pointerEvents: 'none' }} />
            </button>
            <button className="btn-outline border-card">
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1.1rem' }}>View Documentation</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 400 }}>Technical Guide</div>
              </div>
              <ArrowRight size={20} color="var(--text-tertiary)" />
            </button>
          </div>

          <div className="hero-fade-up">
            <div className="text-xs text-muted" style={{ marginBottom: '1rem' }}>Powered by</div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', opacity: 0.7 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 500 }}><BrainCircuit size={16}/> Qwen2.5</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 500 }}><FileText size={16}/> LangChain</div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - MOCKUP */}
        <div ref={mockupRef} className="border-panel" style={{ flex: '1', display: 'flex', height: '650px', position: 'relative', zIndex: 1, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', overflow: 'hidden' }}>
          
          {/* Dashboard Scan Line */}
          <div ref={scanLineRef} style={{
            position: 'absolute',
            top: '-10%',
            left: 0,
            width: '100%',
            height: '2px',
            background: 'var(--accent-green)',
            boxShadow: '0 0 15px var(--accent-green), 0 0 30px var(--accent-green)',
            zIndex: 50,
            pointerEvents: 'none',
            opacity: isScanning ? 1 : 0.3
          }}>
            <div style={{
              position: 'absolute',
              bottom: '2px',
              left: 0,
              width: '100%',
              height: '80px',
              background: 'linear-gradient(to top, rgba(157, 255, 34, 0.15), transparent)'
            }}></div>
          </div>

          {/* Sidebar */}
          <div style={{ width: '80px', borderRight: '1px solid var(--border-color)', background: 'var(--bg-sidebar)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 0', borderRadius: '16px 0 0 16px', position: 'relative', zIndex: 10 }}>
            <BrainCircuit size={28} className="text-accent" style={{ marginBottom: '2rem' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
              <div className="sidebar-link active"><Home size={20} /><span style={{ fontSize: '0.65rem' }}>Overview</span></div>
              <div className="sidebar-link"><FileText size={20} /><span style={{ fontSize: '0.65rem' }}>Documents</span></div>
              <div className="sidebar-link"><BarChart2 size={20} /><span style={{ fontSize: '0.65rem' }}>Analysis</span></div>
              <div className="sidebar-link"><MessageSquare size={20} /><span style={{ fontSize: '0.65rem' }}>Chat</span></div>
              <div className="sidebar-link"><Clock size={20} /><span style={{ fontSize: '0.65rem' }}>History</span></div>
            </div>
            <div style={{ marginTop: 'auto', width: '100%' }}>
              <div className="sidebar-link"><Settings size={20} /><span style={{ fontSize: '0.65rem' }}>Settings</span></div>
            </div>
          </div>

          {/* Main Dashboard Area */}
          <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--bg-panel)', borderRadius: '0 16px 16px 0', position: 'relative', zIndex: 10 }}>
            
            {/* Header */}
            <div className="flex-between mockup-stagger">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1.25rem' }}>Engine Status</h3>
                  <div className="badge" style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px' }}>
                    <div ref={engineStatusRef} className="status-dot" style={{ marginRight: '6px', backgroundColor: '#333' }}></div> 
                    <span className="engine-status-text" style={{ color: 'var(--text-secondary)' }}>STANDBY</span>
                  </div>
                </div>
                <p className="text-sm text-muted engine-status-desc">Awaiting initialization command.</p>
              </div>
              <div className="border-card flex-center" style={{ padding: '12px 16px', gap: '12px' }}>
                <div>
                  <div className="text-xs text-muted" style={{ marginBottom: '2px' }}>Model Loaded</div>
                  <div className="text-sm" style={{ fontWeight: 500 }}>Qwen2.5-7B-Instruct</div>
                </div>
                <ShieldCheck size={20} className="text-accent" />
              </div>
            </div>

            {/* Metrics Row */}
            <div className="mockup-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              <div className="border-card flex-between" style={{ padding: '1rem' }}>
                <div>
                  <div className="text-xs text-muted" style={{ marginBottom: '8px' }}>Documents</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{docsProcessed}</div>
                </div>
                <FileIcon size={24} color="var(--border-color)" />
              </div>
              <div className="border-card flex-between" style={{ padding: '1rem' }}>
                <div>
                  <div className="text-xs text-muted" style={{ marginBottom: '8px' }}>Analyses</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{analysesCompleted}</div>
                </div>
                <Activity size={24} className="text-accent" />
              </div>
              <div className="border-card flex-between" style={{ padding: '1rem' }}>
                <div>
                  <div className="text-xs text-muted" style={{ marginBottom: '8px' }}>Avg. Confidence</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{confidence}%</div>
                </div>
                <svg width="32" height="32" viewBox="0 0 36 36">
                  <path stroke="var(--border-color)" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="chart-ring" stroke="var(--accent-green)" strokeWidth="4" fill="none" strokeDasharray={`${confidence}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              </div>
              <div className="border-card flex-between" style={{ padding: '1rem' }}>
                <div>
                  <div className="text-xs text-muted" style={{ marginBottom: '8px' }}>Decisions</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>18</div>
                </div>
                <CheckCircle2 size={24} className="text-accent" />
              </div>
            </div>

            {/* Analysis & Chart Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', flex: 1 }}>
              
              <div className="border-card mockup-stagger" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                
                <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>Live Telemetry Stream</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, overflow: 'hidden' }}>
                  {[
                    { f: 'Vendor_Agreement.pdf', c: '94.2%', s: 'Accept', cClass: 'text-accent' },
                    { f: 'Financial_Report_Q4.pdf', c: '88.7%', s: 'Improve', cClass: 'text-blue' },
                    { f: 'Risk_Assessment.docx', c: '91.1%', s: 'Accept', cClass: 'text-accent' }
                  ].map((row, i) => (
                    <div key={i} className="flex-between telemetry-row" style={{ padding: '8px 0', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
                      <span className="text-sm text-muted">{row.f}</span>
                      <div style={{ display: 'flex', gap: '1.5rem', width: '120px', justifyContent: 'space-between' }}>
                        <span className="text-sm">{row.c}</span>
                        <span className={`text-sm ${row.cClass}`} style={{ fontWeight: 500 }}>{row.s}</span>
                      </div>
                    </div>
                  ))}
                  <div className="text-xs text-accent" style={{ animation: 'blink 1s infinite', marginTop: 'auto' }}>_ awaiting next payload...</div>
                </div>
              </div>

              <div className="border-card mockup-stagger" style={{ padding: '1.5rem' }}>
                <h4 style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>Decision Distribution</h4>
                <div className="flex-center" style={{ position: 'relative', marginBottom: '2rem' }}>
                  <svg ref={chartRef} width="120" height="120" viewBox="0 0 36 36">
                    <path className="chart-ring" stroke="var(--accent-green)" strokeWidth="6" fill="none" strokeDasharray="50, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="chart-ring" stroke="var(--accent-blue)" strokeWidth="6" fill="none" strokeDasharray="32, 100" strokeDashoffset="-50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="chart-ring" stroke="var(--accent-red)" strokeWidth="6" fill="none" strokeDasharray="18, 100" strokeDashoffset="-82" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </section>
  );
}
