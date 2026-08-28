import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import './PainPoints.css';

const PainPoints = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const bubbles = gsap.utils.toArray('.pp-chat-message');
    
    bubbles.forEach((bubble, i) => {
      gsap.from(bubble, {
        scrollTrigger: {
          trigger: bubble,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        x: bubble.classList.contains('pp-chat-left') ? -50 : 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    gsap.from('.pp-climax', {
      scrollTrigger: {
        trigger: '.pp-climax',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      scale: 0.95,
      opacity: 0,
      color: '#ff3b30',
      duration: 1.2,
      ease: 'power4.out',
      delay: 0.2
    });
  }, { scope: sectionRef });

  return (
    <section className="pain-points" ref={sectionRef}>
      <div className="pp-container">
        
        <div className="pp-chat-container">
          <div className="pp-chat-message pp-chat-left">
            <h2 className="pp-chat-title">¿Tu personal aún responde a los clientes de forma manual?</h2>
            <p className="pp-chat-desc">
              ¿Sabes cuánto tiempo valioso pierde tu equipo por atender chats de clientes uno por uno?
            </p>
          </div>

          <div className="pp-chat-message pp-chat-right">
            <h2 className="pp-chat-title">¿Sabes la cantidad de clientes que se pierden por no responder a tiempo?</h2>
            <p className="pp-chat-desc">
              ¿Qué pasa si un cliente pregunta por algún producto o quiere agendar una reunión cuando tu equipo ya salió de su turno laboral?
            </p>
          </div>
        </div>

        <div className="pp-finale">
          <p className="pp-intro-climax">Yo te diré qué pasa...</p>
          <h2 className="pp-climax">
            SE VAN CON LA COMPETENCIA
          </h2>
        </div>

      </div>
    </section>
  );
};

export default PainPoints;
