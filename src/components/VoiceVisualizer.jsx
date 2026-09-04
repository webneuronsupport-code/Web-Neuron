import React from 'react';
import { motion } from 'framer-motion';

// Creamos un array de barras para el visualizador
const BARS = Array.from({ length: 45 });

const VoiceVisualizer = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '10%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1,
    }}>
      {/* Resplandor de fondo muy suave para darle una vibra cinematográfica */}
      <div style={{
        position: 'absolute',
        right: '0%',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.15) 0%, rgba(168,85,247,0.05) 40%, rgba(0,0,0,0) 70%)',
        filter: 'blur(50px)',
        zIndex: 0
      }} />

      {/* Contenedor de las barras del visualizador */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        height: '250px',
        zIndex: 1
      }}>
        {BARS.map((_, i) => {
          // Simulamos una forma de onda (más pequeña en los extremos, grande en el centro)
          const center = Math.floor(BARS.length / 2);
          const distanceToCenter = Math.abs(center - i);
          
          // La altura máxima depende de qué tan cerca del centro esté la barra
          const maxHeight = Math.max(20, 200 - (distanceToCenter * 8) + (Math.random() * 40)); 
          const minHeight = Math.max(10, maxHeight * 0.2);

          // Tiempos orgánicos para que no parezca mecánico
          const duration = 0.6 + (Math.random() * 0.7);
          
          return (
            <motion.div
              key={i}
              style={{
                width: '5px',
                borderRadius: '10px',
                // Gradiente vertical premium cian-púrpura
                background: 'linear-gradient(to top, rgba(56,189,248,0.8), rgba(168,85,247,1))',
                boxShadow: '0 0 15px rgba(56,189,248,0.4)',
              }}
              animate={{
                height: [minHeight, maxHeight, minHeight],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.03 // Pequeño retraso secuencial para crear efecto de onda fluida
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VoiceVisualizer;
