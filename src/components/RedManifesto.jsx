import React from 'react';
import './RedManifesto.css';

const RedManifesto = () => {
  return (
    <section className="red-manifesto-section">
      <div className="red-manifesto-grid-bg"></div>
      
      <div className="red-manifesto-content shell">
        <div className="red-manifesto-top-bar">
          <span className="red-manifesto-mono">[ SYS CORE : ONLINE ]</span>
          <span className="red-manifesto-mono">DEPLOYMENT // V2.0</span>
        </div>

        <div className="red-manifesto-main">
          <h2 className="red-manifesto-title">
            CREAMOS<br />
            SISTEMAS DE IA<br />
            QUE TRANSFORMAN<br />
            TU NEGOCIO.
          </h2>

          <div className="red-manifesto-side">
            <p className="red-manifesto-desc">
              EXCLUSIVAS SOLUCIONES CON UN DISEÑO QUE CONECTA CON TUS OBJETIVOS, DÁNDOTE UN NUEVO SENTIDO DEL ÉXITO Y LA PRODUCTIVIDAD. RENDIMIENTO ABSOLUTO.
            </p>
            <div className="red-manifesto-lines">
              <div className="line line-1"></div>
              <div className="line line-2"></div>
              <div className="line line-3"></div>
            </div>
          </div>
        </div>

        <div className="red-manifesto-bottom-bar">
          <span className="red-manifesto-mono">END OF TUNNEL</span>
        </div>
      </div>
    </section>
  );
};

export default RedManifesto;
