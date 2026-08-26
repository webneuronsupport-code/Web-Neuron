import React from 'react';
import Button from './Button';
import './ContactForm.css';

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
  };

  return (
    <section className="contact-form-section">
      <div className="shell contact-form-shell">
        <div className="contact-form-header">
          <h2 className="display contact-form-title">
            Hablemos de tu proyecto
          </h2>
          <p className="contact-form-desc">
            Cuéntanos un poco sobre ti y cómo podemos ayudarte a transformar tu operación con inteligencia artificial.
          </p>
        </div>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" placeholder="Tu nombre completo" required />
            </div>
            <div className="form-group">
              <label htmlFor="empresa">Empresa</label>
              <input type="text" id="empresa" name="empresa" placeholder="Nombre de tu empresa" required />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email de contacto</label>
            <input type="email" id="email" name="email" placeholder="ejemplo@tuempresa.com" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje" name="mensaje" placeholder="¿Qué parte de tu operación te gustaría automatizar?" rows="4" required></textarea>
          </div>
          
          <div className="form-submit">
            <Button type="submit" variant="accent">
              Enviar mensaje
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
