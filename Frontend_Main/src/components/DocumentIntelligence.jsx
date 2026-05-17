import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, UserCircle, BarChart3, Search, ShieldCheck, Zap, Target, BrainCircuit, CheckCircle, RotateCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- SUB-COMPONENTS --- //

const CircuitBackground = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <svg width="100%" height="100%" viewBox="0 0 1400 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(157, 255, 34, 0.1)" />
            <stop offset="50%" stopColor="rgba(157, 255, 34, 0.4)" />
            <stop offset="100%" stopColor="rgba(157, 255, 34, 0.1)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Base Circuit Lines */}
        <path className="circuit-path" d="M 0 350 L 150 350 L 150 450 L 250 450 L 250 750 L 500 750" fill="none" stroke="rgba(157,255,34,0.15)" strokeWidth="2" strokeLinejoin="round" />
        <path className="circuit-path" d="M 400 450 L 400 550 L 600 550 L 600 650 L 700 650" fill="none" stroke="rgba(157,255,34,0.15)" strokeWidth="2" strokeLinejoin="round" />
        <path className="circuit-path" d="M 1400 350 L 1250 350 L 1250 850 L 700 850" fill="none" stroke="rgba(157,255,34,0.15)" strokeWidth="2" strokeLinejoin="round" />
        <path className="circuit-path" d="M 900 450 L 900 550 L 800 550 L 800 650 L 700 650" fill="none" stroke="rgba(157,255,34,0.15)" strokeWidth="2" strokeLinejoin="round" />
        
        {/* Animated Dash Arrays (Light Pulses) */}
        <path className="light-pulse" d="M 0 350 L 150 350 L 150 450 L 250 450 L 250 750 L 500 750" fill="none" stroke="var(--accent-green)" strokeWidth="3" strokeLinejoin="round" strokeDasharray="50 1500" strokeDashoffset="1500" filter="url(#glow)" />
        <path className="light-pulse" d="M 400 450 L 400 550 L 600 550 L 600 650 L 700 650" fill="none" stroke="var(--accent-green)" strokeWidth="3" strokeLinejoin="round" strokeDasharray="30 1000" strokeDashoffset="1000" filter="url(#glow)" />
        <path className="light-pulse reverse" d="M 1400 350 L 1250 350 L 1250 850 L 700 850" fill="none" stroke="var(--accent-green)" strokeWidth="3" strokeLinejoin="round" strokeDasharray="100 2000" strokeDashoffset="-2000" filter="url(#glow)" />
        <path className="light-pulse reverse" d="M 900 450 L 900 550 L 800 550 L 800 650 L 700 650" fill="none" stroke="var(--accent-green)" strokeWidth="3" strokeLinejoin="round" strokeDasharray="40 800" strokeDashoffset="-800" filter="url(#glow)" />

        {/* Connection Nodes */}
        <circle cx="150" cy="350" r="4" fill="var(--accent-green)" filter="url(#glow)" className="pulse-node" />
        <circle cx="250" cy="450" r="4" fill="var(--accent-green)" filter="url(#glow)" className="pulse-node" />
        <circle cx="400" cy="450" r="4" fill="var(--accent-green)" filter="url(#glow)" className="pulse-node" />
        <circle cx="900" cy="450" r="4" fill="var(--accent-green)" filter="url(#glow)" className="pulse-node" />
        <circle cx="1250" cy="350" r="4" fill="var(--accent-green)" filter="url(#glow)" className="pulse-node" />
      </svg>
    </div>
  );
};

const HeartbeatSparkline = () => {
  return (
    <div style={{ width: '100px', height: '30px' }}>
      <svg width="100" height="30" viewBox="0 0 100 30">
        <path className="heartbeat-line" d="M 0 15 L 20 15 L 25 5 L 35 25 L 45 15 L 55 15 L 60 10 L 65 20 L 70 15 L 100 15" fill="none" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M 0 15 L 20 15 L 25 5 L 35 25 L 45 15 L 55 15 L 60 10 L 65 20 L 70 15 L 100 15" fill="none" stroke="var(--accent-green)" strokeWidth="4" filter="blur(3px)" opacity="0.3" />
      </svg>
    </div>
  );
};

