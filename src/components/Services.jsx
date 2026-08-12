import { useRef } from 'react';
import { Bot, Zap, Network, Code2, ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import SectionHeading from './SectionHeading';
import './Services.css';

const SERVICES = [
  {
    Icon: Bot,
    title: 'Asistentes de IA',
    text: 'Agentes conversacionales que atienden, cualifican y agendan 24/7 con el tono de tu marca.',
    tags: ['WhatsApp', 'Web', 'Voz'],
    span: 'wide',
  },
  {
    Icon: Zap,
    title: 'Automatizaciones',
    text: 'Conectamos tus herramientas para que el trabajo repetitivo se haga solo, sin supervisión.',
    tags: ['Flujos', 'API'],
  },
  {
    Icon: Network,
    title: 'CRM omnicanal',
    text: 'Todas tus conversaciones en una bandeja: WhatsApp, email y redes, con el historial completo.',
    tags: ['Bandeja única', 'Métricas'],
  },
  {
    Icon: Code2,
    title: 'Desarrollo web',
    text: 'Experiencias rápidas, medibles y optimizadas para convertir. Como la que estás viendo.',
    tags: ['React', 'Rendimiento', 'SEO'],
    span: 'wide',
  },
];

const Services = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      // batch agrupa las tarjetas que entran en pantalla en el mismo instante
      // y las anima juntas con stagger. Con un ScrollTrigger por tarjeta las
      // que entran a la vez arrancarían por separado y el ritmo se perdería.
      ScrollTrigger.batch('.svc-card', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            autoAlpha: 0,
            y: 64,
            duration: 1.15,
            stagger: 0.12,
            ease: 'power3.out',
            overwrite: true,
          }),
      });

      // Foco de luz que sigue al cursor dentro de cada tarjeta. Se escribe en
      // dos variables CSS y el degradado de ::after las lee: así el navegador
      // solo repinta el fondo de esa tarjeta.
      const cards = gsap.utils.toArray('.svc-card');
      const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const cleanups = [];

      if (canHover) {
        cards.forEach((card) => {
          const glow = gsap.quickTo(card, '--glow', { duration: 0.5, ease: 'power2.out' });

          // La posición se escribe directamente: es un valor que salta con el
          // cursor, no algo que haya que interpolar. Solo la intensidad del
          // halo se anima, para que entre y salga con suavidad.
          const move = (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
          };
          const enter = () => glow(1);
          const leave = () => glow(0);

          card.addEventListener('pointermove', move);
          card.addEventListener('pointerenter', enter);
          card.addEventListener('pointerleave', leave);

          cleanups.push(() => {
            card.removeEventListener('pointermove', move);
            card.removeEventListener('pointerenter', enter);
            card.removeEventListener('pointerleave', leave);
          });
        });
      }

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root }
  );

  return (
    <section className="section services" id="servicios" ref={root}>
      <div className="shell">
        <SectionHeading
          eyebrow="Ecosistema"
          title="Cuatro piezas que trabajan como una sola"
          lede="Cada servicio funciona por separado, pero juntos comparten datos y contexto. Ahí está la diferencia."
        />

        <div className="svc-grid">
          {SERVICES.map(({ Icon, title, text, tags, span }) => (
            <article
              key={title}
              className={`svc-card glass${span === 'wide' ? ' svc-card--wide' : ''}`}
            >
              <span className="svc-icon" aria-hidden="true">
                <Icon size={22} strokeWidth={1.7} />
              </span>

              <div className="svc-body">
                <h3 className="svc-title">{title}</h3>
                <p className="svc-text text-muted">{text}</p>
              </div>

              <ul className="svc-tags">
                {tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <span className="svc-arrow" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
