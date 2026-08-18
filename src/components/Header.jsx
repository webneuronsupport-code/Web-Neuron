import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SECTIONS, PAGES, anchorHref, MOBILE_QUERY, useMediaQuery } from '../lib/nav';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery(MOBILE_QUERY);

  // En móvil los dos menús se intercambian: este de arriba pasa a ser el de
  // navegación por secciones, y las páginas de producto bajan al submenú
  // lateral. En escritorio cada uno se queda con lo suyo.
  const links = isMobile
    ? SECTIONS.map((s) => ({ href: anchorHref(s.hash, location.pathname), label: s.label }))
    : PAGES.map((p) => ({ to: p.to, label: p.label }));

  // Al cambiar de ruta el panel debe cerrarse solo. Sin esto, pulsar un enlace
  // navegaba pero dejaba el menú abierto tapando la página nueva.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Con el panel abierto se bloquea el scroll del fondo: si no, el dedo
  // arrastra la página por debajo del menú.
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
        {/* Los tres enlaces en fila suman 291 px y no caben en un móvil: por
            debajo de 768 px se repliegan tras este botón. */}
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
          <span className="header-burger-text">{open ? 'Cerrar' : 'Menú'}</span>
        </button>

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
              // Un ancla no cambia la ruta, así que el efecto que cierra el
              // panel al navegar no se dispara: hay que cerrarlo a mano o el
              // menú se queda abierto tapando la sección a la que acabas de ir.
              <a key={l.href} href={l.href} className="header-link" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
