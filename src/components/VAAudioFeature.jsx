import { useRef, useEffect } from 'react';
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
    .from('.va-audio-desc', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6');

    // Continuous wave animation
    gsap.to('.audio-bar', {
      scaleY: 'random(0.2, 1.5)',
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.1,
        from: 'center'
      }
    });

  }, { scope: container });

  return (
    <section className="va-audio-section" ref={container}>
      <div className="shell">
        <div className="va-audio-inner">
          <div className="va-audio-visualizer">
            <div className="va-audio-mic-wrapper">
              <Mic size={32} className="va-audio-mic" />
            </div>
            <div className="va-audio-waves">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="audio-bar"></div>
              ))}
            </div>
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
