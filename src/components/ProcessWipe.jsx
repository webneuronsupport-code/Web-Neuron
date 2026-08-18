import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import './ProcessWipe.css';

const ProcessWipe = () => {
  const root = useRef(null);

  useGSAP(() => {
    // Buscamos los elementos de Services globalmente
    const servicesSection = document.querySelector('#servicios');
    const leftCol = document.querySelector('.svc-list');
    const rightCol = document.querySelector('.svc-rail');

    if (!servicesSection) return;

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root.current,
        start: 'top bottom', // Cuando este wipe asoma por abajo
        end: 'bottom bottom', // Cuando este wipe termina de entrar (200vh de scroll)
        scrub: 0.6,
        pin: servicesSection, // Congelamos la sección Services
        pinSpacing: false, // NO añadimos padding, porque este componente ProcessWipe ES el padding!
        invalidateOnRefresh: true,
      },
    });

    // Aseguramos que las columnas de Services sean opacas para tapar el bloque rojo
    if (leftCol && rightCol) {
      tl.set([leftCol, rightCol], { backgroundColor: 'var(--bg)' }, 0);
    }

    // La línea de tiempo completa va del 0 al 1.
    // Del 0.0 al 0.5 (los primeros 100vh de scroll), el bloque rojo sube naturalmente por detrás.
    // Hacemos que las cortinas empiecen a abrirse INMEDIATAMENTE y tarden todo el scroll (duration 1)
    if (leftCol && rightCol) {
      tl.to(leftCol, { xPercent: -100, duration: 1 }, 0.0);
      tl.to(rightCol, { xPercent: 100, duration: 1 }, 0.0);
    }

  }, { scope: root });

  return (
    <div className="pwipe" ref={root} aria-hidden="true">
      {/* Este contenedor ocupa el viewport. Como el componente pwipe es de 200vh, 
          este contenedor se quedará "pegado" arriba de pwipe mientras scroleas. */}
      <div className="pwipe-stage">
        <div className="pwipe-red-block">
          <div className="pwipe-content">
            <span className="pwipe-label">Proceso</span>
            <p className="pwipe-text">Tres pasos. Catorce días. Cero sorpresas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessWipe;
