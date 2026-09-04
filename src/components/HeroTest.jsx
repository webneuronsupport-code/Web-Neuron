import { useRef, useState, useEffect } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import './HeroTest.css';

const asset = (f) => `${import.meta.env.BASE_URL}${f}`;

/* Cambia a la pieza definitiva cuando la tengas. Lo que necesita la imagen
   está en public/arch/ESPEC-IMAGENES.md; el requisito que lo decide todo es el
   fondo transparente. */
const OBJETO = asset('hero-core.png');

/* ==========================================================================
   Anotaciones técnicas

   `m` es el marcador sobre el objeto y `t` donde se apoya el texto, los dos en
   porcentaje del escenario. En porcentaje y no en píxeles porque el objeto se
   escala con la ventana: en píxeles, los marcadores se despegarían de la pieza
   que señalan en cuanto cambiara el tamaño de pantalla.

   `lado` decide hacia dónde sale la guía. La línea siempre hace el mismo
   recorrido — un tramo recto, una diagonal y otro recto — que es lo que
   distingue una guía de plano técnico de una flecha cualquiera.
   ========================================================================== */
const NOTAS = [
  {
    id: 'escucha',
    lado: 'izq',
    m: { x: 42, y: 34 },
    t: { x: 16, y: 26 },
    txt: 'ESCUCHA EN TRES CANALES\nA LA VEZ, SIN TURNOS\nNI HORARIOS',
  },
  {
    id: 'memoria',
    lado: 'izq',
    m: { x: 38, y: 62 },
    t: { x: 13, y: 72 },
    txt: 'RECUERDA CADA\nCONVERSACIÓN ANTERIOR',
  },
  {
    id: 'razona',
    lado: 'der',
    m: { x: 57, y: 26 },
    t: { x: 66, y: 15 },
    txt: 'DONDE EL LENGUAJE SE VUELVE\nDECISIÓN, Y LA DECISIÓN\nSE VUELVE ACCIÓN',
  },
  {
    id: 'actua',
    lado: 'der',
    m: { x: 60, y: 70 },
    t: { x: 68, y: 82 },
    txt: 'ACTÚA SOBRE TU CRM,\nTU AGENDA Y TU INVENTARIO',
  },
];

const HILOS = [
  { n: '01', et: '(WHATSAPP/WEB/VOZ)', t: 'CANALES DE ENTRADA' },
  { n: '02', et: '', t: 'MEMORIA Y CONTEXTO' },
  { n: '03', et: '', t: 'RAZONAMIENTO · LLM' },
  { n: '04', et: '', t: 'ACCIONES Y APIS' },
];

/* Recorrido de la guía: marcador → tramo recto → diagonal → tramo recto hasta
   el texto. Cuatro puntos, calculados para que la diagonal siempre caiga a 45°,
   que es lo que hace que un conjunto de guías se lea como un plano y no como
   un montón de líneas sueltas. */
