import React from 'react';
import './VAOcrFeature.css';
import ocrIdScan from '../assets/ocr_id_scan.jpg';
import ocrReceiptScan from '../assets/ocr_receipt_whatsapp.jpg';
import ocrExcelScan from '../assets/ocr_excel_chat.jpg';

const VAOcrFeature = () => {
  return (
    <section className="va-ocr-visual-section">
      <div className="shell">
        
        <div className="ocr-vis-header">
          <span className="ocr-vis-tag">TECNOLOGÍA OCR</span>
          <h2 className="ocr-vis-title">El Asistente Virtual hace el trabajo pesado por ti.</h2>
          <p className="ocr-vis-subtitle">
            Los clientes envían fotos, archivos de Excel, Word, PDFs, etc... Deja de perder el tiempo haciéndolo a mano.
          </p>
        </div>

        <div className="ocr-vis-grid">
          
          {/* Card 1 */}
          <div className="ocr-vis-card">
            <div className="ocr-vis-image-container">
              <img src={ocrIdScan} alt="Escaneo de Identificación" className="ocr-vis-img" />
            </div>
            <div className="ocr-vis-content">
              <h3>Identificaciones Oficiales</h3>
              <p>Tus clientes envían una foto de su ID y quieres extraer los datos automáticamente.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="ocr-vis-card">
            <div className="ocr-vis-image-container">
              <img src={ocrReceiptScan} alt="Escaneo de Imagen o Baucher" className="ocr-vis-img" />
            </div>
            <div className="ocr-vis-content">
              <h3>Imágenes y Bauchers</h3>
              <p>Escanea una imagen y extrae el texto dentro de ella con total precisión.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="ocr-vis-card">
            <div className="ocr-vis-image-container">
              <img src={ocrExcelScan} alt="Análisis de Excel" className="ocr-vis-img ocr-vis-img-zoom" />
            </div>
            <div className="ocr-vis-content">
              <h3>Excels y PDFs</h3>
              <p>Escanea un archivo de Excel con métricas, números y estadísticas, y tu asistente hará un informe completo.</p>
            </div>
          </div>

        </div>

        <div className="ocr-vis-use-cases">
          <h3>Ejemplos de Casos de Uso</h3>
          
          <div className="ocr-vis-cases-container">
            <div className="ocr-vis-case">
              <div className="ocr-vis-case-icon">💰</div>
              <div>
                <h4>Validación de Pagos</h4>
                <p>Un cliente envía un baucher de pago: El asistente escanea el monto depositado, la fecha, de qué banco fue realizado y lo guarda en una base de datos para que lleves el control rápido y seguro.</p>
              </div>
            </div>
            
            <div className="ocr-vis-case">
              <div className="ocr-vis-case-icon">📊</div>
              <div>
                <h4>Análisis de Reportes</h4>
                <p>Un cliente envía un documento con estadísticas complejas: El asistente tiene la capacidad de leer su contenido y hacer un informe o resumen ejecutivo de los datos en segundos.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VAOcrFeature;
