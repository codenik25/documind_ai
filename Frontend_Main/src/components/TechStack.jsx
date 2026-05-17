import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Database, BrainCircuit, Bot, Code, MonitorPlay, Box, Layers, ShieldCheck, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- SUB-COMPONENTS --- //

const IsometricCube = () => {
  return (
    <div style={{ position: 'relative', width: '250px', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Orbit Rings (Floor) */}
      <div style={{ position: 'absolute', bottom: '20px', width: '200px', height: '60px', border: '1px dashed rgba(157,255,34,0.3)', borderRadius: '50%', transform: 'rotateX(70deg)' }}></div>
      <div style={{ position: 'absolute', bottom: '30px', width: '140px', height: '40px', border: '2px solid rgba(157,255,34,0.1)', borderRadius: '50%', transform: 'rotateX(70deg)' }}></div>
      <div style={{ position: 'absolute', bottom: '40px', width: '80px', height: '20px', background: 'radial-gradient(ellipse, rgba(157,255,34,0.3) 0%, transparent 70%)', transform: 'rotateX(70deg)' }}></div>

      {/* Isometric Cube Engine */}
      <div className="iso-cube-container" style={{ position: 'relative', width: '80px', height: '80px', transformStyle: 'preserve-3d', transform: 'rotateX(-20deg) rotateY(45deg)' }}>
        
        {/* Faces */}
        <div style={{ position: 'absolute', width: '80px', height: '80px', background: 'rgba(157,255,34,0.1)', border: '2px solid var(--accent-green)', transform: 'translateZ(40px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 20px rgba(157,255,34,0.2)' }}>
          <Box size={24} className="text-accent" />
        </div>
        <div style={{ position: 'absolute', width: '80px', height: '80px', background: 'rgba(157,255,34,0.05)', border: '2px solid var(--accent-green)', transform: 'rotateY(180deg) translateZ(40px)' }}></div>
        <div style={{ position: 'absolute', width: '80px', height: '80px', background: 'rgba(157,255,34,0.15)', border: '2px solid var(--accent-green)', transform: 'rotateY(90deg) translateZ(40px)' }}></div>
        <div style={{ position: 'absolute', width: '80px', height: '80px', background: 'rgba(157,255,34,0.02)', border: '2px solid var(--accent-green)', transform: 'rotateY(-90deg) translateZ(40px)' }}></div>
        <div style={{ position: 'absolute', width: '80px', height: '80px', background: 'rgba(157,255,34,0.2)', border: '2px solid var(--accent-green)', transform: 'rotateX(90deg) translateZ(40px)' }}></div>
        <div style={{ position: 'absolute', width: '80px', height: '80px', background: 'rgba(157,255,34,0.1)', border: '2px solid var(--accent-green)', transform: 'rotateX(-90deg) translateZ(40px)', boxShadow: '0 0 40px var(--accent-green)' }}></div>

      </div>

      <style>{`
        .iso-cube-container { animation: floatCube 4s ease-in-out infinite alternate; }
        @keyframes floatCube { 0% { transform: rotateX(-20deg) rotateY(45deg) translateY(10px); } 100% { transform: rotateX(-20deg) rotateY(45deg) translateY(-10px); } }
      `}</style>
    </div>
  );
};

// --- MAIN COMPONENT --- //

export default function TechStack() {
  const sectionRef = useRef(null);

  const stack = [
    { type: 'BACKEND', name: 'FastAPI', desc: 'High-performance Python backend', icon: Zap, color: '#3b82f6' },
    { type: 'AI', name: 'LangChain', desc: 'LLM orchestration framework', icon: BrainCircuit, color: '#10b981' },
    { type: 'AI', name: 'LM Studio', desc: 'Local AI inference engine', icon: Box, color: '#8b5cf6' },
    { type: 'FRAMEWORK', name: 'React', desc: 'Modern frontend framework', icon: Code, color: '#0ea5e9' },
    { type: 'UI', name: 'GSAP', desc: 'Performance-grade animations', icon: MonitorPlay, color: '#84cc16' },
    { type: 'DATABASE', name: 'ChromaDB', desc: 'Vector database for embeddings', icon: Layers, color: '#ec4899' }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      }
    });

    // Header Reveal
    tl.fromTo('.tech-header > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 });
    tl.fromTo('.tech-visualizer', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)' }, "-=0.4");

    // Grid Cards Reveal (Staggered Pop-in)
    tl.fromTo('.tech-card', 
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.2)' },
      "-=0.6"
    );

    // Footer Reveal
    tl.fromTo('.tech-footer', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      "-=0.2"
    );

  }, []);

  return (
    <section id="tech-stack" ref={sectionRef} style={{ padding: '8rem 4rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* HEADER */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div className="tech-header">
            <div className="badge badge-outline text-accent" style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: '30px', marginBottom: '1rem', alignItems: 'center', gap: '8px' }}>
              <Zap size={14} /> BUILT FOR SCALE
            </div>
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '1rem' }}>
              TECH <span className="text-accent">STACK</span>
            </h2>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>
              Built on battle-tested, enterprise-grade technologies.
            </p>
          </div>
          
          <div className="tech-visualizer" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IsometricCube />
          </div>
        </div>

        {/* 6-CARD BENTO GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
          {stack.map((item, i) => (
            <div key={i} className="tech-card border-card" style={{ 
              padding: '1.5rem', 
              display: 'flex', 
              flexDirection: 'column',
              background: 'rgba(13, 18, 24, 0.7)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'crosshair',
              transition: 'border-color 0.3s ease, transform 0.3s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {/* Colored top border accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: item.color, opacity: 0.5 }}></div>
              
              <div className="text-xs font-bold" style={{ color: item.color, marginBottom: '1rem', letterSpacing: '1px' }}>{item.type}</div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div className="flex-center" style={{ width: '40px', height: '40px', borderRadius: '8px', background: `${item.color}15`, border: `1px solid ${item.color}33` }}>
                  <item.icon size={20} color={item.color} />
                </div>
                <h4 style={{ fontSize: '1.25rem', margin: 0 }}>{item.name}</h4>
              </div>
              
              <p className="text-sm text-muted" style={{ flex: 1, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FOOTER BAR */}
        <div className="tech-footer border-card flex-between" style={{ padding: '2rem 3rem', background: 'rgba(13, 18, 24, 0.8)', backdropFilter: 'blur(10px)' }}>
          {[
            { icon: ShieldCheck, text: 'Secure by design' },
            { icon: Layers, text: 'Scalable architecture' },
            { icon: Box, text: 'Enterprise ready' },
            { icon: Rocket, text: 'Future proof' }
          ].map((item, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <item.icon size={20} className="text-accent" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
              {i < 3 && <div style={{ width: '4px', height: '4px', background: 'var(--accent-green)', borderRadius: '50%', opacity: 0.5 }}></div>}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}
