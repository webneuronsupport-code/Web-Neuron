import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import './ScrollProgress.css';

/**
 * Barra de avance de lectura, anclada al borde superior.
 *
 * Se anima scaleX en lugar de width: width provoca recálculo de layout en cada
 * frame, la transformación la resuelve el compositor.
 */
const ScrollProgress = () => {
  const bar = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35,
        },
      }
    );
  });

  return (
    <div className="progress" aria-hidden="true">
      <span className="progress-fill" ref={bar} />
    </div>
  );
};

export default ScrollProgress;
