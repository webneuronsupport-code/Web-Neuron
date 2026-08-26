import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Calendar, Repeat, Package, Workflow, Check, Search } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import SectionHeading from './SectionHeading';
import './VAPowerFeatures.css';

const features = [
  {
    id: 'chat',
    icon: MessageCircle,
    title: 'Atención 24/7 y FAQs',
    desc: 'Responde mensajes a cualquier hora, resolviendo preguntas frecuentes al instante con naturalidad humana.'
  },
  {
    id: 'calendar',
    icon: Calendar,
    title: 'Sincronización Calendar',
    desc: 'Revisa disponibilidades en tiempo real y agenda reuniones de manera 100% automática.'
  },
  {
    id: 'followups',
    icon: Repeat,
    title: 'Follow-ups Automáticos',
    desc: 'Realiza seguimientos proactivos para reconectar con prospectos y evitar que se enfríen.'
  },
  {
    id: 'inventory',
    icon: Package,
    title: 'Inventario Dinámico',
    desc: 'Controla tu inventario y responde mostrando fotos, descripción exacta y precio actualizado al momento.'
  },
  {
    id: 'api',
    icon: Workflow,
    title: 'Integración Total API',
    desc: 'Se conecta vía API con tu CRM, ERP o cualquier plataforma que ya utilices para orquestar tu negocio.'
  }
];

const VAPowerFeatures = () => {
  const container = useRef(null);
  const displayRef = useRef(null);
  const [activeTab, setActiveTab] = useState('chat');

  // Initial Section Animation
  useGSAP(() => {
    gsap.from('.va-tab-item', {
      x: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      }
    });

    gsap.from('.va-tabs-display', {
      x: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      }
    });
  }, { scope: container });

  // Crossfade Animation on Tab Change
  useEffect(() => {
    if (!displayRef.current) return;
    
    // Quick fade out then fade in
    const ctx = gsap.context(() => {
      gsap.fromTo(displayRef.current, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }, displayRef);
    
    return () => ctx.revert();
  }, [activeTab]);

  const renderVisuals = () => {
    switch(activeTab) {
      case 'chat':
        return (
          <div className="card-visual visual-chat">
            <div className="mock-phone">
              <div className="mock-chat-header">Soporte IA <span className="mock-status"></span></div>
              <div className="mock-chat-body">
                <div className="mock-msg mock-msg-user anim-msg-1">¿Aún hacen envíos a esta hora? Son las 3 AM.</div>
                <div className="mock-typing anim-typing">
                  <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                </div>
                <div className="mock-msg mock-msg-ai anim-msg-2">¡Hola! Sí, nuestro sistema registra pedidos 24/7. ¿Te ayudo a armar tu carrito? 📦</div>
              </div>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="card-visual visual-calendar">
            <div className="mock-calendar">
              <div className="cal-header">Noviembre</div>
              <div className="cal-grid">
                <div className="cal-day">12</div><div className="cal-day">13</div><div className="cal-day">14</div>
                <div className="cal-day">19</div><div className="cal-day target anim-cal-target">20</div><div className="cal-day">21</div>
              </div>
              <div className="cal-badge anim-cal-badge"><Check size={16}/> Agendado 10:00 AM</div>
            </div>
          </div>
        );
      case 'followups':
        return (
          <div className="card-visual visual-radar">
            <div className="radar-center"><Repeat size={32} color="var(--accent)" /></div>
            <div className="radar-ring anim-ring-1"></div>
            <div className="radar-ring anim-ring-2"></div>
            <div className="radar-ring anim-ring-3"></div>
          </div>
        );
      case 'inventory':
        return (
          <div className="card-visual visual-inventory">
            <div className="inv-searchbar"><Search size={18} /> Buscando disponibilidad en almacén...</div>
            <div className="inv-results">
              <div className="inv-item anim-inv-1">
                <div className="inv-img bg-grad-1"></div>
                <div className="inv-info">
                  <div className="inv-title">Laptop Pro 14"</div>
                  <div className="inv-price">$1,299 <span className="inv-stock">En stock</span></div>
                </div>
              </div>
              <div className="inv-item anim-inv-2">
                <div className="inv-img bg-grad-2"></div>
                <div className="inv-info">
                  <div className="inv-title">Mouse Inalámbrico</div>
                  <div className="inv-price">$49 <span className="inv-stock">En stock</span></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'api':
        return (
          <div className="card-visual visual-api">
            <svg width="100%" height="100%" viewBox="0 0 300 250" className="api-svg">
              <path d="M150 125 L60 60 M150 125 L240 60 M150 125 L150 200" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />
              <path d="M150 125 L60 60 M150 125 L240 60 M150 125 L150 200" className="anim-node-line" stroke="var(--accent)" strokeWidth="3" fill="none" strokeDasharray="15 150" strokeDashoffset="165" strokeLinecap="round" />
            </svg>
            <div className="node-dot center-node anim-node-center"><Workflow size={32} /></div>
            <div className="node-dot top-left-node anim-node-side">Salesforce</div>
            <div className="node-dot top-right-node anim-node-side">Shopify</div>
            <div className="node-dot bottom-node anim-node-side">HubSpot</div>
          </div>
        );
      default:
        return null;
    }
  };

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
          <div className="va-tabs-display-wrapper">
            <div className="va-tabs-display-glow"></div>
            <div className="va-tabs-display" ref={displayRef}>
              {renderVisuals()}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VAPowerFeatures;
