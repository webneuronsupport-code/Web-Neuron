import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline para la entrada secuencial
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      tl.fromTo('.hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, delay: 0.5 })
        .fromTo('.hero-title span', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15 }, '-=0.8')
        .fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.8')
        .fromTo('.hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.8');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={containerRef}>
      <div className="hero-content">
        <div className="hero-badge glass">
          <Sparkles size={16} className="text-gradient-accent" />
          <span>La nueva era de la Automatización</span>
        </div>
        
        <h1 className="hero-title">
          <span>Sistemas IA</span><br />
          <span>que transforman tu</span><br />
          <span className="text-gradient-accent">negocio.</span>
        </h1>
        
        <p className="hero-subtitle text-muted">
          Asistentes virtuales, automatizaciones avanzadas y CRM Omnicanal diseñados con la máxima precisión y minimalismo.
        </p>
        
        <div className="hero-cta">
          <a href="#services" className="glass-btn primary">
            Descubrir Soluciones <ArrowRight size={18} />
          </a>
          <a href="#contact" className="glass-btn">
            Agendar Demo
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="glow-sphere main-sphere"></div>
        <div className="glow-sphere secondary-sphere"></div>
      </div>
    </section>
  );
};

export default Hero;
