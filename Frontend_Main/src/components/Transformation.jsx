import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, AlertTriangle, BrainCircuit, ShieldCheck, Zap, Target, RotateCw, Lightbulb, Activity, CheckCircle, XCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- SUB-COMPONENTS --- //

const ChaosDocuments = () => {
  return (
    <div className="chaos-container" style={{ position: 'relative', height: '250px', width: '100%', marginTop: '2rem' }}>
      {[...Array(6)].map((_, i) => (
        <div key={`doc-${i}`} className="chaos-doc" style={{
          position: 'absolute',
          top: `${Math.random() * 60}%`,
          left: `${Math.random() * 60}%`,
          transform: `rotate(${Math.random() * 40 - 20}deg)`,
          opacity: 0.7,
          filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.2))'
        }}>
          <FileText size={48} className="text-muted" strokeWidth={1} />
        </div>
      ))}
      
      {/* Alerts */}
      <div className="chaos-alert alert-1" style={{ position: 'absolute', top: '10%', right: '10%', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <AlertTriangle size={12} /> UNKNOWN ENTITY
      </div>
      <div className="chaos-alert alert-2" style={{ position: 'absolute', top: '40%', right: '30%', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <AlertTriangle size={12} /> MISSING DATA
      </div>
      <div className="chaos-alert alert-3" style={{ position: 'absolute', bottom: '20%', left: '10%', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <AlertTriangle size={12} /> CONFLICT DETECTED
      </div>
    </div>
  );
};

const NeuralCore = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
      
      {/* Glow */}
      <div style={{ position: 'absolute', width: '200px', height: '200px', background: 'var(--accent-green)', filter: 'blur(80px)', opacity: 0.15, borderRadius: '50%' }}></div>
      
      {/* Orbit Rings */}
      <div className="orbit-ring-core r1" style={{ position: 'absolute', width: '240px', height: '240px', border: '1px dashed rgba(157, 255, 34, 0.2)', borderRadius: '50%' }}></div>
      <div className="orbit-ring-core r2" style={{ position: 'absolute', width: '180px', height: '180px', border: '1px solid rgba(157, 255, 34, 0.1)', borderRadius: '50%' }}></div>
      
      {/* Orbiting Nodes */}
      <div className="orbit-node-container" style={{ position: 'absolute', width: '240px', height: '240px', animation: 'spin 15s linear infinite' }}>
        <div style={{ position: 'absolute', top: '-4px', left: '50%', width: '8px', height: '8px', background: 'var(--accent-green)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-green)' }}></div>
        <div style={{ position: 'absolute', bottom: '-4px', left: '50%', width: '8px', height: '8px', background: 'var(--accent-green)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-green)' }}></div>
      </div>

      {/* Center Brain */}
      <div className="core-brain pulse-heavy" style={{ color: 'var(--accent-green)', filter: 'drop-shadow(0 0 20px var(--accent-green))' }}>
        <BrainCircuit size={64} strokeWidth={1.5} />
      </div>

      {/* Floating Telemetry */}
      <div className="text-xs text-accent" style={{ position: 'absolute', top: '20px', left: '0' }}>VECTORIZING<br/><span className="text-muted">156 chunks</span></div>
      <div className="text-xs text-accent" style={{ position: 'absolute', top: '20px', right: '0', textAlign: 'right' }}>PARSING CONTEXT<br/><span className="text-muted">98% complete</span></div>
      <div className="text-xs text-accent" style={{ position: 'absolute', bottom: '60px', left: '0' }}>SEMANTIC MAPPING<br/><span className="text-muted">Active</span></div>
      <div className="text-xs text-accent" style={{ position: 'absolute', bottom: '60px', right: '0', textAlign: 'right' }}>RETRIEVAL<br/><span className="text-muted">Live</span></div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .pulse-heavy { animation: pulse 2s infinite alternate; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.1); opacity: 1; filter: drop-shadow(0 0 30px var(--accent-green)); } }
      `}</style>
    </div>
  );
};

const FlowStream = ({ direction = 'left', color = '#ef4444' }) => {
  // SVG lines to simulate heavy data flow
  const paths = [
    "M 0 50 Q 50 20, 100 50 T 200 50",
    "M 0 30 Q 50 60, 100 30 T 200 30",
    "M 0 70 Q 50 40, 100 70 T 200 70",
    "M 0 40 Q 50 80, 100 40 T 200 40",
    "M 0 60 Q 50 10, 100 60 T 200 60"
  ];

  return (
    <div style={{ position: 'absolute', top: '50%', [direction]: '-30px', width: '120px', height: '100px', transform: 'translateY(-50%)', zIndex: 0, pointerEvents: 'none', opacity: 0.6 }}>
      <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none">
        {paths.map((d, i) => (
          <path key={i} className={`flow-path-${direction}`} d={d} fill="none" stroke={color} strokeWidth="2" strokeDasharray="10 5" opacity={0.3 + (i * 0.1)} />
        ))}
        {/* Glow behind streams */}
        {paths.map((d, i) => (
          <path key={`glow-${i}`} d={d} fill="none" stroke={color} strokeWidth="8" opacity="0.1" filter="blur(4px)" />
        ))}
      </svg>
    </div>
  );
};

const Sparkline = ({ color = 'var(--accent-green)' }) => {
  return (
    <svg width="80" height="30" viewBox="0 0 80 30">
      <path className="spark-path-out" d="M 0 25 L 10 20 L 20 28 L 30 15 L 40 18 L 50 5 L 60 12 L 70 2 L 80 10" fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
};

// --- MAIN COMPONENT --- //

export default function Transformation() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
      }
    });

    // Header Reveal
    tl.fromTo('.trans-header > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 });

    // Panels Reveal
    tl.fromTo('.trans-panel', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out' },
      "-=0.4"
    );

    // Chaos Animation (Left Panel)
    gsap.to('.chaos-doc', {
      y: 'random(-15, 15)',
      x: 'random(-15, 15)',
      rotation: 'random(-30, 30)',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.1
    });

    gsap.to('.chaos-alert', {
      y: 'random(-10, 10)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.2
    });

    // Flow Stream Animation (Continuous Heavy Flow)
    gsap.to('.flow-path-left', {
      strokeDashoffset: -50,
      duration: 1,
      repeat: -1,
      ease: 'linear'
    });

    gsap.to('.flow-path-right', {
      strokeDashoffset: -50,
      duration: 1.5,
      repeat: -1,
      ease: 'linear'
    });

    // Right Panel Data Reveal
    tl.fromTo('.data-row',
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
      "-=0.5"
    );

    tl.fromTo('.spark-path-out', 
      { strokeDasharray: 100, strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out' },
      "-=0.5"
    );

    // Donut Chart Draw
    tl.fromTo('.donut-fill',
      { strokeDasharray: '0 100' },
      { strokeDasharray: '75 100', duration: 1.5, ease: 'power2.out' },
      "-=1.5"
    );

  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '8rem 4rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* HEADER */}
        <div className="trans-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="text-xs font-medium text-muted" style={{ letterSpacing: '2px', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--border-color)' }}>—</span> AI-POWERED TRANSFORMATION <span style={{ color: 'var(--border-color)' }}>—</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '1rem', lineHeight: 1.1 }}>
            FROM CHAOS TO<br/><span className="text-accent">DECISION INTELLIGENCE</span>
          </h2>
          <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            DocuMind AI transforms unstructured documents into trusted, actionable intelligence with enterprise-grade accuracy and reasoning.
          </p>
        </div>

        {/* 3-PANEL CORE ENGINE */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '2rem', position: 'relative', marginBottom: '4rem' }}>
          
          {/* PANEL 1: CHAOS (Red) */}
          <div className="trans-panel border-panel" style={{ padding: '2rem', borderColor: 'rgba(239, 68, 68, 0.3)', boxShadow: '0 0 30px rgba(239, 68, 68, 0.05)', position: 'relative', zIndex: 10 }}>
            <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '1rem', marginBottom: '0.5rem' }}>
              <div className="mono text-xs text-muted">01</div>
              <h4 style={{ color: '#ef4444', letterSpacing: '1px' }}>RAW DOCUMENT CHAOS</h4>
            </div>
            <p className="text-xs text-muted">Unstructured. Noisy. Unreliable.</p>
            
            <ChaosDocuments />

            {/* Bottom Stats */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', borderTop: '1px solid rgba(239, 68, 68, 0.2)', paddingTop: '1.5rem' }}>
              <div>
                <div className="text-xs text-muted" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FileText size={12}/> FILES</div>
                <div className="text-lg font-medium">147</div>
              </div>
              <div>
                <div className="text-xs text-muted">FORMATS</div>
                <div className="text-lg font-medium">12+</div>
              </div>
              <div>
                <div className="text-xs" style={{ color: '#ef4444' }}>ISSUES</div>
                <div className="text-lg font-medium" style={{ color: '#ef4444' }}>63</div>
              </div>
            </div>
            <p className="text-xs text-muted" style={{ marginTop: '1rem' }}>Disorganized, inconsistent, and difficult to process.</p>
          </div>

          {/* SVG FLOW 1 */}
          <FlowStream direction="left" color="#ef4444" />

          {/* PANEL 2: NEURAL ENGINE (Center) */}
          <div className="trans-panel border-panel" style={{ padding: '2rem', borderColor: 'rgba(157, 255, 34, 0.3)', boxShadow: '0 0 40px rgba(157, 255, 34, 0.1)', position: 'relative', zIndex: 10 }}>
            <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '1rem', marginBottom: '0.5rem' }}>
              <div className="mono text-xs text-muted">02</div>
              <h4 className="text-accent" style={{ letterSpacing: '1px' }}>NEURAL SYNTHESIS ENGINE</h4>
            </div>
            <p className="text-xs text-muted">Analyzing. Understanding. Connecting.</p>

            <NeuralCore />

            <div style={{ marginTop: '2rem' }}>
              <div className="flex-between text-xs text-muted" style={{ marginBottom: '8px' }}>
                <span>PROCESSING DOCUMENTS...</span>
                <span className="text-accent">82%</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(157, 255, 34, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '82%', height: '100%', background: 'var(--accent-green)', borderRight: '2px solid #fff' }}></div>
              </div>
            </div>
          </div>

          {/* SVG FLOW 2 */}
          <FlowStream direction="right" color="var(--accent-green)" />

          {/* PANEL 3: DECISION INTELLIGENCE (Right) */}
          <div className="trans-panel border-panel" style={{ padding: '2rem', borderColor: 'rgba(157, 255, 34, 0.3)', boxShadow: '0 0 30px rgba(157, 255, 34, 0.05)', position: 'relative', zIndex: 10 }}>
            <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '1rem', marginBottom: '0.5rem' }}>
              <div className="mono text-xs text-muted">03</div>
              <h4 className="text-accent" style={{ letterSpacing: '1px' }}>DECISION INTELLIGENCE</h4>
            </div>
            <p className="text-xs text-muted">Structured. Trusted. Actionable.</p>

            {/* Output Status */}
            <div className="border-card" style={{ padding: '1rem', marginTop: '1.5rem', marginBottom: '1.5rem', background: 'rgba(157, 255, 34, 0.05)' }}>
              <div className="text-xs text-muted" style={{ marginBottom: '4px' }}>OUTPUT STATUS</div>
              <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '8px' }}>
                <ShieldCheck size={20} className="text-accent" />
                <span className="text-xl font-medium text-accent">APPROVE <div className="status-dot online" style={{ display: 'inline-block', marginLeft: '4px' }}></div></span>
              </div>
            </div>

            {/* Structured Insights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div className="data-row flex-between">
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Lightbulb size={16} className="text-accent" style={{ marginTop: '2px' }} />
                  <div>
                    <div className="text-sm font-medium">Key Insights</div>
                    <div className="text-xs text-muted">Extracted 156 critical insights</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-accent">156</div>
                  <div className="text-xs text-muted" style={{ fontSize: '9px' }}>INSIGHTS</div>
                </div>
              </div>
              <div className="data-row flex-between">
                <div style={{ display: 'flex', gap: '12px' }}>
                  <ShieldCheck size={16} className="text-accent" style={{ marginTop: '2px' }} />
                  <div>
                    <div className="text-sm font-medium">Risk Assessment</div>
                    <div className="text-xs text-muted">Identified 8 potential risks</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium" style={{ color: '#fbbf24' }}>8</div>
                  <div className="text-xs text-muted" style={{ fontSize: '9px' }}>RISKS</div>
                </div>
              </div>
              <div className="data-row flex-between">
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Target size={16} className="text-accent" style={{ marginTop: '2px' }} />
                  <div>
                    <div className="text-sm font-medium">Recommendations</div>
                    <div className="text-xs text-muted">Generated 12 actionable items</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-accent">12</div>
                  <div className="text-xs text-muted" style={{ fontSize: '9px' }}>ACTIONS</div>
                </div>
              </div>
            </div>

            {/* Bottom Dashboard */}
            <div className="border-card" style={{ padding: '1.25rem' }}>
              <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <div>
                  <div className="text-xs text-muted" style={{ marginBottom: '4px' }}>CONFIDENCE SCORE</div>
                  <div className="text-2xl font-medium text-accent">96.4%</div>
                  <div className="text-xs text-muted">Very High Confidence</div>
                </div>
                {/* SVG Donut Chart */}
                <svg width="40" height="40" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(157, 255, 34, 0.1)" strokeWidth="3" />
                  <path className="donut-fill" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-green)" strokeWidth="3" strokeDasharray="75 100" />
                </svg>
              </div>
              <div className="flex-between">
                <div>
                  <div className="text-xs text-muted" style={{ fontSize: '9px', marginBottom: '2px' }}>ACCURACY</div>
                  <div className="text-sm font-medium">96.4%</div>
                </div>
                <div>
                  <div className="text-xs text-muted" style={{ fontSize: '9px', marginBottom: '2px' }}>RELIABILITY</div>
                  <div className="text-sm font-medium">98.7%</div>
                </div>
                <Sparkline />
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM FEATURES FOOTER */}
        <div className="border-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', padding: '2rem' }}>
          {[
            { t: 'SECURE & PRIVATE', s: 'Enterprise-grade encryption and data protection.', icon: ShieldCheck },
            { t: 'BLAZING FAST', s: 'Real-time processing with optimized AI models.', icon: Zap },
            { t: 'HIGHLY ACCURATE', s: 'Advanced reasoning and cross-verification.', icon: Target },
            { t: 'CONTINUOUS LEARNING', s: 'AI that learns, adapts, and improves every day.', icon: BrainCircuit }
          ].map((feat, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div className="flex-center" style={{ width: '32px', height: '32px' }}>
                <feat.icon size={24} className="text-accent" />
              </div>
              <div>
                <h5 className="text-sm font-medium" style={{ marginBottom: '4px' }}>{feat.t}</h5>
                <p className="text-xs text-muted">{feat.s}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
