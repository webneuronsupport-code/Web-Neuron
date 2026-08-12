import { useRef } from 'react';
import { ArrowUpRight, Mail, BrainCircuit } from 'lucide-react';
import { gsap, SplitText, useGSAP } from '../lib/gsap';
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
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.cta-card', start: 'top 78%' },
      });

      tl.from('.cta-card', { autoAlpha: 0, y: 60, scale: 0.97, duration: 1.3 });

      // Independiente del timeline, por el mismo motivo que en SectionHeading:
      // onSplit se reejecuta al re-partir y no puede depender de un timeline
      // que ya se haya consumido.
      SplitText.create('.cta-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 106,
            duration: 1.2,
            stagger: 0.09,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.cta-card', start: 'top 78%' },
          });
        },
      });

      tl.from('.cta-lede', { autoAlpha: 0, y: 20, duration: 0.9 }, 0.5)
        .from('.cta-actions > *', { autoAlpha: 0, y: 18, stagger: 0.1, duration: 0.9 }, 0.62);

      // La textura del fondo se mueve más despacio que la tarjeta: parallax
      // clásico, y lo que hace que el bloque final no parezca plano.
      gsap.fromTo(
        '.cta-texture',
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.cta-card',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.from('.foot-row > *', {
        autoAlpha: 0,
        y: 16,
        stagger: 0.08,
        duration: 0.9,
        scrollTrigger: { trigger: '.foot', start: 'top 92%' },
      });
    },
    { scope: root }
  );

  return (
    <footer className="contact" id="contacto" ref={root}>
      <div className="shell">
        <section className="cta-card glass">
          <div className="cta-texture" aria-hidden="true">
            <img src="/abstract-bg.jpg" alt="" loading="lazy" />
          </div>

          <div className="cta-body">
            <h2 className="headline cta-title">
              <span className="grad-text">¿Listo para</span>{' '}
              <span className="grad-accent">evolucionar?</span>
            </h2>

            <p className="lede cta-lede">
              Cuéntanos qué parte de tu operación te está frenando. Te decimos en una llamada si se
              puede automatizar y cuánto costaría.
            </p>

            <div className="cta-actions">
              <a href="mailto:webneuronsupport@gmail.com" className="btn btn--primary btn--lg">
                <Mail size={18} /> Contactar ventas
              </a>
              <a href="#servicios" className="btn btn--lg">
                Ver soluciones <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <div className="foot">
          <hr className="hairline" />

          <div className="foot-row">
            <a href="#inicio" className="foot-logo">
              <span className="foot-logo-mark">
                <BrainCircuit size={18} strokeWidth={1.8} />
              </span>
              <span className="grad-text">Web Neuron</span>
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
      </div>
    </footer>
  );
};

export default Contact;
