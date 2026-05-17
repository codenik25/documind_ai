import React from 'react';
import { BrainCircuit, Sun, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem 4rem',
      position: 'relative',
      zIndex: 50,
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <BrainCircuit size={28} color="var(--accent-green)" strokeWidth={1.5} />
        <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          DocuMind <span style={{ fontStyle: 'italic', color: 'var(--accent-green)' }}>AI</span>
        </span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {[
          { label: 'Features', id: 'features' },
          { label: 'Pipeline', id: 'how-it-works' },
          { label: 'Scale', id: 'scale' },
          { label: 'Use Cases', id: 'use-cases' },
          { label: 'Reviews', id: 'reviews' },
          { label: 'Tech Stack', id: 'tech-stack' }
        ].map((item) => (
          <a 
            key={item.id} 
            href={`#${item.id}`} 
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(item.id);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{ 
              color: 'var(--text-secondary)', 
              textDecoration: 'none', 
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Sun size={20} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
        <button style={{
          background: 'transparent',
          border: '1px solid var(--accent-green)',
          color: 'var(--accent-green)',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 0 10px rgba(157, 255, 34, 0.1)'
        }}
        onClick={() => navigate('/dashboard')}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 15px rgba(157, 255, 34, 0.3)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 10px rgba(157, 255, 34, 0.1)'}
        >
          Launch Dashboard <ArrowRight size={16} />
        </button>
      </div>
    </nav>
  );
}
