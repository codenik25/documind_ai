import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { quote: "DocuMind transformed how we review technical proposals. It acts as an independent auditor in seconds.", author: "NIKUNJ RATHI", title: "B.TECH CSE · JECRC UNIVERSITY" },
  { quote: "It’s not just a chatbot. The deterministic confidence scores alone have saved us from approving three faulty vendor agreements this month.", author: "ALEX CHEN", title: "LEAD ANALYST · FINTECH CORP" }
];

export default function SocialProof() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo('.testimonial', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
    );
  }, []);

  return (
    <section ref={containerRef} className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="mono text-lime" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>[USER_TELEMETRY]</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-secondary)' }}>Verified Intelligence Reports</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial glass-panel" style={{ 
              padding: '3rem',
              position: 'relative',
              background: 'rgba(255,255,255,0.015)'
            }}>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontStyle: 'normal', marginBottom: '2.5rem', lineHeight: 1.6, fontWeight: 300 }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '1px', background: 'var(--accent-lime)' }}></div>
                <div>
                  <div className="mono" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{t.author}</div>
                  <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>[{t.title}]</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
