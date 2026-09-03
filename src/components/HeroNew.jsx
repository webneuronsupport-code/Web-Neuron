import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroNew.css';

gsap.registerPlugin(ScrollTrigger);

const HeroNew = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Intro animations
      gsap.from('.hero-h-category, .hero-h-title, .hero-h-desc', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });

      // Horizontal Scroll animation (Pin and slide)
      const wrapper = containerRef.current;
      
      gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (wrapper.scrollWidth - window.innerWidth)
        }
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-h-pin-section" ref={sectionRef}>
      <div className="hero-horizontal-wrapper" ref={containerRef}>
      
      {/* Intro Column */}
      <div className="hero-h-col col-intro">
        <div className="hero-h-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
            <img src={`${import.meta.env.BASE_URL}2_clean2.png`} alt="Web Neuron Logo" style={{ height: '80px', width: 'auto' }} />
            <h1 className="hero-h-title" style={{ margin: 0, textAlign: 'left' }}>
              WEB<br/>NEURON
            </h1>
          </div>
          <p className="hero-h-desc" style={{marginTop: '1rem', textAlign: 'center', width: '100%'}}>
            Sistemas Autónomos &<br/>Crecimiento Exponencial.
          </p>
        </div>
        <div className="hero-h-bottom">
          {/* Abstract / Brand Image */}
          <img className="hero-h-image" src={`${import.meta.env.BASE_URL}hero-new.jpg`} alt="Web Neuron Core" />
        </div>
      </div>

      {/* Column 1 */}
      <div className="hero-h-col">
        <div className="hero-h-top">
          <div className="hero-h-category">Asistentes Virtuales</div>
          <h2 className="hero-h-title">Operación 24/7 sin descanso</h2>
          <p className="hero-h-desc">
            Agentes de IA que atienden clientes, programan citas y resuelven dudas al instante.
          </p>
        </div>
        <div className="hero-h-bottom">
          <img className="hero-h-image" src={`${import.meta.env.BASE_URL}service-ai-assistants.png`} alt="Asistentes Virtuales" />
        </div>
      </div>

      {/* Column 2 */}
      <div className="hero-h-col">
        <div className="hero-h-top">
          <div className="hero-h-category">Automatización RPA</div>
          <h2 className="hero-h-title">Procesos sin fricción</h2>
          <p className="hero-h-desc">
            Conectamos tus herramientas para que la información fluya sin intervención humana.
          </p>
        </div>
        <div className="hero-h-bottom">
          <img className="hero-h-image" src={`${import.meta.env.BASE_URL}hero-bg.jpg`} alt="Automatización" />
        </div>
      </div>

      {/* Column 3 */}
      <div className="hero-h-col">
        <div className="hero-h-top">
          <div className="hero-h-category">CRM Inteligente</div>
          <h2 className="hero-h-title">Control total de tus leads</h2>
          <p className="hero-h-desc">
            Plataformas omnicanal potenciadas por IA para cerrar más ventas.
          </p>
        </div>
        <div className="hero-h-bottom">
          <img className="hero-h-image" src={`${import.meta.env.BASE_URL}service-automatizaciones.png`} alt="CRM Omnicanal" />
        </div>
      </div>

      {/* Column 4 */}
      <div className="hero-h-col">
        <div className="hero-h-top">
          <div className="hero-h-category">Desarrollo a Medida</div>
          <h2 className="hero-h-title">Soluciones que escalan</h2>
          <p className="hero-h-desc">
            Arquitectura de software diseñada específicamente para las necesidades de tu empresa.
          </p>
        </div>
        <div className="hero-h-bottom">
          <img className="hero-h-image" src={`${import.meta.env.BASE_URL}hero-core.png`} alt="Desarrollo Web" style={{objectFit: 'contain', backgroundColor: '#050505'}} />
        </div>
      </div>

      </div>
    </section>
  );
};

export default HeroNew;
