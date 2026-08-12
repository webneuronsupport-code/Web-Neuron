import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import './SectionHeading.css';

/**
 * Cabecera de sección con revelado por líneas.
 *
 * Se repite en cada bloque de la página, así que la animación vive aquí una
 * sola vez en lugar de copiarse cuatro veces.
 */
const SectionHeading = ({ eyebrow, title, lede, align = 'center' }) => {
  const root = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 82%' },
      });

      tl.from(root.current.querySelector('.sh-eyebrow'), {
        autoAlpha: 0,
        y: 14,
        duration: 0.8,
      });

      // El tween del titular es independiente del timeline y lleva su propio
      // ScrollTrigger: onSplit se vuelve a ejecutar cuando cargan las fuentes
      // o cambia el ancho, y un tween añadido a un timeline ya consumido se
      // quedaría congelado en su estado inicial, con el texto fuera de la
      // máscara.
      SplitText.create(root.current.querySelector('.sh-title'), {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 106,
            duration: 1.25,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: root.current, start: 'top 82%' },
          });
        },
      });

      const ledeEl = root.current.querySelector('.sh-lede');
      if (ledeEl) {
        tl.from(ledeEl, { autoAlpha: 0, y: 18, duration: 0.9 }, 0.45);
      }
    },
    { scope: root }
  );

  return (
    <header className={`sh sh--${align}`} ref={root}>
      {eyebrow && <span className="eyebrow sh-eyebrow">{eyebrow}</span>}
      {/* El degradado va en el span interno, no en el h2. SplitText mueve el
          texto a divs por línea, y esos divs heredan
          -webkit-text-fill-color: transparent del padre: el texto quedaría
          invisible y el background-clip del h2 sin nada que recortar. En un
          hijo, cada fragmento de línea conserva su propio degradado. */}
      <h2 className="headline sh-title">
        <span className="grad-text">{title}</span>
      </h2>
      {lede && <p className="lede sh-lede">{lede}</p>}
    </header>
  );
};

export default SectionHeading;
