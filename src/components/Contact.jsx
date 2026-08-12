import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <footer id="contact" className="contact-section">
      <div 
        className="container contact-container glass" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.8), rgba(5, 5, 5, 0.8)), url("/abstract-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="contact-content">
          <h2 className="text-gradient">¿Listo para evolucionar?</h2>
          <p className="text-muted">Únete a las empresas que ya están automatizando su futuro con Web Neuron.</p>
          
          <div className="contact-actions">
            <a href="mailto:hola@webneuron.com" className="glass-btn primary">
              Contactar Ventas <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        
        <div className="contact-bottom">
          <div className="logo-text text-gradient">Web Neuron</div>
          <p className="text-muted text-sm">© {new Date().getFullYear()} Web Neuron. Todos los derechos reservados.</p>
          <div className="social-links">
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
