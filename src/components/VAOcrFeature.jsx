import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { FaIdCard, FaFileImage, FaFileExcel, FaDatabase, FaChartPie } from 'react-icons/fa';
import './VAOcrFeature.css';

const VAOcrFeature = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Bento cards entrance animation
    gsap.from('.ocr-bento-item', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.2)'
    });

    // Scanner line animation
    gsap.to('.ocr-scanner-laser', {
      top: '100%',
      duration: 2.5,
      ease: 'linear',
      repeat: -1,
      yoyo: true
    });
  }, { scope: containerRef });

  return (
    <section className="va-ocr-bento-section" ref={containerRef}>
      <div className="shell">
        
        <div className="ocr-bento-header">
          <span className="ocr-bento-tag">Computer Vision & OCR</span>
          <h2 className="ocr-bento-title">Tus ojos digitales.</h2>
          <p className="ocr-bento-subtitle">
            Olvida la captura manual. Si un cliente envía un archivo, tu asistente lo lee, lo entiende y toma acción en fracciones de segundo.
          </p>
        </div>

        <div className="ocr-bento-grid">
          
          {/* Main Scanner Card (Spans 2 columns on desktop) */}
          <div className="ocr-bento-item ocr-main-card">
            <div className="ocr-main-content">
              <h3>Escaneo Inteligente</h3>
              <p>Envía documentos por WhatsApp, Web o Redes Sociales. La IA extrae la información vital al instante.</p>
            </div>
            <div className="ocr-visual-scanner">
              <div className="ocr-doc-mockup">
                <div className="ocr-doc-line w-long"></div>
                <div className="ocr-doc-line w-short"></div>
                <div className="ocr-doc-image"></div>
                <div className="ocr-doc-line w-long"></div>
                <div className="ocr-doc-line w-medium"></div>
                
                <div className="ocr-scanner-laser"></div>
              </div>
            </div>
          </div>

          {/* Point 1 */}
          <div className="ocr-bento-item ocr-small-card">
            <div className="ocr-card-icon"><FaIdCard /></div>
            <h4>Identificaciones</h4>
            <p>Extrae nombres, fechas y números de IDs o pasaportes sin errores.</p>
          </div>

          {/* Point 2 */}
          <div className="ocr-bento-item ocr-small-card">
            <div className="ocr-card-icon"><FaFileImage /></div>
            <h4>Imágenes</h4>
            <p>Lee texto dentro de fotografías o capturas de pantalla.</p>
          </div>

          {/* Point 3 */}
          <div className="ocr-bento-item ocr-small-card">
            <div className="ocr-card-icon"><FaFileExcel /></div>
            <h4>Excels & PDFs</h4>
            <p>Analiza documentos de múltiples páginas y tablas complejas.</p>
          </div>

          {/* Use Case 1: Baucher */}
          <div className="ocr-bento-item ocr-wide-card">
            <div className="ocr-wide-content">
              <div className="ocr-wide-tag">CASO DE USO 1</div>
              <h4>Validación de Bauchers</h4>
              <p>Un cliente envía su comprobante de pago. El asistente escanea el monto, la fecha, el banco y cruza los datos con tu base de datos para aprobar el pedido. <strong>Todo en automático.</strong></p>
            </div>
            <div className="ocr-wide-visual">
              <FaDatabase className="ocr-huge-icon" />
            </div>
          </div>

          {/* Use Case 2: Reporte */}
          <div className="ocr-bento-item ocr-wide-card">
            <div className="ocr-wide-content">
              <div className="ocr-wide-tag">CASO DE USO 2</div>
              <h4>Análisis de Reportes</h4>
              <p>Te envían un PDF lleno de estadísticas. En lugar de leerlo, el asistente extrae las métricas clave y te genera un resumen ejecutivo al instante.</p>
            </div>
            <div className="ocr-wide-visual">
              <FaChartPie className="ocr-huge-icon" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VAOcrFeature;
