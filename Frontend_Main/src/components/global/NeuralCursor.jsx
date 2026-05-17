import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function NeuralCursor() {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    // Hide default cursor on body just in case
    document.body.style.cursor = 'none';

    // GSAP quickTo for zero-latency tracking
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" });

    // Ghost trail quickTo functions
    const trails = trailRefs.current.map(el => ({
      x: gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" })
    }));

    let trailTimeout;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Move main cursor
      xTo(clientX);
      yTo(clientY);

      // Delay trail movement
      trails.forEach((trail, index) => {
        setTimeout(() => {
          trail.x(clientX);
          trail.y(clientY);
        }, index * 40);
      });

      // Show cursor
      gsap.to(cursorRef.current, { opacity: 1, duration: 0.2 });
      trailRefs.current.forEach(el => gsap.to(el, { opacity: (index) => 0.5 - (index * 0.15), duration: 0.2 }));

      clearTimeout(trailTimeout);
      trailTimeout = setTimeout(() => {
        // Fade out on idle
        trailRefs.current.forEach(el => gsap.to(el, { opacity: 0, duration: 0.5 }));
      }, 500);
    };

    const handleMouseLeave = () => {
      gsap.to([cursorRef.current, ...trailRefs.current], { opacity: 0, duration: 0.3 });
    };

    // Hover Interaction System
    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, .border-card, .sidebar-link, .bento-item');
      if (target) {
        gsap.to(cursorRef.current, {
          scale: 1.5,
          backgroundColor: 'rgba(157, 255, 34, 0.2)',
          border: '1px solid var(--accent-green)',
          boxShadow: '0 0 15px var(--accent-green)',
          duration: 0.3
        });
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('button, a, .border-card, .sidebar-link, .bento-item');
      if (target) {
        gsap.to(cursorRef.current, {
          scale: 1,
          backgroundColor: 'var(--accent-green)',
          border: 'none',
          boxShadow: '0 0 10px var(--accent-green)',
          duration: 0.3
        });
      }
    };

    // Click Ripple System
    const handleClick = (e) => {
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples(prev => [...prev, newRipple]);

      // Click micro-animation on cursor
      gsap.fromTo(cursorRef.current, 
        { scale: 0.5 }, 
        { scale: 1.5, duration: 0.4, ease: "elastic.out(1, 0.3)" }
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Handle Ripple Lifecycle
  useEffect(() => {
    ripples.forEach(ripple => {
      const el = document.getElementById(`ripple-${ripple.id}`);
      if (el) {
        gsap.fromTo(el, 
          { scale: 0, opacity: 0.8 }, 
          { scale: 3, opacity: 0, duration: 1, ease: 'power2.out', onComplete: () => {
            setRipples(prev => prev.filter(r => r.id !== ripple.id));
          }}
        );
      }
    });
  }, [ripples]);

  return (
    <>
      {/* Ghost Trails */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={el => trailRefs.current[i] = el}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${12 - i * 2}px`,
            height: `${12 - i * 2}px`,
            backgroundColor: 'var(--accent-green)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            opacity: 0,
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'screen'
          }}
        />
      ))}

      {/* Main Cursor Core */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          backgroundColor: 'var(--accent-green)',
          boxShadow: '0 0 10px var(--accent-green)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'screen',
          willChange: 'transform'
        }}
      />

      {/* Click Ripples */}
      {ripples.map(r => (
        <div
          id={`ripple-${r.id}`}
          key={r.id}
          style={{
            position: 'fixed',
            top: r.y,
            left: r.x,
            width: '40px',
            height: '40px',
            border: '1px solid var(--accent-green)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9997,
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'screen'
          }}
        />
      ))}
    </>
  );
}
