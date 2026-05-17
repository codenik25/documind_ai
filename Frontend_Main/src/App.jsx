import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

import NeuralCanvas from './components/global/NeuralCanvas';
import NeuralCursor from './components/global/NeuralCursor';
import HoloLoader from './components/global/HoloLoader';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Route Transition Wrapper
const PageTransition = ({ children }) => {
  const location = useLocation();
  const nodeRef = useRef(null);

  useEffect(() => {
    // Cinematic entrance transition on route change
    if (nodeRef.current) {
      gsap.fromTo(
        nodeRef.current,
        { opacity: 0, scale: 0.98, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }
      );
    }
  }, [location.pathname]);

  return <div ref={nodeRef} style={{ width: '100%', height: '100%' }}>{children}</div>;
};

function App() {
  return (
    <BrowserRouter>
      {/* Global Persistent Neural Environment */}
      <NeuralCanvas />
      <NeuralCursor />
      
      {/* Cinematic Routing */}
      <Suspense fallback={<HoloLoader />}>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </PageTransition>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
