import React from 'react';
import { ChevronDown } from 'lucide-react';
import SpecularButton from './SpecularButton';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-editorial-section" id="inicio">
      
      {/* Fondo de pantalla completa */}
      <div className="hero-editorial-bg"></div>

      {/* Contenedor Principal (Relative para posicionamiento libre) */}
      <div className="hero-editorial-container">
        
        {/* Superior Izquierda: Título y Subtítulo */}
        <div className="hero-editorial-top-left">
          <p className="hero-editorial-kicker">MADE FOR BUSINESS. BUILT FOR SCALE.</p>
          <h1 className="hero-editorial-title">
            WEB<br/>NEURON
          </h1>
        </div>

        {/* Medio Derecha: Párrafo Principal */}
        <div className="hero-editorial-mid-right">
          <p>
            Designed to automate, convert, and scale in all<br/>
            the right ways. Web Neuron makes your<br/>
            hardest operations feel effortless.
          </p>
        </div>

        {/* Abajo Izquierda: Panel de Cristal */}
        <div className="hero-editorial-bottom-left">
          <div className="hero-editorial-glass-box">
            <h2>
              POWERED<br/>
              BY AI,<br/>
              THE AWARD-WINNING<br/>
              OMNICHANNEL CRM.
            </h2>
            <div className="hero-editorial-divider"></div>
            <p className="hero-editorial-glass-sub">
              The world's most<br/>
              unnecessarily<br/>
              sophisticated virtual assistant.
            </p>
          </div>
        </div>

        {/* Abajo Centro: Scroll Indicator */}
        <div className="hero-editorial-scroll-indicator-wrapper" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
          <SpecularButton
            as="a"
            href="#asistentes"
            className="hero-editorial-scroll-indicator"
            size="sm"
            radius={30}
            baseColor="#111111"
            lineColor="#00f3ff"
            intensity={1.2}
            thickness={2}
            speed={0.5}
          >
            <ChevronDown size={14} style={{ marginRight: '6px' }} /> SCROLL TO CONTINUE
          </SpecularButton>
        </div>

        {/* Abajo Derecha: Picture in Picture Video */}
        <div className="hero-editorial-pip">
          <div className="pip-video-wrapper">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              src={`${import.meta.env.BASE_URL}Quiero_crear_un_video_en_donde.mp4`}
            ></video>
          </div>
        </div>

        {/* Borde Extremo Derecho: Texto Vertical */}
        <div className="hero-editorial-vertical-text">
          <span className="dot">•</span> WEB NEURON-1 MODEL
        </div>

      </div>
    </section>
  );
};

export default Hero;
