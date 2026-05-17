import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Progress counter simulation
    const duration = 2.5; // total seconds for loading
    
    // Animate progress bar width
    gsap.to(progressBarRef.current, {
      width: '100%',
      duration: duration,
      ease: 'power2.inOut'
    });

    // Animate percentage number
    const dummy = { val: 0 };
    gsap.to(dummy, {
      val: 100,
      duration: duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(dummy.val));
      },
      onComplete: () => {
        // Exit animation
        gsap.to(loaderRef.current, {
          y: '-100vh',
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          delay: 0.2,
          onComplete: onComplete
        });
      }
    });

    // Pulse effect on the "INITIALIZING" text
    gsap.to(textRef.current, {
      opacity: 0.5,
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

  }, [onComplete]);

  return (
    <div ref={loaderRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#05080c',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* Logo Ring */}
      <div style={{
        position: 'relative',
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        border: '2px solid rgba(157, 255, 34, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem',
        boxShadow: '0 0 20px rgba(157, 255, 34, 0.2), inset 0 0 10px rgba(157, 255, 34, 0.1)'
      }}>
        {/* Animated glowing ring */}
        <div style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          right: '-2px',
          bottom: '-2px',
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: 'var(--accent-green)',
          animation: 'spin 2s linear infinite',
        }}></div>
        <span style={{ 
          color: 'var(--accent-green)', 
          fontSize: '1.5rem', 
          fontWeight: 600,
          textShadow: '0 0 10px rgba(157, 255, 34, 0.5)'
        }}>D</span>
      </div>

      {/* Loading Text */}
      <div ref={textRef} style={{
        color: 'var(--accent-green)',
        fontSize: '0.85rem',
        letterSpacing: '4px',
        fontWeight: 600,
        marginBottom: '1.5rem',
        textShadow: '0 0 8px rgba(157, 255, 34, 0.4)'
      }}>
        INITIALIZING NEURAL ENGINE
      </div>

      {/* Percentage */}
      <div style={{
        color: 'white',
        fontSize: '3.5rem',
        fontWeight: 500,
        marginBottom: '2rem',
        fontVariantNumeric: 'tabular-nums'
      }}>
        {progress}%
      </div>

      {/* Progress Bar Container */}
      <div style={{
        width: '240px',
        height: '2px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Active Progress Bar */}
        <div ref={progressBarRef} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '0%',
          backgroundColor: 'var(--accent-green)',
          boxShadow: '0 0 10px var(--accent-green)'
        }}></div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}