const CentralHub = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', position: 'relative' }}>
      
      {/* Glow Platform */}
      <div style={{ position: 'absolute', bottom: '-20px', width: '200px', height: '40px', background: 'radial-gradient(ellipse, rgba(157, 255, 34, 0.3) 0%, transparent 70%)', transform: 'rotateX(70deg)' }}></div>
      
      {/* Concentric Rings */}
      <div className="hub-ring r1" style={{ position: 'absolute', width: '180px', height: '180px', border: '1px dashed rgba(157, 255, 34, 0.3)', borderRadius: '50%' }}></div>
      <div className="hub-ring r2" style={{ position: 'absolute', width: '140px', height: '140px', border: '2px solid rgba(157, 255, 34, 0.2)', borderRadius: '50%' }}></div>
      <div className="hub-ring r3" style={{ position: 'absolute', width: '100px', height: '100px', border: '1px solid var(--accent-green)', borderRadius: '50%', boxShadow: '0 0 20px rgba(157, 255, 34, 0.2), inset 0 0 20px rgba(157, 255, 34, 0.2)' }}></div>
      
      {/* Core Node */}
      <div className="hub-core" style={{ position: 'relative', width: '60px', height: '60px', background: 'var(--bg-panel)', border: '2px solid var(--accent-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px var(--accent-green)', zIndex: 10 }}>
        <FileText size={28} className="text-accent" />
      </div>

      <style>{`
        .hub-ring.r1 { animation: spin 10s linear infinite; }
        .hub-ring.r2 { animation: spin 15s linear infinite reverse; }
        .hub-ring.r3 { animation: pulseHub 2s ease-in-out infinite alternate; }
        .hub-core { animation: floatCore 3s ease-in-out infinite alternate; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes pulseHub { 0% { transform: scale(1); box-shadow: 0 0 10px rgba(157, 255, 34, 0.2); } 100% { transform: scale(1.05); box-shadow: 0 0 30px rgba(157, 255, 34, 0.4); } }
        @keyframes floatCore { 0% { transform: translateY(-5px); } 100% { transform: translateY(5px); } }
      `}</style>
    </div>
  );
};

// --- MAIN COMPONENT --- //

