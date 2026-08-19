import { useRef } from 'react';
import { ArrowUpRight, Bot, Calendar, Check } from 'lucide-react';
import { gsap, ScrollTrigger, SplitText, useGSAP } from '../lib/gsap';
import Contact from '../components/Contact';
import SectionHeading from '../components/SectionHeading';
import ParticleWave from '../components/ParticleWave';
import MagicTransform from '../components/MagicTransform';
import Header from '../components/Header';
import './VirtualAssistants.css';

const VAHero = () => {
  const container = useRef(null);
  const title = useRef(null);
  const subtitle = useRef(null);
  const orbitRef = useRef(null);
  const chatRef = useRef(null);

  useGSAP(
    () => {
      const split = new SplitText(title.current, { type: 'lines,words' });
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.2 });

      tl.from(split.words, {
        yPercent: 120,
        opacity: 0,
        duration: 1.2,
        stagger: 0.05,
      })
      .from(subtitle.current, {
        opacity: 0,
        y: 20,
        duration: 1,
      }, '-=0.8');

      // Efecto "respiración" de neón en el texto principal para mantener contraste vivo
      gsap.to(title.current, {
        textShadow: "0 10px 40px rgba(0,0,0,1), 0 2px 10px rgba(0,0,0,0.8), 0 0 35px rgba(0, 200, 255, 0.5)",
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1.5 // Comienza después de que termina la animación de entrada
      });

      // Entrada de la estructura principal (El teléfono) UNA SOLA VEZ
      tl.from(chatRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.5');

      // Animación de la interfaz de chat (bucle infinito de secuencias)
      const chatTl = gsap.timeline({ repeat: -1 });
      // Entrada de iconos de canales orbitando
      chatTl.from('.va-orbit-icon', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.5)'
      }, '-=0.5');
      
      // Flotación constante de iconos (fuera del timeline para no bloquear)
      gsap.to('.va-orbit-icon', {
        y: '-=10',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.2
      });

      // Animación de Typing de los dots
      gsap.to('.va-typing-dot', {
        y: -3,
        duration: 0.4,
        yoyo: true,
        repeat: -1,
        stagger: 0.1,
        ease: 'sine.inOut'
      });

      // Función auxiliar para facilitar el tipeo
      const tDur = 0.8; // tiempo de tipeo
      const pause = 1.2; // pausa antes de leer

      // Secuencia 1: Webchat
      chatTl.set('.seq-1', { display: 'flex' })
            .to('.seq-1', { opacity: 1, duration: 0.3 })
            .fromTo('.seq-1 .msg-u-1', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '+=0.5')
            .to('.seq-1 .type-1', { opacity: 1, duration: 0.3 })
            .to('.seq-1 .type-1', { opacity: 0, duration: 0.3, display: 'none' }, `+=${tDur}`)
            .fromTo('.seq-1 .msg-ai-1', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 })
            
            .fromTo('.seq-1 .msg-u-2', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, `+=${pause}`)
            .to('.seq-1 .scroll-area', { y: -60, duration: 0.5, ease: 'power2.inOut' }, '-=0.5')
            .to('.seq-1 .type-2', { opacity: 1, duration: 0.3 })
            .to('.seq-1 .type-2', { opacity: 0, duration: 0.3, display: 'none' }, `+=${tDur}`)
            .fromTo('.seq-1 .msg-ai-2', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 })

            .fromTo('.seq-1 .msg-u-3', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, `+=${pause}`)
            .to('.seq-1 .scroll-area', { y: -150, duration: 0.5, ease: 'power2.inOut' }, '-=0.5')
            .to('.seq-1 .type-3', { opacity: 1, duration: 0.3 })
            .to('.seq-1 .type-3', { opacity: 0, duration: 0.3, display: 'none' }, `+=${tDur}`)
            .fromTo('.seq-1 .msg-ai-3', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 })
            
            .to('.seq-1', { opacity: 0, duration: 0.5, display: 'none' }, '+=3')

      // Secuencia 2: WhatsApp
      chatTl.set('.seq-2', { display: 'flex' })
            .to('.seq-2', { opacity: 1, duration: 0.3 })
            .fromTo('.seq-2 .msg-u-1', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '+=0.5')
            .to('.seq-2 .type-1', { opacity: 1, duration: 0.3 })
            .to('.seq-2 .type-1', { opacity: 0, duration: 0.3, display: 'none' }, `+=${tDur}`)
            .fromTo('.seq-2 .msg-ai-1', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 })
            
            .fromTo('.seq-2 .msg-u-2', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, `+=${pause}`)
            .to('.seq-2 .scroll-area', { y: -60, duration: 0.5, ease: 'power2.inOut' }, '-=0.5')
            .to('.seq-2 .type-2', { opacity: 1, duration: 0.3 })
            .to('.seq-2 .type-2', { opacity: 0, duration: 0.3, display: 'none' }, `+=${tDur}`)
            .fromTo('.seq-2 .msg-ai-2', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 })
            .fromTo('.cal-widget', { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.2)' }, '+=0.2')
            .fromTo('.cal-check', { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' }, '+=0.3')

            .fromTo('.seq-2 .msg-u-3', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, `+=${pause}`)
            .to('.seq-2 .scroll-area', { y: -220, duration: 0.5, ease: 'power2.inOut' }, '-=0.5')
            .to('.seq-2 .type-3', { opacity: 1, duration: 0.3 })
            .to('.seq-2 .type-3', { opacity: 0, duration: 0.3, display: 'none' }, `+=${tDur}`)
            .fromTo('.seq-2 .msg-ai-3', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 })

            .to('.seq-2', { opacity: 0, duration: 0.5, display: 'none' }, '+=3.5')

      // Secuencia 3: Instagram
      chatTl.set('.seq-3', { display: 'flex' })
            .to('.seq-3', { opacity: 1, duration: 0.3 })
            .fromTo('.seq-3 .msg-u-1', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '+=0.5')
            .to('.seq-3 .type-1', { opacity: 1, duration: 0.3 })
            .to('.seq-3 .type-1', { opacity: 0, duration: 0.3, display: 'none' }, `+=${tDur}`)
            .fromTo('.seq-3 .msg-ai-1', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 })
            
            .fromTo('.seq-3 .msg-u-2', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, `+=${pause}`)
            .to('.seq-3 .scroll-area', { y: -60, duration: 0.5, ease: 'power2.inOut' }, '-=0.5')
            .to('.seq-3 .type-2', { opacity: 1, duration: 0.3 })
            .to('.seq-3 .type-2', { opacity: 0, duration: 0.3, display: 'none' }, `+=${tDur}`)
            .fromTo('.seq-3 .msg-ai-2', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 })

            .fromTo('.seq-3 .msg-u-3', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, `+=${pause}`)
            .to('.seq-3 .scroll-area', { y: -150, duration: 0.5, ease: 'power2.inOut' }, '-=0.5')
            .to('.seq-3 .type-3', { opacity: 1, duration: 0.3 })
            .to('.seq-3 .type-3', { opacity: 0, duration: 0.3, display: 'none' }, `+=${tDur}`)
            .fromTo('.seq-3 .msg-ai-3', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 })

            .to('.seq-3', { opacity: 0, duration: 0.5, display: 'none' }, '+=3')

      // Secuencia 4: Messenger
      chatTl.set('.seq-4', { display: 'flex' })
            .to('.seq-4', { opacity: 1, duration: 0.3 })
            .fromTo('.seq-4 .msg-u-1', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '+=0.5')
            .to('.seq-4 .type-1', { opacity: 1, duration: 0.3 })
            .to('.seq-4 .type-1', { opacity: 0, duration: 0.3, display: 'none' }, `+=${tDur}`)
            .fromTo('.seq-4 .msg-ai-1', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 })
            
            .fromTo('.seq-4 .msg-u-2', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, `+=${pause}`)
            .to('.seq-4 .scroll-area', { y: -60, duration: 0.5, ease: 'power2.inOut' }, '-=0.5')
            .to('.seq-4 .type-2', { opacity: 1, duration: 0.3 })
            .to('.seq-4 .type-2', { opacity: 0, duration: 0.3, display: 'none' }, `+=${tDur}`)
            .fromTo('.seq-4 .msg-ai-2', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 })

            .fromTo('.seq-4 .msg-u-3', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, `+=${pause}`)
            .to('.seq-4 .scroll-area', { y: -150, duration: 0.5, ease: 'power2.inOut' }, '-=0.5')
            .to('.seq-4 .type-3', { opacity: 1, duration: 0.3 })
            .to('.seq-4 .type-3', { opacity: 0, duration: 0.3, display: 'none' }, `+=${tDur}`)
            .fromTo('.seq-4 .msg-ai-3', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 })

            .to('.seq-4', { opacity: 0, duration: 0.5, display: 'none' }, '+=3');

    },
    { scope: container }
  );

  return (
    <section className="va-hero" ref={container}>
      <div className="va-hero-content">
        <h1 className="va-title" ref={title}>
          EL FUTURO DE LA<br/>ATENCIÓN AL CLIENTE
        </h1>
        <p className="va-subtitle" ref={subtitle}>
          Asistentes virtuales autónomos. No son simples chatbots, son agentes capaces de entender contexto, negociar, cualificar leads y cerrar ventas 24/7.
        </p>
      </div>
      <div className="va-hero-scene-wrapper">
        <ParticleWave />
        <div className="va-orbit-container" ref={orbitRef}>
           <div className="va-orbit-icon va-orbit-icon-1"><img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WhatsApp"/></div>
           <div className="va-orbit-icon va-orbit-icon-2"><img src="https://cdn.simpleicons.org/messenger/0084FF" alt="Messenger"/></div>
           <div className="va-orbit-icon va-orbit-icon-3"><img src="https://img.icons8.com/color/480/instagram-new--v1.png" alt="Instagram"/></div>
           <div className="va-orbit-icon va-orbit-icon-4"><img src="https://cdn.simpleicons.org/telegram/26A5E4" alt="Telegram"/></div>
           <div className="va-orbit-icon va-orbit-icon-5"><img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail"/></div>
           <div className="va-orbit-icon va-orbit-icon-6"><img src="https://cdn.simpleicons.org/googlemessages/1A73E8" alt="SMS"/></div>
           <div className="va-orbit-icon va-orbit-icon-7"><img src="https://cdn.simpleicons.org/livechat/F69322" alt="Webchat"/></div>
        </div>
        <div className="va-chat-scene">
          <div className="va-smartphone-frame" ref={chatRef}>
            <div className="va-smartphone-notch"></div>
            <div className="va-smartphone-button left top"></div>
            <div className="va-smartphone-button left bottom"></div>
            <div className="va-smartphone-button right"></div>
            
            <div className="va-chat-interface">
              
              {/* Secuencia 1: Webchat */}
              <div className="va-chat-sequence seq-1" style={{ display: 'none', opacity: 0 }}>
                <div className="va-chat-header">
                  <img src="https://cdn.simpleicons.org/livechat/F69322" alt="Webchat" style={{width:24, height:24}}/>
                  <div>
                    <div className="va-chat-title-text">Mar IA (Webchat)</div>
                    <div className="va-chat-status">Online</div>
                  </div>
                </div>
                <div className="va-chat-body" style={{ overflow: 'hidden', flex: 1, position: 'relative', maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 100%)' }}>
                  <div className="scroll-area">
                    <div className="va-chat-bubble va-chat-user msg-u-1">Hola, ¿a qué hora abren mañana?</div>
                    <div className="va-chat-typing type-1">
                      <div className="va-typing-dot"></div><div className="va-typing-dot"></div><div className="va-typing-dot"></div>
                    </div>
                    <div className="va-chat-bubble va-chat-ai msg-ai-1">¡Hola! Estamos abiertos de 9:00 a 18:00 hrs. ¿Te ayudo con algo más?</div>
                    
                    <div className="va-chat-bubble va-chat-user msg-u-2" style={{opacity:0}}>¿Tienen servicio a domicilio?</div>
                    <div className="va-chat-typing type-2">
                      <div className="va-typing-dot"></div><div className="va-typing-dot"></div><div className="va-typing-dot"></div>
                    </div>
                    <div className="va-chat-bubble va-chat-ai msg-ai-2" style={{opacity:0}}>¡Sí! Entregamos a toda la ciudad en menos de 24 horas. 📦</div>

                    <div className="va-chat-bubble va-chat-user msg-u-3" style={{opacity:0}}>Perfecto. ¿Aceptan tarjeta a la entrega?</div>
                    <div className="va-chat-typing type-3">
                      <div className="va-typing-dot"></div><div className="va-typing-dot"></div><div className="va-typing-dot"></div>
                    </div>
                    <div className="va-chat-bubble va-chat-ai msg-ai-3" style={{opacity:0}}>Aceptamos todas las tarjetas de crédito y débito, además de efectivo. 💳</div>
                  </div>
                </div>
              </div>

              {/* Secuencia 2: WhatsApp */}
              <div className="va-chat-sequence seq-2 seq-whatsapp" style={{ display: 'none', opacity: 0 }}>
                <div className="va-chat-header">
                  <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WhatsApp" style={{width:24, height:24}}/>
                  <div>
                    <div className="va-chat-title-text">Mar IA (WhatsApp)</div>
                    <div className="va-chat-status">Online</div>
                  </div>
                </div>
                <div className="va-chat-body" style={{ overflow: 'hidden', flex: 1, position: 'relative', maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 100%)' }}>
                  <div className="scroll-area">
                    <div className="va-chat-bubble va-chat-user msg-u-1">Necesito agendar una consultoría para el viernes</div>
                    <div className="va-chat-typing type-1">
                      <div className="va-typing-dot"></div><div className="va-typing-dot"></div><div className="va-typing-dot"></div>
                    </div>
                    <div className="va-chat-bubble va-chat-ai msg-ai-1">Claro, tengo espacios a las 10:00 AM y a las 4:00 PM.</div>
                    
                    <div className="va-chat-bubble va-chat-user msg-u-2" style={{opacity:0}}>A las 10:00 AM me queda perfecto.</div>
                    <div className="va-chat-typing type-2">
                      <div className="va-typing-dot"></div><div className="va-typing-dot"></div><div className="va-typing-dot"></div>
                    </div>
                    <div className="va-chat-bubble va-chat-ai msg-ai-2" style={{opacity:0}}>¡Listo! He agendado tu cita para el viernes.</div>

                    <div className="va-calendar-widget cal-widget" style={{padding:'8px', marginTop:'-4px'}}>
                      <div className="va-calendar-header">
                        <Calendar size={14} /> Google Calendar
                      </div>
                      <div className="va-calendar-details">
                        <div className="va-calendar-title">Consultoría Inicial</div>
                        <div className="va-calendar-time">Viernes, 10:00 AM - 11:00 AM</div>
                      </div>
                      <div className="va-calendar-check cal-check"><Check size={14} strokeWidth={3} /></div>
                    </div>

                    <div className="va-chat-bubble va-chat-user msg-u-3" style={{opacity:0}}>Excelente. ¿Me envían link de videollamada?</div>
                    <div className="va-chat-typing type-3">
                      <div className="va-typing-dot"></div><div className="va-typing-dot"></div><div className="va-typing-dot"></div>
                    </div>
                    <div className="va-chat-bubble va-chat-ai msg-ai-3" style={{opacity:0}}>Así es. Te enviaré un recordatorio con el enlace de Google Meet 15 minutos antes. 📅</div>
                  </div>
                </div>
              </div>

              {/* Secuencia 3: Instagram */}
              <div className="va-chat-sequence seq-3 seq-instagram" style={{ display: 'none', opacity: 0 }}>
                <div className="va-chat-header">
                  <img src="https://img.icons8.com/color/480/instagram-new--v1.png" alt="Instagram" style={{width:28, height:28}}/>
                  <div>
                    <div className="va-chat-title-text">Mar IA (Instagram)</div>
                    <div className="va-chat-status">Online</div>
                  </div>
                </div>
                <div className="va-chat-body" style={{ overflow: 'hidden', flex: 1, position: 'relative', maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 100%)' }}>
                  <div className="scroll-area">
                    <div className="va-chat-bubble va-chat-user msg-u-1">Hola! vi su reel, hacen tiendas online?</div>
                    <div className="va-chat-typing type-1">
                      <div className="va-typing-dot"></div><div className="va-typing-dot"></div><div className="va-typing-dot"></div>
                    </div>
                    <div className="va-chat-bubble va-chat-ai msg-ai-1">¡Hola! Sí, diseñamos tiendas eCommerce a medida. ¿De qué trata tu negocio? 🛍️</div>

                    <div className="va-chat-bubble va-chat-user msg-u-2" style={{opacity:0}}>Vendo ropa y quiero lanzar mi marca.</div>
                    <div className="va-chat-typing type-2">
                      <div className="va-typing-dot"></div><div className="va-typing-dot"></div><div className="va-typing-dot"></div>
                    </div>
                    <div className="va-chat-bubble va-chat-ai msg-ai-2" style={{opacity:0}}>¡Genial! Te envié por DM nuestro portafolio de moda. ✨</div>

                    <div className="va-chat-bubble va-chat-user msg-u-3" style={{opacity:0}}>Gracias! ¿Tienen un paquete básico para empezar?</div>
                    <div className="va-chat-typing type-3">
                      <div className="va-typing-dot"></div><div className="va-typing-dot"></div><div className="va-typing-dot"></div>
                    </div>
                    <div className="va-chat-bubble va-chat-ai msg-ai-3" style={{opacity:0}}>Tenemos un "Paquete Startup" especial para nuevas marcas. ¡Te paso los detalles! 🚀</div>
                  </div>
                </div>
              </div>

              {/* Secuencia 4: Messenger */}
              <div className="va-chat-sequence seq-4 seq-messenger" style={{ display: 'none', opacity: 0 }}>
                <div className="va-chat-header">
                  <img src="https://cdn.simpleicons.org/messenger/0084FF" alt="Messenger" style={{width:24, height:24}}/>
                  <div>
                    <div className="va-chat-title-text">Mar IA (Messenger)</div>
                    <div className="va-chat-status">Online</div>
                  </div>
                </div>
                <div className="va-chat-body" style={{ overflow: 'hidden', flex: 1, position: 'relative', maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 100%)' }}>
                  <div className="scroll-area">
                    <div className="va-chat-bubble va-chat-user msg-u-1">Quiero rastrear mi pedido #1234</div>
                    <div className="va-chat-typing type-1">
                      <div className="va-typing-dot"></div><div className="va-typing-dot"></div><div className="va-typing-dot"></div>
                    </div>
                    <div className="va-chat-bubble va-chat-ai msg-ai-1">Revisando tu número de pedido...</div>

                    <div className="va-chat-bubble va-chat-user msg-u-2" style={{opacity:0}}>Muchas gracias, estaré atento.</div>
                    <div className="va-chat-typing type-2">
                      <div className="va-typing-dot"></div><div className="va-typing-dot"></div><div className="va-typing-dot"></div>
                    </div>
                    <div className="va-chat-bubble va-chat-ai msg-ai-2" style={{opacity:0}}>Tu paquete está en camino y llegará hoy antes de las 18:00 hrs. 🚚</div>

                    <div className="va-chat-bubble va-chat-user msg-u-3" style={{opacity:0}}>¡Qué rápido! ¿Me avisan cuando estén cerca?</div>
                    <div className="va-chat-typing type-3">
                      <div className="va-typing-dot"></div><div className="va-typing-dot"></div><div className="va-typing-dot"></div>
                    </div>
                    <div className="va-chat-bubble va-chat-ai msg-ai-3" style={{opacity:0}}>Claro, el repartidor te llamará cuando esté a 10 minutos de tu domicilio. 📞</div>
                  </div>
                </div>
              </div>

            </div>
        </div>
        </div>
      </div>
    </section>
  );
};

const VAContext = () => {
  const container = useRef(null);
  const headlineRef = useRef(null);
  
  useGSAP(() => {
    // Animación 3D para revelar las letras
    const split = new SplitText(headlineRef.current, { type: 'words,chars' });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      }
    });

    // 1. Entran las letras girando en 3D
    tl.from(split.chars, {
      opacity: 0,
      y: 40,
      rotateX: -90,
      stagger: 0.02,
      duration: 0.8,
      ease: 'back.out(2)'
    })
    // 2. La palabra "muertos" se tiñe de rojo
    .to('.va-dead-text', {
      color: '#ff3333',
      textShadow: '0 0 30px rgba(255, 50, 50, 0.6)',
      duration: 0.4,
      ease: 'power2.out'
    }, '+=0.2')
    // 3. Aparece la línea de tachado (Strike-through) de forma violenta
    .to('.va-strike-line', {
      width: '110%',
      duration: 0.3,
      ease: 'power4.inOut'
    }, '-=0.1')
    // 4. El párrafo entra desvaneciéndose
    .from('.va-context-paragraph', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.1');

  }, { scope: container });

  return (
    <section className="va-context" ref={container}>
      <div className="va-context-glow"></div>
      <div className="shell">
        <div className="va-context-inner">
          <h2 className="va-context-headline" ref={headlineRef}>
            Los "chatbots" de respuestas pre-programadas están <span className="va-dead-text-wrapper"><span className="va-dead-text">muertos.</span><span className="va-strike-line"></span></span>
          </h2>
          <p className="va-context-paragraph">
            Tus clientes odian los menús cerrados ("Escriba 1 para ventas, 2 para soporte"). Nuestros asistentes utilizan Inteligencia Artificial Generativa para entender el contexto, el sarcasmo, las dudas complejas y el historial completo del usuario antes de emitir una respuesta ultra-personalizada en milisegundos.
          </p>
        </div>
        <MagicTransform />
      </div>
    </section>
  );
};

const VABento = () => {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.va-bento-card', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      }
    });
  }, { scope: container });

  return (
    <section className="va-bento-section" ref={container}>
      <div className="shell">
        <SectionHeading
          align="left"
          label="Capacidades Core"
          title="Autonomía total"
          lede="Un equipo que nunca duerme y escala infinitamente según tu demanda."
        />
        
        <div className="va-bento-grid">
          <div className="va-bento-card card-large">
            <img src={`${import.meta.env.BASE_URL}va-voice.jpg`} alt="Voz y Texto" className="bento-bg" />
            <div className="bento-content">
              <h3>Voz y Texto Omnicanal</h3>
              <p>Conectados a WhatsApp, Instagram, Web y telefonía tradicional. Capaces de hablar con voz sintética ultra-realista que respira y hace pausas naturales.</p>
            </div>
          </div>
          
          <div className="va-bento-card card-small">
            <img src={`${import.meta.env.BASE_URL}va-memory.jpg`} alt="Memoria" className="bento-bg" />
            <div className="bento-content">
              <h3>Memoria Perfecta</h3>
              <p>Recuerdan quién es el cliente, qué compró hace un año y en qué punto dejó la conversación ayer. El contexto es absoluto.</p>
            </div>
          </div>
          
          <div className="va-bento-card card-small">
            <img src={`${import.meta.env.BASE_URL}va-action.jpg`} alt="Acción" className="bento-bg" />
            <div className="bento-content">
              <h3>Agendamiento Inmediato</h3>
              <p>Leen tu calendario, negocian horarios y agendan citas automáticamente en Calendly o Google Calendar sin que muevas un dedo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VirtualAssistants = () => {
  return (
    <div className="va-page">
      <Header />
      <VAHero />
      <VAContext />
      <VABento />
      <Contact />
    </div>
  );
};

export default VirtualAssistants;
