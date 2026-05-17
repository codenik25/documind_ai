import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Lock, BrainCircuit, Zap, ShieldCheck } from 'lucide-react';

export default function HeroFeatures() {
  useEffect(() => {
    gsap.fromTo('.hero-feature-item',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out', delay: 0.8 }
    );
  }, []);

  const features = [
    { icon: Lock, title: "Privacy First", desc: "Your data never leaves your device." },
    { icon: BrainCircuit, title: "Advanced RAG", desc: "Retrieval-Augmented Generation for accurate insights." },
    { icon: Zap, title: "Real-time Analysis", desc: "Get results in seconds, not minutes." },
    { icon: ShieldCheck, title: "Enterprise Ready", desc: "Built for security, compliance, and scale." }
  ];

  return (
    <section id="features" style={{ 
      borderTop: '1px solid rgba(255,255,255,0.05)', 
      padding: '3rem 4rem', 
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ 
        maxWidth: '1600px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '2rem' 
      }}>
        {features.map((feature, idx) => (
          <div key={idx} className="hero-feature-item" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px' }}>
              <feature.icon size={32} className="text-accent" strokeWidth={1.5} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '6px', color: 'var(--text-primary)' }}>{feature.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0, maxWidth: '90%' }}>
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
