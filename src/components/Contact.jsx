import { useRef } from 'react';
import { Mail, BrainCircuit, ArrowUpRight } from 'lucide-react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
import Button from './Button';
import './Contact.css';

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'X', href: 'https://x.com/' },
];

const Contact = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const trigger = { trigger: '.cta', start: 'top 80%' };

      // Independiente del timeline: onSplit se reejecuta al re-partir el texto
      // y no puede depender de un timeline ya consumido.
      SplitText.create('.cta-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 108,
            duration: 1.3,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: trigger,
          });
        },
      });

      gsap.from('.cta-side > *', {
        autoAlpha: 0,
        y: 18,
        stagger: 0.08,
        duration: 0.9,
        delay: 0.3,
        scrollTrigger: trigger,
      });

      // La textura se mueve más despacio que la sección: parallax clásico, y lo
      // que evita que el bloque de cierre se vea plano.
      gsap.fromTo(
        '.cta-texture',
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );

      gsap.from('.foot-row > *', {
        autoAlpha: 0,
        y: 14,
        stagger: 0.07,
        duration: 0.85,
        scrollTrigger: { trigger: '.foot', start: 'top 94%' },
      });
    },
    { scope: root }
  );

  return (
    <footer className="contact" id="contacto" ref={root}>
      <section className="cta">
        <div className="cta-texture" aria-hidden="true">
          <img src="/abstract-bg.jpg" alt="" loading="lazy" />
        </div>

        <div className="shell cta-inner">
          <h2 className="display cta-title">
            ¿Listo para <span className="text-accent">evolucionar?</span>
          </h2>

          <div className="cta-side">
            <p className="lede">
              Cuéntanos qué parte de tu operación te está frenando. Te decimos en una llamada si se
              puede automatizar y cuánto costaría.
            </p>

            <div className="cta-actions">
              <Button href="mailto:webneuronsupport@gmail.com" variant="accent" icon={Mail}>
                Contactar ventas
              </Button>
              <Button href="#servicios" icon={ArrowUpRight}>
                Ver soluciones
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="shell foot">
        <hr className="rule" />

        <div className="foot-row">
          <a href="#inicio" className="foot-logo">
            <BrainCircuit size={20} strokeWidth={1.6} />
            Web Neuron
          </a>

          <p className="foot-legal">
            © {new Date().getFullYear()} Web Neuron. Todos los derechos reservados.
          </p>

          <nav className="foot-social" aria-label="Redes sociales">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener">
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
