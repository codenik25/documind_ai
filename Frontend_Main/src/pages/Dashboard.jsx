import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardApp from '../dashboard/DashboardApp';
import DashboardLayout from '../layouts/DashboardLayout';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

// Using the global VITE_API_BASE
const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000';

export default function Dashboard() {
  const [status, setStatus] = useState('checking'); // checking, online, offline
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    let isMounted = true;
    const checkBackend = async () => {
      try {
        const res = await fetch(`${API_BASE}/system-status`, { cache: 'no-store' });
        if (!res.ok) throw new Error('API Unavailable');
        const data = await res.json();
        
        if (data.status === 'operational' || data.engine_online) {
          if (isMounted) setStatus('online');
        } else {
          if (isMounted) {
            setStatus('offline');
            setErrorDetails(data.active_model || 'NO ACTIVE MODEL DETECTED');
          }
        }
      } catch (err) {
        if (isMounted) {
          setStatus('offline');
          setErrorDetails('CONNECTION FAILED: SERVER UNREACHABLE');
        }
      }
    };
    checkBackend();
    return () => { isMounted = false; };
  }, []);

  if (status === 'checking') {
    return (
      <DashboardLayout>
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--neon-lime)' }}>
          VERIFYING NEURAL LINK...
        </div>
      </DashboardLayout>
    );
  }

  if (status === 'offline') {
    return (
      <DashboardLayout>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255, 68, 68, 0.1) 0%, transparent 70%)' }}></div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }} 
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <ShieldAlert size={80} color="#ff4444" style={{ marginBottom: '20px' }} />
            </motion.div>
            <h1 className="mono-text" style={{ fontSize: '3rem', color: '#ff4444', textShadow: '0 0 20px rgba(255, 68, 68, 0.6)', marginBottom: '10px' }}>
              NEURAL ENGINE OFFLINE
            </h1>
            <div className="mono-text" style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '30px' }}>
              CRITICAL FAULT DETECTED IN INFERENCE PIPELINE
            </div>
            
            <div style={{ background: 'rgba(255, 68, 68, 0.1)', border: '1px solid #ff4444', padding: '20px', borderRadius: '8px', minWidth: '400px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ff4444', marginBottom: '10px' }}>
                <AlertTriangle size={20} />
                <span className="mono-text" style={{ fontWeight: 'bold' }}>SYSTEM DIAGNOSTICS</span>
              </div>
              <ul className="mono-text" style={{ color: '#ffaaaa', fontSize: '0.9rem', lineHeight: '1.8', listStyle: 'none', padding: 0 }}>
                <li>[!] BACKEND CONNECTION: {errorDetails.includes('CONNECTION FAILED') ? 'FAILED' : 'OK'}</li>
                <li>[!] LM STUDIO: {errorDetails.includes('NO ACTIVE MODEL') ? 'UNREACHABLE' : errorDetails}</li>
                <li>[!] VECTOR STORE: SUSPENDED</li>
              </ul>
            </div>
            
            <button 
              onClick={() => window.location.reload()}
              style={{
                marginTop: '40px',
                background: 'transparent',
                border: '1px solid #ff4444',
                color: '#ff4444',
                padding: '12px 30px',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.target.style.background = 'rgba(255, 68, 68, 0.1)'; e.target.style.boxShadow = '0 0 15px rgba(255,68,68,0.4)'; }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.boxShadow = 'none'; }}
            >
              REINITIALIZE CONNECTION
            </button>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardApp />
    </DashboardLayout>
  );
}
