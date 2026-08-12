import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import './SectionHeading.css';

/**
 * Cabecera de sección con revelado por líneas.
 *
 * Se repite en cada bloque, así que la animación vive aquí una sola vez.
 */
const SectionHeading = ({ label, title, lede, align = 'left' }) => {
  const root = useRef(null);

  useGSAP(
    () => {
      const trigger = { trigger: root.current, start: 'top 84%' };

      gsap.from(root.current.querySelector('.sh-label'), {
        autoAlpha: 0,
        y: 12,
        duration: 0.8,
        scrollTrigger: trigger,
      });

      // El tween del titular es independiente y lleva su propio ScrollTrigger:
      // onSplit se reejecuta al cargar las fuentes o cambiar el ancho, y uno
      // colgado de un timeline ya consumido se quedaría congelado.
      SplitText.create(root.current.querySelector('.sh-title'), {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 108,
            duration: 1.3,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: trigger,
          });
        },
      });

      const ledeEl = root.current.querySelector('.sh-lede');
      if (ledeEl) {
        gsap.from(ledeEl, {
          autoAlpha: 0,
          y: 16,
          duration: 0.9,
          delay: 0.25,
          scrollTrigger: trigger,
        });
      }
    },
    { scope: root }
  );

  return (
    <header className={`sh sh--${align}`} ref={root}>
      {label && <span className="label sh-label">{label}</span>}
      {/* El titular no lleva degradado: SplitText mueve el texto a divs por
          línea, y esos heredarían el text-fill transparente del padre. */}
      <h2 className="heading sh-title">{title}</h2>
      {lede && <p className="lede sh-lede">{lede}</p>}
    </header>
  );
};

export default SectionHeading;
