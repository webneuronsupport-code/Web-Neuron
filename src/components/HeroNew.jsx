import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './HeroNew.css';

const HeroNew = () => {
  return (
    <section className="hero-cinematic-section">
      <div className="hero-cinematic-bg">
        <div className="hero-cinematic-overlay"></div>
      </div>
      
      <div className="hero-cinematic-content">
        <motion.div
          className="hero-text-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="hero-title">
            DELEGA.<br/>
            LA IA EJECUTA.
          </h1>
          <p className="hero-subtitle">
            Automatizamos tu atención al cliente 24/7 con IA. Reduce costos operativos, capta cada lead al instante y maximiza tus ventas sin depender de horarios ni de personal humano.
          </p>
          <a href="#contacto" className="hero-button">
            EXPLORAR <ArrowRight size={16} strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroNew;
