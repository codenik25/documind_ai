import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lightbulb, Target, PieChart, GraduationCap, Lock, Server, ShieldCheck, Zap, BrainCircuit, RotateCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- SUB-COMPONENTS --- //

const IsometricBrain = () => {
  return (
    <div className="isometric-container" style={{ position: 'relative', width: '300px', height: '200px', perspective: '1000px', transformStyle: 'preserve-3d' }}>
      <div className="iso-layer" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transform: 'rotateX(60deg) rotateZ(-45deg)', transformStyle: 'preserve-3d' }}>
        
        {/* Orbiting Particles */}
        <div className="orbit-ring" style={{ position: 'absolute', top: '-50px', left: '-50px', width: '400px', height: '400px', border: '1px dashed rgba(157, 255, 34, 0.2)', borderRadius: '50%', transform: 'translateZ(-20px)' }}></div>
        
        {/* Glass Layers */}
        <div className="glass-plane plane-1" style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', background: 'rgba(157, 255, 34, 0.05)', border: '1px solid rgba(157, 255, 34, 0.3)', transform: 'translateZ(0px)', boxShadow: '0 0 20px rgba(157, 255, 34, 0.1)' }}></div>
        <div className="glass-plane plane-2" style={{ position: 'absolute', top: '15%', left: '15%', width: '70%', height: '70%', background: 'rgba(157, 255, 34, 0.1)', border: '1px solid rgba(157, 255, 34, 0.4)', transform: 'translateZ(20px)', boxShadow: '0 0 30px rgba(157, 255, 34, 0.2)' }}></div>
        <div className="glass-plane plane-3" style={{ position: 'absolute', top: '20%', left: '20%', width: '60%', height: '60%', background: 'rgba(157, 255, 34, 0.15)', border: '1px solid rgba(157, 255, 34, 0.5)', transform: 'translateZ(40px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Neon Brain Core */}
          <div className="iso-brain" style={{ transform: 'rotateZ(45deg) rotateX(-60deg) translateY(-20px) scale(1.5)', color: 'var(--accent-green)', filter: 'drop-shadow(0 0 15px var(--accent-green))' }}>
            <BrainCircuit size={48} strokeWidth={1.5} />
          </div>
        
        </div>
      </div>
    </div>
  );
};

