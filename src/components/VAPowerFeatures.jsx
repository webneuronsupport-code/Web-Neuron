import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Calendar, Repeat, Package, Workflow } from 'lucide-react';
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap';
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
  const rightSideRef = useRef(null);
  const displayRef = useRef(null);
  const [activeTab, setActiveTab] = useState('chat');

  useGSAP(() => {
    // Detect which item is in view
    features.forEach((feat, i) => {
      ScrollTrigger.create({
        trigger: `.va-pf-item-${i}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveTab(feat.id),
        onEnterBack: () => setActiveTab(feat.id),
      });
    });

    // Pin the right side while the left side scrolls
    // We use a matchMedia so it only pins on desktop
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      ScrollTrigger.create({
        trigger: container.current,
        start: 'top 15%',
        end: 'bottom 85%',
        pin: rightSideRef.current,
        pinSpacing: false,
      });
    });
  }, { scope: container });

  // Crossfade Animation on Image Change
  useEffect(() => {
    if (!displayRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.va-tilt-image', 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', clearProps: 'transform' }
      );
    }, displayRef);
    return () => ctx.revert();
  }, [activeTab]);

  const activeFeature = features.find(f => f.id === activeTab);

  return (
    <section className="va-pf-section" ref={container}>
      <div className="shell">
        <SectionHeading
          align="center"
          label="Potencia para negocios"
          title="Autonomía y Escalabilidad"
          lede="Un equipo hiper-productivo que nunca duerme y opera a la velocidad de la luz."
        />
        
        <div className="va-pf-layout">
          
          {/* Columna Izquierda: Textos con Scroll */}
          <div className="va-pf-text-column">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              const isActive = activeTab === feat.id;
              
              return (
                <div key={feat.id} className={`va-pf-text-item va-pf-item-${i} ${isActive ? 'active' : ''}`}>
                  <div className="va-pf-icon-wrap">
                    <Icon size={32} />
                  </div>
                  <h3 className="va-pf-item-title">{feat.title}</h3>
                  <p className="va-pf-item-desc">{feat.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Columna Derecha: Imagen Fija (Pinned) */}
          <div className="va-pf-image-column" ref={rightSideRef}>
            <div className="va-pf-image-wrapper" ref={displayRef}>
               <img 
                 src={`${import.meta.env.BASE_URL}${activeFeature.image}`} 
                 alt={activeFeature.title} 
                 className="va-tilt-image" 
               />
               <div className="va-pf-image-overlay"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VAPowerFeatures;
