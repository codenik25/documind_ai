import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Rocket, Calendar, ShieldCheck, FileText, Users, ArrowRight, Lock, Cloud } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- SUB-COMPONENTS --- //

const OrbitalEngine = () => {
  return (
    <div style={{ position: 'relative', width: '400px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* 3D Glowing Base Platform */}
      <div style={{ position: 'absolute', bottom: '60px', width: '280px', height: '80px', border: '2px solid rgba(157,255,34,0.3)', borderRadius: '50%', transform: 'rotateX(70deg)', boxShadow: '0 0 40px rgba(157,255,34,0.2), inset 0 0 20px rgba(157,255,34,0.1)' }}></div>
      <div style={{ position: 'absolute', bottom: '70px', width: '200px', height: '60px', border: '1px dashed rgba(157,255,34,0.4)', borderRadius: '50%', transform: 'rotateX(70deg)' }}></div>
      <div style={{ position: 'absolute', bottom: '80px', width: '120px', height: '40px', background: 'radial-gradient(ellipse, rgba(157,255,34,0.5) 0%, transparent 70%)', transform: 'rotateX(70deg)' }}></div>

      {/* Orbit Rings (Vertical/Angled) */}
      <div className="orbit-ring vertical-1" style={{ position: 'absolute', width: '320px', height: '320px', border: '1px solid rgba(157,255,34,0.1)', borderRadius: '50%', transform: 'rotateX(60deg) rotateY(30deg)' }}></div>
      <div className="orbit-ring vertical-2" style={{ position: 'absolute', width: '360px', height: '360px', border: '1px dashed rgba(157,255,34,0.2)', borderRadius: '50%', transform: 'rotateX(70deg) rotateY(-40deg)' }}></div>
      <div className="orbit-ring vertical-3" style={{ position: 'absolute', width: '380px', height: '380px', border: '1px solid rgba(157,255,34,0.05)', borderRadius: '50%', transform: 'rotateX(50deg) rotateY(10deg)' }}></div>

      {/* Central Core Document */}
      <div className="cta-core-doc" style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90px', height: '120px', border: '2px solid var(--accent-green)', borderRadius: '8px', background: 'rgba(13,18,24,0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 0 40px rgba(157,255,34,0.3)' }}>
        <FileText size={48} className="text-accent" strokeWidth={1} />
        {/* Decorative lines on doc */}
        <div style={{ position: 'absolute', top: '30px', left: '20px', right: '40px', height: '2px', background: 'var(--accent-green)', opacity: 0.5 }}></div>
        <div style={{ position: 'absolute', top: '45px', left: '20px', right: '20px', height: '2px', background: 'var(--accent-green)', opacity: 0.5 }}></div>
        <div style={{ position: 'absolute', top: '60px', left: '20px', right: '20px', height: '2px', background: 'var(--accent-green)', opacity: 0.5 }}></div>
        <div style={{ position: 'absolute', top: '75px', left: '20px', right: '50px', height: '2px', background: 'var(--accent-green)', opacity: 0.5 }}></div>
      </div>

      {/* Orbiting File Badges */}
      <div className="satellite-container" style={{ position: 'absolute', width: '400px', height: '400px', animation: 'spin-ccw 20s linear infinite' }}>
        <div className="satellite sat-1" style={{ position: 'absolute', top: '20px', left: '50%', marginLeft: '-30px', animation: 'spin-cw 20s linear infinite' }}>
          <div className="border-card text-xs mono font-bold" style={{ padding: '6px 12px', background: 'rgba(13,18,24,0.8)', borderColor: 'rgba(157,255,34,0.3)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}><div className="status-dot online"></div>PDF</div>
        </div>
        <div className="satellite sat-2" style={{ position: 'absolute', bottom: '60px', right: '20px', animation: 'spin-cw 20s linear infinite' }}>
          <div className="border-card text-xs mono font-bold" style={{ padding: '6px 12px', background: 'rgba(13,18,24,0.8)', borderColor: 'rgba(157,255,34,0.3)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}><div className="status-dot online"></div>PPTX</div>
        </div>
        <div className="satellite sat-3" style={{ position: 'absolute', top: '120px', right: '-10px', animation: 'spin-cw 20s linear infinite' }}>
          <div className="border-card text-xs mono font-bold" style={{ padding: '6px 12px', background: 'rgba(13,18,24,0.8)', borderColor: 'rgba(157,255,34,0.3)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}><div className="status-dot online"></div>XLSX</div>
        </div>
        <div className="satellite sat-4" style={{ position: 'absolute', bottom: '120px', left: '-10px', animation: 'spin-cw 20s linear infinite' }}>
          <div className="border-card text-xs mono font-bold" style={{ padding: '6px 12px', background: 'rgba(13,18,24,0.8)', borderColor: 'rgba(157,255,34,0.3)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}><div className="status-dot online"></div>TXT</div>
        </div>
        <div className="satellite sat-5" style={{ position: 'absolute', top: '40px', right: '60px', animation: 'spin-cw 20s linear infinite' }}>
          <div className="border-card text-xs mono font-bold" style={{ padding: '6px 12px', background: 'rgba(13,18,24,0.8)', borderColor: 'rgba(157,255,34,0.3)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}><div className="status-dot online"></div>DOCX</div>
        </div>
      </div>

      <style>{`
        .cta-core-doc { animation: floatCoreDoc 4s ease-in-out infinite alternate; }
        @keyframes floatCoreDoc { 0% { transform: translateY(10px); } 100% { transform: translateY(-10px); } }
        @keyframes spin-ccw { 100% { transform: rotate(-360deg); } }
        @keyframes spin-cw { 100% { transform: rotate(360deg); } }
        .orbit-ring.vertical-1 { animation: spin3D1 15s linear infinite; }
        .orbit-ring.vertical-2 { animation: spin3D2 20s linear infinite reverse; }
        @keyframes spin3D1 { 100% { transform: rotateX(60deg) rotateY(30deg) rotateZ(360deg); } }
        @keyframes spin3D2 { 100% { transform: rotateX(70deg) rotateY(-40deg) rotateZ(360deg); } }
      `}</style>
    </div>
  );
};

const WireframeBrain = () => {
  return (
    <div style={{ position: 'relative', width: '160px', height: '120px' }}>
      <svg width="100%" height="100%" viewBox="0 0 200 150">
        <defs>
          <filter id="brain-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <g stroke="rgba(157,255,34,0.4)" strokeWidth="1.5" fill="none" strokeLinejoin="round" filter="url(#brain-glow)">
          {/* Stylized geometric brain outline & inner network */}
          <path d="M100 20 C130 20, 160 40, 170 70 C180 100, 150 130, 120 130 C110 130, 100 120, 100 110 C100 120, 90 130, 80 130 C50 130, 20 100, 30 70 C40 40, 70 20, 100 20 Z" />
          <path d="M100 20 L100 110" />
          <path d="M60 40 L140 100" />
          <path d="M140 40 L60 100" />
          <path d="M35 60 L165 60" />
          <path d="M40 90 L160 90" />
          
          {/* Nodes */}
          <circle cx="100" cy="20" r="3" fill="var(--accent-green)" />
          <circle cx="100" cy="110" r="3" fill="var(--accent-green)" />
          <circle cx="60" cy="40" r="3" fill="var(--accent-green)" />
          <circle cx="140" cy="40" r="3" fill="var(--accent-green)" />
          <circle cx="60" cy="100" r="3" fill="var(--accent-green)" />
          <circle cx="140" cy="100" r="3" fill="var(--accent-green)" />
          <circle cx="170" cy="70" r="3" fill="var(--accent-green)" />
          <circle cx="30" cy="70" r="3" fill="var(--accent-green)" />
          <circle cx="100" cy="65" r="4" fill="var(--accent-green)" />
        </g>
      </svg>
      <style>{`
        svg { animation: pulseBrain 3s infinite alternate ease-in-out; }
        @keyframes pulseBrain { 0% { opacity: 0.6; filter: drop-shadow(0 0 5px rgba(157,255,34,0.2)); } 100% { opacity: 1; filter: drop-shadow(0 0 15px rgba(157,255,34,0.5)); } }
      `}</style>
    </div>
  );
}

// --- MAIN COMPONENT --- //

export default function CTA() {
  const sectionRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    // CTA Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      }
    });

    tl.fromTo('.cta-content > *', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
    );

    tl.fromTo('.cta-visualizer',
      { opacity: 0, scale: 0.8, rotateX: 20 },
      { opacity: 1, scale: 1, rotateX: 0, duration: 1.5, ease: 'power4.out' },
      "-=0.6"
    );
    
    tl.fromTo('.satellite',
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: 'back.out(1.5)' },
      "-=1"
    );

    // Footer Animation
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
        }
      }
    );

  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '8rem 4rem 4rem 4rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* CALL TO ACTION BLOCK */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '8rem' }}>
          
          {/* Left Content */}
          <div className="cta-content">
            <div className="badge badge-outline text-accent" style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: '30px', marginBottom: '1.5rem', alignItems: 'center', gap: '8px' }}>
              <Zap size={14} /> READY TO TRANSFORM
            </div>
            
            <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              TRANSFORM YOUR<br/><span className="text-accent">DOCUMENTS TODAY</span>
            </h2>
            
            <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '80%', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Join thousands of teams using DocuMind AI to turn document chaos into actionable intelligence.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
              <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Rocket size={18} /> LAUNCH DOCUMIND AI
              </button>
              <button className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={18} /> BOOK A DEMO
              </button>
            </div>

            {/* Feature Mini-list */}
            <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="flex-center border-card" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(157,255,34,0.05)', borderColor: 'rgba(157,255,34,0.2)' }}>
                  <ShieldCheck size={18} className="text-accent" />
                </div>
                <div>
                  <div className="text-sm font-bold">Enterprise Grade</div>
                  <div className="text-xs text-muted">Secure. Private. Compliant.</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="flex-center border-card" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(157,255,34,0.05)', borderColor: 'rgba(157,255,34,0.2)' }}>
                  <Zap size={18} className="text-accent" />
                </div>
                <div>
                  <div className="text-sm font-bold">Instant Intelligence</div>
                  <div className="text-xs text-muted">From chaos to clarity.</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="flex-center border-card" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(157,255,34,0.05)', borderColor: 'rgba(157,255,34,0.2)' }}>
                  <Users size={18} className="text-accent" />
                </div>
                <div>
                  <div className="text-sm font-bold">Trusted by Teams</div>
                  <div className="text-xs text-muted">Across industries.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visualizer */}
          <div className="cta-visualizer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <OrbitalEngine />
          </div>

        </div>

        {/* MEGA FOOTER */}
        <div ref={footerRef} className="border-card" style={{ padding: '4rem', background: 'rgba(13, 18, 24, 0.7)', backdropFilter: 'blur(20px)', borderRadius: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.5fr', gap: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3rem', marginBottom: '3rem' }}>
            
            {/* Column 1: Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="flex-center" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px dashed var(--accent-green)', background: 'rgba(157,255,34,0.05)' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>D</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', margin: 0, letterSpacing: '1px' }}>DOCUMIND AI</h3>
              </div>
              <p className="text-sm text-muted" style={{ lineHeight: 1.6, marginBottom: '2rem', maxWidth: '250px' }}>
                AI-powered document intelligence platform. Turning unstructured chaos into actionable decision data in real-time.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="border-card flex-center" style={{ padding: '8px 12px', gap: '8px', background: 'rgba(255,255,255,0.02)' }}>
                  <Lock size={14} className="text-accent" />
                  <div>
                    <div className="text-xs font-bold" style={{ fontSize: '10px' }}>SOC 2</div>
                    <div className="text-muted" style={{ fontSize: '9px' }}>Compliant</div>
                  </div>
                </div>
                <div className="border-card flex-center" style={{ padding: '8px 12px', gap: '8px', background: 'rgba(255,255,255,0.02)' }}>
                  <ShieldCheck size={14} className="text-accent" />
                  <div>
                    <div className="text-xs font-bold" style={{ fontSize: '10px' }}>GDPR</div>
                    <div className="text-muted" style={{ fontSize: '9px' }}>Ready</div>
                  </div>
                </div>
                <div className="border-card flex-center" style={{ padding: '8px 12px', gap: '8px', background: 'rgba(255,255,255,0.02)' }}>
                  <Cloud size={14} className="text-accent" />
                  <div>
                    <div className="text-xs font-bold" style={{ fontSize: '10px' }}>100%</div>
                    <div className="text-muted" style={{ fontSize: '9px' }}>Secure</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Product */}
            <div>
              <h5 className="text-accent" style={{ fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '1.5rem' }}>PRODUCT</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Features', 'Pipeline', 'Security', 'Pricing', 'Integrations'].map(link => (
                  <li key={link}>
                    <a href="#" className="footer-link flex-between text-sm text-muted" style={{ textDecoration: 'none', width: '100px' }}>
                      {link} <ArrowRight size={12} className="link-arrow" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h5 className="text-accent" style={{ fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '1.5rem' }}>RESOURCES</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Documentation', 'API Reference', 'Changelog', 'Status', 'Help Center'].map(link => (
                  <li key={link}>
                    <a href="#" className="footer-link flex-between text-sm text-muted" style={{ textDecoration: 'none', width: '120px' }}>
                      {link} <ArrowRight size={12} className="link-arrow" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Company */}
            <div>
              <h5 className="text-accent" style={{ fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '1.5rem' }}>COMPANY</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['About', 'Blog', 'Careers', 'Contact', 'Press Kit'].map(link => (
                  <li key={link}>
                    <a href="#" className="footer-link flex-between text-sm text-muted" style={{ textDecoration: 'none', width: '90px' }}>
                      {link} <ArrowRight size={12} className="link-arrow" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Brain Visualizer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <WireframeBrain />
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="flex-between">
            <div className="text-xs text-muted" style={{ display: 'flex', gap: '1.5rem' }}>
              <span>© 2024 DocuMind AI. All rights reserved.</span>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Security</a>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="text-xs font-bold" style={{ letterSpacing: '1px' }}>FOLLOW US</span>
              <a href="#" className="flex-center border-card" style={{ width: '32px', height: '32px', borderRadius: '50%', color: 'var(--text-primary)', textDecoration: 'none', background: 'rgba(255,255,255,0.05)' }}>X</a>
              <a href="#" className="flex-center border-card" style={{ width: '32px', height: '32px', borderRadius: '50%', color: 'var(--text-primary)', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', fontSize: '14px', fontWeight: 'bold' }}>in</a>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .footer-link:hover { color: var(--accent-green); }
        .footer-link .link-arrow { opacity: 0; transform: translateX(-5px); transition: all 0.3s ease; }
        .footer-link:hover .link-arrow { opacity: 1; transform: translateX(0); color: var(--accent-green); }
      `}</style>
    </section>
  );
}
