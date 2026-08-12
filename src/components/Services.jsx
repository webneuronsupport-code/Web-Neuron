import { useRef } from 'react';
import { Bot, Zap, Network, Code2 } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import SectionHeading from './SectionHeading';
import './Services.css';

const SERVICES = [
  {
    n: '01',
    Icon: Bot,
    title: 'Asistentes de IA',
    text: 'Agentes conversacionales que atienden, cualifican y agendan 24/7 con el tono de tu marca.',
    tags: ['WhatsApp', 'Web', 'Voz'],
    image: '/images/panel-assistant.svg',
  },
  {
    n: '02',
    Icon: Zap,
    title: 'Automatizaciones',
    text: 'Conectamos tus herramientas para que el trabajo repetitivo se haga solo, sin supervisión.',
    tags: ['Flujos', 'API'],
    image: '/images/panel-automation.svg',
  },
  {
    n: '03',
    Icon: Network,
    title: 'CRM omnicanal',
    text: 'Todas tus conversaciones en una bandeja, con el historial completo de cada cliente.',
    tags: ['Bandeja única', 'Métricas'],
    image: '/images/panel-crm.svg',
  },
  {
    n: '04',
    Icon: Code2,
    title: 'Desarrollo web',
    text: 'Experiencias rápidas, medibles y optimizadas para convertir. Como la que estás viendo.',
    tags: ['React', 'Rendimiento', 'SEO'],
    image: '/images/panel-automation.svg',
  },
];

const Services = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      // batch agrupa las tarjetas que entran en pantalla en el mismo instante y
      // las anima juntas. Con un ScrollTrigger por tarjeta, las que entran a la
      // vez arrancarían por separado y se perdería el ritmo del stagger.
      ScrollTrigger.batch('.svc-card', {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            autoAlpha: 0,
            y: 56,
            duration: 1.1,
            stagger: 0.1,
            ease: 'power3.out',
            overwrite: true,
          }),
      });

      // Parallax suave de las imágenes dentro de su marco: la foto se mueve
      // menos que la tarjeta y el recorte gana profundidad.
      gsap.utils.toArray('.svc-media img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.svc-card'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section className="section services" id="servicios" ref={root}>
      <div className="shell">
        <SectionHeading
          align="split"
          label="Servicios"
          title="Cuatro piezas que trabajan como una sola"
          lede="Cada servicio funciona por separado, pero juntos comparten datos y contexto. Ahí está la diferencia."
        />

        <div className="svc-grid">
          {SERVICES.map(({ n, Icon, title, text, tags, image }) => (
            <article className="svc-card" key={n}>
              <div className="svc-media">
                <img src={image} alt="" width="900" height="620" loading="lazy" />
                <span className="svc-n">{n}</span>
              </div>

              <div className="svc-body">
                <h3 className="heading-sm svc-title">
                  <Icon size={18} strokeWidth={1.8} className="svc-icon" aria-hidden="true" />
                  {title}
                </h3>
                <p className="svc-text text-muted">{text}</p>
                <ul className="svc-tags">
                  {tags.map((t) => (
                    <li className="tag" key={t}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