const guia = ({ m, t, lado }) => {
  const dir = lado === 'izq' ? -1 : 1;
  const dy = t.y - m.y;
  // La diagonal cubre en horizontal lo mismo que en vertical (a 45° en
  // proporción de pantalla), y el resto se reparte entre los dos rectos.
  const diag = Math.abs(dy) * 0.55;
  const p1 = { x: m.x + dir * 4, y: m.y };
  const p2 = { x: p1.x + dir * diag, y: t.y };
  const p3 = { x: t.x + (lado === 'izq' ? 0 : 0), y: t.y };
  return `${m.x},${m.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
};

const HeroTest = () => {
  const root = useRef(null);
  const [hora, setHora] = useState('');
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Reloj real. Es un detalle diminuto y es de los que más venden la idea de
  // «instrumento en marcha» — un reloj congelado la mata.
  useEffect(() => {
    const tic = () =>
      setHora(
        new Date()
          .toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true })
          .toUpperCase()
      );
    tic();
    const id = setInterval(tic, 1000 * 20);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      if (reduced) return;

      /* ================================================================
         INTRO — se reproduce sola al cargar.
         ================================================================ */
      gsap
        .timeline({ delay: 0.15 })
        .fromTo('.sx-rejilla line', { drawSVG: '50% 50%' }, { drawSVG: '0% 100%', duration: 1, stagger: 0.06, ease: 'power2.inOut' }, 0)
        .fromTo('.sx-cruz', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05 }, 0.5)
        .fromTo('.sx-obj', { opacity: 0, scale: 1.12, filter: 'blur(14px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out' }, 0.3)
        .fromTo('.sx-linea', { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.08, ease: 'power4.out' }, 0.55)
        .fromTo('.sx-chrome', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06 }, 0.9);

      /* ================================================================
         BUCLES — lo que sigue vivo cuando nadie toca nada.

         Regla que sostiene todo esto: un bucle y un scrub nunca tocan la
         misma propiedad del mismo elemento. Por eso la flotación va en
         .sx-flota y el acercamiento del scroll en .sx-obj, que es un
         envoltorio distinto.
         ================================================================ */

      gsap.to('.sx-flota', { y: -18, duration: 5.5, ease: 'sine.inOut', repeat: -1, yoyo: true });
      gsap.fromTo('.sx-gira', { rotate: -1.6 }, { rotate: 1.6, duration: 17, ease: 'sine.inOut', repeat: -1, yoyo: true });

      // Los recuadros de muestreo: saltan por la superficie del objeto como si
      // algo lo estuviera analizando por partes. Es el detalle que convierte
      // una foto quieta en una lectura en curso.
      gsap.utils.toArray('.sx-muestra').forEach((el, i) => {
        const mover = () =>
          gsap.set(el, {
            left: `${38 + Math.random() * 24}%`,
            top: `${32 + Math.random() * 34}%`,
            width: `${5 + Math.random() * 5}%`,
          });
        mover();
        gsap.to(el, {
          opacity: 0.9,
          duration: 0.28,
          repeat: -1,
          repeatDelay: 1.6 + i * 0.9,
          yoyo: true,
          onRepeat: mover,
        });
      });

      // Barras de progreso de la lista, en bucle desacompasado.
      gsap.fromTo('.sx-barra i',
        { xPercent: -100 },
        { xPercent: 0, duration: 2.2, ease: 'power2.inOut', repeat: -1, repeatDelay: 2.4, stagger: 0.5 }
      );

      gsap.to('.sx-late', {
        opacity: 0.25, duration: 0.9, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: { each: 0.4, from: 'random' },
      });

      /* ================================================================
         SCROLL — las anotaciones se van escribiendo y la cámara se acerca.
         ================================================================ */
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      NOTAS.forEach((_, i) => {
        const at = 0.35 + i * 0.85;
        tl.fromTo(`.sx-marca-${i}`, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2.4)' }, at);
        tl.fromTo(`.sx-guia-${i}`, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5 }, at + 0.12);
        tl.fromTo(`.sx-nota-${i}`, { opacity: 0, x: NOTAS[i].lado === 'izq' ? 8 : -8 }, { opacity: 1, x: 0, duration: 0.4 }, at + 0.4);
      });

      const fin = 0.35 + NOTAS.length * 0.85;
      tl.fromTo('.sx-obj', { scale: 1 }, { scale: 1.14, duration: fin + 0.8, ease: 'none' }, 0);
      tl.to('.sx-titulo', { yPercent: -22, opacity: 0.12, duration: fin, ease: 'none' }, 0);
      tl.to('.sx-cierre', { opacity: 1, y: 0, duration: 0.5 }, fin + 0.3);
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section className={`sx${reduced ? ' is-static' : ''}`} ref={root}>
      <div className="sx-stage">
        {/* ---------- Rejilla ---------- */}
        <svg className="sx-rejilla" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="25" y1="0" x2="25" y2="100" />
          <line x1="75" y1="0" x2="75" y2="100" />
          <line x1="0" y1="31" x2="100" y2="31" />
          <line x1="0" y1="69" x2="100" y2="69" />
        </svg>
        {[[25, 31], [75, 31], [25, 69], [75, 69]].map(([x, y]) => (
          <span className="sx-cruz" key={`${x}-${y}`} style={{ left: `${x}%`, top: `${y}%` }}>+</span>
        ))}

        {/* ---------- Barra superior ---------- */}
        <span className="sx-chrome sx-marca-txt">WEB NEURON</span>

        <div className="sx-chrome sx-modo">
          <button type="button" className="sx-pill">CAMBIAR MODO</button>
          <svg className="sx-globo" viewBox="0 0 60 40" aria-hidden="true">
            <ellipse cx="30" cy="20" rx="28" ry="18" />
            <ellipse cx="30" cy="20" rx="11" ry="18" />
            <line x1="2" y1="20" x2="58" y2="20" />
            <line x1="30" y1="2" x2="30" y2="38" />
          </svg>
        </div>

        <div className="sx-chrome sx-hora">
          <span>HORA LOCAL</span>
          <span>MX {hora}</span>
        </div>

        {/* ---------- Titular ---------- */}
        <h1 className="sx-titulo">
          <span className="sx-mask"><span className="sx-linea">ASISTENTES,</span></span>
          <span className="sx-mask"><span className="sx-linea">POR DENTRO.</span></span>
        </h1>

        {/* ---------- El objeto ---------- */}
        <div className="sx-obj">
          <div className="sx-flota">
            <div className="sx-gira">
              <img src={OBJETO} alt="Núcleo del asistente virtual" />
              {/* Recuadros de muestreo saltando por la superficie */}
              <span className="sx-muestra" />
              <span className="sx-muestra" />
            </div>
          </div>
        </div>

        {/* ---------- Guías y anotaciones ---------- */}
        <svg className="sx-guias" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {NOTAS.map((n, i) => (
            <polyline key={n.id} className={`sx-guia sx-guia-${i}`} points={guia(n)} />
          ))}
        </svg>

        {NOTAS.map((n, i) => (
          <span className={`sx-marca sx-marca-${i}`} key={`m-${n.id}`}
            style={{ left: `${n.m.x}%`, top: `${n.m.y}%` }}>
            <i />
          </span>
        ))}

        {NOTAS.map((n, i) => (
          <p className={`sx-nota sx-nota-${i} sx-nota--${n.lado}`} key={`n-${n.id}`}
            style={{ left: `${n.t.x}%`, top: `${n.t.y}%` }}>
            {n.txt}
          </p>
        ))}

        {/* ---------- Ficha de definición ---------- */}
        <aside className="sx-chrome sx-ficha">
          <header>
            <span>ASISTENTE</span>
            <span className="sx-ficha-n">/24 h</span>
          </header>
          <p>
            AD (HACIA)
            <br />+ SISTERE (ESTAR)
          </p>
          <p className="sx-ficha-def">→ ESTAR AHÍ, SIEMPRE</p>
        </aside>

        {/* ---------- Lista de capacidades ---------- */}
        <div className="sx-chrome sx-hilos">
          <p className="sx-hilos-t">[ LO QUE HAY DENTRO ]</p>
          <div className="sx-hilos-cuerpo">
            <div className="sx-glifo" aria-hidden="true">
              <span className="sx-glifo-a" />
              <span className="sx-glifo-b" />
            </div>
            <ol>
              {HILOS.map((h) => (
                <li key={h.n}>
                  <span className="sx-hilo-top">
                    <b>{h.n}.</b>
                    {h.et && <em>{h.et}</em>}
                    <span className="sx-barra"><i /></span>
                  </span>
                  <span className="sx-hilo-t">{h.t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ---------- Nota personal ---------- */}
        <aside className="sx-chrome sx-nota-pers">
          <header>NO ES UNA PLANTILLA — ES TU NEGOCIO</header>
          <p>
            Cada asistente se arma sobre tus procesos, tu tono y tus sistemas.
            Esto es un mapa de las piezas que lo componen y de cómo encajan
            entre sí.
          </p>
          <div className="sx-enlaces">
            <a href="/#servicios">SERVICIOS</a>
            <a href="/#proceso">PROCESO</a>
            <a href="/#contacto">HABLEMOS</a>
          </div>
        </aside>

        <p className="sx-cierre">
          <span className="sx-late">●</span> CUATRO SISTEMAS · UNA CONVERSACIÓN
        </p>
      </div>
    </section>
  );
};

export default HeroTest;
