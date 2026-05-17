import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, FileSignature, GraduationCap, Building, FileSpreadsheet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  { icon: FileSignature, title: "Contract Review", desc: "Instantly detect missing liability clauses or unfavorable terms before signing." },
  { icon: Briefcase, title: "Business Proposals", desc: "Evaluate vendor proposals against strict internal compliance metrics." },
  { icon: GraduationCap, title: "Research Papers", desc: "Extract core methodologies and detect weak conclusions rapidly." },
  { icon: Building, title: "Resume Analysis", desc: "Screen technical resumes for specific required skill intersections." },
  { icon: FileSpreadsheet, title: "Report Validation", desc: "Cross-check financial reports for consistency and missing data points." }
];

export default function UseCases() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(itemsRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
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
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="mono text-lime" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>[APPLIED_INTELLIGENCE]</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--text-primary)' }}>
            Domain-Specific Applications
          </h2>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          {useCases.map((uc, i) => (
            <div key={i} ref={el => itemsRef.current[i] = el} className="glass-panel" style={{ 
              flex: '1 1 300px', 
              padding: '3rem 2.5rem', 
              maxWidth: '380px',
              transition: 'background 0.3s ease, transform 0.3s ease',
              background: 'rgba(255,255,255,0.015)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.015)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div className="uc-icon" style={{ marginBottom: '2rem' }}>
                <uc.icon size={28} color="var(--text-tertiary)" strokeWidth={1.5} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 500 }}>{uc.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 300 }}>{uc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
