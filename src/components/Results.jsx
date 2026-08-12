import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import SectionHeading from './SectionHeading';
import './Results.css';

const STATS = [
  { value: 68, suffix: '%', label: 'menos tiempo en tareas repetitivas', decimals: 0 },
  { value: 3.4, suffix: '×', label: 'más conversaciones atendidas', decimals: 1 },
  { value: 14, suffix: ' días', label: 'de media hasta producción', decimals: 0 },
  { value: 24, suffix: '/7', label: 'atención sin ampliar plantilla', decimals: 0 },
];

const Results = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      gsap.utils.toArray('.res-card').forEach((card, i) => {
        const numEl = card.querySelector('.res-num-value');
        const target = Number(numEl.dataset.value);
        const decimals = Number(numEl.dataset.decimals);

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        });

        tl.from(card, { autoAlpha: 0, y: 48, duration: 1, delay: i * 0.08 });

        if (reduce) {
          // Sin cuenta atrás: el número aparece ya en su valor final.
          numEl.textContent = target.toFixed(decimals);
        } else {
          // Se anima un objeto intermedio y se escribe el texto en onUpdate.
          // GSAP no puede interpolar el contenido de un nodo de texto, así que
          // el número vive en un contador aparte.
          const counter = { n: 0 };
          tl.to(
            counter,
            {
              n: target,
              duration: 1.9,
              ease: 'power2.out',
              onUpdate: () => {
                numEl.textContent = counter.n.toFixed(decimals);
              },
            },
            0.25
          );
        }
      });
    },
    { scope: root }
  );

  return (
    <section className="section results" id="resultados" ref={root}>
      <span className="orb res-orb" aria-hidden="true" />

      <div className="shell">
        <SectionHeading
          align="split"
          label="Resultados"
          title="Números de implantaciones reales"
          lede="Medias de los sistemas que hemos puesto en marcha durante el último año."
        />

        <div className="res-grid">
          {STATS.map((s) => (
            <article className="res-card" key={s.label}>
              <p className="res-num">
                <span
                  className="res-num-value"
                  data-value={s.value}
                  data-decimals={s.decimals}
                >
                  0
                </span>
                <span className="res-num-suffix">{s.suffix}</span>
              </p>
              <p className="res-label text-muted">{s.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