export default function DocumentIntelligence() {
  const sectionRef = useRef(null);

  const gridCards = [
    { id: '01', icon: FileText, title: 'CONTRACT REVIEW', doc: 'NDA_v3.pdf', detail: 'Missing expiry clauses', check: 'Auto-detected 7 year-locks' },
    { id: '02', icon: UserCircle, title: 'RESUME ANALYSIS', doc: 'alex_resume.pdf', detail: 'Top-3 employment (2020)', check: 'Highlighted open-source work' },
    { id: '03', icon: BarChart3, title: 'PROPOSAL EVALUATION', doc: 'Q4_Proposal.pdf', detail: 'Margin scoring model', check: 'Flagged inflated budget' }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
      }
    });

    // Circuit Base Draw
    tl.fromTo('.circuit-path', 
      { strokeDasharray: 2000, strokeDashoffset: 2000 },
      { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut' }
    );

    // Light Pulses (Infinite)
    gsap.to('.light-pulse:not(.reverse)', {
      strokeDashoffset: 0,
      duration: 3,
      repeat: -1,
      ease: 'linear'
    });
    
    gsap.to('.light-pulse.reverse', {
      strokeDashoffset: 0,
      duration: 4,
      repeat: -1,
      ease: 'linear'
    });

    gsap.to('.pulse-node', {
      opacity: 0.2,
      scale: 1.5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.2
    });

    // Header & Dashboard Reveal
    tl.fromTo('.doc-header > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, "-=1.5");
    tl.fromTo('.doc-dash', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, "-=1.2");

    // Heartbeat Infinite
    gsap.to('.heartbeat-line', {
      strokeDasharray: 200,
      strokeDashoffset: 200,
      duration: 2,
      repeat: -1,
      ease: 'linear'
    });
    gsap.set('.heartbeat-line', { strokeDasharray: 200 }); // Setup initial

    // Grid Cards Stagger
    tl.fromTo('.doc-grid-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(1.2)' },
      "-=1"
    );

  }, []);

  return (
    <section id="use-cases" ref={sectionRef} style={{ padding: '8rem 4rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* SVG CIRCUIT LAYER */}
      <CircuitBackground />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* TOP HEADER & DASHBOARD */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
          
          <div className="doc-header">
            <div className="flex-center" style={{ gap: '8px', marginBottom: '1.5rem', display: 'inline-flex' }}>
              <span style={{ color: 'var(--accent-green)' }}>+</span>
              <span className="text-xs font-medium" style={{ letterSpacing: '1.5px', color: 'var(--accent-green)' }}>UNIFIED DOCUMENT INTELLIGENCE</span>
            </div>
            
            <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1, textTransform: 'uppercase' }}>
              BUILT FOR EVERY<br/><span className="text-accent">DOCUMENT</span>
            </h2>
            
            <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '80%', lineHeight: 1.6 }}>
              One AI system for all your critical documents.<br/>Analyze, extract, and understand at enterprise scale.
            </p>
          </div>

          <div className="doc-dash border-panel" style={{ padding: '2rem', borderColor: 'rgba(157, 255, 34, 0.3)', background: 'rgba(13, 18, 24, 0.8)', backdropFilter: 'blur(10px)' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
              <div>
                <div className="text-xs text-muted" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div className="status-dot online"></div> AI ENGINE STATUS
                </div>
                <div className="text-2xl font-bold text-accent">ONLINE</div>
                <div className="text-xs text-muted">All systems operational</div>
              </div>
              <HeartbeatSparkline />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
              <div>
                <div className="text-xs text-muted" style={{ marginBottom: '4px' }}>MODEL</div>
                <div className="text-sm font-medium text-accent">QWEN2.5-7B</div>
              </div>
              <div>
                <div className="text-xs text-muted" style={{ marginBottom: '4px' }}>UPTIME</div>
                <div className="text-sm font-medium">99.98%</div>
              </div>
              <div>
                <div className="text-xs text-muted" style={{ marginBottom: '4px' }}>RESPONSE TIME</div>
                <div className="text-sm font-medium text-accent">2.34s</div>
              </div>
            </div>
          </div>

        </div>

        {/* CIRCUIT GRID LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', marginBottom: '4rem' }}>
          
          {/* Top Row: 3 Cards */}
          {gridCards.map((card) => (
            <div key={card.id} className="doc-grid-card border-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', background: 'rgba(13, 18, 24, 0.7)', backdropFilter: 'blur(10px)' }}>
              <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div className="border-card text-xs mono" style={{ padding: '4px 8px', background: 'rgba(157, 255, 34, 0.05)', color: 'var(--accent-green)', borderColor: 'rgba(157, 255, 34, 0.2)' }}>{card.id}</div>
                <div className="flex-center" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(157, 255, 34, 0.3)', background: 'rgba(157, 255, 34, 0.05)' }}>
                  <card.icon size={20} className="text-accent" />
                </div>
              </div>
              
              <h4 style={{ fontSize: '1rem', letterSpacing: '1px', marginBottom: '1.5rem' }}>{card.title}</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', flex: 1 }}>
                <div className="text-sm text-muted" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={14}/> {card.doc}</div>
                <div className="text-sm text-muted" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={14}/> {card.detail}</div>
              </div>

              <div className="text-sm font-medium text-accent" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <CheckCircle size={16} /> {card.check}
              </div>
            </div>
          ))}

          {/* Bottom Row: Left Card */}
          <div className="doc-grid-card border-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', background: 'rgba(13, 18, 24, 0.7)', backdropFilter: 'blur(10px)' }}>
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
              <div className="border-card text-xs mono" style={{ padding: '4px 8px', background: 'rgba(157, 255, 34, 0.05)', color: 'var(--accent-green)', borderColor: 'rgba(157, 255, 34, 0.2)' }}>04</div>
              <div className="flex-center" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(157, 255, 34, 0.3)', background: 'rgba(157, 255, 34, 0.05)' }}>
                <Search size={20} className="text-accent" />
              </div>
            </div>
            <h4 style={{ fontSize: '1rem', letterSpacing: '1px', marginBottom: '1.5rem' }}>RESEARCH INSIGHTS</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', flex: 1 }}>
              <div className="text-sm text-muted" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={14}/> AI_Paper.pdf</div>
              <div className="text-sm text-muted" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={14}/> Novel methodology section</div>
            </div>
            <div className="text-sm font-medium text-accent" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <CheckCircle size={16} /> Correlated with dataset C
            </div>
          </div>

          {/* Bottom Row: Central Hub */}
          <div className="doc-grid-card" style={{ height: '300px' }}>
            <CentralHub />
          </div>

          {/* Bottom Row: Right Features List */}
          <div className="doc-grid-card border-panel" style={{ padding: '2rem', background: 'rgba(13, 18, 24, 0.8)', backdropFilter: 'blur(10px)', borderColor: 'rgba(157, 255, 34, 0.2)' }}>
            <div className="text-xs font-medium text-accent" style={{ letterSpacing: '1px', marginBottom: '1.5rem' }}>POWERED BY ADVANCED AI</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { i: FileText, t: 'Multi-format understanding' },
                { i: BrainCircuit, t: 'Deep semantic analysis' },
                { i: ShieldCheck, t: 'Enterprise-grade accuracy' },
                { i: RotateCw, t: 'Continuous learning' }
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <f.i size={18} className="text-accent" />
                  <span className="text-sm text-muted">{f.t}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM FEATURES FOOTER */}
        <div className="border-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', padding: '2rem', background: 'rgba(13, 18, 24, 0.8)', backdropFilter: 'blur(10px)' }}>
          {[
            { t: 'SECURE & PRIVATE', s: 'Enterprise-grade encryption and data protection.', icon: ShieldCheck },
            { t: 'LIGHTNING FAST', s: 'Real-time processing with optimized AI models.', icon: Zap },
            { t: 'HIGHLY ACCURATE', s: 'Advanced models ensure maximum precision.', icon: Target },
            { t: 'CONTINUOUSLY SMART', s: 'AI that learns, adapts, and improves every day.', icon: BrainCircuit }
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
