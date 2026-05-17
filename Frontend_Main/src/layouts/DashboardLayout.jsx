import React from 'react';

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-root" style={{ width: '100vw', height: '100vh', background: 'transparent' }}>
      {children}
    </div>
  );
}
