import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import GlobalChrome from './GlobalChrome';
import Header from './Header';
import './Hero.css';

// --- Partitura del zoom recursivo, en unidades de timeline -----------------
// ZOOM es cuánto crece cada marco entre un salto y el siguiente. Es también el
// inverso de la escala a la que nace cada marco: con ZOOM = 5, uno nuevo
// aparece al 20 % justo cuando el anterior llega a pantalla completa. Los dos
// números tienen que ser inversos o la ilusión se rompe — se vería un salto de
// tamaño en cada relevo.
// Valores medidos directamente en fame-estate.com, no estimados a ojo: la
// imagen de cada capa nace a scale(0.35) y su marco lleva
// clip-path: polygon(50% 50%, ...) — es decir, una ventana de área cero en el
// centro. BIRTH y ZOOM son inversos, así que en cada relevo el entrante mide
// exactamente lo que medía el saliente al empezar.
const BIRTH = 0.35;
const ZOOM = 1 / BIRTH; // 2.857
const STEP = 1; // separación entre saltos
const PIP_START = 1; // el túnel arranca cuando el chip ya casi ha pasado
const HOLD = 1.2; // reposo en el destino antes de ceder el paso

const Hero = () => {
  const root = useRef(null);

  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useGSAP(
    () => {
      // 1. Entrada, independiente del scroll
      const intro = gsap.timeline({ delay: 0.2 });

      intro
        .fromTo(
          '.apple-giant-text-bg h1',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
        )
        .fromTo(
          '.macro-img',
          { scale: 0.8, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
          '-=0.8'
        );

      // Con movimiento reducido no se secuestran cuatro pantallas de scroll: la
      // sección se queda como una sola pantalla, y CSS (.is-static) decide qué
      // se ve — el interior del núcleo ya resuelto, sin el mecanismo del zoom.
      if (reduced) return;

      const mm = gsap.matchMedia(root);

      mm.add('(min-width: 100px)', () => {
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

        // --- Fase 1: atravesamos el chip -------------------------------------
        tl.to('.apple-giant-text-bg h1', { scale: 8, opacity: 0, duration: 1 }, 0)
          .to('.apple-macro-object', { scale: 6, opacity: 0, duration: 1.2 }, 0)
          .to('.apple-hero-glow', { opacity: 0.8, scale: 1.2, duration: 1.2 }, 0.2);

        // --- Fase 2: zoom recursivo (Inception) ------------------------------
        tl.fromTo('.pip-scene', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, PIP_START - 0.4);

        const frames = gsap.utils.toArray('.pip-frame');
        const last = frames.length - 1;

        frames.forEach((el, i) => {
          // El contenido escala; el marco NO — el marco solo abre su ventana.
          const inner = el.querySelector('img, .pip-content');

          // Cada capa termina de abrirse en su propio instante, separados por
          // STEP. Incluida la primera: el efecto arranca con la imagen pequeña
          // en el centro del rojo, no con una capa ya desplegada.
          const tFull = PIP_START + (i + 1) * STEP;
          const tStart = tFull - STEP;

          // La capa aparece de golpe a su tamaño de nacimiento. No hay fundido:
          // en la referencia el rectángulo entra ya opaco.
          tl.set(el, { autoAlpha: 1 }, tStart);

          // Segundo tramo: la imagen sigue creciendo de 1 a ZOOM ya con la
          // ventana abierta del todo, y desborda la pantalla. Sin él el túnel
          // se queda plano. El último marco es el destino y se detiene en 1.
          const eEnd = i === last ? 0 : 1;

          // ZOOM^e con e lineal, no escala lineal: lo que el ojo percibe como
          // velocidad es el CAMBIO RELATIVO de tamaño, no el absoluto. Con una
          // rampa lineal el arranque va disparado y el final se arrastra.
          const proxy = { e: -1 };
          tl.to(
            proxy,
            {
              e: eEnd,
              duration: (eEnd + 1) * STEP,
              ease: 'none',
              onUpdate: () => {
                const s = Math.pow(ZOOM, proxy.e);
                // La ventana y la imagen crecen JUNTAS y con el mismo número.
                // Así el rectángulo visible nace midiendo el 35 % de la
                // pantalla — el tamaño mínimo que se ve en la referencia — en
                // vez de abrirse desde un punto. Abriéndola por separado, la
                // ventana pasaba la mayor parte del recorrido siendo un sello
                // diminuto con un trozo de foto dentro.
                //
                // Y como ambos son del tamaño del viewport y llevan la misma
                // escala, la imagen encaja con el borde de la ventana al pixel:
                // no se ve recortada, se ve entera y pequeña.
                gsap.set(inner, { scale: s });
                const inset = s < 1 ? ((1 - s) / 2) * 100 : 0;
                gsap.set(el, { clipPath: `inset(${inset}%)` });
              },
            },
            tStart
          );
        });

        // --- Fase 3: reposo y salida ------------------------------------------
        // El destino se queda quieto y legible antes de ceder el paso.
        const tEnd = PIP_START + (last + 1) * STEP;
        tl.to('.apple-hero-container', { opacity: 0, duration: 0.8 }, tEnd + HOLD);
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      className={`apple-hero-section ${reduced ? 'is-static' : ''}`}
      id="inicio"
      ref={root}
      style={reduced ? undefined : { '--scroll-mult': 7 }}
    >
      <div className="apple-hero-stage" style={{ perspective: '1000px' }}>
        <GlobalChrome />
        <Header />
        <div className="apple-hero-container">
          {/* Fondo: aurora de color y brillo ambiental. Familia ámbar-naranja,
              coherente con el metal y el brillo del chip — no un arcoíris que
              rompa con la estética ya establecida del Hero. */}
          <div className="apple-hero-glow" aria-hidden="true" />

          {/* Capa trasera: tipografía colosal */}
          <div className="apple-giant-text-bg">
            <h1>
              WEB
              <br />
              NEURON
            </h1>
          </div>

          {/* Capa media: el chip 3D (fotografía) */}
          <div className="apple-macro-object" style={{ transformStyle: 'preserve-3d', zIndex: 5 }}>
            <img src={`${import.meta.env.BASE_URL}hero-core.png`} alt="Núcleo de Inteligencia Artificial" className="macro-img" />
          </div>

          {/* Nueva Escena PIP Inception (4 Niveles) */}
          <div className="pip-scene" aria-hidden="true">
            {/* Nivel 1 */}
            <div className="pip-frame pip-level-1">
              <img src={`${import.meta.env.BASE_URL}54847224.jpg`} alt="Frame 1" />
            </div>
            
            {/* Nivel 2 */}
            <div className="pip-frame pip-level-2">
              <img src={`${import.meta.env.BASE_URL}va-hero-saved.jpg`} alt="Frame 2" />
            </div>

            {/* Nivel 3 */}
            <div className="pip-frame pip-level-3">
              <img src={`${import.meta.env.BASE_URL}ChatGPT Image 18 ago 2026, 12_09_21 a.m..png`} alt="Frame 3" />
            </div>

            {/* Nivel 4: El bloque sólido rojo */}
            <div className="pip-frame pip-level-4">
              <div className="pip-content">
                <div className="pip-content-box">
                  <h2>CREAMOS SISTEMAS DE IA<br/>QUE TRANSFORMAN TU NEGOCIO.<br/>RENDIMIENTO ABSOLUTO.</h2>
                  <p className="pip-small-text">
                    EXCLUSIVAS SOLUCIONES CON UN DISEÑO QUE CONECTA CON TUS OBJETIVOS, 
                    DÁNDOTE UN NUEVO SENTIDO DEL ÉXITO Y LA PRODUCTIVIDAD.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
