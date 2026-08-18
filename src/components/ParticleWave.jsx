import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Wave = () => {
  const materialRef = useRef();

  // Particle parameters
  const sep = 0.2; 
  const xCount = 250; 
  const zCount = 120; 
  
  const positions = useMemo(() => {
    const positions = new Float32Array(xCount * zCount * 3);
    let i = 0;

    for (let ix = 0; ix < xCount; ix++) {
      for (let iz = 0; iz < zCount; iz++) {
        positions[i] = ix * sep - (xCount * sep) / 2; // x
        positions[i + 1] = 0; // y (base, se anima en el shader)
        positions[i + 2] = iz * sep - (zCount * sep) / 2; // z
        i += 3;
      }
    }
    return positions;
  }, [xCount, zCount, sep]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 }
        }}
        vertexShader={`
          uniform float uTime;
          varying vec3 vPosition;
          
          void main() {
            vec3 pos = position;
            
            // Movimiento de onda de gran escala calculado en la GPU (Cero costo de CPU)
            float vx = pos.x;
            float vz = pos.z;
            
            pos.y = sin(vx * 0.2 + uTime * 0.5) * 2.0 + 
                    cos(vz * 0.25 + uTime * 0.4) * 1.5 +
                    sin(sqrt(vx * vx + vz * vz) * 0.1 - uTime * 0.8) * 1.0;

            vPosition = pos;

            // Pulso de escala basado en altura
            float scale = (pos.y + 3.0) * 0.5;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = scale * (250.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vPosition;
          void main() {
            // Circular particle with soft edge
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            float alpha = (0.5 - d) * 2.0;
            
            // Gradiente dinámico en X (Cyan -> Púrpura) pero a gran escala
            float mixVal = smoothstep(-20.0, 20.0, vPosition.x);
            vec3 color1 = vec3(0.0, 0.8, 1.0); // Cyan brillante
            vec3 color2 = vec3(0.6, 0.0, 1.0); // Púrpura intenso
            vec3 finalColor = mix(color1, color2, mixVal);
            
            // Variación de brillo por altura
            float heightIntensity = smoothstep(-1.0, 3.0, vPosition.y);
            finalColor += vec3(0.15) * heightIntensity; // picos sutilmente más brillantes

            // Desvanecer bordes en Z para que no se vea el corte de la grilla
            float zFade = smoothstep(20.0, 0.0, abs(vPosition.z));
            float xFade = smoothstep(30.0, 0.0, abs(vPosition.x));

            gl_FragColor = vec4(finalColor, alpha * 0.6 * zFade * xFade);
          }
        `}
      />
    </points>
  );
};

const ParticleWave = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <Canvas camera={{ position: [0, 8, 18], fov: 65 }}>
        <fog attach="fog" args={['#050010', 10, 40]} />
        <Wave />
      </Canvas>
    </div>
  );
};

export default ParticleWave;
