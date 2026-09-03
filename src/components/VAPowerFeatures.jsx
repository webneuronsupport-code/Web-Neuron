import React, { useState } from 'react';
import { MessageCircle, Calendar, Repeat, Package, Workflow } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <section className="va-pf-section">
      <div className="shell">
        <SectionHeading
          align="center"
          label="Potencia para negocios"
          title="Autonomía y Escalabilidad"
          lede="Un equipo hiper-productivo que nunca duerme y opera a la velocidad de la luz."
        />
        
        <div className="va-accordion-container">
          {features.map((feat) => {
            const Icon = feat.icon;
            const isActive = activeTab === feat.id;

            return (
              <div 
                key={feat.id} 
                className={`va-accordion-panel ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActiveTab(feat.id)}
                onClick={() => setActiveTab(feat.id)}
              >
                <div 
                  className="va-accordion-bg" 
                  style={{ backgroundImage: `url(${import.meta.env.BASE_URL}${feat.image})` }}
                ></div>
                <div className="va-accordion-overlay"></div>
                
                <div className="va-accordion-content">
                  <div className="va-accordion-header">
                    <div className="va-accordion-icon">
                      <Icon size={24} />
                    </div>
                    <h3 className="va-accordion-title">{feat.title}</h3>
                  </div>
                  
                  <div className="va-accordion-body">
                    <p className="va-accordion-desc">{feat.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VAPowerFeatures;
