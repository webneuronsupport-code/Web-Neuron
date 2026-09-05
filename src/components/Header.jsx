import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SECTIONS, PAGES, anchorHref, MOBILE_QUERY, useMediaQuery } from '../lib/nav';
import { ChevronDown } from 'lucide-react';
import { gsap } from '../lib/gsap';
import SpecularButton from './SpecularButton';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState('ES');
  const langBtnRef = useRef(null);
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

  const toggleLang = () => {
    // Animación de GSAP al hacer clic
    gsap.fromTo(langBtnRef.current, 
      { scale: 0.8, y: -5, opacity: 0.5 }, 
      { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
    setLang((prev) => (prev === 'ES' ? 'EN' : 'ES'));
  };

  return (
    <header className={`global-header${open ? ' is-open' : ''}`}>
      <div className="header-container">
        
        {/* Izquierda: LOGO */}
        <Link to="/" className="header-brand" aria-label="Web Neuron, inicio">
          <img src={`${import.meta.env.BASE_URL}1_trans.png`} alt="Web Neuron Icon" className="header-logo" />
          <span className="header-brand-text">WEB NEURON</span>
        </Link>

        {/* Centro: ENLACES */}
        <nav className="header-nav" id="header-nav">
          {links.map((l) =>
            l.to ? (
              <SpecularButton
                as={Link}
                key={l.to}
                to={l.to}
                className={`header-link ${location.pathname === l.to ? 'is-active' : ''}`}
                size="sm"
                radius={20}
                baseColor="#111111"
                lineColor="#00f3ff"
                intensity={1.2}
                thickness={2}
                speed={0.5}
              >
                {l.label}
              </SpecularButton>
            ) : (
              <SpecularButton
                as="a"
                key={l.href}
                href={l.href}
                className="header-link"
                onClick={() => setOpen(false)}
                size="sm"
                radius={20}
                baseColor="#111111"
                lineColor="#00f3ff"
                intensity={1.2}
                thickness={2}
                speed={0.5}
              >
                {l.label}
              </SpecularButton>
            )
          )}
        </nav>

        {/* Derecha: BOTÓN ESTILO DROPDOWN */}
        <div className="header-actions">
          
          <SpecularButton
            size="sm"
            radius={20}
            baseColor="#111111"
            lineColor="#00f3ff"
            intensity={1.2}
            thickness={2}
            speed={0.5}
            onClick={toggleLang}
            className="header-lang-btn"
            aria-label="Cambiar idioma"
          >
            {lang}
          </SpecularButton>

          <SpecularButton
            as="a"
            href="#contacto"
            size="sm"
            radius={20}
            baseColor="#111111"
            lineColor="#00f3ff"
            intensity={1.2}
            thickness={2}
            speed={0.5}
            className="header-dropdown-btn"
          >
            AGENDAR DEMO <ChevronDown size={14} style={{ marginLeft: 4 }} />
          </SpecularButton>
          
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
