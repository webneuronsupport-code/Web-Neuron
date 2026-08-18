import React, { useRef, useEffect } from 'react';
import './DriftWall.css';

const DriftWall = ({
  items = [],
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  tilt = 16,
  turn = -14,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = "up",
  variance = 0.45,
  parallax = 0.6,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  overlayColor = "#060010",
  radius = 14,
  roll = 0,
  pauseOnHover = false,
  grayscale = false
}) => {
  const containerRef = useRef(null);
  const trackRefs = useRef([]);
  const animationRef = useRef(null);
  const hoveredRef = useRef(false);

  // Duplicar items suficientes para asegurar scroll infinito
  const infiniteItems = [...items, ...items, ...items, ...items];

  useEffect(() => {
    // Configuración de variables CSS
    if (containerRef.current) {
      containerRef.current.style.setProperty('--dw-perspective', `${perspective}px`);
      containerRef.current.style.setProperty('--dw-tile-w', `${tileWidth}px`);
      containerRef.current.style.setProperty('--dw-tile-h', `${tileHeight}px`);
      containerRef.current.style.setProperty('--dw-gap', `${gap}px`);
      containerRef.current.style.setProperty('--dw-radius', `${radius}px`);
      containerRef.current.style.setProperty('--dw-lift', `${lift}px`);
      containerRef.current.style.setProperty('--dw-dim', `${dim}`);
      containerRef.current.style.setProperty('--dw-gray', grayscale ? '1' : '0');
      containerRef.current.style.setProperty('--dw-overlay', overlayColor);
    }

    let positions = Array(columns).fill(0);
    const tileFullHeight = tileHeight + gap;
    const scrollMax = tileFullHeight * items.length;

    const animate = () => {
      if (!pauseOnHover || !hoveredRef.current) {
        trackRefs.current.forEach((track, colIndex) => {
          if (!track) return;

          // Parallax variance effect
          const colSpeed = speed * (1 + (colIndex % 2 === 0 ? variance : -variance));
          const step = (colSpeed / 60) * (direction === 'up' ? -1 : 1);
          
          positions[colIndex] += step;

          // Reset infinito
          if (positions[colIndex] <= -scrollMax) positions[colIndex] = 0;
          if (positions[colIndex] >= scrollMax) positions[colIndex] = 0;

          // Efecto de parallax extra basado en índice
          const zOffset = (colIndex % 2 === 0 ? depth : -depth) * parallax;

          track.style.transform = `translateY(${positions[colIndex]}px) translateZ(${zOffset}px)`;
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [items, columns, tileHeight, gap, speed, direction, pauseOnHover, variance, parallax, depth]);

  return (
    <div 
      className="drift-wall" 
      ref={containerRef}
      onMouseEnter={() => hoveredRef.current = true}
      onMouseLeave={() => hoveredRef.current = false}
    >
      <div 
        className="drift-wall__plane" 
        style={{ 
          transform: `translate(-50%, -50%) rotateX(${tilt}deg) rotateY(${turn}deg) rotateZ(${roll}deg)` 
        }}
      >
        {Array.from({ length: columns }).map((_, colIndex) => {
          // Shuffle items per column to make it look random and dynamic
          const colItems = [...infiniteItems].sort(() => Math.random() - 0.5);

          return (
            <div className="drift-wall__col" key={colIndex}>
              <div 
                className="drift-wall__track" 
                ref={el => trackRefs.current[colIndex] = el}
              >
                {colItems.map((item, itemIndex) => (
                  <div className="drift-wall__tile" key={`${colIndex}-${itemIndex}`}>
                    <span className="drift-wall__inner">
                      <img src={item.image} alt={item.title} />
                      <span className="drift-wall__overlay" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriftWall;
