import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, ShieldCheck, FileText, Trophy, Quote, Star, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- SUB-COMPONENTS --- //

const UserNodeVisualizer = () => {
  return (
    <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Orbit paths */}
      <svg width="200" height="200" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.2 }}>
        <circle cx="100" cy="100" r="80" fill="none" stroke="var(--accent-green)" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--accent-green)" strokeWidth="1" transform="rotate(45 100 100)" />
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--accent-green)" strokeWidth="1" transform="rotate(-45 100 100)" />
      </svg>
      
      {/* Particles */}
      <div className="orbit-particle p1" style={{ position: 'absolute', width: '6px', height: '6px', background: 'var(--accent-green)', borderRadius: '50%', filter: 'drop-shadow(0 0 5px var(--accent-green))', top: '20px', left: '100px' }}></div>
      <div className="orbit-particle p2" style={{ position: 'absolute', width: '4px', height: '4px', background: 'var(--accent-green)', borderRadius: '50%', bottom: '40px', left: '40px' }}></div>
      <div className="orbit-particle p3" style={{ position: 'absolute', width: '5px', height: '5px', background: 'var(--accent-green)', borderRadius: '50%', top: '60px', right: '30px' }}></div>

      {/* Core Node */}
      <div className="review-core-pulse" style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(157,255,34,0.1)', border: '1px solid var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(157,255,34,0.2)' }}>
        <Users size={28} className="text-accent" />
      </div>

      <style>{`
        .review-core-pulse { animation: pulseCore 2s infinite alternate ease-in-out; }
        .orbit-particle.p1 { animation: orbit1 8s linear infinite; transform-origin: 0 80px; }
        .orbit-particle.p2 { animation: orbit2 12s linear infinite; transform-origin: 60px -60px; }
        .orbit-particle.p3 { animation: orbit3 10s linear infinite reverse; transform-origin: -70px 40px; }
        @keyframes pulseCore { 0% { transform: scale(1); box-shadow: 0 0 20px rgba(157,255,34,0.2); } 100% { transform: scale(1.1); box-shadow: 0 0 40px rgba(157,255,34,0.5); } }
        @keyframes orbit1 { 100% { transform: rotate(360deg); } }
        @keyframes orbit2 { 100% { transform: rotate(360deg); } }
        @keyframes orbit3 { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// --- MAIN COMPONENT --- //

export default function Reviews() {
  const sectionRef = useRef(null);

  const reviews = [
    {
      id: '01',
      text: "DocuMind AI completely transformed how our legal team reviews contracts. What took <span class='text-accent'>days now takes minutes</span> with confidence across the board.",
      name: "Sarah Chen",
      role: "General Counsel, TechCorp",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      badge: "8X FASTER REVIEW",
      icon: Activity
    },
    {
      id: '02',
      text: "The RAG pipeline visualization alone sold our CTO. We finally <span class='text-accent'>understand</span> how AI makes decisions about our sensitive documents.",
      name: "Marcus Johnson",
      role: "VP Engineering, DataFlow",
      avatar: "https://i.pravatar.cc/150?u=marcus",
      badge: "3X TRANSPARENCY INCREASE",
      icon: FileText
    },
    {
      id: '03',
      text: "We evaluated 12 document AI tools. DocuMind was the only one that provided <span class='text-accent'>risk detection AND actionable</span> suggestions in real-time.",
      name: "Priya Sharma",
      role: "Head of Operations, NexGen",
      avatar: "https://i.pravatar.cc/150?u=priya",
      badge: "12 TOOLS EVALUATED — #1 CHOICE",
      icon: Trophy
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      }
    });

    // Header Reveal
    tl.fromTo('.review-header > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 });

    // Node Visualizer float in
    tl.fromTo('.review-visualizer', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)' }, "-=0.4");

    // Cards Reveal
    tl.fromTo('.review-card', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' },
      "-=0.6"
    );

    // Footer Reveal
    tl.fromTo('.review-footer', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      "-=0.4"
    );

  }, []);

  return (
    <section id="reviews" ref={sectionRef} style={{ padding: '8rem 4rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* HEADER */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div className="review-header">
            <div className="badge badge-outline text-accent" style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: '30px', marginBottom: '1rem', alignItems: 'center', gap: '8px' }}>
              <Users size={14} /> TRUSTED BY TEAMS
            </div>
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1, marginBottom: '1rem', textTransform: 'uppercase' }}>
              CUSTOMER<br/><span className="text-accent">REVIEWS</span>
            </h2>
            <div className="text-sm" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
              <ShieldCheck size={16} className="text-accent" /> Real results. Real impact. Real trust.
            </div>
          </div>
          
          <div className="review-visualizer" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '2rem' }}>
            <p className="text-muted" style={{ maxWidth: '300px', fontSize: '0.95rem', lineHeight: 1.6 }}>
              DocuMind AI is trusted by legal, finance, research, and operations teams to deliver accurate insights from complex documents.
            </p>
            <UserNodeVisualizer />
          </div>
        </div>

        {/* 3-COLUMN TESTIMONIAL GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
          {reviews.map((review, i) => (
            <div key={i} className="review-card border-panel" style={{ 
              padding: '2.5rem', 
              display: 'flex', 
              flexDirection: 'column',
              background: 'rgba(13, 18, 24, 0.6)',
              backdropFilter: 'blur(10px)',
              borderColor: 'rgba(157,255,34,0.2)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.4s ease, border-color 0.4s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = 'rgba(157,255,34,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(157,255,34,0.2)'; }}
            >
              {/* Giant background number */}
              <div className="mono font-bold" style={{ position: 'absolute', bottom: '-10px', right: '10px', fontSize: '8rem', color: 'rgba(255,255,255,0.02)', pointerEvents: 'none', lineHeight: 1 }}>
                {review.id}
              </div>

              <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <Quote size={24} className="text-accent" />
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={14} className="text-accent" fill="var(--accent-green)" />)}
                </div>
              </div>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-primary)', marginBottom: '3rem', flex: 1 }} dangerouslySetInnerHTML={{ __html: review.text }}></p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <img src={review.avatar} alt={review.name} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid rgba(157,255,34,0.3)' }} />
                <div>
                  <h4 style={{ fontSize: '1rem', margin: 0 }}>{review.name}</h4>
                  <div className="text-xs text-muted">{review.role}</div>
                </div>
              </div>

              <div className="border-card text-xs font-medium text-accent" style={{ padding: '8px 12px', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(157,255,34,0.05)', borderColor: 'rgba(157,255,34,0.2)', alignSelf: 'flex-start' }}>
                <review.icon size={14} /> {review.badge}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER STATS */}
        <div className="review-footer border-panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', padding: '3rem', background: 'rgba(13, 18, 24, 0.8)', backdropFilter: 'blur(10px)' }}>
          {[
            { v: '500+', l: 'Teams Trusted', i: Users },
            { v: '99.9%', l: 'Data Security', i: ShieldCheck },
            { v: '10M+', l: 'Documents Analyzed', i: FileText },
            { v: '#1', l: 'AI Document Intelligence', i: Trophy }
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div className="flex-center" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(157,255,34,0.05)', border: '1px solid rgba(157,255,34,0.2)' }}>
                <stat.i size={28} className="text-accent" />
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', lineHeight: 1.2 }}>{stat.v}</div>
                <div className="text-sm text-muted">{stat.l}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
