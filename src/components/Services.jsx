import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import SectionHeading from './SectionHeading';
import './Services.css';

/**
 * Las imágenes son fotografías y no las maquetas SVG de interfaz: la tarjeta de
 * la referencia es vertical (ratio 0,740) y una maqueta de 900×620 recortada a
 * vertical con object-fit: cover pierde casi todo su contenido. Una fotografía
 * aguanta el recorte.
 */
import { FaWhatsapp, FaChrome, FaMicrophone, FaProjectDiagram, FaPlug, FaCogs, FaInbox, FaChartBar, FaReact, FaBolt, FaSearch } from 'react-icons/fa';
import { SiGooglecalendar } from 'react-icons/si';

/**
 * Las imágenes son fotografías y no las maquetas SVG de interfaz.
 */
const SERVICES = [
  {
    n: '01',
    title: 'Asistentes de IA',
    text: 'Agentes conversacionales avanzados que interactúan 24/7 con tus clientes adoptando el tono de voz exacto de tu marca. Resuelven dudas, filtran prospectos y cierran citas en piloto automático.',
    benefits: [
      'Disponibilidad total 24/7/365',
      'Respuestas hiper-rápidas (< 3s)',
      'Agendamiento de citas integrado'
    ],
    tags: [
      { text: 'WhatsApp', icon: <FaWhatsapp color="#25D366" /> },
      { text: 'Web', icon: <FaChrome color="#4285F4" /> },
      { text: 'Voz', icon: <FaMicrophone color="#FF3B30" /> }
    ],
    image: `${import.meta.env.BASE_URL}hero-2.jpg`,
    alt: 'Equipo trabajando en una oficina moderna con vistas a la ciudad',
    link: '/asistentes-virtuales',
    actionText: 'Saber más'
  },
  {
    n: '02',
    title: 'Automatizaciones',
    text: 'Conectamos todas tus herramientas de software para que el trabajo administrativo se ejecute solo, sin errores y sin supervisión humana. Tu equipo se enfocará en crear valor.',
    benefits: [
      'Eliminación de tareas manuales',
      'Conexión entre múltiples plataformas',
      'Notificaciones y alertas en tiempo real'
    ],
    tags: [
      { text: 'Flujos', icon: <FaProjectDiagram color="#5E5CE6" /> },
      { text: 'API', icon: <FaPlug color="#FF9F0A" /> },
      { text: 'Sistemas', icon: <FaCogs color="#8E8E93" /> }
    ],
    image: `${import.meta.env.BASE_URL}hero-3.jpg`,
    alt: 'Manos sobre un portátil mostrando un flujo de trabajo automatizado',
  },
  {
    n: '03',
    title: 'CRM omnicanal',
    text: 'Centralizamos toda la comunicación de tu empresa en una única bandeja inteligente. Visualiza el historial completo de cada cliente y gestiona ventas sin saltar entre pestañas.',
    benefits: [
      'Bandeja de entrada centralizada',
      'Historial de chats unificado',
      'Métricas de rendimiento en vivo'
    ],
    tags: [
      { text: 'Bandeja', icon: <FaInbox color="#0A84FF" /> },
      { text: 'Métricas', icon: <FaChartBar color="#30D158" /> },
      { text: 'Agenda', icon: <SiGooglecalendar color="#4285F4" /> }
    ],
    image: `${import.meta.env.BASE_URL}hero-4.jpg`,
    alt: 'Puesto de trabajo con varias pantallas de seguimiento de clientes',
  },
  {
    n: '04',
    title: 'Desarrollo web',
    text: 'Desarrollamos interfaces de usuario espectaculares, de carga instantánea y optimizadas para máxima conversión. Combinamos la mejor tecnología con diseño de grado corporativo.',
    benefits: [
      'Diseño premium enfocado en conversión',
      'Carga ultrarrápida y SEO técnico',
      'Animaciones fluidas interactivas'
    ],
    tags: [
      { text: 'React', icon: <FaReact color="#61DAFB" /> },
      { text: 'Speed', icon: <FaBolt color="#FFD60A" /> },
      { text: 'SEO', icon: <FaSearch color="#32ADE6" /> }
    ],
    image: `${import.meta.env.BASE_URL}abstract-bg.jpg`,
    alt: 'Composición abstracta de luz y superficies',
  },
];

const LAST = SERVICES.length - 1;

// El timeline se normaliza a 1 y las vueltas se colocan en fracciones. Con N
// fichas de una pantalla cada una, la ficha i queda centrada en el viewport
// cuando el progreso vale i/(N-1); el punto medio entre dos fichas — y por
// tanto el momento de girar — cae en (2i+1) / (2·(N-1)).
const TURN = 0.11; // anchura de la media vuelta, en fracción del recorrido

