import React from 'react';

export default function MainLayout({ children }) {
  return (
    <div className="main-layout" style={{ background: 'transparent', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      {children}
    </div>
  );
}
