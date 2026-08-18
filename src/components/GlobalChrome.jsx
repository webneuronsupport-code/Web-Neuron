import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import { INTRO_DELAY } from '../lib/timing';
import { SECTIONS, PAGES, anchorHref, MOBILE_QUERY, useMediaQuery } from '../lib/nav';
import './GlobalChrome.css';

const CARD_LINKS = [
  { href: '/asistentes-virtuales', label: 'Asistentes IA', isInternal: true },
  { href: '/#servicios', label: 'Automatizaciones' },
  { href: '/crm-omnicanal', label: 'CRM omnicanal', isInternal: true },
  { href: '/#servicios', label: 'Desarrollo web' },
];

const GlobalChrome = () => {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const chromeRef = useRef(null);
  const isMobile = useMediaQuery(MOBILE_QUERY);

  // El intercambio de móvil visto desde este lado: aquí bajan los productos y
  // las secciones suben a la cabecera. El rótulo cambia con el contenido — un
  // desplegable que pone «Navegación» y enseña productos es una mentira.
  const nav = isMobile
    ? PAGES.map((p) => ({ href: p.to, label: p.label, isRoute: true }))
    : SECTIONS.map((s) => ({ href: anchorHref(s.hash, location.pathname), label: s.label }));
  const navLabel = isMobile ? 'Productos' : 'Navegación';

  // Animación inicial en el primer render de toda la app
  useGSAP(() => {
    const intro = gsap.timeline({ delay: INTRO_DELAY });
    intro
      .from('.fame-nav', { autoAlpha: 0, x: -24, duration: 1.1 }, 0.15)
      .from('.fame-cta', { autoAlpha: 0, x: 24, duration: 1.1 }, 0.15)
      .from('.fame-logo', { autoAlpha: 0, y: 18, duration: 1 }, 0.3)
      .from('.fame-dot', { autoAlpha: 0, duration: 0.8 }, 0.3)
      .from('.fame-mark', { autoAlpha: 0, duration: 1 }, 0.4)
      .from('.fame-card', { autoAlpha: 0, y: 40, duration: 1.1 }, 0.45);
  }, { scope: chromeRef });

  // Cuando cambia la ruta, si no estamos en inicio, aseguramos que la tarjeta esté visible
  // porque el scroll del inicio puede haberla ocultado
  useEffect(() => {
    if (location.pathname !== '/') {
      gsap.to('.fame-card', { autoAlpha: 1, duration: 0.4, clearProps: 'y,transform' });
    }
  }, [location.pathname]);

  return (
    <div className="global-chrome" ref={chromeRef}>
      <div className="fame-top-brand">
        <img src={`${import.meta.env.BASE_URL}2_clean2.png`} alt="Logo" style={{ height: '48px', width: 'auto' }} />
        <span>WEB NEURON</span>
      </div>

      <div className="fame-chrome">
        <span className="fame-dot" aria-hidden="true" />

        <nav className={`fame-nav${navOpen ? ' is-open' : ''}`} aria-label={navLabel}>
          <div className="fame-nav-head">
            <button
              type="button"
              className="fame-nav-toggle"
              onClick={() => setNavOpen((v) => !v)}
              aria-expanded={navOpen}
              aria-controls="fame-nav-list"
            >
              <span aria-hidden="true">[{navOpen ? '−' : '+'}]</span> {navLabel}
            </button>
            <span className="fame-lang">ES</span>
          </div>
          <ol className="fame-nav-list" id="fame-nav-list">
            {nav.map((l, i) => {
              const contenido = (
                <>
                  <span className="fame-nav-num">[{i + 1}]</span>
                  <span className="fame-nav-text" data-text={l.label}>
                    <span className="fame-nav-text-inner">{l.label}</span>
                  </span>
                </>
              );
              return (
                <li key={l.href}>
                  {l.isRoute ? (
                    <Link to={l.href} className="fame-nav-link" onClick={() => setNavOpen(false)}>
                      {contenido}
                    </Link>
                  ) : (
                    <a href={l.href} className="fame-nav-link" onClick={() => setNavOpen(false)}>
                      {contenido}
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <a href="/#contacto" className="fame-cta">
          Agendar demo <ArrowUpRight size={13} strokeWidth={3} />
        </a>

        <Link to="/" className="fame-logo" aria-label="Web Neuron, inicio">
          <img src={`${import.meta.env.BASE_URL}2_clean2.png`} alt="WN" style={{ height: '32px', width: 'auto' }} />
        </Link>

        <div className="fame-mark" aria-hidden="true">
          <span className="fame-mark-dot" />
          <span className="fame-mark-glyph">WN</span>
        </div>
      </div>

      <aside className="fame-card">
        <span className="fame-card-glyph" aria-hidden="true" style={{ top: '0.2rem', right: '0.2rem' }}>
          <img src={`${import.meta.env.BASE_URL}1.png`} alt="" style={{ height: '70px', width: 'auto', opacity: 1, mixBlendMode: 'multiply', display: 'block' }} />
        </span>
        <div className="fame-card-inner">
          <p className="fame-card-text">
            Soluciones integrales de automatización
            <br />e inteligencia artificial
          </p>
          <ul className="fame-card-links">
            {CARD_LINKS.map((l) => (
              <li key={l.label}>
                {l.isInternal ? (
                  <Link to={l.href} className="fame-card-link">
                    <span className="fame-nav-text" data-text={l.label}>
                      <span className="fame-nav-text-inner">{l.label}</span>
                    </span>
                    <ArrowUpRight size={12} strokeWidth={3.5} />
                  </Link>
                ) : (
                  <a href={l.href} className="fame-card-link">
                    <span className="fame-nav-text" data-text={l.label}>
                      <span className="fame-nav-text-inner">{l.label}</span>
                    </span>
                    <ArrowUpRight size={12} strokeWidth={3.5} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default GlobalChrome;
