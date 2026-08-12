import React, { useState } from 'react';
import { X, Check, Shield } from 'lucide-react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="cookie-consent glass">
      <div className="cookie-header">
        <Shield size={18} className="text-gradient-accent" />
        <h4>Privacidad y Términos</h4>
      </div>
      <div className="cookie-content">
        <p className="text-muted">
          Utilizamos cookies y tecnologías similares para ofrecerte una experiencia premium, personalizar contenido y analizar nuestro tráfico. Al continuar navegando, aceptas nuestros términos.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="glass-btn secondary btn-sm" onClick={() => setIsVisible(false)}>
          <X size={14} /> Rechazar
        </button>
        <button className="glass-btn primary btn-sm" onClick={() => setIsVisible(false)}>
          <Check size={14} /> Aceptar
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
