import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import './Services.css';

const SERVICES = [
  {
    n: '01',
    kicker: 'Tan constante,',
    title: 'que nunca duerme',
    text: 'Agentes conversacionales que atienden 24/7 con el tono exacto de tu marca. Resuelven dudas, filtran prospectos y cierran citas solos.',
    nombre: 'Asistentes de IA',
    chip: 'SIEMPRE ACTIVO',
    chipTexto: 'RESPONDE EN MENOS DE 3 SEGUNDOS,\nA CUALQUIER HORA Y CUALQUIER DÍA.',
    image: `${import.meta.env.BASE_URL}service-ai-assistants.png`,
    alt: 'Asistente de IA atendiendo conversaciones de día y de noche',
    link: '/asistentes-virtuales',
    actionText: 'Ver asistentes',
  },
  {
    n: '02',
    kicker: 'Tan silencioso,',
    title: 'que ni lo notas',
    text: 'Conectamos tus herramientas para que el trabajo administrativo se ejecute solo, sin errores y sin supervisión. Tu equipo vuelve a lo que aporta valor.',
    nombre: 'Automatizaciones',
    chip: 'SIN MANOS',
    chipTexto: 'EL TRABAJO REPETITIVO SE EJECUTA\nAUNQUE NADIE ESTÉ MIRANDO.',
    image: `${import.meta.env.BASE_URL}service-automatizaciones.png`,
    imagePosition: '65% center',
    alt: 'Sistemas automatizados ejecutándose sobre un escritorio de trabajo',
  },
  {
    n: '03',
    kicker: 'Tan completo,',
    title: 'que cabe en una pestaña',
    text: 'Toda la comunicación de tu empresa en una sola bandeja inteligente. El historial completo de cada cliente, sin saltar entre ventanas.',
    nombre: 'CRM omnicanal',
    chip: 'TODO EN UNO',
    chipTexto: 'WHATSAPP, WEB, CORREO Y LLAMADAS\nEN LA MISMA CONVERSACIÓN.',
    image: `${import.meta.env.BASE_URL}hero-4.jpg`,
    alt: 'Puesto de trabajo con varias pantallas de seguimiento de clientes',
    link: '/crm-omnicanal',
    actionText: 'Ver el CRM',
  },
  {
    n: '04',
    kicker: 'Tan rápido,',
    title: 'que parece instantáneo',
    text: 'Interfaces de carga inmediata, optimizadas para convertir. La mejor tecnología con diseño de grado corporativo.',
    nombre: 'Desarrollo web',
    chip: 'CARGA INMEDIATA',
    chipTexto: 'DISEÑO PREMIUM, SEO TÉCNICO\nY ANIMACIONES QUE NO ESTORBAN.',
    image: `${import.meta.env.BASE_URL}hero-5.jpg`,
    alt: 'Equipo de desarrollo web frente a un monitor en una oficina moderna',
  },
];

