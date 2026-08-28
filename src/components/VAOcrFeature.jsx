import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import './VAOcrFeature.css';

const VAOcrFeature = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    const texts = gsap.utils.toArray('.ocr-huge-text');
    
    // We already set opacity 0 in CSS, but GSAP needs to know the starting values for the animation
    gsap.set(texts, { opacity: 0, y: 50, scale: 0.95 });

    texts.forEach((text, i) => {
      // Using a multiplier of 3 to ensure distinct phases:
      // i*3 + 0: Fade in
      // i*3 + 1: Hold
      // i*3 + 2: Fade out
      tl.to(text, { opacity: 1, y: 0, scale: 1, duration: 1 }, i * 3)
        .to(text, { opacity: 1, duration: 1.5 }, i * 3 + 1)
        .to(text, { opacity: 0, y: -50, scale: 1.05, duration: 1 }, i * 3 + 2.5);
    });

  }, { scope: containerRef });

  return (
    <section className="va-ocr-minimal" ref={containerRef}>
      <div className="va-ocr-sticky">
        
        <h2 className="ocr-huge-text" style={{ color: '#ff9f0a' }}>Tecnología OCR.</h2>
        
        <h2 className="ocr-huge-text">Los clientes envían fotos, Excels y PDFs.</h2>
        
        <h2 className="ocr-huge-text">Tu asistente hace el trabajo por ti.</h2>
        
        <h2 className="ocr-huge-text">Extrae datos de Identificaciones Oficiales.</h2>
        
        <h2 className="ocr-huge-text">Escanea y valida comprobantes de pago.</h2>
        
        <h2 className="ocr-huge-text">Analiza métricas complejas al instante.</h2>

        <h2 className="ocr-huge-text" style={{ color: '#ff3b30' }}>Deja de perder el tiempo a mano.</h2>

      </div>
    </section>
  );
};

export default VAOcrFeature;
