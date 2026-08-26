import React, { useRef } from 'react';
import { User, Building, Mail, MessageSquare, Phone } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import Button from './Button';
import './ContactForm.css';

const ContactForm = () => {
  const root = useRef(null);
  
  useGSAP(
    () => {
      const trigger = { trigger: '.contact-form-section', start: 'top 80%' };

      gsap.from('.form-header-anim', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: trigger,
      });

      gsap.from('.contact-form', {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power4.out',
        scrollTrigger: trigger,
      });
    },
    { scope: root }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
  };

  return (
    <section className="contact-form-section" ref={root}>
      <div className="contact-form-glow" aria-hidden="true"></div>
      
      <div className="shell contact-form-shell">
        <div className="contact-form-header">
          <h2 className="display contact-form-title form-header-anim">
            Hablemos de tu proyecto
          </h2>
          <p className="contact-form-desc form-header-anim">
            Cuéntanos un poco sobre ti y cómo podemos ayudarte a transformar tu operación con inteligencia artificial. No te haremos esperar.
          </p>
        </div>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input type="text" id="nombre" name="nombre" placeholder="Tu nombre completo" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="empresa">Empresa</label>
              <div className="input-wrapper">
                <Building className="input-icon" size={18} />
                <input type="text" id="empresa" name="empresa" placeholder="Nombre de tu empresa" required />
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email corporativo</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input type="email" id="email" name="email" placeholder="ejemplo@tuempresa.com" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <div className="input-wrapper">
                <Phone className="input-icon" size={18} />
                <input type="tel" id="telefono" name="telefono" placeholder="+52 55 1234 5678" />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="mensaje">¿Qué te gustaría lograr?</label>
            <div className="input-wrapper textarea-wrapper">
              <MessageSquare className="input-icon" size={18} />
              <textarea id="mensaje" name="mensaje" placeholder="Describe brevemente tus objetivos o problemas actuales..." rows="4" required></textarea>
            </div>
          </div>
          
          <div className="form-submit">
            <Button type="submit" variant="accent" className="submit-btn">
              Enviar solicitud
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
