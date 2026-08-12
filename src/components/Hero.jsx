import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap';
import { INTRO_DELAY } from '../lib/timing';
import './Hero.css';

const NAV = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#contacto', label: 'Contacto' },
];

const CARD_LINKS = [
  { href: '#servicios', label: 'Asistentes IA' },
  { href: '#servicios', label: 'Automatizaciones' },
  { href: '#servicios', label: 'CRM omnicanal' },
  { href: '#servicios', label: 'Desarrollo web' },
];

/**
 * Capas del túnel, en orden de aparición. Cada una escala de 0.28 a 1 sobre la
 * anterior, que ya cubre la pantalla: eso produce el zoom recursivo.
 *
 * La referencia usa dos imágenes entre el panel y el manifiesto. Para añadir
 * una tercera basta con meter otra entrada aquí — el timeline se construye a
 * partir de este array y la altura de scroll se calcula sola.
 */
const ZOOM = [
  { kind: 'image', src: '/hero-2.jpg', alt: 'Profesionales colaborando en una oficina moderna y luminosa' },
  { kind: 'image', src: '/hero-3.jpg', alt: 'Manos tecleando en laptop con taza de café artesanal al lado' },
  { kind: 'statement' },
];

// --- Partitura del scroll, en unidades de timeline -------------------------
const BAR_GROW = 0.75; // la barra crece en altura desde cero
const PANEL_OPEN = 1.1; // lo que tarda el panel en abrirse a lo ancho

// Escala a la que nace cada capa. Muy pequeña a propósito: si nace al 20% ya
// es un rectángulo con forma reconocible, y al hacerse visible se percibe como
// que aparece de golpe. Naciendo al 9% emerge desde un punto.
const ZOOM_FROM = 0.09;
const ZOOM_DUR = 1.4;
// El paso es MUY inferior a la duración: cada capa arranca cuando la anterior
// va por el 43% de su recorrido, de modo que siempre hay dos o tres niveles
// anidados en pantalla. La referencia enseña tres a la vez (89%, 66% y 30% del
// alto). Con un solape corto, cada capa crecía sola y con nada dentro: eso es
// lo que producía la sensación de que las imágenes se esperan.
const ZOOM_STEP = 0.6;

// La primera capa asoma antes de que el panel termine de abrirse, igual que en
// la referencia: el rojo aún no cubre del todo y la imagen pequeña ya está.
const ZOOM_START = BAR_GROW + PANEL_OPEN - 0.35;
const TOTAL = ZOOM_START + (ZOOM.length - 1) * ZOOM_STEP + ZOOM_DUR;

