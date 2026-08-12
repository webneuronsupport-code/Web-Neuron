import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import './Marquee.css';

const ITEMS = [
  'WhatsApp Business',
  'Instagram',
  'Telegram',
  'Gmail',
  'HubSpot',
  'Notion',
  'Shopify',
  'Slack',
  'Google Calendar',
  'Stripe',
];

const Marquee = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      // Bucle infinito: la pista contiene la lista dos veces, así que
      // desplazarla un 50% deja el segundo juego exactamente donde estaba el
      // primero. El salto de vuelta a 0 es invisible.
      const loop = gsap.to('.marquee-track', {
        xPercent: -50,
        duration: 32,
        ease: 'none',
        repeat: -1,
      });

      // La velocidad responde al scroll: acelera y cambia de sentido según
      // hacia dónde te muevas. Es un detalle pequeño que hace que la banda
      // se sienta conectada a la página en vez de ser un GIF.
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const dir = self.direction === -1 ? -1 : 1;
          gsap.to(loop, {
            timeScale: dir * (1 + Math.min(Math.abs(self.getVelocity()) / 1800, 2.5)),
            duration: 0.5,
            overwrite: true,
          });
        },
      });

      gsap.from(root.current, {
        autoAlpha: 0,
        duration: 1.2,
        scrollTrigger: { trigger: root.current, start: 'top 92%' },
      });
    },
    { scope: root }
  );

  return (
    <section className="marquee" ref={root} aria-label="Integraciones disponibles">
      <div className="marquee-viewport">
        <div className="marquee-track">
          {/* Dos pasadas de la misma lista: la segunda es decorativa y se
              oculta a los lectores de pantalla. */}
          {[0, 1].map((pass) => (
            <ul className="marquee-group" key={pass} aria-hidden={pass === 1 || undefined}>
              {ITEMS.map((item) => (
                <li key={item}>
                  <span className="marquee-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
