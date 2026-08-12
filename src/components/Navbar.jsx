import { useRef, useState } from 'react';
import { BrainCircuit, Menu, X } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import './Navbar.css';

const LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#contacto', label: 'Contacto' },
];

const Navbar = () => {
  const root = useRef(null);
  const bar = useRef(null);
  const menu = useRef(null);
  const [open, setOpen] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      // Entrada: la barra baja y se materializa.
      gsap.from(bar.current, {
        y: -70,
        autoAlpha: 0,
        duration: 1.3,
        ease: 'power4.out',
        delay: 0.15,
      });

      // Al bajar, la barra se comprime y el vidrio se vuelve más denso.
      // toggleClass es más barato que animar: deja el trabajo al compositor.
      ScrollTrigger.create({
        start: 'top -60',
        end: 'max',
        toggleClass: { targets: bar.current, className: 'is-condensed' },
      });

    },
    { scope: root }
  );

  // La animación del menú se construye en el momento del clic, no como una
  // timeline pausada guardada en una ref. Una timeline pausada aplica su estado
  // inicial al crearse y no sobrevive al doble montaje de StrictMode: el
  // contexto se revierte entre pasadas y la instancia guardada queda muerta,
  // con el panel atascado en display: none. contextSafe registra estos tweens
  // en el contexto de useGSAP para que se limpien igualmente al desmontar.
  const openMenu = contextSafe(() => {
    const el = menu.current;

    gsap.set(el, { display: 'flex' });
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: -18 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', overwrite: true }
    );
    gsap.fromTo(
      el.querySelectorAll('a'),
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.06,
        delay: 0.12,
        ease: 'power3.out',
        overwrite: true,
      }
    );

    setOpen(true);
  });

  const closeMenu = contextSafe(() => {
    if (!open) return;

    gsap.to(menu.current, {
      autoAlpha: 0,
      y: -18,
      duration: 0.32,
      ease: 'power2.in',
      overwrite: true,
      // display se quita al final para que el panel no siga ocupando sitio ni
      // capturando pulsaciones una vez invisible.
      onComplete: () => gsap.set(menu.current, { display: 'none' }),
    });

    setOpen(false);
  });

  const toggleMenu = () => (open ? closeMenu() : openMenu());

  return (
    <header className="nav-root" ref={root}>
      <nav className="nav-bar glass" ref={bar} aria-label="Navegación principal">
        <a href="#inicio" className="nav-logo" onClick={closeMenu}>
          <span className="nav-logo-mark">
            <BrainCircuit size={20} strokeWidth={1.8} />
          </span>
          <span className="nav-logo-text grad-text">Web Neuron</span>
        </a>

        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href="#contacto" className="btn btn--primary btn--sm nav-cta">
            Empezar
          </a>
          <button
            type="button"
            className="nav-burger"
            onClick={toggleMenu}
            aria-expanded={open}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div className="nav-menu glass" ref={menu}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={closeMenu}>
            {l.label}
          </a>
        ))}
        <a href="#contacto" className="btn btn--primary" onClick={closeMenu}>
          Empezar ahora
        </a>
      </div>
    </header>
  );
};

export default Navbar;
