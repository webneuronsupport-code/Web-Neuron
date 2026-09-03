import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './HeroNew.css';

const HeroNew = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from('.hero-new-badge', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('.hero-new-title span', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.hero-new-desc', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.hero-new-buttons .btn-primary, .hero-new-buttons .btn-secondary', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.glass-card-mini', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.5)'
      }, '-=0.6');
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-new-container" ref={containerRef}>
      {/* Background Elements */}
      <div className="hero-new-aurora"></div>
      <div className="hero-new-grid"></div>

      {/* Floating UI */}
      <div className="hero-floating-ui">
        <div className="glass-card-mini card-1">
          <div className="mini-icon">🤖</div>
          <div className="mini-text">
            <h4>Agentes IA</h4>
            <p>Operando 24/7</p>
          </div>
        </div>
        
        <div className="glass-card-mini card-2">
          <div className="mini-icon">⚡</div>
          <div className="mini-text">
            <h4>Automatización</h4>
            <p>Procesos sin fricción</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="hero-new-content">
        <div className="hero-new-badge">
          <span></span> Inteligencia Artificial Aplicada
        </div>
        
        <h1 className="hero-new-title">
          <span>Sistemas Autónomos.</span>
          <span className="highlight">Crecimiento Exponencial.</span>
        </h1>
        
        <p className="hero-new-desc">
          Integramos ecosistemas de IA avanzados que automatizan tus ventas, atención al cliente y operaciones internas para escalar sin límites.
        </p>
        
        <div className="hero-new-buttons">
          <a href="#contacto" className="btn-primary">Agendar Demo</a>
          <a href="#servicios" className="btn-secondary">Explorar Soluciones</a>
        </div>
      </div>
    </section>
  );
};

export default HeroNew;
