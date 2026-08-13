import { useEffect, useRef, useState } from 'react';
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
    text: 'Conectamos tus herramientas para que el trabajo repetitivo se haga solo, sin supervisión. Cada flujo queda documentado y medido, así que sabes qué se ejecuta y cuándo.',
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

const LAST = SERVICES.length - 1;
const TURN = 0.34; // lo que dura media vuelta, en unidades de timeline
const HOLD_END = 0.4; // reposo final para poder leer la última ficha
const TOTAL = LAST + HOLD_END;

const Services = () => {
  const root = useRef(null);
  const track = useRef(null);
  const wrap = useRef(null);
  const faceImgs = useRef([]); // [imagen de la cara frontal, imagen de la trasera]
  const panels = useRef([]);

  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Precarga: las caras cambian de src a mitad del giro, y sin tener el archivo
  // ya en caché la cara entrante aparecería en blanco durante un instante.
  useEffect(() => {
    SERVICES.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  useGSAP(
    () => {
      if (reduced) return;

      const [frontImg, backImg] = faceImgs.current;

      /**
       * Reparte los productos entre las dos caras según el ángulo actual.
       *
       * Solo hay dos caras para cuatro productos, así que el src se cambia al
       * vuelo. La regla se deduce del ángulo y no del orden de los eventos, que
       * es lo que la hace funcionar igual hacia abajo que hacia arriba: en el
       * tramo `seg` se está pasando del producto `seg` al `seg+1`, y como sus
       * paridades son distintas, cada uno cae en una cara diferente.
       */
      const syncFaces = () => {
        const rot = gsap.getProperty(wrap.current, 'rotationY');
        const seg = gsap.utils.clamp(0, LAST - 1, Math.floor(rot / 180));
        const front = seg % 2 === 0 ? seg : seg + 1;
        const back = seg % 2 === 0 ? seg + 1 : seg;

        // Solo se escribe si cambia: asignar el mismo src en cada frame
        // dispararía trabajo de decodificación para nada.
        if (!frontImg.src.endsWith(SERVICES[front].image)) {
          frontImg.src = SERVICES[front].image;
          frontImg.alt = SERVICES[front].alt;
        }
        if (!backImg.src.endsWith(SERVICES[back].image)) {
          backImg.src = SERVICES[back].image;
          backImg.alt = SERVICES[back].alt;
        }
      };

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate: syncFaces,
        scrollTrigger: {
          trigger: track.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < LAST; i += 1) {
        const at = i + 1 - TURN;

        // Media vuelta completa. Con backface-visibility oculta en las dos
        // caras, a 90° no se ve ninguna: ese es el instante en que se cambian
        // las imágenes y el relevo resulta invisible.
        tl.to(wrap.current, { rotationY: (i + 1) * 180, duration: TURN, ease: 'power2.inOut' }, at);

        // El texto se releva a mitad del giro, cuando la tarjeta está de canto.
        tl.to(
          panels.current[i],
          { opacity: 0, y: -22, duration: TURN / 2, ease: 'power2.in' },
          at
        ).fromTo(
          panels.current[i + 1],
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: TURN / 2, ease: 'power2.out', immediateRender: false },
          at + TURN / 2
        );
      }

      // Contador. Cambia a mitad del giro, no al redondear el tiempo.
      const counter = root.current.querySelector('.svc-counter-now');
      tl.to(
        {},
        {
          duration: TOTAL,
          onUpdate() {
            const t = this.progress() * TOTAL;
            counter.textContent = SERVICES[gsap.utils.clamp(0, LAST, Math.floor(t + TURN / 2))].n;
          },
        },
        0
      );
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      className={`svc${reduced ? ' is-static' : ''}`}
      id="servicios"
      ref={root}
      style={reduced ? undefined : { '--svc-mult': TOTAL + 1 }}
    >
      <div className="shell">
        <SectionHeading
          align="split"
          label="Servicios"
          title="Cuatro piezas que trabajan como una sola"
          lede="Cada servicio funciona por separado, pero juntos comparten datos y contexto. Ahí está la diferencia."
        />
      </div>

      <div className="svc-track" ref={track}>
        <div className="svc-stage">
          {/* Izquierda: la descripción, que se releva con cada giro. */}
          <div className="svc-copy">
            {SERVICES.map(({ n, title, text, tags }, i) => (
              <article
                className="svc-panel"
                key={n}
                ref={(el) => {
                  panels.current[i] = el;
                }}
              >
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
              </article>
            ))}

            <p className="svc-counter" aria-hidden="true">
              <span className="svc-counter-now">01</span>
              <span className="svc-counter-total">/ 0{SERVICES.length}</span>
            </p>
          </div>

          {/* Derecha: una tarjeta de dos caras. El contenedor lleva la
              perspectiva y el interior el preserve-3d, igual que en la
              referencia. */}
          <div className="svc-flip">
            <article className="svc-card">
              <div className="svc-card-wrap" ref={wrap}>
                {[0, 1].map((slot) => (
                  <div className={`svc-card-face svc-card-face--${slot ? 'back' : 'front'}`} key={slot}>
                    <img
                      src={SERVICES[slot].image}
                      alt={SERVICES[slot].alt}
                      width="900"
                      height="620"
                      ref={(el) => {
                        faceImgs.current[slot] = el;
                      }}
                    />
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Solo para lectores de pantalla: la tarjeta cambia de src por JavaScript
          y su contenido no queda en el documento de forma estable. */}
      <ul className="svc-sr">
        {SERVICES.map(({ n, title, text }) => (
          <li key={n}>
            <strong>{title}.</strong> {text}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Services;
