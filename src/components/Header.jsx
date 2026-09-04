import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SECTIONS, PAGES, anchorHref, MOBILE_QUERY, useMediaQuery } from '../lib/nav';
import { ChevronDown } from 'lucide-react';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const links = isMobile
    ? SECTIONS.map((s) => ({ href: anchorHref(s.hash, location.pathname), label: s.label }))
    : PAGES.map((p) => ({ to: p.to, label: p.label }));

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previo;
    };
  }, [open]);

  return (
    <header className={`global-header${open ? ' is-open' : ''}`}>
      <div className="header-container">
        
        {/* Izquierda: LOGO */}
        <Link to="/" className="header-brand" aria-label="Web Neuron, inicio">
          <img src={`${import.meta.env.BASE_URL}2_trans.png`} alt="Web Neuron Icon" className="header-logo" />
          <span className="header-brand-text">WEB NEURON</span>
        </Link>

        {/* Centro: ENLACES */}
        <nav className="header-nav" id="header-nav">
          {links.map((l) =>
            l.to ? (
              <Link
                key={l.to}
                to={l.to}
                className={`header-link ${location.pathname === l.to ? 'is-active' : ''}`}
              >
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="header-link" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            )
          )}
        </nav>

        {/* Derecha: BOTÓN ESTILO DROPDOWN */}
        <div className="header-actions">
          <a href="#contacto" className="header-dropdown-btn">
            AGENDAR DEMO <ChevronDown size={14} />
          </a>
          
          <button
            type="button"
            className="header-burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="header-nav"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span className="header-burger-bars" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