const Services = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const n = SERVICES.length;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const mm = gsap.matchMedia(root);

      // La tira horizontal solo existe con sitio a los lados. Por debajo de
      // 900 px las fichas laterales no caben y el visor central se comería la
      // pantalla entera; ahí manda una lista vertical normal, que el CSS ya
      // resuelve sin JavaScript.
      mm.add('(min-width: 901px)', () => {
        const fichas = gsap.utils.toArray('.ory-ficha');

        /* La distancia entre dos fichas se MIDE, no se calcula: depende del
           ancho real y del hueco, que salen de clamp() sobre el viewport.
           Calcularla a mano obligaría a duplicar esas fórmulas en JS y a que
           se desincronicen en cuanto se toque el CSS. */
        const paso = () => (fichas[1]?.offsetLeft ?? 0) - (fichas[0]?.offsetLeft ?? 0);

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // La tira se desplaza para ir dejando cada ficha en el visor.
        tl.to('.ory-tira', { x: () => -(n - 1) * paso(), duration: n - 1 }, 0);

        fichas.forEach((f, i) => {
          /* Cada ficha crece al entrar en el visor y encoge al salir. La escala
             no altera el hueco entre fichas — transform no toca el layout — así
             que el reparto lateral se mantiene regular, como en la referencia. */
          if (i > 0) tl.fromTo(f, { scale: 0.7 }, { scale: 1, duration: 1 }, i - 1);
          if (i < n - 1) tl.to(f, { scale: 0.7, duration: 1 }, i);

          // Solo la ficha del visor enseña su rótulo.
          if (i > 0) tl.fromTo(`.ory-chip-${i}`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 }, i - 0.35);
          if (i < n - 1) tl.to(`.ory-chip-${i}`, { autoAlpha: 0, duration: 0.3 }, i + 0.05);

          // Y el texto de la izquierda se releva con ella.
          if (i > 0) tl.fromTo(`.ory-txt-${i}`, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.4 }, i - 0.4);
          if (i < n - 1) tl.to(`.ory-txt-${i}`, { autoAlpha: 0, y: -26, duration: 0.35 }, i + 0.05);
        });

        // El aviso de seguir bajando sobra al llegar al final.
        tl.to('.ory-seguir', { autoAlpha: 0, duration: 0.4 }, n - 1.4);
      });
    },
    { scope: root }
  );

  return (
    <section className="ory" id="servicios" ref={root}>
      <div className="ory-stage">
        {/* Halo cálido de fondo. Va aquí y no en la sección para que no se
            desplace con la tira. */}
        <span className="ory-halo" aria-hidden="true" />

        {/* Columna izquierda: se releva con la ficha del visor. */}
        <div className="ory-copy">
          {SERVICES.map((s, i) => (
            <div className={`ory-txt ory-txt-${i}`} key={s.n}>
              {/* Copia de la imagen para la versión en columna. La tira vive en
                  otro contenedor —tiene que estar fuera del elemento que se
                  desplaza— así que aquí no se puede reutilizar aquella.

                  No cuesta una descarga extra: el navegador reutiliza la misma
                  URL. Y como cada una se oculta con display:none en el otro
                  ancho, el lector de pantalla solo anuncia la que se ve. */}
              <figure className="ory-txt-media">
                <img
                  src={s.image}
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: s.imagePosition || 'center center' }}
                />
                <figcaption className="ory-chip ory-chip-movil">
                  <span className="ory-chip-tag">{s.chip}</span>
                  <span className="ory-chip-txt">{s.chipTexto}</span>
                </figcaption>
              </figure>

              <p className="ory-kicker">{s.kicker}</p>
              <h3 className="ory-title">{s.title}</h3>
              <p className="ory-nombre">
                <span>{s.n}</span> {s.nombre}
              </p>
              <p className="ory-desc">{s.text}</p>
              {s.link ? (
                <Link className="ory-link" to={s.link}>
                  {s.actionText} <ArrowUpRight size={15} strokeWidth={2.5} />
                </Link>
              ) : (
                <a className="ory-link" href="#contacto">
                  Hablar de esto <ArrowUpRight size={15} strokeWidth={2.5} />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* La tira. Las fichas se desplazan; el visor no. */}
        <div className="ory-carril">
          <div className="ory-tira">
            {SERVICES.map((s, i) => (
              <figure className={`ory-ficha ory-ficha-${i}`} key={s.n}>
                <img
                  src={s.image}
                  alt={s.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{ objectPosition: s.imagePosition || 'center center' }}
                />
                <figcaption className={`ory-chip ory-chip-${i}`}>
                  <span className="ory-chip-tag">{s.chip}</span>
                  <span className="ory-chip-txt">{s.chipTexto}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Visor punteado: fijo en el centro. Son las fichas las que pasan
              por él, no al revés. */}
          <span className="ory-visor" aria-hidden="true" />
        </div>

        <p className="ory-seguir">
          <span className="ory-seguir-btn" aria-hidden="true"><ChevronDown size={14} /></span>
          Sigue bajando
        </p>
      </div>
    </section>
  );
};

export default Services;