const Sparkline = ({ color = 'var(--accent-green)', data = [2, 5, 3, 7, 4, 8, 6, 9], isBar = false }) => {
  const pathData = data.map((val, i) => `${i === 0 ? 'M' : 'L'} ${i * (80 / (data.length - 1))} ${30 - val * 2.5}`).join(' ');

  return (
    <div style={{ width: '80px', height: '30px' }}>
      {isBar ? (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '100%' }}>
          {data.slice(0, 4).map((h, i) => (
            <div key={i} className="chart-bar" style={{ width: '12px', height: `${h * 3}px`, background: color, opacity: 0.3 + (h * 0.05) }}></div>
          ))}
        </div>
      ) : (
        <svg width="80" height="30" viewBox="0 0 80 30">
          <path className="spark-path" d={pathData} fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
};

// --- MAIN COMPONENT --- //

export default function IntelligenceScale() {
  const sectionRef = useRef(null);

  const gridCards = [
    { id: '02', icon: Shield, title: 'Risk Detection', desc: 'Automatically identifies risks, anomalies, and inconsistencies with advanced pattern recognition.', metricLabel: 'RISK LEVEL', metricVal: 'Low', sparkData: [4,3,2,1,2,1,1,1] },
    { id: '03', icon: Lightbulb, title: 'Smart Suggestions', desc: 'Provides actionable suggestions and recommendations to improve document quality and clarity.', metricLabel: 'SUGGESTION RATE', metricVal: '94.7%', sparkData: [5,6,5,7,8,7,9,9] },
    { id: '04', icon: Target, title: 'Semantic Retrieval', desc: 'Fetch relevant context and documents across large databases using semantic search.', metricLabel: 'RETRIEVAL TIME', metricVal: '120ms', sparkData: [6,9,4,7], isBar: true },
    { id: '05', icon: PieChart, title: 'Confidence Scoring', desc: 'Scores every output with confidence metrics for transparency and trustworthiness.', metricLabel: 'CONFIDENCE', metricVal: 'High', sparkData: [8,8,9,8,9,9,10,10] },
    { id: '06', icon: GraduationCap, title: 'Continuous Learning', desc: 'Continuously learns from feedback and interactions to improve accuracy over time.', metricLabel: 'LEARNING RATE', metricVal: '+2.3%', sparkData: [2,3,4,5,4,6,7,8] },
    { id: '07', icon: Lock, title: 'Enterprise Security', desc: 'Built with enterprise-grade security, privacy, and compliance by design.', metricLabel: 'SECURITY LEVEL', metricVal: 'Enterprise', isLock: true }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
      }
    });

    // 1. Header fade in
    tl.fromTo('.scale-header > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 });

    // 2. Isometric Brain Float
    gsap.to('.isometric-container', { y: -15, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.iso-layer', { rotationZ: '-35deg', duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.orbit-ring', { rotationZ: 360, duration: 15, repeat: -1, ease: 'linear' });

    // 3. Bento Box Stagger Reveal
    tl.fromTo('.bento-hero', 
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      "-=0.2"
    );

    tl.fromTo('.bento-item',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
      "-=0.4"
    );

    // 4. Sparkline Drawing
    tl.fromTo('.spark-path', 
      { strokeDasharray: 100, strokeDashoffset: 100 },
      { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out', stagger: 0.1 },
      "-=0.2"
    );

    // 5. Hero Card Energy Wave Continuous
    gsap.to('.energy-wave', {
      backgroundPosition: '200% center',
      duration: 5,
      ease: 'linear',
      repeat: -1
    });

  }, []);

  return (
    <section id="scale" ref={sectionRef} style={{ padding: '8rem 4rem', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* HEADER AREA */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
          
          <div className="scale-header">
            <div className="flex-center" style={{ gap: '8px', marginBottom: '1.5rem', display: 'inline-flex' }}>
              <div className="status-dot online"></div>
              <span className="text-xs font-medium" style={{ letterSpacing: '1px', color: 'var(--accent-green)' }}>AI POWERED INTELLIGENCE</span>
            </div>
            
            <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Intelligence <br/>at <span style={{ color: 'var(--accent-green)' }}>Scale</span>
            </h2>
            
            <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '90%', lineHeight: 1.6 }}>
              DocuMind AI combines advanced AI models with enterprise-grade infrastructure to deliver accurate, reliable, and intelligent document processing at unprecedented scale.
            </p>

            <div className="border-card flex-between" style={{ padding: '1rem 1.5rem', display: 'inline-flex', gap: '2.5rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Server size={14} className="text-muted" /> <span className="text-xs text-muted">SYSTEM STATUS</span>
                </div>
                <div className="text-sm font-medium text-accent" style={{ letterSpacing: '0.5px' }}>OPERATIONAL</div>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'var(--border-color)' }}></div>
              <div>
                <div className="text-xs text-muted" style={{ marginBottom: '4px' }}>AI MODEL</div>
                <div className="text-sm font-medium text-accent">QWEN2.5-7B-INSTRUCT</div>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'var(--border-color)' }}></div>
              <div>
                <div className="text-xs text-muted" style={{ marginBottom: '4px' }}>UPTIME</div>
                <div className="text-sm font-medium text-accent">99.98%</div>
              </div>
              <div style={{ width: '1px', height: '30px', background: 'var(--border-color)' }}></div>
              <div>
                <div className="text-xs text-muted" style={{ marginBottom: '4px' }}>RESPONSE</div>
                <div className="text-sm font-medium text-accent">2.34s</div>
              </div>
            </div>
          </div>

          {/* ISOMETRIC VISUALIZER */}
          <div className="scale-header flex-center" style={{ height: '100%' }}>
            <IsometricBrain />
          </div>

        </div>

        {/* ASYMMETRICAL BENTO GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginBottom: '2rem' }}>
          
          {/* HERO CARD (LEFT) */}
          <div className="bento-hero border-panel" style={{ 
            position: 'relative', 
            padding: '2.5rem', 
            display: 'flex', 
            flexDirection: 'column',
            borderColor: 'rgba(157, 255, 34, 0.3)',
            boxShadow: '0 0 40px rgba(157, 255, 34, 0.05)',
            overflow: 'hidden'
          }}>
            <div className="mono text-muted text-xs" style={{ marginBottom: '2rem' }}>01</div>
            
            <div className="flex-center border-card" style={{ width: '64px', height: '64px', marginBottom: '1.5rem', borderColor: 'var(--accent-green)', background: 'rgba(157, 255, 34, 0.05)' }}>
              <BrainCircuit size={32} className="text-accent" />
            </div>
            
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>AI Decision Engine</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '4rem' }}>
              Instantly analyzes, interprets, and generates intelligent decisions based on deep context understanding and business logic.
            </p>

            <div style={{ marginBottom: 'auto', position: 'relative', zIndex: 10 }}>
              <div className="text-xs text-muted" style={{ marginBottom: '8px' }}>ENGINE STATUS</div>
              <div className="flex-center" style={{ gap: '8px', justifyContent: 'flex-start' }}>
                <div className="status-dot online"></div>
                <span className="text-accent font-medium tracking-wide">ACTIVE</span>
              </div>
            </div>

            {/* Glowing Energy Wave FX */}
            <div className="energy-wave" style={{
              position: 'absolute',
              bottom: '25%',
              left: '-20%',
              width: '140%',
              height: '100px',
              background: 'radial-gradient(ellipse at center, rgba(157, 255, 34, 0.15) 0%, transparent 70%)',
              borderTop: '1px solid rgba(157, 255, 34, 0.3)',
              borderRadius: '50%',
              transform: 'rotate(-10deg)',
              pointerEvents: 'none'
            }}></div>

            {/* Bottom Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '3rem', position: 'relative', zIndex: 10 }}>
              <div>
                <div className="text-xs text-muted" style={{ marginBottom: '4px' }}>ACCURACY</div>
                <div className="text-lg font-medium text-accent">96.4%</div>
              </div>
              <div>
                <div className="text-xs text-muted" style={{ marginBottom: '4px' }}>CONFIDENCE</div>
                <div className="text-lg font-medium text-accent">High</div>
              </div>
              <div>
                <div className="text-xs text-muted" style={{ marginBottom: '4px' }}>THROUGHPUT</div>
                <div className="text-lg font-medium text-accent">120+</div>
                <div className="text-xs text-muted">docs/min</div>
              </div>
            </div>
          </div>

          {/* RIGHT GRID CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {gridCards.map((card) => (
              <div key={card.id} className="bento-item border-card" style={{ 
                padding: '1.5rem', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(157, 255, 34, 0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
              >
                <div className="mono text-muted text-xs" style={{ marginBottom: '1rem' }}>{card.id}</div>
                
                <div className="flex-center" style={{ 
                  width: '48px', height: '48px', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(157, 255, 34, 0.2)', 
                  background: 'rgba(157, 255, 34, 0.02)',
                  marginBottom: '1.5rem'
                }}>
                  <card.icon size={20} className="text-accent" />
                </div>
                
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{card.title}</h4>
                <p className="text-muted text-sm" style={{ marginBottom: '2rem', flex: 1 }}>{card.desc}</p>
                
                <div className="flex-between align-end">
                  <div>
                    <div className="text-xs text-muted" style={{ marginBottom: '4px', textTransform: 'uppercase' }}>{card.metricLabel}</div>
                    <div className="text-md font-medium text-accent">{card.metricVal}</div>
                  </div>
                  {card.sparkData && <Sparkline data={card.sparkData} isBar={card.isBar} />}
                  {card.isLock && <Lock size={20} className="text-accent" opacity={0.5} />}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* BOTTOM FEATURES FOOTER */}
        <div className="border-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', padding: '2rem' }}>
          {[
            { t: 'Secure & Private', s: 'Your data is encrypted and never leaves your environment.', icon: ShieldCheck },
            { t: 'Lightning Fast', s: 'Optimized for speed with real-time processing.', icon: Zap },
            { t: 'Highly Accurate', s: 'Advanced AI models ensure maximum accuracy.', icon: Target },
            { t: 'Always Improving', s: 'AI that learns, adapts, and gets smarter every day.', icon: RotateCw }
          ].map((feat, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div className="flex-center" style={{ width: '32px', height: '32px', border: '1px solid rgba(157,255,34,0.2)', borderRadius: '8px' }}>
                <feat.icon size={16} className="text-accent" />
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
