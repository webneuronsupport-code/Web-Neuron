import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import SectionHeading from './SectionHeading';
import './Services.css';

const SERVICES = [
  {
    n: '01',
    title: 'Asistentes de IA',
    text: 'Agentes conversacionales que atienden, cualifican y agendan 24/7 con el tono de tu marca. Contestan en segundos a cualquier hora y solo te pasan lo que merece tu tiempo.',
    tags: ['WhatsApp', 'Web', 'Voz'],
    image: '/images/panel-assistant.svg',
    alt: 'Panel de un asistente de IA respondiendo a un cliente en tiempo real',
  },
  {
    n: '02',
    title: 'Automatizaciones',
    text: 'Conectamos tus herramientas para que el trabajo repetitivo se haga solo, sin supervisión. Cada flujo queda documentado y medido, así que sabes exactamente qué se ejecuta.',
    tags: ['Flujos', 'API', 'Integraciones'],
    image: '/images/panel-automation.svg',
    alt: 'Diagrama de un flujo de trabajo automatizado con nodos conectados',
  },
  {
    n: '03',
    title: 'CRM omnicanal',
    text: 'Todas tus conversaciones en una bandeja, con el historial completo de cada cliente. WhatsApp, email y redes en el mismo sitio, sin saltar entre pestañas.',
    tags: ['Bandeja única', 'Métricas'],
    image: '/images/panel-crm.svg',
    alt: 'Panel de CRM con métricas de conversaciones por canal',
  },
  {
    n: '04',
    title: 'Desarrollo web',
    text: 'Experiencias rápidas, medibles y optimizadas para convertir. Como la que estás viendo: cada animación existe para dirigir la atención, no para decorar.',
    tags: ['React', 'Rendimiento', 'SEO'],
    image: '/images/panel-automation.svg',
    alt: 'Interfaz web moderna con métricas de rendimiento',
  },
];

const Services = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      // Un ScrollTrigger por fila, no un batch. Las filas ocupan casi una
      // pantalla cada una, así que nunca entran dos a la vez: agruparlas no
      // aportaría nada y en cambio quitaría precisión al arranque.
      gsap.utils.toArray('.svc-row').forEach((row) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 75%' },
        });

        // El texto sube escalonado y la imagen entra a la vez, no después:
        // encadenarlas hacía que la mitad derecha pareciese llegar tarde.
        tl.from(row.querySelectorAll('.svc-text > *'), {
          autoAlpha: 0,
          y: 30,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        }).from(
          row.querySelector('.svc-media'),
          // opacity y NO autoAlpha: autoAlpha pone visibility:hidden, y una
          // imagen con loading="lazy" dentro de un elemento oculto no se pide
          // nunca. La fila se revelaría con el marco vacío y la foto entrando
          // de golpe un instante después.
          { opacity: 0, scale: 1.06, duration: 1.3, ease: 'power3.out' },
          0
        );
      });

      // Parallax de cada imagen dentro de su marco: se mueve menos que la fila,
      // y ese desfase es lo que da profundidad al bloque partido.
      gsap.utils.toArray('.svc-media img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.svc-row'),
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
      </div>

      <div className="svc-rows">
        {SERVICES.map(({ n, title, text, tags, image, alt }) => (
          <article className="svc-row" key={n}>
            <div className="svc-text">
              <span className="svc-n">{n}</span>
              <h3 className="svc-title">{title}</h3>
              <p className="svc-desc">{text}</p>
              <ul className="svc-tags">
                {tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <a className="svc-link" href="#contacto">
                Hablar de esto <ArrowUpRight size={15} strokeWidth={2.2} />
              </a>
            </div>

            <div className="svc-media">
              <img src={image} alt={alt} width="900" height="620" loading="lazy" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
