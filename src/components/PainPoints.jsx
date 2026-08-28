import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { FaRegClock, FaRegComments, FaRegCalendarTimes, FaExclamationTriangle } from 'react-icons/fa';
import './PainPoints.css';

const PainPoints = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    // Calculate how far the track needs to move
    const trackWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    // We only want to scroll horizontally if the track is wider than the container
    // On mobile, we might just stack them, but let's assume we do horizontal scroll on desktop
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current.scrollWidth - trackRef.current.parentElement.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 15%",
          end: () => `+=${trackRef.current.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    });

  }, { scope: sectionRef });

  return (
    <section className="pain-points-section" ref={sectionRef}>
      <div className="pp-layout">
        
        <div className="pp-left">
          <h2 className="pp-main-title">El Problema</h2>
          <p className="pp-main-desc">
            Los desafíos de la atención manual tradicional.
          </p>
        </div>

        <div className="pp-right">
          <div className="pp-track" ref={trackRef}>
            
            {/* Card 1 */}
            <div className="pp-card">
              <span className="pp-card-num">01.</span>
              <h3 className="pp-card-title">ATENCIÓN MANUAL</h3>
              <p className="pp-card-desc">
                ¿Tu personal aún responde a los clientes de forma manual? Tu equipo pierde un tiempo valioso atendiendo chats uno por uno.
              </p>
              <div className="pp-card-icon">
                <FaRegComments />
              </div>
            </div>

            {/* Card 2 */}
            <div className="pp-card">
              <span className="pp-card-num">02.</span>
              <h3 className="pp-card-title">HORARIOS LIMITADOS</h3>
              <p className="pp-card-desc">
                ¿Sabes la cantidad de clientes que se pierden por no responder a tiempo o fuera de horario?
              </p>
              <div className="pp-card-icon">
                <FaRegClock />
              </div>
            </div>

            {/* Card 3 */}
            <div className="pp-card">
              <span className="pp-card-num">03.</span>
              <h3 className="pp-card-title">OPORTUNIDADES PERDIDAS</h3>
              <p className="pp-card-desc">
                ¿Qué pasa si un cliente quiere agendar una reunión o comprar cuando tu equipo ya salió de su turno laboral?
              </p>
              <div className="pp-card-icon">
                <FaRegCalendarTimes />
              </div>
            </div>

            {/* Card 4 - The Climax */}
            <div className="pp-card pp-card-alert">
              <span className="pp-card-num">04.</span>
              <h3 className="pp-card-title">LA CONSECUENCIA</h3>
              <p className="pp-card-desc pp-climax-text">
                Yo te diré qué pasa...<br/>
                <strong>SE VAN CON LA COMPETENCIA</strong>
              </p>
              <div className="pp-card-icon">
                <FaExclamationTriangle />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default PainPoints;
