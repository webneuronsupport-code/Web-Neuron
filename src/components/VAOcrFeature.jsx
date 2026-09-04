import React from 'react';
import './VAOcrFeature.css';
import ocrIdScan from '../assets/ocr_id_scan.jpg';
import ocrReceiptScan from '../assets/ocr_receipt_whatsapp.jpg';
import ocrExcelScan from '../assets/ocr_excel_chat.jpg';

const VAOcrFeature = () => {
  return (
    <section className="va-ocr-bento-section">
      <div className="shell">
        
        <div className="ocr-bento-header">
          <span className="ocr-bento-tag">TECNOLOGÍA OCR</span>
          <h2 className="ocr-bento-title">El Asistente hace el trabajo pesado.</h2>
          <p className="ocr-bento-subtitle">
            Deja de procesar imágenes y documentos a mano. La IA extrae texto, datos y métricas con precisión milimétrica en milisegundos.
          </p>
        </div>

        <div className="ocr-bento-grid">
          
          {/* Tarjeta Principal (Identificaciones) */}
          <div className="ocr-bento-card card-main">
            <div className="ocr-bento-content">
              <h3>Identificaciones Oficiales</h3>
              <p>Tus clientes envían una foto de su ID y el sistema extrae el nombre, fecha y datos clave para el KYC de inmediato.</p>
            </div>
            <div className="ocr-bento-media">
              <img src={ocrIdScan} alt="Escaneo de Identificación" />
              <div className="scanning-laser"></div>
            </div>
          </div>

          {/* Tarjeta Secundaria 1 (Bauchers) */}
          <div className="ocr-bento-card card-secondary-top">
            <div className="ocr-bento-content">
              <h3>Bauchers</h3>
              <p>Escanea pagos y crúzalos con tu base de datos al instante.</p>
            </div>
            <div className="ocr-bento-media">
              <img src={ocrReceiptScan} alt="Bauchers y Pagos" />
              <div className="scanning-laser"></div>
            </div>
          </div>

          {/* Tarjeta de Casos de Uso (Integrada) */}
          <div className="ocr-bento-card card-use-cases">
            <div className="use-cases-inner">
              <h3>Casos de Uso Reales</h3>
              <ul className="uc-list">
                <li>
                  <span className="uc-icon">💰</span>
                  <div className="uc-text">
                    <strong>Validación de Pagos</strong>
                    <span>Registro automático de transferencias y bauchers.</span>
                  </div>
                </li>
                <li>
                  <span className="uc-icon">📊</span>
                  <div className="uc-text">
                    <strong>Informes Financieros</strong>
                    <span>Análisis ejecutivo a partir de tablas en PDF.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Tarjeta Secundaria 2 (Excels) */}
          <div className="ocr-bento-card card-secondary-bottom">
            <div className="ocr-bento-content">
              <h3>Excels y PDFs</h3>
              <p>Lee estadísticas complejas, números en bruto y hojas de cálculo para generar resúmenes ejecutivos automáticamente sin tocar una sola celda.</p>
            </div>
            <div className="ocr-bento-media">
              <img src={ocrExcelScan} alt="Análisis de Excel" />
              <div className="scanning-laser"></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default VAOcrFeature;
