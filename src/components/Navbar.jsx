import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BrainCircuit } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    // Animación de entrada del Navbar
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <header className="navbar-container" ref={navRef}>
      <nav className="navbar glass">
        <div className="logo">
          <BrainCircuit className="logo-icon" size={28} />
          <span className="logo-text text-gradient">Web Neuron</span>
        </div>
        
        <ul className="nav-links">
          <li><a href="#services">Servicios</a></li>
          <li><a href="#about">Nosotros</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>

        <a href="#contact" className="glass-btn primary btn-sm">
          Empezar
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
