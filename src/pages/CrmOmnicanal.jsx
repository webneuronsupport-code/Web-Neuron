import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import Contact from '../components/Contact';
import DriftWall from '../components/DriftWall';
import BlurText from '../components/BlurText';
import Header from '../components/Header';
import './CrmOmnicanal.css';

const DRIFT_ITEMS = [
  { image: 'https://cdn.simpleicons.org/whatsapp/25D366', title: 'WhatsApp', href: '#' },
  { image: 'https://cdn.simpleicons.org/messenger/0084FF', title: 'Messenger', href: '#' },
  { image: 'https://img.icons8.com/color/480/instagram-new--v1.png', title: 'Instagram', href: '#' },
  { image: 'https://cdn.simpleicons.org/telegram/26A5E4', title: 'Telegram', href: '#' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg', title: 'Gmail', href: '#' },
  { image: 'https://img.icons8.com/color/480/microsoft-outlook-2019--v2.png', title: 'Outlook', href: '#' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg', title: 'Calendar', href: '#' },
  { image: 'https://cdn.simpleicons.org/googlemessages/1A73E8', title: 'SMS', href: '#' },
  { image: 'https://cdn.simpleicons.org/livechat/F69322', title: 'Webchat', href: '#' },
  { image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg', title: 'Drive', href: '#' },
  { image: 'https://img.icons8.com/color/480/google-sheets.png', title: 'Sheets', href: '#' },
  { image: 'https://cdn.simpleicons.org/tiktok/ffffff', title: 'TikTok', href: '#' },
];

const CrmHero = () => {
  const container = useRef(null);
  const subtitle = useRef(null);
  const image = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.5 });

      tl.from(subtitle.current, {
        opacity: 0,
        y: 20,
        duration: 1,
      }, '-=0.8')
      .from(image.current, {
        scale: 1.05,
        opacity: 0,
        duration: 1.5,
      }, '-=1');
      
      // Parallax sutil en el fondo
      gsap.to(image.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    },
    { scope: container }
  );

  return (
    <section className="crm-hero" ref={container}>
      <div className="crm-hero-content">
        <BlurText
          text="CRM OMNICANAL INTELIGENTE"
          delay={150}
          animateBy="words"
          direction="top"
          className="crm-title"
        />
        <p className="crm-subtitle" ref={subtitle}>
          Todos tus canales de comunicación en una sola bandeja de entrada. Centraliza WhatsApp, Instagram, correo y más, potenciado por IA para que no pierdas ninguna oportunidad de venta.
        </p>
      </div>
      <div className="crm-hero-image-wrapper" ref={image}>
        <DriftWall
          items={DRIFT_ITEMS}
          columns={16}
          tileWidth={160}
          tileHeight={120}
          gap={20}
          tilt={12}
          turn={-10}
          perspective={1000}
          depth={80}
          speed={40}
          direction="up"
          variance={0.5}
          parallax={0.5}
          lift={40}
          fade={0.6}
          dim={0.4}
          overlayColor="#000000"
          radius={20}
          roll={0}
          pauseOnHover={false}
          grayscale={false}
        />
        <div className="crm-hero-gradient"></div>
      </div>
    </section>
  );
};

const CrmContext = () => {
  const container = useRef(null);
  
  useGSAP(() => {
    gsap.from('.crm-context-text', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      }
    });
  }, { scope: container });

  return (
    <section className="crm-context" ref={container}>
      <div className="shell">
        <div className="crm-context-inner">
          <h2 className="crm-context-text">La dispersión es el enemigo de la conversión.</h2>
          <p className="crm-context-text">
            Responder mensajes saltando entre pestañas es ineficiente y te hace perder clientes. Nuestro CRM unifica todas las plataformas en una interfaz rápida e inteligente, permitiéndote colaborar con tu equipo en tiempo real y tener un historial completo de cada lead.
          </p>
        </div>
      </div>
    </section>
  );
};

const CrmOmnicanal = () => {
  return (
    <div className="crm-page">
      <Header />
      <CrmHero />
      <CrmContext />
      <Contact />
    </div>
  );
};

export default CrmOmnicanal;
