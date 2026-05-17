import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function NeuralCanvas() {
  const canvasRef = useRef(null);
  
  // Custom scroll velocity tracker
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      // Smooth out velocity
      scrollVelocity.current = gsap.utils.interpolate(scrollVelocity.current, delta, 0.1);
      lastScrollY.current = currentScrollY;
    };
    
    // Decay velocity back to zero
    const velocityDecay = setInterval(() => {
      if (Math.abs(scrollVelocity.current) > 0.1) {
        scrollVelocity.current *= 0.9;
      } else {
        scrollVelocity.current = 0;
      }
    }, 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(velocityDecay);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let particles = [];
    
    // Configuration
    let particleCount = window.innerWidth < 768 ? 50 : 120;
    const connectionDistance = 180;
    const baseSpeed = 0.3;

    let mouse = { x: -1000, y: -1000, radius: 250 }; // Offscreen by default

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particleCount = window.innerWidth < 768 ? 50 : 120;
      initParticles();
    };

    // Mouse tracking for localized magnetic effects
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 2 + 0.5; // Depth multiplier (parallax)
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = this.z;
        
        // Random velocity
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
      }

      update() {
        // Scroll reactivity (move particles based on scroll velocity and Z-depth)
        const scrollOffset = scrollVelocity.current * this.z * 0.05;
        this.y -= scrollOffset;

        // Continuous movement
        this.x += this.vx * baseSpeed * this.z;
        this.y += this.vy * baseSpeed * this.z;

        // Mouse interaction (magnetic pull & swirl)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          
          // Gentle pull
          this.x += forceDirectionX * force * 1.5;
          this.y += forceDirectionY * force * 1.5;
        }

        // Screen wrap
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Intensity scales with Z-depth
        ctx.fillStyle = `rgba(157, 255, 34, ${0.1 + (this.z * 0.15)})`; 
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;
      
      // Draw flowing background energy waves (Layer 3)
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.3 + Math.sin(time) * 100 - scrollVelocity.current * 0.5);
      ctx.bezierCurveTo(
        canvas.width * 0.3, canvas.height * 0.2 + Math.sin(time * 1.2) * 50,
        canvas.width * 0.7, canvas.height * 0.4 + Math.cos(time * 0.8) * 150,
        canvas.width, canvas.height * 0.2 + Math.sin(time) * 100
      );
      ctx.strokeStyle = 'rgba(157, 255, 34, 0.03)';
      ctx.lineWidth = 150;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.7 + Math.cos(time * 1.1) * 120);
      ctx.bezierCurveTo(
        canvas.width * 0.4, canvas.height * 0.8 + Math.sin(time * 0.9) * 80,
        canvas.width * 0.6, canvas.height * 0.6 + Math.cos(time * 1.3) * 100,
        canvas.width, canvas.height * 0.8 + Math.cos(time) * 120
      );
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.02)'; // Subtle cyan/blue wave
      ctx.lineWidth = 200;
      ctx.stroke();

      // Update and draw particles (Layer 2)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Draw semantic connections
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Only connect if z-depth is similar (creates actual 3D planes)
            if (Math.abs(particles[i].z - particles[j].z) < 0.8) {
              ctx.beginPath();
              // Opacity based on distance and average z-depth
              const avgZ = (particles[i].z + particles[j].z) / 2;
              const opacity = (0.1 * avgZ) * (1 - distance/connectionDistance);
              
              ctx.strokeStyle = `rgba(157, 255, 34, ${opacity})`;
              ctx.lineWidth = 0.5 * avgZ;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      
      {/* LAYER 4: Ambient Drifting Orbs */}
      <div className="ambient-glow" style={{ background: 'var(--accent-green)', width: '600px', height: '600px', top: '-20%', left: '-10%', animation: 'drift1 20s infinite alternate ease-in-out' }}></div>
      <div className="ambient-glow" style={{ background: 'var(--accent-blue)', width: '500px', height: '500px', bottom: '-20%', right: '-10%', animation: 'drift2 25s infinite alternate ease-in-out' }}></div>
      
      {/* LAYER 1: Holographic Grid */}
      <div className="neural-grid-bg"></div>

      {/* LAYER 2 & 3: Canvas Particles and SVG Waves */}
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

      <style>{`
        @keyframes drift1 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 150px); }
        }
        @keyframes drift2 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-150px, -100px); }
        }
      `}</style>
    </div>
  );
}
