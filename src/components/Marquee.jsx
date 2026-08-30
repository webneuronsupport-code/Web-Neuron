import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import './Marquee.css';

const ITEMS = [
  { name: 'Meta', icon: 'meta' },
  { name: 'GitHub', icon: 'github', color: 'white' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Claude', icon: 'claude' },
  { name: 'Cloudflare', icon: 'cloudflare' },
  { name: 'AWS', customSrc: `${import.meta.env.BASE_URL}aws-white.svg` },
  { name: 'Google Cloud', icon: 'googlecloud' },
  { name: 'WhatsApp', icon: 'whatsapp' },
  { name: 'Chatwoot', icon: 'chatwoot' },
  { name: 'Instagram', icon: 'instagram' },
  { name: 'Google Calendar', icon: 'googlecalendar' },
  { name: 'Anthropic', icon: 'anthropic', color: 'white' },
  { name: 'OpenAI', customSrc: `${import.meta.env.BASE_URL}openai-white.svg` },
  { name: 'Redis', icon: 'redis' },
  { name: 'GSAP', icon: 'gsap' },
  { name: 'n8n', icon: 'n8n' },
  { name: 'ElevenLabs', icon: 'elevenlabs', color: 'white' },
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
                <li key={item.name} className="marquee-item">
                  <span className="marquee-dot" aria-hidden="true" />
                  <img
                    src={item.customSrc || `https://cdn.simpleicons.org/${item.icon}${item.color ? `/${item.color}` : ''}`}
                    alt={`${item.name} logo`}
                    className="marquee-icon"
                    width="16"
                    height="16"
                  />
                  {item.name}
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
