import { useRef } from 'react';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import './Hero.css';

const Hero = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.35 });

      // El titular se parte en líneas y cada línea sube desde detrás de su
      // propia máscara. mask: 'lines' crea el contenedor con overflow oculto,
      // que es lo que produce el efecto de "asomar" en vez de solo aparecer.
      // autoSplit vuelve a partir el texto cuando cargan las fuentes o cambia
      // el ancho, así que las líneas nunca quedan cortadas donde no toca.
      //
      // La animación se crea DENTRO de onSplit y es independiente: onSplit se
      // vuelve a ejecutar en cada re-partición, y si el tween se colgara del
      // timeline de arriba, al re-partir se añadiría a un timeline ya
      // terminado y las líneas se quedarían congeladas fuera de la máscara.
      SplitText.create('.hero-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'hero-line',
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 108,
            duration: 1.5,
            stagger: 0.11,
            ease: 'expo.out',
            delay: 0.35,
          });
        },
      });

      tl.from('.hero-badge', { autoAlpha: 0, y: 18, duration: 0.9 }, 0.1)
        .from('.hero-lede', { autoAlpha: 0, y: 22, duration: 1 }, 0.75)
        .from('.hero-actions > *', { autoAlpha: 0, y: 20, stagger: 0.1, duration: 0.9 }, 0.9)
        .from('.hero-proof > *', { autoAlpha: 0, y: 14, stagger: 0.07, duration: 0.8 }, 1.05)
        .from('.hero-cue', { autoAlpha: 0, duration: 0.8 }, 1.3)
        // El panel llega desde abajo, inclinado, y se endereza.
        .from(
          '.hero-panel',
          { autoAlpha: 0, y: 120, rotateX: 22, scale: 0.94, duration: 1.8, ease: 'expo.out' },
          0.6
        );

      // Respiración infinita de las esferas. Duraciones desacompasadas para
      // que el bucle nunca se vea repetir.
      gsap.to('.hero-orb--indigo', {
        x: 90,
        y: -60,
        scale: 1.16,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.hero-orb--cyan', {
        x: -70,
        y: 70,
        scale: 1.1,
        duration: 19,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.hero-orb--violet', {
        x: 60,
        y: 50,
        scale: 1.22,
        duration: 23,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Parallax al hacer scroll: el fondo se queda atrás, el texto se
      // desvanece y el panel se hunde. Tres velocidades distintas dan la
      // sensación de profundidad.
      gsap.to('.hero-aurora', {
        yPercent: 24,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.to('.hero-copy', {
        yPercent: -14,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '65% top', scrub: true },
      });

      gsap.to('.hero-panel', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-panel', start: 'top bottom', end: 'bottom top', scrub: 1 },
      });

      // Inclinación del panel siguiendo el cursor. quickTo mantiene una única
      // interpolación viva por propiedad en lugar de crear un tween nuevo por
      // cada evento de ratón, que serían decenas por segundo.
      const panel = root.current.querySelector('.hero-panel-inner');
      const rotY = gsap.quickTo(panel, 'rotateY', { duration: 0.7, ease: 'power3.out' });
      const rotX = gsap.quickTo(panel, 'rotateX', { duration: 0.7, ease: 'power3.out' });

      const onMove = (e) => {
        const { innerWidth: w, innerHeight: h } = window;
        rotY(gsap.utils.mapRange(0, w, -7, 7, e.clientX));
        rotX(gsap.utils.mapRange(0, h, 5, -5, e.clientY));
      };

      // Solo con ratón: en táctil no hay cursor que seguir y el listener
      // sobraría en cada gesto.
      const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      if (canHover) window.addEventListener('pointermove', onMove);

      return () => {
        if (canHover) window.removeEventListener('pointermove', onMove);
      };
    },
    { scope: root }
  );

  return (
    <section className="hero" id="inicio" ref={root}>
      <div className="hero-bg" aria-hidden="true">
        <img className="hero-aurora" src="/images/aurora.svg" alt="" />
        <span className="orb hero-orb hero-orb--indigo" />
        <span className="orb hero-orb hero-orb--cyan" />
        <span className="orb hero-orb hero-orb--violet" />
      </div>

      <div className="shell hero-copy">
        <span className="chip hero-badge">
          <Sparkles size={14} className="grad-accent" />
          La nueva era de la automatización
        </span>

        <h1 className="display hero-title">
          <span className="grad-text">Sistemas de IA</span>{' '}
          <span className="grad-text">que transforman</span>{' '}
          <span className="grad-accent">tu negocio.</span>
        </h1>

        <p className="lede hero-lede">
          Asistentes virtuales, automatizaciones avanzadas y CRM omnicanal. Diseñados con precisión
          quirúrgica para que tu equipo deje de repetir tareas y vuelva a vender.
        </p>

        <div className="hero-actions">
          <a href="#servicios" className="btn btn--primary btn--lg">
            Descubrir soluciones <ArrowRight size={18} />
          </a>
          <a href="#contacto" className="btn btn--lg">
            <Play size={16} /> Agendar demo
          </a>
        </div>

        <div className="hero-proof">
          <span>Implantación en 14 días</span>
          <i aria-hidden="true" />
          <span>Sin cambiar de herramientas</span>
          <i aria-hidden="true" />
          <span>Soporte en español</span>
        </div>
      </div>

      <div className="hero-panel">
        <div className="hero-panel-inner glass">
          <img
            src="/images/panel-assistant.svg"
            alt="Panel de un asistente de IA respondiendo a un cliente en tiempo real"
            width="900"
            height="620"
          />
        </div>
        <span className="hero-panel-glow" aria-hidden="true" />
      </div>

      <a href="#servicios" className="hero-cue" aria-label="Ir a servicios">
        <span className="hero-cue-track">
          <span className="hero-cue-dot" />
        </span>
        Desplázate
      </a>
    </section>
  );
};

export default Hero;
