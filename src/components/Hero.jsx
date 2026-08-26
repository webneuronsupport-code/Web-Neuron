import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { MousePointer2, ArrowDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const container = useRef(null);

  useGSAP(() => {
    // Reveal text animation for main heading
    gsap.from('.pip-main-title span', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.5
    });

    gsap.from('.pip-small-text, .pip-badge, .scroll-indicator', {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 1.5
    });

  }, { scope: container });

  return (
    <section className="hero-section" ref={container}>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            El futuro <br /> no espera a <br /> nadie.
          </h1>
          <p className="hero-subtitle">
            Soluciones avanzadas para empresas exigentes.
          </p>
        </div>
        
        <div className="hero-spline">
           {/* Fallback elegant background instead of spline */}
           <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(94, 92, 230, 0.15) 0%, transparent 70%)' }}></div>
        </div>

        {/* This absolutely positioned layer creates the PIP (Picture in Picture) effect */}
        <div className="pip-container">
           {/* The solid red background block with noise */}
           <div className="pip-bg"></div>

           {/* The content that appears over the solid block */}
           <div className="pip-content">
              {/* Decorative Tech UI Elements */}
              <div className="pip-tech-grid"></div>
              
              <div className="pip-top-bar">
                <div className="pip-badge">[ SYS_CORE : ONLINE ]</div>
                <div className="pip-badge text-right">DEPLOYMENT // V2.0</div>
              </div>

              <div className="pip-content-layout">
                <div className="pip-title-col">
                  <h2 className="pip-main-title">
                    <div className="overflow-hidden"><span>CREAMOS</span></div>
                    <div className="overflow-hidden"><span>SISTEMAS DE IA</span></div>
                    <div className="overflow-hidden"><span>QUE TRANSFORMAN</span></div>
                    <div className="overflow-hidden"><span>TU NEGOCIO.</span></div>
                  </h2>
                </div>
                
                <div className="pip-desc-col">
                  <p className="pip-small-text">
                    EXCLUSIVAS SOLUCIONES CON UN DISEÑO QUE CONECTA CON TUS OBJETIVOS, DÁNDOTE UN NUEVO SENTIDO DEL ÉXITO Y LA PRODUCTIVIDAD. RENDIMIENTO ABSOLUTO.
                  </p>
                  
                  <div className="pip-decorative-lines">
                     <div className="line line-1"></div>
                     <div className="line line-2"></div>
                     <div className="line line-3"></div>
                  </div>
                </div>
              </div>

              <div className="scroll-indicator">
                 <span className="scroll-text">SCROLL DISCOVER</span>
                 <ArrowDown size={16} className="scroll-arrow" />
              </div>

              <div className="pip-glow"></div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
