import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import './AIOrb.css';

const AIOrb = () => {
  const container = useRef(null);
  const sphere = useRef(null);
  
  // Refs for 3D rings
  const rings = useRef([]);
  const core = useRef(null);
  const dataLines = useRef([]);

  // Evitar acumulación de refs en re-renderizados de React StrictMode
  rings.current = [];
  dataLines.current = [];
  const neuralLayers = useRef([]);
  neuralLayers.current = [];

  useGSAP(() => {
    // 1. Rotación general de toda la esfera en 3D
    gsap.to(sphere.current, {
      rotationY: 360,
      rotationX: 20,
      rotationZ: -10,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });

    // 2. Animación de cada anillo individual
    rings.current.forEach((ring, index) => {
      // Alternar direcciones y velocidades para hacer el caos controlado de Jarvis
      const dir = index % 2 === 0 ? 1 : -1;
      const speed = 15 + (index * 5);
      
      gsap.to(ring, {
        rotationZ: 360 * dir,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
    });

    // 3. Latido del núcleo brillante central
    gsap.to(core.current, {
      scale: 1.2,
      opacity: 0.8,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
    });

    // 4. Rayos de datos (Data lines / Filamentos Neuronales)
    dataLines.current.forEach((line, i) => {
      // Parpadeo de la opacidad
      gsap.to(line, {
        opacity: () => 0.1 + Math.random() * 0.9,
        duration: () => 0.1 + Math.random() * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        delay: Math.random() * 2
      });

      // Efecto de pulso eléctrico viajando por el filamento usando strokeDashoffset
      if (line.tagName === 'path') {
        const length = line.getTotalLength ? line.getTotalLength() : 1000;
        gsap.set(line, { strokeDasharray: `${length/4} ${length}` });
        gsap.fromTo(line, 
          { strokeDashoffset: length },
          {
            strokeDashoffset: -length,
            duration: () => 1.5 + Math.random() * 3,
            repeat: -1,
            ease: 'none',
            delay: Math.random() * 3
          }
        );
      }
    });

    // 5. Mover los filamentos libres por toda la esfera
    neuralLayers.current.forEach((layer, index) => {
      // Rotar cada capa entera en 3D en diferentes direcciones
      gsap.to(layer, {
        rotationX: () => 360 * (Math.random() > 0.5 ? 1 : -1),
        rotationY: () => 360 * (Math.random() > 0.5 ? 1 : -1),
        rotationZ: () => 360 * (Math.random() > 0.5 ? 1 : -1),
        duration: () => 30 + Math.random() * 40,
        repeat: -1,
        ease: 'none',
      });
    });

  }, { scope: container });

  // Array para generar anillos
  const ringAngles = [
    { x: 75, y: 0 },
    { x: 75, y: 45 },
    { x: 75, y: 90 },
    { x: 75, y: 135 },
    { x: 0, y: 0 }, // Ecuador
    { x: 45, y: 0 },
    { x: -45, y: 0 }
  ];

  return (
    <div className="jarvis-wrapper" ref={container}>
      {/* Luz ambiental difusa trasera */}
      <div className="jarvis-ambient-glow"></div>

      {/* Escena 3D */}
      <div className="jarvis-scene">
        <div className="jarvis-sphere" ref={sphere}>
          
          {/* Núcleo Central Intenso */}
          <div className="jarvis-core" ref={core}>
            <div className="core-inner"></div>
            <div className="core-outer"></div>
          </div>

          {/* Red Neuronal de Filamentos en el espacio 3D conectando puntos aleatorios */}
          <div className="jarvis-data-network">
            {/* Capas de filamentos en diferentes profundidades Z */}
            {[-100, -50, 0, 50, 100].map((zOffset, index) => (
              <svg 
                key={`layer-${index}`}
                className="neural-layer" 
                viewBox="0 0 500 500" 
                ref={el => { if(el) neuralLayers.current.push(el) }}
                style={{ 
                  transform: `translateZ(${zOffset}px)`,
                  transformOrigin: '50% 50%'
                }}
              >
                {/* Generar 15 caminos neuronales curvados por cada capa */}
                {[...Array(15)].map((_, i) => {
                  const x1 = 100 + Math.random() * 300;
                  const y1 = 100 + Math.random() * 300;
                  const cx1 = 50 + Math.random() * 400;
                  const cy1 = 50 + Math.random() * 400;
                  const cx2 = 50 + Math.random() * 400;
                  const cy2 = 50 + Math.random() * 400;
                  const x2 = 100 + Math.random() * 300;
                  const y2 = 100 + Math.random() * 300;
                  const pathD = `M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
                  
                  return (
                    <g key={i}>
                      <path 
                        d={pathD} 
                        fill="none" 
                        stroke={Math.random() > 0.5 ? "#FFB347" : "#FF6B00"} 
                        strokeWidth={Math.random() * 2} 
                        ref={el => { if(el) dataLines.current.push(el) }}
                        className="neural-path"
                        style={{ filter: 'drop-shadow(0 0 4px rgba(255, 179, 71, 0.8))' }}
                      />
                      {/* Nodos Brillantes en los extremos de las neuronas */}
                      <circle cx={x1} cy={y1} r={1.5 + Math.random() * 2} fill="#FFF2D9" style={{ filter: 'drop-shadow(0 0 6px #FF9900)' }} />
                      <circle cx={x2} cy={y2} r={1.5 + Math.random() * 2} fill="#FFF2D9" style={{ filter: 'drop-shadow(0 0 6px #FF9900)' }} />
                    </g>
                  );
                })}
              </svg>
            ))}
          </div>

          {/* Anillos 3D generados */}
          {ringAngles.map((angle, i) => (
            <div 
              key={i}
              className="jarvis-ring-container"
              style={{ transform: `rotateX(${angle.x}deg) rotateY(${angle.y}deg)` }}
            >
              <div className={`jarvis-ring type-${i % 3}`} ref={el => rings.current[i] = el}>
                <svg viewBox="0 0 500 500" width="100%" height="100%">
                  {/* Anillo base discontinuo grueso */}
                  <circle 
                    cx="250" cy="250" r="240" 
                    fill="none" stroke="#FF9900" strokeWidth={i % 2 === 0 ? "4" : "1"} 
                    strokeDasharray={i % 3 === 0 ? "50 10 5 10 100 20" : "150 20 10 20"} 
                    opacity="0.8" 
                  />
                  {/* Anillo secundario interno */}
                  <circle 
                    cx="250" cy="250" r="230" 
                    fill="none" stroke="#FFD699" strokeWidth="1" 
                    strokeDasharray="2 8" 
                    opacity="0.5" 
                  />
                  {/* Marcas de compás / Nodos en los anillos */}
                  <circle cx="250" cy="10" r="4" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="250" cy="490" r="4" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="10" cy="250" r="4" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="490" cy="250" r="4" fill="#FFFFFF" opacity="0.9" />
                  
                  {/* Detalles técnicos extra */}
                  {i % 2 === 0 && (
                    <circle cx="250" cy="250" r="245" fill="none" stroke="#FF6B00" strokeWidth="1" strokeDasharray="1 10" opacity="0.6"/>
                  )}
                </svg>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default AIOrb;
