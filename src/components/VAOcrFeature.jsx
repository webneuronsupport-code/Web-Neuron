import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { FaIdCard, FaFileImage, FaFileExcel, FaDatabase, FaChartLine } from 'react-icons/fa';
import './VAOcrFeature.css';

const VAOcrFeature = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    });

    tl.from('.va-ocr-header', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.va-ocr-point', {
      x: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.va-ocr-case', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.5)'
    }, '-=0.6')
    .from('.va-ocr-scanner-line', {
      top: '0%',
      duration: 2,
      ease: 'linear',
      repeat: -1,
      yoyo: true
    }, '-=0.5');

  }, { scope: containerRef });

  return (
    <section className="va-ocr-section" ref={containerRef}>
      <div className="shell">
        <div className="va-ocr-layout">
          
          <div className="va-ocr-left">
            <div className="va-ocr-header">
              <span className="va-ocr-tag">TECNOLOGÍA OCR</span>
              <h2>Los clientes envían archivos. Tu asistente hace el trabajo por ti.</h2>
              <p>Extraemos información vital de fotos, Excels, Words o PDFs en segundos. Deja de perder el tiempo haciéndolo a mano.</p>
            </div>

            <div className="va-ocr-points">
              <div className="va-ocr-point">
                <div className="va-ocr-icon"><FaIdCard /></div>
                <div className="va-ocr-text">
                  <h4>Identificaciones Oficiales</h4>
                  <p>Tus clientes envían una foto de su ID y el asistente extrae automáticamente sus datos.</p>
                </div>
              </div>
              <div className="va-ocr-point">
                <div className="va-ocr-icon"><FaFileImage /></div>
                <div className="va-ocr-text">
                  <h4>Texto en Imágenes</h4>
                  <p>Escanea cualquier imagen enviada por el cliente y extrae el texto dentro de ella con precisión.</p>
                </div>
              </div>
              <div className="va-ocr-point">
                <div className="va-ocr-icon"><FaFileExcel /></div>
                <div className="va-ocr-text">
                  <h4>Métricas en Excel y PDFs</h4>
                  <p>Analiza archivos con números y estadísticas para generar un informe completo al instante.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="va-ocr-right">
            <h3 className="va-ocr-cases-title">Casos de Uso Reales</h3>
            
            <div className="va-ocr-case">
              <div className="va-ocr-case-visual">
                <div className="va-ocr-doc">
                  <div className="va-ocr-scanner-line"></div>
                  <span className="doc-type">BAUCHER DE PAGO</span>
                </div>
                <div className="va-ocr-arrow">→</div>
                <div className="va-ocr-result">
                  <FaDatabase className="result-icon" />
                  <span>Base de Datos</span>
                </div>
              </div>
              <div className="va-ocr-case-info">
                <h4>Validación de Pagos</h4>
                <p>El asistente escanea el monto, fecha y banco del baucher, validándolo y guardándolo en tu base de datos para un control rápido y seguro.</p>
              </div>
            </div>

            <div className="va-ocr-case">
              <div className="va-ocr-case-visual">
                <div className="va-ocr-doc" style={{borderColor: 'rgba(94, 92, 230, 0.5)'}}>
                  <div className="va-ocr-scanner-line" style={{boxShadow: '0 0 10px rgba(94, 92, 230, 0.8)', background: 'rgba(94, 92, 230, 0.8)'}}></div>
                  <span className="doc-type" style={{color: 'rgba(94, 92, 230, 0.8)'}}>REPORTE COMPLEJO</span>
                </div>
                <div className="va-ocr-arrow">→</div>
                <div className="va-ocr-result" style={{color: '#5E5CE6', borderColor: 'rgba(94, 92, 230, 0.3)'}}>
                  <FaChartLine className="result-icon" />
                  <span>Resumen IA</span>
                </div>
              </div>
              <div className="va-ocr-case-info">
                <h4>Análisis de Datos</h4>
                <p>Un cliente envía un documento lleno de estadísticas. El asistente lee su contenido y redacta un resumen ejecutivo o informe detallado.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default VAOcrFeature;
