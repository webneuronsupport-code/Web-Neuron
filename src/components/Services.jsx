import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bot, Zap, Network, Code2 } from 'lucide-react';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    icon: <Bot size={32} />,
    title: 'Asistentes IA',
    description: 'Agentes conversacionales inteligentes que atienden a tus clientes 24/7 con naturalidad y eficacia.'
  },
  {
    icon: <Zap size={32} />,
    title: 'Automatizaciones',
    description: 'Optimiza tus flujos de trabajo. Conectamos tus herramientas para que trabajen por ti.'
  },
  {
    icon: <Network size={32} />,
    title: 'CRM Omnicanal',
    description: 'Centraliza todas tus comunicaciones. WhatsApp, email y redes sociales en un solo lugar.'
  },
  {
    icon: <Code2 size={32} />,
    title: 'Desarrollo Web',
    description: 'Creamos experiencias digitales modernas, rápidas y optimizadas para conversión, como esta.'
  }
];

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
      gsap.fromTo('.services-header', 
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-header',
            start: 'top 80%',
          }
        }
      );

      // Animación stagger para las tarjetas
      gsap.fromTo(cardsRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="container">
        <div className="services-header">
          <h2 className="text-gradient">Ecosistema Digital</h2>
          <p className="text-muted">Potencia tu empresa con soluciones interconectadas.</p>
        </div>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div 
              key={index} 
              className="service-card glass"
              ref={el => cardsRef.current[index] = el}
            >
              <div className="service-icon text-gradient-accent">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p className="text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
