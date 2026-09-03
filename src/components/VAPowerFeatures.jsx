import React from 'react';
import './VAPowerFeatures.css';

const VAPowerFeatures = () => {
  return (
    <section className="va-manifesto-section">
      <div className="va-manifesto-grid-bg"></div>
      
      <div className="va-manifesto-content shell">
        <div className="va-manifesto-top-bar">
          <span className="va-manifesto-mono">[ SYS CORE : ONLINE ]</span>
          <span className="va-manifesto-mono">DEPLOYMENT // V2.0</span>
        </div>

        <div className="va-manifesto-main">
          <h2 className="va-manifesto-title">
            CREAMOS<br />
            SISTEMAS DE IA<br />
            QUE TRANSFORMAN<br />
            TU NEGOCIO.
          </h2>

          <div className="va-manifesto-side">
            <p className="va-manifesto-desc">
              EXCLUSIVAS SOLUCIONES CON UN DISEÑO QUE CONECTA CON TUS OBJETIVOS, DÁNDOTE UN NUEVO SENTIDO DEL ÉXITO Y LA PRODUCTIVIDAD. RENDIMIENTO ABSOLUTO.
            </p>
            <div className="va-manifesto-lines">
              <div className="line line-1"></div>
              <div className="line line-2"></div>
              <div className="line line-3"></div>
            </div>
          </div>
        </div>

        <div className="va-manifesto-bottom-bar">
          <span className="va-manifesto-mono">END OF TUNNEL</span>
        </div>
      </div>
    </section>
  );
};

export default VAPowerFeatures;