const Hero = () => {
  const root = useRef(null);
  const panel = useRef(null);
  const layers = useRef([]);

  // Con movimiento reducido no se secuestra el scroll durante seis pantallas:
  // el hero se queda como una sola pantalla estática y legible.
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // La lista de navegación. En escritorio el CSS la muestra siempre; en
  // pantallas pequeñas o bajas solo se ve con este estado activo.
  const [navOpen, setNavOpen] = useState(false);

  useGSAP(
    () => {
      // --- Entrada ---------------------------------------------------------
      // Espera a que el telón del preloader se haya retirado; si no, toda la
      // animación se reproduce detrás de él y el usuario no ve nada.
      const intro = gsap.timeline({ delay: INTRO_DELAY });

      // El titular no entra aquí: tiene su propio revelado por caracteres más
      // abajo. Meterlo en este timeline además chocaría con la inclinación,
      // porque ambos escribirían en su transform.
      intro
        .from('.fame-nav', { autoAlpha: 0, x: -24, duration: 1.1 }, 0.15)
        .from('.fame-cta', { autoAlpha: 0, x: 24, duration: 1.1 }, 0.15)
        .from('.fame-logo', { autoAlpha: 0, y: 18, duration: 1 }, 0.3)
        .from('.fame-dot', { autoAlpha: 0, duration: 0.8 }, 0.3)
        .from('.fame-mark', { autoAlpha: 0, duration: 1 }, 0.4)
        .from('.fame-card', { autoAlpha: 0, y: 40, duration: 1.1 }, 0.45);

      if (reduced) return;

      // --- Titular ---------------------------------------------------------
      // Tres capas de efecto sobre el mismo texto: revelado por caracteres,
      // onda de brasa que lo recorre en bucle, e inclinación 3D con el cursor.
      const TITLE_BASE = '#f7f2ee'; // marfil, el color propio del titular
      const TITLE_EMBER = '#ff6a4d'; // brasa, emparentada con el rojo del panel

      SplitText.create('.fame-title', {
        type: 'chars,words,lines',
        // La máscara por líneas es lo que permite que los caracteres asomen
        // desde detrás del renglón en vez de aparecer flotando.
        mask: 'lines',
        autoSplit: true,
        charsClass: 'fame-char',
        // La animación se crea DENTRO de onSplit y de forma independiente:
        // autoSplit vuelve a partir el texto al cargar las fuentes o cambiar el
        // ancho, y un tween colgado de un timeline ya consumido dejaría las
        // letras congeladas fuera de la máscara.
        onSplit(self) {
          const reveal = gsap.timeline({ delay: INTRO_DELAY });

          // Los caracteres suben girando sobre su eje horizontal. El stagger
          // sale del centro hacia los extremos, que es lo que hace que el
          // titular se "abra" en lugar de barrerse de izquierda a derecha.
          reveal.from(self.chars, {
            yPercent: 120,
            rotationX: -80,
            transformPerspective: 600,
            transformOrigin: '50% 100%',
            autoAlpha: 0,
            duration: 1.15,
            ease: 'expo.out',
            stagger: { each: 0.022, from: 'center' },
          });

          // Onda de brasa. El stagger lleva su propio repeat, que es la forma
          // de conseguir que la onda circule sin fin: cada carácter repite su
          // ciclo desfasado del anterior. Con el repeat en el tween en lugar
          // del stagger, todas las letras parpadearían a la vez.
          const ember = gsap.fromTo(
            self.chars,
            { color: TITLE_BASE },
            {
              color: TITLE_EMBER,
              duration: 0.5,
              ease: 'sine.inOut',
              delay: INTRO_DELAY + 1,
              stagger: {
                each: 0.045,
                from: 'start',
                repeat: -1,
                yoyo: true,
                repeatDelay: 2.6,
              },
            }
          );

          // Fuera de pantalla se pausa: son ~40 tweens de color vivos para
          // siempre, y no tiene sentido pagarlos mientras nadie los ve.
          ScrollTrigger.create({
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (st) => (st.isActive ? ember.play() : ember.pause()),
          });

          return reveal;
        },
      });

      // Inclinación 3D siguiendo el cursor. quickTo mantiene una sola
      // interpolación viva por propiedad en lugar de crear un tween por cada
      // evento de ratón, que serían decenas por segundo.
      const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      let onMove;

      if (canHover) {
        const titleEl = root.current.querySelector('.fame-title');
        gsap.set(titleEl, { transformPerspective: 900 });

        const rotY = gsap.quickTo(titleEl, 'rotationY', { duration: 0.9, ease: 'power3.out' });
        const rotX = gsap.quickTo(titleEl, 'rotationX', { duration: 0.9, ease: 'power3.out' });

        onMove = (e) => {
          rotY(gsap.utils.mapRange(0, window.innerWidth, -9, 9, e.clientX));
          rotX(gsap.utils.mapRange(0, window.innerHeight, 6, -6, e.clientY));
        };

        window.addEventListener('pointermove', onMove);
      }

      // El panel no se toca en la intro: nace a altura cero desde el CSS y su
      // escala es competencia exclusiva del scroll. Así no hay dos animaciones
      // tirando de la misma propiedad si alguien hace scroll durante la intro.

      // Cuánto hay que escalar los 6 px de la barra para cubrir el ancho de la
      // ventana. Va como función para que invalidateOnRefresh lo recalcule al
      // redimensionar en lugar de quedarse con el ancho de la primera carga.
      const panelScaleX = () => window.innerWidth / 6 + 2;

      // --- Secuencia de scroll ---------------------------------------------
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Fase 1: la barra crece en altura desde cero en cuanto empieza el scroll.
      tl.fromTo(panel.current, { scaleY: 0 }, { scaleY: 1, duration: BAR_GROW }, 0);

      // Fase 2: la misma barra se abre a lo ancho hasta cubrir la pantalla.
      // Es un único elemento en dos fases, no una barra más un panel: por eso
      // en la referencia comparten exactamente el mismo rojo.
      //
      // immediateRender: false es obligatorio aquí. Son dos fromTo sobre el
      // mismo elemento, y sin esto el segundo aplicaría su estado inicial al
      // crearse y pisaría el resultado del primero.
      tl.fromTo(
        panel.current,
        { scaleX: 1 },
        { scaleX: panelScaleX, duration: PANEL_OPEN, immediateRender: false },
        BAR_GROW
      );

      // La tarjeta blanca solo vive en el primer fotograma.
      tl.to('.fame-card', { autoAlpha: 0, duration: 0.4 }, BAR_GROW * 0.6);

      // Fase 3: el túnel. Cada capa se hace visible justo cuando le toca
      // escalar; si estuvieran visibles desde el principio se verían como
      // rectángulos pequeños flotando sobre la fotografía inicial.
      //
      // El ease es 'power1.in' y no lineal: en un zoom real el objeto se
      // acerca de forma exponencial, así que arranca lento y se acelera. Con
      // escala lineal el avance se percibe frenando justo al final, que es
      // parte de lo que hacía que las capas pareciesen quedarse esperando.
      layers.current.filter(Boolean).forEach((el, i) => {
        const at = ZOOM_START + i * ZOOM_STEP;

        // La opacidad se anima en lugar de conmutarse. Con un set() la capa
        // aparecía entera de golpe: eso era el salto de la primera imagen. Al
        // fundirla mientras ya está creciendo, emerge en vez de aparecer.
        tl.fromTo(
          el,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: ZOOM_DUR * 0.3, immediateRender: false },
          at
        );

        tl.fromTo(
          el,
          { scale: ZOOM_FROM },
          { scale: 1, duration: ZOOM_DUR, ease: 'power1.in', immediateRender: false },
          at
        );
      });

      // useGSAP revierte tweens y ScrollTriggers por su cuenta, pero un
      // listener de window no es cosa suya: hay que quitarlo a mano.
      return () => {
        if (onMove) window.removeEventListener('pointermove', onMove);
      };
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      className={`fame-hero${reduced ? ' is-static' : ''}`}
      id="inicio"
      ref={root}
      style={reduced ? undefined : { '--scroll-mult': TOTAL + 1 }}
    >
      <div className="fame-stage">
        {/* Escena base. No se mueve en ningún momento: el panel la tapa. */}
        <div className="fame-scene">
          <img src="/hero-1.png" alt="Profesional elegante usando un asistente de IA en su smartphone, estilo Apple" />
        </div>

        <div className="fame-top-brand">WEB NEURON</div>
        {/* El envoltorio centra; el h1 queda libre para que GSAP lo incline. */}
        <div className="fame-title-wrap">
          <h1 className="fame-title">
            SISTEMAS DE IA
            <br />
            QUE TRANSFORMAN TU NEGOCIO
          </h1>
        </div>

        {/* Barra y panel son el mismo elemento. */}
        <div className="fame-panel" ref={panel} aria-hidden="true" />

        {ZOOM.map((layer, i) => (
          <div
            className={`fame-layer fame-layer--${layer.kind}`}
            key={layer.src || layer.kind}
            // Llaves, no expresión: un callback de ref que devuelve un valor
            // hace que React 19 lo interprete como función de limpieza.
            ref={(el) => {
              layers.current[i] = el;
            }}
            style={{ zIndex: 10 + i }}
          >
            {layer.kind === 'image' ? (
              // Sin lazy: estas imágenes forman parte de la secuencia del hero
              // y su capa arranca en visibility:hidden, así que el navegador
              // nunca las pediría y aparecerían en blanco al llegar su turno.
              <img src={layer.src} alt={layer.alt} decoding="async" />
            ) : (
              <div className="fame-statement">
                <h2>
                  Creamos sistemas de IA que evocan eficiencia.
                  <br />
                  Damos un nuevo sentido a tu negocio
                </h2>
                <p>
                  Agencia especializada en automatización e inteligencia artificial. Conectamos
                  tecnología con elegancia, rendimiento y resultados medibles.
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Cromo fijo. Vive una sola vez y por encima de todas las capas, así
            sigue legible sobre la foto y sobre el panel rojo. En la referencia
            nunca desaparece durante la secuencia. */}
        <div className="fame-chrome">
          <span className="fame-dot" aria-hidden="true" />

          <nav
            className={`fame-nav${navOpen ? ' is-open' : ''}`}
            aria-label="Navegación principal"
          >
            <div className="fame-nav-head">
              {/* Conmutador real, como el [+] de la referencia. En móvil la
                  lista arranca plegada: desplegada de continuo ocupa 240 px y
                  se solapaba con el titular en cualquier pantalla corta. */}
              <button
                type="button"
                className="fame-nav-toggle"
                onClick={() => setNavOpen((v) => !v)}
                aria-expanded={navOpen}
                aria-controls="fame-nav-list"
              >
                <span aria-hidden="true">[{navOpen ? '−' : '+'}]</span> Navegación
              </button>
              <span className="fame-lang">ES</span>
            </div>
            <ol className="fame-nav-list" id="fame-nav-list">
              {NAV.map((l, i) => (
                <li key={l.href}>
                  <a href={l.href}>
                    <span>[{i + 1}]</span> {l.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <a href="#contacto" className="fame-cta">
            Agendar demo <ArrowUpRight size={13} strokeWidth={3} />
          </a>

          <a href="#inicio" className="fame-logo" aria-label="Web Neuron, inicio">
            WN
          </a>

          <div className="fame-mark" aria-hidden="true">
            <span className="fame-mark-dot" />
            <span className="fame-mark-glyph">WN</span>
          </div>
        </div>

        <aside className="fame-card">
          <span className="fame-card-glyph" aria-hidden="true">
            WN
          </span>
          <div className="fame-card-inner">
            <p className="fame-card-text">
              Soluciones integrales de automatización
              <br />e inteligencia artificial
            </p>
            <ul className="fame-card-links">
              {CARD_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>
                    {l.label} <ArrowUpRight size={12} strokeWidth={3.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
