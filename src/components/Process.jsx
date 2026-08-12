import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import SectionHeading from './SectionHeading';
import './Process.css';

const STEPS = [
  {
    n: '01',
    title: 'Diagnóstico',
    text: 'Mapeamos tus flujos reales y medimos dónde se pierden las horas. Sin suposiciones: datos.',
    image: '/images/panel-automation.svg',
    alt: 'Diagrama de un flujo de trabajo automatizado con nodos conectados',
  },
  {
    n: '02',
    title: 'Diseño del sistema',
    text: 'Construimos los agentes y las automatizaciones sobre las herramientas que ya usas.',
    image: '/images/panel-assistant.svg',
    alt: 'Conversación de un asistente de IA con un cliente',
  },
  {
    n: '03',
    title: 'Puesta en marcha',
    text: 'Lo desplegamos, entrenamos a tu equipo y vigilamos las métricas durante los primeros meses.',
    image: '/images/panel-crm.svg',
    alt: 'Panel de CRM con métricas de conversaciones por canal',
  },
];

const Process = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 901px)',
          isMobile: '(max-width: 900px)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, reduce } = context.conditions;

          // Con movimiento reducido no hay pin ni scrub: se muestra todo
          // estático y legible, que es exactamente lo que pide el usuario.
          if (reduce) {
            gsap.set('.proc-visual-item', { autoAlpha: 1 });
            gsap.set('.proc-step', { autoAlpha: 1 });
            return;
          }

          if (isDesktop) {
            // El visual se queda quieto con position: sticky (ver CSS) y aquí
            // solo se orquesta el cruce entre pantallas. Se evita pin a
            // propósito: fijar una columna dentro de un grid obliga a
            // pinSpacing, que inyecta un espaciador y descuadra la rejilla.
            // El timeline no lleva duraciones reales — con scrub, el scroll
            // es el que marca el tiempo.
            const tl = gsap.timeline({
              // Duración explícita y corta: los cruces se colocan en
              // posiciones separadas 1 unidad, así que con la duración global
              // del proyecto (1.05) se solaparían y la pantalla intermedia
              // nunca llegaría a verse entera. 0.5 deja además un tramo de
              // reposo en el que cada pantalla se queda quieta y legible.
              defaults: { ease: 'none', duration: 0.5 },
              scrollTrigger: {
                trigger: '.proc-layout',
                start: 'top 22%',
                end: 'bottom 78%',
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            });

            const items = gsap.utils.toArray('.proc-visual-item');
            const steps = gsap.utils.toArray('.proc-step');

            gsap.set(items[0], { autoAlpha: 1, scale: 1 });
            gsap.set(steps[0], { autoAlpha: 1 });

            // Cada transición: la pantalla saliente se encoge y se va, la
            // entrante llega desde algo más grande. Se solapan, así que nunca
            // hay un hueco vacío entre las dos.
            items.forEach((item, i) => {
              if (i === 0) return;

              tl.to(items[i - 1], { autoAlpha: 0, scale: 0.94, yPercent: -4 }, i - 1 + 0.35)
                .fromTo(
                  item,
                  { autoAlpha: 0, scale: 1.06, yPercent: 4 },
                  { autoAlpha: 1, scale: 1, yPercent: 0 },
                  i - 1 + 0.45
                )
                .to(steps[i - 1], { autoAlpha: 0.32 }, i - 1 + 0.35)
                .fromTo(steps[i], { autoAlpha: 0.32 }, { autoAlpha: 1 }, i - 1 + 0.45);
            });

            // Barra de avance del bloque completo.
            gsap.fromTo(
              '.proc-rail-fill',
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: '.proc-layout',
                  start: 'top 22%',
                  end: 'bottom 78%',
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                },
              }
            );
          } else {
            // En móvil no se puede fijar nada sin robar toda la pantalla:
            // cada paso se revela con su propia imagen al entrar. El paso de
            // apilado a columna lo hace el CSS.
            gsap.set('.proc-visual-item', { autoAlpha: 1 });

            gsap.utils.toArray('.proc-step').forEach((step) => {
              gsap.from(step, {
                autoAlpha: 0,
                y: 42,
                duration: 1,
                scrollTrigger: { trigger: step, start: 'top 85%' },
              });
            });
          }
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section className="section process" id="proceso" ref={root}>
      <div className="shell">
        <SectionHeading
          eyebrow="Proceso"
          title="De la primera llamada a producción en tres pasos"
          lede="Sin proyectos eternos ni consultoría que no acaba en nada funcionando."
        />

        <div className="proc-layout">
          <div className="proc-visual">
            <div className="proc-visual-stack">
              {STEPS.map((s, i) => (
                <div
                  className="proc-visual-item glass"
                  key={s.n}
                  style={{ opacity: i === 0 ? undefined : 0 }}
                >
                  <img src={s.image} alt={s.alt} width="900" height="620" loading="lazy" />
                </div>
              ))}
            </div>
            <span className="proc-visual-glow" aria-hidden="true" />
          </div>

          <ol className="proc-steps">
            <span className="proc-rail" aria-hidden="true">
              <span className="proc-rail-fill" />
            </span>

            {STEPS.map((s) => (
              <li className="proc-step" key={s.n}>
                <span className="proc-step-n grad-accent">{s.n}</span>
                <h3 className="proc-step-title">{s.title}</h3>
                <p className="proc-step-text text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Process;
