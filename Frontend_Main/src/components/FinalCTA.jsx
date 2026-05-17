import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo('.cta-content', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
    );
  }, []);

  return (
    <section ref={containerRef} className="section-padding" style={{ position: 'relative', overflow: 'hidden', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Subtle Background Grid */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        opacity: 0.5,
        zIndex: 0
      }}></div>

      <div className="container cta-content" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div className="mono text-lime" style={{ fontSize: '0.85rem', marginBottom: '2rem' }}>[SYSTEM_READY]</div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '3rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          Initialize Your <br/>
          <span style={{ color: 'var(--text-secondary)' }}>Intelligence Engine.</span>
        </h2>
        
        <button className="glow-button" style={{ fontSize: '1rem', padding: '1.25rem 3rem', borderRadius: '4px', letterSpacing: '0.02em' }}>
          Deploy Now
        </button>
      </div>

    </section>
  );
}
