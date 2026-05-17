import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UploadCloud, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveDemo() {
  const containerRef = useRef(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.demo-step-1', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo('.scan-line', { top: '0%' }, { top: '100%', duration: 1.5, ease: 'linear', repeat: 1, yoyo: true })
      .fromTo('.demo-risk-card', { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.5 })
      .to({ val: 0 }, {
        val: 94.2,
        duration: 1.5,
        onUpdate: function() {
          setScore(this.targets()[0].val.toFixed(1));
        }
      })
      .fromTo('.demo-recommendation', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });

  }, []);

  return (
    <section ref={containerRef} className="section-padding" style={{ position: 'relative', zIndex: 2 }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '4rem', fontWeight: 500 }}>
          Live <span className="text-lime">Intelligence</span> Pipeline
        </h2>
        
        <div className="glass-panel" style={{ 
          padding: '4rem 3rem', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2.5rem', 
          maxWidth: '800px', 
          margin: '0 auto', 
          position: 'relative', 
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
          border: '1px solid rgba(255,255,255,0.02)'
        }}>
          
          {/* Step 1: Upload */}
          <div className="demo-step-1 flex-center" style={{ gap: '1rem', padding: '1.5rem', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
            <UploadCloud size={24} color="var(--accent-lime)" strokeWidth={1.5} />
            <div className="mono" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>[INGESTING: vendor_contract_v2.pdf]</div>
          </div>

          {/* AI Processing Area */}
          <div style={{ display: 'flex', gap: '2rem', position: 'relative' }}>
            {/* Scan Line effect */}
            <div className="scan-line" style={{ position: 'absolute', left: 0, width: '100%', height: '1px', background: 'var(--accent-lime)', boxShadow: '0 0 10px var(--accent-lime)', zIndex: 10, opacity: 0.3 }}></div>
            
            {/* Left: Risks & Suggestions */}
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="demo-risk-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', borderLeft: '1px solid #ff4545' }}>
                <div className="mono" style={{ color: '#ff4545', marginBottom: '0.5rem', fontSize: '0.8rem' }}>[RISK_IDENTIFIED]</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 300 }}>Budget estimation is missing a contingency plan.</div>
              </div>
              <div className="demo-risk-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', borderLeft: '1px solid var(--accent-blue)' }}>
                <div className="mono text-blue" style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}>[OPTIMIZATION_SUGGESTED]</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 300 }}>Add an explicit timeline for Phase 2 deliverables.</div>
              </div>
            </div>

            {/* Right: Score */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '1rem' }}>[CONFIDENCE_METRIC]</div>
                <div className="mono text-lime" style={{ fontSize: '3rem', lineHeight: 1 }}>{score}%</div>
              </div>
            </div>
          </div>

          {/* Final Recommendation */}
          <div className="demo-recommendation" style={{ 
            background: 'rgba(200, 255, 69, 0.05)', 
            padding: '1.5rem', 
            borderRadius: '6px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '1rem',
            border: '1px solid rgba(200, 255, 69, 0.2)'
          }}>
            <Check color="var(--accent-lime)" size={24} strokeWidth={1.5} />
            <h3 className="mono" style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 400 }}>[DECISION: APPROVED_WITH_MODIFICATIONS]</h3>
          </div>

        </div>
      </div>
    </section>
  );
}
