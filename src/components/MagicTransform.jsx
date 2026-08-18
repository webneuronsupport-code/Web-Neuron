import { useRef } from 'react';
import { Atom } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import './MagicTransform.css';

const PILLS = [
  // Colores ajustados a la imagen de referencia (verde musgo, rosa, azul, naranja oscuro, morado, gris)
  { color: '#7b8744', delay: 0, scale: 0.85, top: '8%', finalX: 10, finalRot: -12 },
  { color: '#b43274', delay: 0.3, scale: 0.9, top: '25%', finalX: 35, finalRot: -6 },
  { color: '#2d6ea5', delay: 0.1, scale: 1, top: '42%', finalX: 55, finalRot: -1 },
  { color: '#ab652c', delay: 0.5, scale: 1.05, top: '59%', finalX: 65, finalRot: 4 },
  { color: '#4f2b66', delay: 0.2, scale: 0.95, top: '76%', finalX: 40, finalRot: 8 },
  { color: '#3b3d41', delay: 0.6, scale: 0.85, top: '93%', finalX: 15, finalRot: 12 },
];

const PARTICLES = Array.from({ length: 15 }).map((_, i) => ({
  color: ['#a0a34b', '#b93085', '#3a72a5', '#c57833', '#5c3a7a'][Math.floor(Math.random() * 5)],
  top: `${10 + Math.random() * 80}%`,
  delay: Math.random() * 2,
  size: Math.random() > 0.5 ? 8 : 12
}));

const MagicTransform = () => {
  const containerRef = useRef(null);
  const scannerRef = useRef(null);
  const iconRef = useRef(null);

  useGSAP(() => {
    // Escáner láser
    gsap.to(scannerRef.current, {
      y: 280, // altura aproximada de la tarjeta menos padding
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // Brillo pulsante del icono
    gsap.to(iconRef.current, {
      boxShadow: '0 0 30px rgba(163, 76, 255, 0.6), inset 0 0 10px rgba(163, 76, 255, 0.3)',
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // Animación del Carrusel de Documentos
    gsap.fromTo('.mt-card-doc',
      { x: 0 },
      {
        x: 600, // Viajan 500px de la clipping zone + 100px extra para asegurar que desaparezcan por completo
        duration: 4.5,
        ease: "none",
        stagger: {
          each: 1.6,
          repeat: -1
        }
      }
    );

    // Animación Carrusel / Abanico para Píldoras
    PILLS.forEach((pill, i) => {
      const tl = gsap.timeline({ repeat: -1, delay: pill.delay });
      // Calcular la distancia en Y desde su posición 'top' hasta el centro de la tarjeta (aprox 160px de alto)
      const startY = 160 - (parseFloat(pill.top) / 100 * 320);

      tl.fromTo(`.mt-pill-${i}`, 
        { 
          x: -120, // Salen desde adentro del centro (ícono de WN)
          y: startY, 
          scale: 0, 
          opacity: 0, 
          rotation: (Math.random() - 0.5) * 60 // Rotación aleatoria inicial
        },
        { 
          x: pill.finalX, 
          y: 0, // Vuelven a su Y original (top)
          scale: pill.scale, 
          opacity: 1, 
          rotation: pill.finalRot, // Terminan en su ángulo del arco
          duration: 1.2, 
          ease: "back.out(1.2)" 
        }
      )
      .to(`.mt-pill-${i}`, { 
        x: '+=80', 
        opacity: 0, 
        duration: 0.6, 
        ease: "power2.in" 
      }, "+=1.5");
    });

    // Animación para Partículas desde el centro
    PARTICLES.forEach((p, i) => {
      const pTl = gsap.timeline({ repeat: -1, delay: p.delay });
      const startY = 160 - (parseFloat(p.top) / 100 * 320);
      
      pTl.fromTo(`.mt-particle-${i}`,
        { x: -120, y: startY, scale: 0, opacity: 0 },
        { 
          x: 20 + Math.random() * 200, 
          y: (Math.random() - 0.5) * 120, 
          scale: 1, 
          opacity: 0.6 + Math.random() * 0.4, 
          rotation: Math.random() * 360,
          duration: 1 + Math.random(), 
          ease: "power3.out" 
        }
      )
      .to(`.mt-particle-${i}`, { opacity: 0, x: '+=20', duration: 0.4 }, "-=0.4");
    });

  }, { scope: containerRef });

  return (
    <div className="mt-scale-wrapper">
      <div className="mt-container" ref={containerRef}>
        
        {/* 1. y 2. Zona de Entrada y Procesamiento */}
      <div className="mt-input-stage">
        
        {/* Zona de recorte (Clipping Zone): Todo lo que pase del borde derecho desaparece */}
        <div className="mt-clipping-zone">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`mt-card mt-card-doc mt-doc-${i}`}>
              <div className="mt-doc-head"></div>
              <div className="mt-doc-line w-full"></div>
              <div className="mt-doc-line w-3-4"></div>
              <div className="mt-doc-line w-full"></div>
              <div className="mt-doc-line w-5-6"></div>
              
              <div className="mt-doc-boxes">
                <div className="mt-doc-box"></div>
                <div className="mt-doc-box"></div>
              </div>
              
              <div className="mt-doc-line w-full"></div>
              <div className="mt-doc-line w-3-4"></div>
              <div className="mt-doc-line w-5-6"></div>
              <div className="mt-doc-line w-1-2"></div>
            </div>
          ))}
        </div>

        {/* Tarjeta Central (El Escáner Mágico Fijo) */}
        <div className="mt-card mt-card-center">
          {/* Clip inner wrapper para evitar que el ruido y scanner salgan de las esquinas redondeadas */}
          <div className="mt-card-inner-clip">
            {/* Efecto de Ruido Estático */}
            <div className="mt-noise-bg"></div>
            
            {/* Línea del escáner láser */}
            <div className="mt-scanner-line" ref={scannerRef}>
              <div className="mt-scanner-glow"></div>
            </div>
          </div>

          {/* Icono Web Neuron en el borde derecho (fuera del clip para que se vea completo) */}
          <div className="mt-atom-icon" ref={iconRef}>
            <img src={`\${import.meta.env.BASE_URL}2_clean2.png`} alt="WN" style={{ height: '20px', width: 'auto', opacity: 0.9 }} />
          </div>
        </div>
      </div>

      {/* 3. Salida de Datos (Píldoras y partículas) */}
      <div className="mt-output-stream">
        {PARTICLES.map((p, i) => (
          <div 
            key={`p-${i}`} 
            className={`mt-particle mt-particle-${i}`}
            style={{ 
              backgroundColor: p.color, 
              top: p.top,
              width: p.size,
              height: p.size,
              borderRadius: p.size > 10 ? '4px' : '50%'
            }}
          ></div>
        ))}

        {PILLS.map((pill, i) => (
          <div key={`pill-${i}`} className={`mt-pill-group mt-pill-${i}`} style={{ top: pill.top }}>
            <div className="mt-pill-bg" style={{ backgroundColor: pill.color }}></div>
            <div className="mt-pill-content">
              <div className="mt-pill-line w-1-2"></div>
              <div className="mt-pill-line w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default MagicTransform;
