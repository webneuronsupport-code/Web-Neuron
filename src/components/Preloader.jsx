import { useRef, useState } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { COUNT_DURATION, CURTAIN_START } from '../lib/timing';
import './Preloader.css';

// Dos columnas de nombres que corren en sentidos opuestos. Son las
// herramientas que Web Neuron integra: dice qué hace la empresa antes de que
// se haya pintado una sola sección.
const LEFT = [
  // Nombres cortos a propósito: la columna mide 128 px en un móvil de 320 y
  // «WhatsApp Business» necesitaba 170, así que se cortaba a media palabra.
  'WhatsApp',
  'HubSpot',
  'Shopify',
  'Notion',
  'Slack',
  'Gmail',
  'Stripe',
  'Instagram',
  'Telegram',
  'Calendar',
];

const RIGHT = [
  'Automatización',
  'Asistentes IA',
  'CRM omnicanal',
  'Agentes de voz',
  'Flujos',
  'Integraciones',
  'Analítica',
  'Desarrollo web',
  'Soporte 24/7',
  'Cualificación',
];

const Preloader = () => {
  const root = useRef(null);
  const count = useRef(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      // Quien pide movimiento reducido no debería mirar un telón animado
      // durante dos segundos: se retira de inmediato.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setGone(true);
        return;
      }

      const columns = gsap.utils.toArray('.pre-col-inner');

      // Cada columna contiene la lista dos veces, así que moverla un 50%
      // devuelve el segundo juego a la posición del primero y el reinicio no
      // se ve. Sentidos opuestos: una sube, la otra baja.
      columns.forEach((col, i) => {
        gsap.fromTo(
          col,
          { yPercent: i === 0 ? 0 : -50 },
          { yPercent: i === 0 ? -50 : 0, duration: 14, ease: 'none', repeat: -1 }
        );
      });

      const counter = { n: 0 };
      const tl = gsap.timeline();

      tl.to(counter, {
        n: 100,
        duration: COUNT_DURATION,
        ease: 'power2.inOut',
        onUpdate: () => {
          count.current.textContent = Math.round(counter.n);
        },
      })
        // Las columnas se van antes que el telón: primero se vacía el fondo y
        // después sube la cortina, en lugar de que todo desaparezca de golpe.
        .to('.pre-col', { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, CURTAIN_START - 0.25)
        .to('.pre-count', { autoAlpha: 0, y: -14, duration: 0.5 }, CURTAIN_START - 0.2)
        .to(
          root.current,
          {
            yPercent: -100,
            duration: 1,
            ease: 'expo.inOut',
            onComplete: () => setGone(true),
          },
          CURTAIN_START
        );
    },
    { scope: root }
  );

  // Desmontar en lugar de dejarlo invisible: así el telón no queda como una
  // capa fija de pantalla completa interceptando nada.
  if (gone) return null;

  return (
    <div className="pre" ref={root}>
      <div className="pre-cols" aria-hidden="true">
        {[LEFT, RIGHT].map((list, i) => (
          <div className="pre-col" key={i}>
            <div className="pre-col-inner">
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

      <p className="pre-count">
        <span ref={count}>0</span>
      </p>

      <span className="pre-status" role="status">
        Cargando Web Neuron
      </span>
    </div>
  );
};

export default Preloader;
