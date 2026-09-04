import React from 'react';
import { motion } from 'framer-motion';

const NeuralOrb = () => {
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
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1,
    }}>
      {/* Contenedor del orbe con desenfoque extremo para suavizar los gradientes */}
      <div style={{
        position: 'relative',
        width: '50vw',
        height: '50vw',
        maxWidth: '800px',
        maxHeight: '800px',
        marginRight: '-10vw', // Para asomarse parcialmente desde la derecha
        filter: 'blur(80px)',
        transform: 'translate3d(0,0,0)'
      }}>
        {/* Capa Base: Azul Profundo */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '80%',
            height: '80%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14,165,233,0.8) 0%, rgba(15,23,42,0) 70%)',
            mixBlendMode: 'screen'
          }}
        />

        {/* Capa Secundaria: Púrpura/Magenta pulsante */}
        <motion.div
          animate={{
            scale: [1.2, 0.9, 1.2],
            x: [0, 80, -80, 0],
            y: [0, -80, 80, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '60%',
            height: '60%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.7) 0%, rgba(15,23,42,0) 70%)',
            mixBlendMode: 'screen'
          }}
        />

        {/* Capa Central: Cian brillante rápida */}
        <motion.div
          animate={{
            scale: [0.8, 1.3, 0.8],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '30%',
            left: '30%',
            width: '40%',
            height: '40%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.9) 0%, rgba(15,23,42,0) 60%)',
            mixBlendMode: 'screen'
          }}
        />
        
        {/* Núcleo interior (Simula actividad o "pensamiento") */}
        <motion.div
          animate={{
            scale: [0.9, 1.15, 0.9],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '40%',
            left: '40%',
            width: '20%',
            height: '20%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 50%)',
            mixBlendMode: 'screen'
          }}
        />
      </div>
      
      {/* Elementos vectoriales nítidos: Círculos tipo "ondas de voz" */}
      <svg 
        style={{
          position: 'absolute',
          right: '-5vw',
          width: '50vw',
          height: '50vw',
          maxWidth: '800px',
          maxHeight: '800px',
          pointerEvents: 'none',
          opacity: 0.6,
          zIndex: 2
        }}
        viewBox="0 0 100 100"
      >
        {/* Onda 1 */}
        <motion.circle 
          cx="50" cy="50" r="40" 
          fill="none" 
          stroke="rgba(56,189,248,0.6)" 
          strokeWidth="0.15"
          animate={{ r: [35, 45, 35], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Onda 2 */}
        <motion.circle 
          cx="50" cy="50" r="30" 
          fill="none" 
          stroke="rgba(168,85,247,0.8)" 
          strokeWidth="0.3"
          animate={{ r: [25, 38, 25], opacity: [0.5, 0.1, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Onda 3 (Interior rapida) */}
        <motion.circle 
          cx="50" cy="50" r="20" 
          fill="none" 
          stroke="rgba(255,255,255,0.4)" 
          strokeWidth="0.5"
          animate={{ r: [18, 22, 18], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default NeuralOrb;
