import { useRef } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import { INTRO_DELAY } from '../lib/timing';
import Button from './Button';
import './Hero.css';

const COL_A = [
  'WhatsApp Business',
  'HubSpot',
  'Shopify',
  'Notion',
  'Slack',
  'Gmail',
  'Stripe',
  'Instagram',
];

const COL_B = [
  'Agentes de voz',
  'Cualificación',
  'CRM omnicanal',
  'Flujos',
  'Analítica',
  'Integraciones',
  'Soporte 24/7',
  'Telegram',
];

const Hero = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      // --- Columnas de fondo -------------------------------------------------
      // Cada columna lleva la lista dos veces; moverla un 50% devuelve el
      // segundo juego al sitio del primero, así que el reinicio es invisible.
      gsap.utils.toArray('.hero-col-inner').forEach((col, i) => {
        gsap.fromTo(
          col,
          { yPercent: i === 0 ? 0 : -50 },
          { yPercent: i === 0 ? -50 : 0, duration: 26, ease: 'none', repeat: -1 }
        );
      });

      // --- Entrada -----------------------------------------------------------
      const tl = gsap.timeline({ delay: INTRO_DELAY });

      // El titular se parte en líneas y cada una asoma desde detrás de su
      // máscara. La animación se crea DENTRO de onSplit: autoSplit vuelve a
      // partir el texto cuando cargan las fuentes, y un tween colgado de un
      // timeline ya consumido dejaría las líneas congeladas fuera de vista.
      SplitText.create('.hero-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'hero-line',
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.5,
            stagger: 0.09,
            ease: 'expo.out',
            delay: INTRO_DELAY,
          });
        },
      });

      tl.from('.hero-subject', { autoAlpha: 0, scale: 1.06, duration: 1.8, ease: 'expo.out' }, 0.15)
        .from('.hero-label', { autoAlpha: 0, y: 12, duration: 0.8 }, 0.5)
        .from('.hero-lede', { autoAlpha: 0, y: 16, duration: 0.9 }, 0.7)
        .from('.hero-actions > *', { autoAlpha: 0, y: 14, stagger: 0.08, duration: 0.8 }, 0.8)
        .from('.hero-cue', { autoAlpha: 0, duration: 0.8 }, 1);

      // --- Parallax ----------------------------------------------------------
      // Tres velocidades: las columnas apenas se mueven, el sujeto se hunde y
      // el texto se va. Es lo que crea la profundidad al salir del hero.
      gsap.to('.hero-cols', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.to('.hero-subject', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      // El texto se retira tarde y despacio. Desvanecerlo antes dejaba un hueco
      // negro entre el final del hero y la banda siguiente, porque el contenido
      // del hero está alineado abajo y arriba no queda nada que mirar.
      gsap.to('.hero-text', {
        yPercent: -10,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: '25% top', end: 'bottom top', scrub: true },
      });

      // Deriva lenta de la luz ambiental. Duraciones distintas para que el
      // bucle no se perciba.
      gsap.to('.hero-glow-a', {
        x: 70,
        y: -50,
        scale: 1.15,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.hero-glow-b', {
        x: -60,
        y: 60,
        scale: 1.1,
        duration: 23,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope: root }
  );

  return (
    <section className="hero" id="inicio" ref={root}>
      <div className="hero-bg" aria-hidden="true">
        <span className="ambient hero-glow-a" />
        <span className="ambient hero-glow-b" />

        <div className="hero-cols">
          {[COL_A, COL_B].map((list, i) => (
            <div className="hero-col" key={i}>
              <div className="hero-col-inner">
                {[0, 1].map((pass) => (
                  <ul key={pass}>
                    {list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-subject">
        <img
          src="/images/panel-assistant.svg"
          alt="Asistente de IA respondiendo a un cliente en tiempo real"
          width="900"
          height="620"
        />
      </div>

      <div className="shell hero-text">
        <h1 className="display hero-title">
          Sistemas de IA que transforman <span className="text-accent">tu negocio</span>
        </h1>

        <div className="hero-foot">
          <div className="hero-copy">
            <span className="label hero-label">Automatización · Madrid</span>
            <p className="lede hero-lede">
              Asistentes virtuales, automatizaciones y CRM omnicanal. Sobre las herramientas que ya
              usas, en producción en catorce días.
            </p>
          </div>

          <div className="hero-actions">
            <Button href="#servicios" variant="accent">
              Descubrir soluciones
            </Button>
            <Button href="#contacto" icon={Play}>
              Agendar demo
            </Button>
          </div>
        </div>
      </div>

      <a href="#servicios" className="hero-cue" aria-label="Ir a servicios">
        <span className="hero-cue-line" aria-hidden="true" />
        <ArrowRight size={13} strokeWidth={2.2} className="hero-cue-arrow" aria-hidden="true" />
      </a>
    </section>
  );
};

export default Hero;
