import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import './VAAudioFeature.css';

const VAAudioFeature = () => {
  const container = useRef(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from('.va-audio-visualizer', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.va-audio-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6')
    .from('.va-audio-desc', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6');
  }, { scope: container });

  return (
    <section className="va-audio-section" ref={container}>
      <div className="shell">
        <div className="va-audio-inner">
          <div className="va-audio-visualizer">
            <video 
              src={`${import.meta.env.BASE_URL}AudioBot.mp4`} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="va-audio-video"
            />
          </div>
          
          <div className="va-audio-content">
            <h2 className="va-audio-title">La voz es la interfaz<br/>más natural.</h2>
            <p className="va-audio-desc">
              Tus clientes pueden enviarle notas de voz por WhatsApp. El asistente escucha, 
              transcribe al instante, entiende la intención y responde de forma humana. 
              Ideal para romper la barrera tecnológica con adultos mayores o personas que 
              prefieren no escribir. <strong>Interactuar nunca fue tan fácil.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VAAudioFeature;
