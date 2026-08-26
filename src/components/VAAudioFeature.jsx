import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { Mic } from 'lucide-react';
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
    .from('.mini-audio-visualizer', {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: 'back.out(1.7)'
    }, '-=0.4')
    .from('.va-audio-desc', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4');

    // Continuous wave animation for the mini visualizer
    gsap.to('.mini-audio-bar', {
      scaleY: 'random(0.3, 1.3)',
      duration: 0.35,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.08,
        from: 'center'
      }
    });

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
            
            <div className="mini-audio-visualizer">
              <div className="mini-audio-mic-wrapper">
                <Mic size={20} className="mini-audio-mic" />
              </div>
              <div className="mini-audio-waves">
                {[...Array(11)].map((_, i) => (
                  <div key={i} className="mini-audio-bar"></div>
                ))}
              </div>
            </div>

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
