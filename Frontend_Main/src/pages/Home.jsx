import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HeroFeatures from '../components/HeroFeatures';
import HowItWorks from '../components/HowItWorks';
import IntelligenceScale from '../components/IntelligenceScale';
import Transformation from '../components/Transformation';
import DocumentIntelligence from '../components/DocumentIntelligence';
import Reviews from '../components/Reviews';
import TechStack from '../components/TechStack';
import CTA from '../components/CTA';
import MainLayout from '../layouts/MainLayout';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const appRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    gsap.fromTo(appRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [loading]);

  return (
    <MainLayout>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <div ref={appRef}>
          <Navbar />
          <Hero />
          <HeroFeatures />
          <HowItWorks />
          <IntelligenceScale />
          <Transformation />
          <DocumentIntelligence />
          <Reviews />
          <TechStack />
          <CTA />
        </div>
      )}
    </MainLayout>
  );
}
