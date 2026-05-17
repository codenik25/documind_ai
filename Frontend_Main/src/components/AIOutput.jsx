import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function AIOutput() {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      }
    });

    tl.fromTo('.terminal-panel', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .to('.type-1', { text: "[TARGET] vendor_agreement.pdf", duration: 0.8, ease: 'none' })
      .to('.type-2', { text: "[STATUS] ANALYZING...", duration: 0.5, ease: 'none' })
      .to('.type-3', { text: "[RISK_DETECTED]", duration: 0.3, ease: 'none' })
      .to('.type-4', { text: ">> Missing liability cap\n>> Ambiguous termination clause", duration: 1, ease: 'none' })
      .to('.type-5', { text: "[SUGGESTION]", duration: 0.3, ease: 'none' })
      .to('.type-6', { text: ">> Add standard indemnification\n>> Specify 30-day notice period", duration: 1, ease: 'none' })
      .to('.type-7', { text: "[DECISION] IMPROVE (CONFIDENCE: 87.4%)", duration: 0.8, ease: 'none' });

  }, []);

  return (
    <section ref={containerRef} className="section-padding">
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="terminal-panel glass-panel" style={{
          width: '100%',
          maxWidth: '800px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--glass-border)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Terminal Header */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)' }}>
            <div className="mono" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>documind_engine_v2.0</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></div>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="mono" style={{ padding: '3rem 2.5rem', color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.8, position: 'relative' }}>
            
            <div style={{ display: 'flex', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <span>&gt;</span>
              <div className="type-1"></div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', color: 'var(--text-tertiary)' }}>
              <span>&gt;</span>
              <div className="type-2"></div>
            </div>
            
            <div style={{ marginTop: '2rem', color: '#ff4545' }} className="type-3"></div>
            <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }} className="type-4"></div>
            
            <div style={{ marginTop: '2rem', color: 'var(--accent-blue)' }} className="type-5"></div>
            <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }} className="type-6"></div>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2.5rem', color: 'var(--accent-lime)' }}>
              <span>&gt;</span>
              <div className="type-7"></div>
              <span className="cursor" style={{ animation: 'blink 1s infinite' }}>_</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
