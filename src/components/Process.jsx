import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import SectionHeading from './SectionHeading';
import './Process.css';

const STEPS = [
  {
    n: '01',
    title: 'Diagnóstico',
    text: 'Mapeamos tus flujos reales y medimos dónde se pierden las horas. Sin suposiciones: datos.',
    image: `${import.meta.env.BASE_URL}images/process_img_1.jpg`,
    alt: 'Platos de cerámica apilados',
  },
  {
    n: '02',
    title: 'Diseño del sistema',
    text: 'Construimos los agentes y las automatizaciones sobre las herramientas que ya usas.',
    image: `${import.meta.env.BASE_URL}images/process_img_2.jpg`,
    alt: 'Recipiente de corcho con stickers',
  },
  {
    n: '03',
    title: 'Puesta en marcha',
    text: 'Lo desplegamos, entrenamos a tu equipo y vigilamos las métricas durante los primeros meses.',
    image: `${import.meta.env.BASE_URL}images/process_img_3.jpg`,
    alt: 'Paisaje montañoso nocturno con taza de camping',
  },
];

const Process = () => {
  const root = useRef(null);
  const trackRef = useRef(null);

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

          if (reduce) {
            return;
          }

          if (isDesktop) {
            // Configurar el slider horizontal
            const track = trackRef.current;
            
            // Calculamos exactamente la distancia a mover: ancho total del track menos el ancho de la ventana
            const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

            gsap.to(track, {
              x: getScrollAmount,
              ease: 'none',
              scrollTrigger: {
                trigger: root.current,
                pin: true,
                scrub: 1,
                // Refrescamos el cálculo si cambia el tamaño de la ventana
                invalidateOnRefresh: true,
                // El tiempo de scroll es proporcional al tamaño del track
                end: () => `+=${track.scrollWidth - window.innerWidth}`,
              },
            });
          } else {
            // En móvil, revelamos cada paso al hacer scroll hacia abajo
            gsap.utils.toArray('.proc-panel').forEach((panel) => {
              gsap.fromTo(
                panel,
                { opacity: 0.2, scale: 0.95 },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.8,
                  scrollTrigger: {
                    trigger: panel,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: true,
                  },
                }
              );
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
      <div className="proc-track" ref={trackRef}>
        
        {/* Panel 1: Introducción */}
        <div className="proc-panel proc-intro-panel">
          <div className="proc-intro-content">
            <SectionHeading
              align="left"
              label="Proceso"
              title="De la primera llamada a producción en tres pasos"
              lede="Sin proyectos eternos ni consultoría que no acaba en nada funcionando."
            />
          </div>
        </div>

        {/* Paneles 2, 3, 4: Pasos */}
        {STEPS.map((s) => (
          <div className="proc-panel proc-step-panel" key={s.n}>
            <div className="proc-step-bg-wrapper">
              <img src={s.image} alt={s.alt} className="proc-step-bg" loading="lazy" />
              <div className="proc-step-overlay"></div>
            </div>
            
            <div className="proc-step-content">
              <span className="proc-step-n">{s.n}</span>
              <h3 className="heading-md proc-step-title">{s.title}</h3>
              <p className="proc-step-text text-muted">{s.text}</p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Process;
