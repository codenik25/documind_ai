import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Comparison() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo('.comp-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="section-padding">
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '5rem', fontWeight: 500 }}>
          The Intelligence <span style={{ color: 'var(--text-secondary)' }}>Difference</span>
        </h2>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Traditional Chatbot */}
          <div className="comp-card glass-panel" style={{ flex: '1 1 400px', padding: '3.5rem 3rem', background: 'rgba(255,255,255,0.01)' }}>
            <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '1rem' }}>[LEGACY_SYSTEM]</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', color: 'var(--text-secondary)', fontWeight: 400 }}>Standard PDF Chatbot</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {["Answers surface-level questions", "Provides basic summaries", "Static, unverified responses", "No deterministic confidence metrics"].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: 'var(--text-secondary)' }}>
                  <X size={20} color="var(--text-tertiary)" style={{ marginTop: '2px' }} />
                  <span style={{ fontSize: '1rem', fontWeight: 300 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* DocuMind AI */}
          <div className="comp-card glass-panel" style={{ 
            flex: '1 1 400px', 
            padding: '3.5rem 3rem', 
            background: 'var(--bg-secondary)',
            border: '1px solid rgba(200, 255, 69, 0.15)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)'
          }}>
            <div className="mono text-lime" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>[NEXT_GEN_ARCHITECTURE]</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>DocuMind AI</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {["Generates deterministic decisions", "Detects structural & legal risks automatically", "Provides actionable optimization suggestions", "Includes vector-based confidence scoring"].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: 'var(--text-primary)' }}>
                  <Check size={20} color="var(--accent-lime)" strokeWidth={2} style={{ marginTop: '2px' }} />
                  <span style={{ fontSize: '1rem', fontWeight: 300 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
