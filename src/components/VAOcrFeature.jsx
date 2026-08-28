import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import './VAOcrFeature.css';

const VAOcrFeature = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animate rows on scroll
    gsap.from('.ocr-list-row', {
      scrollTrigger: {
        trigger: '.ocr-list-container',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });

    gsap.from('.ocr-case-block', {
      scrollTrigger: {
        trigger: '.ocr-list-cases',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  return (
    <section className="va-ocr-list-section" ref={containerRef}>
      <div className="shell">
        
        <div className="ocr-list-header">
          <span className="ocr-list-tag">TECNOLOGÍA OCR</span>
          <h2 className="ocr-list-title">Tu asistente lee por ti.</h2>
          <p className="ocr-list-subtitle">
            Los clientes envían fotos, Excels o PDFs. El asistente extrae los datos automáticamente para que no pierdas tiempo a mano.
          </p>
        </div>

        <div className="ocr-list-container">
          
          <div className="ocr-list-row">
            <div className="ocr-row-num">01</div>
            <h3 className="ocr-row-title">IDENTIFICACIONES</h3>
            <div className="ocr-row-desc">
              <p>Tus clientes envían una foto de su ID y el asistente extrae los datos oficiales al instante.</p>
            </div>
          </div>

          <div className="ocr-list-row">
            <div className="ocr-row-num">02</div>
            <h3 className="ocr-row-title">IMÁGENES</h3>
            <div className="ocr-row-desc">
              <p>Escanea cualquier imagen enviada por el cliente y extrae el texto dentro de ella con total precisión.</p>
            </div>
          </div>

          <div className="ocr-list-row">
            <div className="ocr-row-num">03</div>
            <h3 className="ocr-row-title">EXCEL & PDF</h3>
            <div className="ocr-row-desc">
              <p>Escanea archivos con métricas, números y estadísticas para generar un informe completo.</p>
            </div>
          </div>

        </div>

        <div className="ocr-list-cases">
          <h3 className="ocr-cases-heading">CASOS DE USO</h3>
          
          <div className="ocr-cases-grid">
            <div className="ocr-case-block">
              <h4 className="ocr-case-title">Validación de Pagos</h4>
              <p className="ocr-case-desc">
                Un cliente envía un baucher. El asistente escanea el monto, la fecha y el banco, validándolo y guardándolo en una base de datos para tu control rápido y seguro.
              </p>
            </div>
            
            <div className="ocr-case-block">
              <h4 className="ocr-case-title">Análisis de Reportes</h4>
              <p className="ocr-case-desc">
                Un cliente envía un documento con estadísticas complejas. El asistente lee su contenido y redacta un resumen ejecutivo al momento.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VAOcrFeature;
