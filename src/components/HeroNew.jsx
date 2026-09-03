import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './HeroNew.css';

const HeroNew = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from('.hero-clean-badge', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from('.hero-clean-title span', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.hero-clean-desc', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.hero-clean-buttons .btn-clean-primary, .hero-clean-buttons .btn-clean-secondary', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.4');
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-clean-container" ref={containerRef}>
      <div className="hero-clean-content">
        <div className="hero-clean-badge">
          Inteligencia Artificial Aplicada
        </div>
        
        <h1 className="hero-clean-title">
          <div className="overflow-hidden"><span>Sistemas Autónomos.</span></div>
          <div className="overflow-hidden"><span>Crecimiento Exponencial.</span></div>
        </h1>
        
        <p className="hero-clean-desc">
          Ecosistemas avanzados que automatizan tus ventas, atención al cliente y operaciones internas. Escalabilidad sin límites.
        </p>
        
        <div className="hero-clean-buttons">
          <a href="#contacto" className="btn-clean-primary">Agendar Demo</a>
          <a href="#servicios" className="btn-clean-secondary">Explorar Soluciones</a>
        </div>
      </div>
    </section>
  );
};

export default HeroNew;
