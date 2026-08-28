import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import './PainPoints.css';

const PainPoints = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const lines = gsap.utils.toArray('.pp-line');
    
    lines.forEach((line) => {
      gsap.from(line, {
        scrollTrigger: {
          trigger: line,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
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
        
        <div className="pp-block">
          <h2 className="pp-line pp-heading">
            ¿Tu personal aún responde a los clientes que llegan a tu negocio de forma <span>manual</span>?
          </h2>
          <p className="pp-line pp-sub">
            ¿Sabes cuánto tiempo valioso pierde tu equipo por atender chats de clientes uno por uno?
          </p>
        </div>

        <div className="pp-block">
          <h2 className="pp-line pp-heading">
            ¿Sabes la cantidad de clientes que se pierden por no responder a <span>tiempo</span> o fuera de <span>horario</span>?
          </h2>
          <p className="pp-line pp-sub">
            ¿Qué pasa si un cliente pregunta por algún producto o quiere agendar una reunión contigo cuando tu equipo ya salió de su turno laboral?
          </p>
        </div>

        <div className="pp-block pp-finale">
          <p className="pp-line pp-intro-climax">Yo te diré qué pasa...</p>
          <h2 className="pp-climax">
            SE VAN CON LA COMPETENCIA
          </h2>
        </div>

      </div>
    </section>
  );
};

export default PainPoints;
