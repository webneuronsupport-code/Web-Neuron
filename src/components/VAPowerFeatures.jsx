import React, { useRef } from 'react';
import { MessageCircle, Calendar, Repeat, Package, Workflow, Check, Search, ChevronRight } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import SectionHeading from './SectionHeading';
import './VAPowerFeatures.css';

const VAPowerFeatures = () => {
  const container = useRef(null);

  useGSAP(() => {
    // Animate Cards
    gsap.from('.va-pf-card', {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      }
    });

    // 1. Chat Animation
    const tlChat = gsap.timeline({
      scrollTrigger: { trigger: '.va-card-chat', start: 'top 80%' },
      repeat: -1,
      repeatDelay: 2
    });
    tlChat.fromTo('.mock-msg-user', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 })
          .fromTo('.mock-typing', { opacity: 0 }, { opacity: 1, duration: 0.2 }, '+=0.3')
          .to('.mock-typing', { opacity: 0, duration: 0.2 }, '+=1')
          .fromTo('.mock-msg-ai', { opacity: 0, y: 10, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4 });

    // 2. Calendar Animation
    const tlCal = gsap.timeline({
      scrollTrigger: { trigger: '.va-card-calendar', start: 'top 80%' },
      repeat: -1,
      repeatDelay: 1.5
    });
    tlCal.to('.cal-day.target', { backgroundColor: 'var(--accent)', color: '#fff', duration: 0.3 })
         .fromTo('.cal-badge', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '+=0.2')
         .to('.cal-day.target', { backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'var(--text)', duration: 0.3, delay: 1.5 })
         .to('.cal-badge', { opacity: 0, y: -10, duration: 0.3 }, '-=0.3');

    // 3. Radar/Follow-up Animation
    gsap.to('.radar-ring', {
      scale: 2.5,
      opacity: 0,
      duration: 2,
      stagger: 0.6,
      repeat: -1,
      ease: "linear"
    });

    // 4. E-commerce / Inventory Animation
    gsap.fromTo('.inv-item', { opacity: 0, x: 20 }, {
      opacity: 1, 
      x: 0, 
      duration: 0.6, 
      stagger: 0.2,
      scrollTrigger: { trigger: '.va-card-inventory', start: 'top 80%' }
    });

    // 5. API Nodes
    gsap.to('.node-line-flow', {
      strokeDashoffset: 0,
      duration: 1.5,
      repeat: -1,
      ease: 'linear'
    });
    gsap.to('.node-dot', {
      scale: 1.2,
      boxShadow: '0 0 15px var(--accent)',
      yoyo: true,
      repeat: -1,
      duration: 0.8,
      stagger: 0.3
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
          
          {/* Card 1: Atención 24/7 (Wide) */}
          <div className="va-pf-card va-card-chat card-wide">
            <div className="va-pf-card-glow"></div>
            
            <div className="card-visual visual-chat">
              <div className="mock-phone">
                <div className="mock-chat-header">Soporte IA <span className="mock-status"></span></div>
                <div className="mock-chat-body">
                  <div className="mock-msg mock-msg-user">¿Aún hacen envíos a esta hora? Son las 3 AM.</div>
                  <div className="mock-typing">
                    <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                  </div>
                  <div className="mock-msg mock-msg-ai">¡Hola! Sí, nuestro sistema registra pedidos 24/7. ¿Te ayudo a armar tu carrito? 📦</div>
                </div>
              </div>
            </div>

            <div className="card-content">
              <div className="va-pf-icon-wrapper"><MessageCircle size={24} /></div>
              <h3 className="va-pf-title">Atención 24/7 y FAQs</h3>
              <p className="va-pf-desc">Responde mensajes a cualquier hora, resolviendo preguntas frecuentes al instante con naturalidad humana.</p>
            </div>
          </div>

          {/* Card 2: Calendar (Square) */}
          <div className="va-pf-card va-card-calendar card-square">
            <div className="va-pf-card-glow"></div>
            
            <div className="card-visual visual-calendar">
              <div className="mock-calendar">
                <div className="cal-header">Noviembre</div>
                <div className="cal-grid">
                  <div className="cal-day">12</div><div className="cal-day">13</div><div className="cal-day">14</div>
                  <div className="cal-day">19</div><div className="cal-day target">20</div><div className="cal-day">21</div>
                </div>
                <div className="cal-badge"><Check size={14}/> Agendado 10:00 AM</div>
              </div>
            </div>

            <div className="card-content">
              <div className="va-pf-icon-wrapper"><Calendar size={24} /></div>
              <h3 className="va-pf-title">Google Calendar</h3>
              <p className="va-pf-desc">Revisa disponibilidades en tiempo real y agenda reuniones automáticamente.</p>
            </div>
          </div>

          {/* Card 3: Follow-ups (Square) */}
          <div className="va-pf-card va-card-radar card-square">
            <div className="va-pf-card-glow"></div>
            
            <div className="card-visual visual-radar">
              <div className="radar-center"><Repeat size={24} color="var(--accent)" /></div>
              <div className="radar-ring"></div>
              <div className="radar-ring"></div>
              <div className="radar-ring"></div>
            </div>

            <div className="card-content">
              <div className="va-pf-icon-wrapper"><Repeat size={24} /></div>
              <h3 className="va-pf-title">Follow-ups Automáticos</h3>
              <p className="va-pf-desc">Realiza seguimientos proactivos para reconectar con prospectos que se han enfriado.</p>
            </div>
          </div>

          {/* Card 4: Inventory (Wide) */}
          <div className="va-pf-card va-card-inventory card-wide">
            <div className="va-pf-card-glow"></div>
            
            <div className="card-visual visual-inventory">
              <div className="inv-searchbar"><Search size={16} /> Buscar "Laptop Pro"...</div>
              <div className="inv-results">
                <div className="inv-item">
                  <div className="inv-img bg-grad-1"></div>
                  <div className="inv-info">
                    <div className="inv-title">Laptop Pro 14"</div>
                    <div className="inv-price">$1,299 <span className="inv-stock">En stock</span></div>
                  </div>
                </div>
                <div className="inv-item">
                  <div className="inv-img bg-grad-2"></div>
                  <div className="inv-info">
                    <div className="inv-title">Mouse Inalámbrico</div>
                    <div className="inv-price">$49 <span className="inv-stock">En stock</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-content">
              <div className="va-pf-icon-wrapper"><Package size={24} /></div>
              <h3 className="va-pf-title">Inventario Dinámico</h3>
              <p className="va-pf-desc">Controla tu inventario y responde mostrando fotos, descripción exacta y precio actualizado al momento.</p>
            </div>
          </div>

          {/* Card 5: Integrations (Square) */}
          <div className="va-pf-card va-card-api card-square">
            <div className="va-pf-card-glow"></div>
            
            <div className="card-visual visual-api">
              <svg width="100%" height="100%" viewBox="0 0 200 150" className="api-svg">
                <path d="M100 75 L40 40 M100 75 L160 40 M100 75 L100 120" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                <path d="M100 75 L40 40 M100 75 L160 40 M100 75 L100 120" className="node-line-flow" stroke="var(--accent)" strokeWidth="2" fill="none" strokeDasharray="10 100" strokeDashoffset="110" strokeLinecap="round" />
              </svg>
              <div className="node-dot center-node"><Workflow size={20} /></div>
              <div className="node-dot top-left-node">CRM</div>
              <div className="node-dot top-right-node">ERP</div>
              <div className="node-dot bottom-node">API</div>
            </div>

            <div className="card-content">
              <div className="va-pf-icon-wrapper"><Workflow size={24} /></div>
              <h3 className="va-pf-title">Integración Total API</h3>
              <p className="va-pf-desc">Se conecta con tu CRM, ERP o cualquier plataforma que ya utilices para orquestar tu negocio.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VAPowerFeatures;
