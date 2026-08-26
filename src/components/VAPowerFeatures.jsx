import React, { useRef } from 'react';
import { MessageCircle, Calendar, Repeat, Package, Workflow } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import SectionHeading from './SectionHeading';
import './VAPowerFeatures.css';

const features = [
  {
    icon: MessageCircle,
    title: 'Atención 24/7 y FAQs',
    desc: 'Responde mensajes a cualquier hora, resolviendo preguntas frecuentes al instante con naturalidad humana.',
    className: 'card-wide'
  },
  {
    icon: Calendar,
    title: 'Google Calendar',
    desc: 'Revisa disponibilidades en tiempo real y agenda reuniones de manera 100% automática.',
    className: 'card-square'
  },
  {
    icon: Repeat,
    title: 'Follow-ups Automáticos',
    desc: 'Realiza seguimientos proactivos para reconectar con prospectos y evitar que se enfríen.',
    className: 'card-square'
  },
  {
    icon: Package,
    title: 'Inventario Dinámico',
    desc: 'Controla tu inventario y responde mostrando fotos, descripción exacta y precio actualizado al momento.',
    className: 'card-square'
  },
  {
    icon: Workflow,
    title: 'Integración Total',
    desc: 'Se conecta vía API con tu CRM, ERP o cualquier plataforma que ya utilices para orquestar tu negocio.',
    className: 'card-wide'
  }
];

const VAPowerFeatures = () => {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.va-pf-card', {
      y: 50,
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
    <section className="va-pf-section" ref={container}>
      <div className="shell">
        <SectionHeading
          align="left"
          label="Potencia para negocios"
          title="Autonomía y Escalabilidad"
          lede="Un equipo hiper-productivo que nunca duerme y opera a la velocidad de la luz."
        />
        
        <div className="va-pf-grid">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div key={index} className={`va-pf-card ${feat.className}`}>
                <div className="va-pf-card-glow"></div>
                <div className="va-pf-icon-wrapper">
                  <Icon className="va-pf-icon" size={28} />
                </div>
                <h3 className="va-pf-title">{feat.title}</h3>
                <p className="va-pf-desc">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VAPowerFeatures;
