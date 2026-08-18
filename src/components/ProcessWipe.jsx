import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import './ProcessWipe.css';

const ProcessWipe = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // El efecto de cortinas SOLO existe en escritorio, y no por gusto: en una
      // columna .svc-rail está oculto, así que no hay cortina derecha que abrir
      // y anclar Services no aporta nada. Peor aún, al anclar, ScrollTrigger
      // pasa la sección a position: fixed y le fija el ancho medido — en móvil
      // se quedaba en 0 px e inutilizaba la sección entera.
      //
      // En móvil no hace falta JavaScript: el bloque rojo ya sube solo, porque
      // .pwipe-stage es sticky dentro de un carril de 200vh.
      mm.add(
        {
          isDesktop: '(min-width: 901px)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { isDesktop, reduce } = ctx.conditions;
          if (!isDesktop || reduce) return;

          const servicesSection = document.querySelector('#servicios');
          const leftCol = document.querySelector('.svc-list');
          const rightCol = document.querySelector('.svc-rail');

          if (!servicesSection || !leftCol || !rightCol) return;

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom', // cuando este wipe asoma por abajo
              end: 'bottom bottom', // cuando termina de entrar (200vh de scroll)
              scrub: 0.6,
              pin: servicesSection, // congelamos la sección Services
              pinSpacing: false, // este componente ES el espaciador
              invalidateOnRefresh: true,
            },
          });

          // Las columnas deben ser opacas para tapar el bloque rojo de detrás.
          tl.set([leftCol, rightCol], { backgroundColor: 'var(--bg)' }, 0);

          // Las cortinas se abren durante todo el recorrido mientras el rojo
          // sube por detrás.
          tl.to(leftCol, { xPercent: -100, duration: 1 }, 0);
          tl.to(rightCol, { xPercent: 100, duration: 1 }, 0);
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

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
