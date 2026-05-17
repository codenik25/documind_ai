import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UploadCloud, Cpu, ShieldAlert, Zap, Activity, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  { icon: UploadCloud, title: "Smart Ingestion", desc: "Instantly process multi-page documents with intelligent parsing." },
  { icon: Cpu, title: "Decision Engine", desc: "Automate approvals and rejections based on document context." },
  { icon: ShieldAlert, title: "Risk Detection", desc: "Identify missing clauses, financial risks, and anomalies." },
  { icon: Zap, title: "Optimization", desc: "Get actionable advice on how to improve document quality." },
  { icon: Activity, title: "Confidence Scoring", desc: "Rely on metric-driven confidence levels for every decision." },
  { icon: Search, title: "Semantic Retrieval", desc: "Find exactly what you need with vector-based semantic search." }
];

export default function Features() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(cardsRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="section-padding" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        <div style={{ marginBottom: '6rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="mono text-lime" style={{ fontSize: '0.85rem' }}>[CORE_CAPABILITIES]</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--text-primary)' }}>
            Engineered for <br/><span style={{ color: 'var(--text-secondary)' }}>complex document logic.</span>
          </h2>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          {featuresData.map((feature, idx) => (
            <div 
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className="glass-panel"
              style={{
                padding: '3rem 2.5rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.015)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
              }}
            >
              <div style={{ marginBottom: '2rem' }}>
                <feature.icon size={28} color="var(--accent-lime)" strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, fontWeight: 300, fontSize: '0.95rem' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
