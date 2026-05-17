import React from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';

export default function HoloLoader() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary, #050505)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      color: 'var(--text-muted, #888)'
    }}>
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
          filter: ['blur(4px)', 'blur(0px)', 'blur(4px)']
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{ marginBottom: '2rem' }}
      >
        <Network size={64} style={{ color: 'var(--neon-lime, #c8ff45)' }} />
      </motion.div>
      <div className="mono-text" style={{ fontSize: '1rem', letterSpacing: '0.3em', color: 'var(--neon-lime, #c8ff45)', textShadow: '0 0 10px rgba(200,255,69,0.5)' }}>
        INITIALIZING NEURAL LINK...
      </div>
      <div style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.6 }}>
        Establishing intelligence protocols
      </div>
    </div>
  );
}
