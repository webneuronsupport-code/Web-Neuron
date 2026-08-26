import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Calendar, Repeat, Package, Workflow } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import SectionHeading from './SectionHeading';
import './VAPowerFeatures.css';

const features = [
  {
    id: 'chat',
    icon: MessageCircle,
    title: 'Atención 24/7 y FAQs',
    desc: 'Responde mensajes a cualquier hora, resolviendo preguntas frecuentes al instante con naturalidad humana.',
    image: 'va_chat_lifestyle.jpg'
  },
  {
    id: 'calendar',
    icon: Calendar,
    title: 'Sincronización Calendar',
    desc: 'Revisa disponibilidades en tiempo real y agenda reuniones de manera 100% automática.',
    image: 'va_calendar_lifestyle.jpg'
  },
  {
    id: 'followups',
    icon: Repeat,
    title: 'Follow-ups Automáticos',
    desc: 'Realiza seguimientos proactivos para reconectar con prospectos y evitar que se enfríen.',
    image: 'va_followup_lifestyle.jpg'
  },
  {
    id: 'inventory',
    icon: Package,
    title: 'Inventario Dinámico',
    desc: 'Controla tu inventario y responde mostrando fotos, descripción exacta y precio actualizado al momento.',
    image: 'va_inventory_lifestyle.jpg'
  },
  {
    id: 'api',
    icon: Workflow,
    title: 'Integración Total API',
    desc: 'Se conecta vía API con tu CRM, ERP o cualquier plataforma que ya utilices para orquestar tu negocio.',
    image: 'va_api_lifestyle.jpg'
  }
];

const VAPowerFeatures = () => {
  const container = useRef(null);
  const displayRef = useRef(null);
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const [activeTab, setActiveTab] = useState('chat');

  // Initial Section Animation
  useGSAP(() => {
    gsap.fromTo('.va-tab-item', 
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
        }
      }
    );

    gsap.fromTo('.va-tabs-display-wrapper', 
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
        }
      }
    );
  }, { scope: container });

  // Crossfade Animation on Tab Change
  useEffect(() => {
    if (!displayRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(displayRef.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }, displayRef);
    
    return () => ctx.revert();
  }, [activeTab]);

  // 3D Tilt Effect
  const handleMouseMove = (e) => {
    if (!wrapperRef.current || !imageRef.current) return;
    
    const { left, top, width, height } = wrapperRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width; // 0 to 1
    const y = (e.clientY - top) / height; // 0 to 1
    
    const tiltX = (y - 0.5) * -15; // Max 15 deg tilt
    const tiltY = (x - 0.5) * 15;

    gsap.to(imageRef.current, {
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
      transformOrigin: 'center center'
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    gsap.to(imageRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  const activeFeature = features.find(f => f.id === activeTab);

  return (
    <section className="va-pf-section" ref={container}>
      <div className="shell">
        <SectionHeading
          align="left"
          label="Potencia para negocios"
          title="Autonomía y Escalabilidad"
          lede="Un equipo hiper-productivo que nunca duerme y opera a la velocidad de la luz."
        />
        
        <div className="va-tabs-container">
          
          {/* Columna Izquierda: Botones de Pestañas */}
          <div className="va-tabs-list">
            {features.map((feat) => {
              const Icon = feat.icon;
              const isActive = activeTab === feat.id;
              
              return (
                <button 
                  key={feat.id}
                  className={`va-tab-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(feat.id)}
                >
                  <div className="va-tab-icon-wrap">
                    <Icon size={20} />
                  </div>
                  <div className="va-tab-content">
                    <h3 className="va-tab-title">{feat.title}</h3>
                    {isActive && <p className="va-tab-desc">{feat.desc}</p>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Columna Derecha: El Escaparate (Pantalla Central) */}
          <div 
            className="va-tabs-display-wrapper" 
            ref={wrapperRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="va-tabs-display" ref={displayRef}>
               <img 
                 ref={imageRef}
                 src={`${import.meta.env.BASE_URL}${activeFeature.image}`} 
                 alt={activeFeature.title} 
                 className="va-tilt-image" 
               />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VAPowerFeatures;