const Services = () => {
  const root = useRef(null);
  const flow = useRef(null);
  const wrap = useRef(null);
  const faceImgs = useRef([]);
  const wipeIncoming = useRef(null); // [imagen de la cara frontal, imagen de la trasera]

  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Precarga: las caras cambian de src a mitad del giro y sin el archivo en
  // caché la cara entrante aparecería en blanco un instante.
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
       * tramo `seg` se pasa del producto `seg` al `seg+1` y, al diferir sus
       * paridades, cada uno cae en una cara distinta.
       */
      const syncFaces = () => {
        const rot = gsap.getProperty(wrap.current, 'rotationY');
        const seg = gsap.utils.clamp(0, LAST - 1, Math.floor(rot / 180));
        const front = seg % 2 === 0 ? seg : seg + 1;
        const back = seg % 2 === 0 ? seg + 1 : seg;

        // Solo se escribe si cambia: reasignar el mismo src en cada frame
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
        onUpdate: syncFaces,
        scrollTrigger: {
          // El disparador es el flujo completo, no una escena anclada: la
          // página sigue corriendo con normalidad y lo único que se queda
          // quieto es la tarjeta, igual que en la referencia.
          trigger: flow.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < LAST; i += 1) {
        const mid = (2 * i + 1) / (2 * LAST);
        tl.to(
          wrap.current,
          { rotationY: (i + 1) * 180, duration: TURN, ease: 'power2.inOut' },
          mid - TURN / 2
        );
      }

      // El timeline debe durar exactamente 1 para que las fracciones de arriba
      // se correspondan con el progreso del scroll. La última vuelta acaba
      // antes, así que se rellena el resto.
      tl.set({}, {}, 1);
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section className={`svc${reduced ? ' is-static' : ''}`} id="servicios" ref={root}>
      <div className="shell">
        <SectionHeading
          align="split"
          label="Servicios"
          title="Cuatro piezas que trabajan como una sola"
          lede="Cada servicio funciona por separado, pero juntos comparten datos y contexto. Ahí está la diferencia."
        />
      </div>

      <div className="svc-flow" ref={flow}>
        {/* Izquierda: las cuatro fichas en flujo normal del documento. Nada
            anclado ni desvaneciéndose: el bloque se recorre como cualquier otra
            parte de la página. */}
        <div className="svc-list">
          {SERVICES.map(({ n, title, text, benefits, tags, image, alt, link, actionText }) => (
            <article className="svc-item" key={n}>
              {/* Solo visible en una columna y con movimiento reducido, donde no
                  hay carril: ahí cada ficha necesita su propia imagen. */}
              <figure className="svc-item-media">
                <img src={image} alt={alt} loading="lazy" />
              </figure>

              <span className="svc-n">
                {n} <i aria-hidden="true">/ 0{SERVICES.length}</i>
              </span>
              <h3 className="svc-title">{title}</h3>
              <p className="svc-desc">{text}</p>
              
              <ul className="svc-benefits">
                {benefits?.map((b, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} className="svc-benefit-icon" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <ul className="svc-tags">
                {tags.map((t) => (
                  <li key={t.text} className="svc-tag">
                    <span className="svc-tag-icon">{t.icon}</span>
                    {t.text}
                  </li>
                ))}
              </ul>
              {link ? (
                link.startsWith('/') ? (
                  <Link className="svc-link" to={link}>
                    {actionText || 'Saber más'} <ArrowUpRight size={15} strokeWidth={2.2} />
                  </Link>
                ) : (
                  <a className="svc-link" href={link}>
                    {actionText || 'Hablar de esto'} <ArrowUpRight size={15} strokeWidth={2.2} />
                  </a>
                )
              ) : (
                <a className="svc-link" href="#contacto">
                  Hablar de esto <ArrowUpRight size={15} strokeWidth={2.2} />
                </a>
              )}
            </article>
          ))}
        </div>

        {/* Derecha: el carril de la tarjeta. Tan alto como la lista, con un
            hijo sticky que mantiene la tarjeta centrada en la mitad derecha
            durante todo el recorrido. */}
        <div className="svc-rail" aria-hidden="true">
          <div className="svc-sticky">
            <div className="svc-card">
              <div className="svc-card-wrap" ref={wrap}>
                {[0, 1].map((slot) => (
                  <div
                    className={`svc-card-face svc-card-face--${slot ? 'back' : 'front'}`}
                    key={slot}
                  >
                    <img
                      src={SERVICES[slot].image}
                      alt=""
                      ref={(el) => {
                        faceImgs.current[slot] = el;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
