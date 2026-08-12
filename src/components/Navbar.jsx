import { useRef, useState } from 'react';
import { BrainCircuit, ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { INTRO_DELAY } from '../lib/timing';
import './Navbar.css';

const LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#resultados', label: 'Resultados' },
];

const Navbar = () => {
  const root = useRef(null);
  const bar = useRef(null);
  const panel = useRef(null);
  const [open, setOpen] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      gsap.from(bar.current, {
        y: -50,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: INTRO_DELAY - 0.15,
      });

      // Al bajar, el tinte del cristal se densifica. toggleClass deja el
      // trabajo en CSS en lugar de mantener un tween vivo durante todo el
      // scroll de la página.
      ScrollTrigger.create({
        start: 'top -40',
        end: 'max',
        toggleClass: { targets: bar.current, className: 'is-scrolled' },
      });
    },
    { scope: root }
  );

  // La animación se construye en el clic. Una timeline pausada guardada en una
  // ref no sobrevive al doble montaje de StrictMode: el contexto se revierte
  // entre pasadas y la instancia queda muerta.
  const openPanel = contextSafe(() => {
    gsap.set(panel.current, { display: 'block' });
    gsap.fromTo(
      panel.current,
      { autoAlpha: 0, y: -12 },
      { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out', overwrite: true }
    );
    gsap.fromTo(
      panel.current.querySelectorAll('.nav-panel-item'),
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        delay: 0.1,
        ease: 'power3.out',
        overwrite: true,
      }
    );
    setOpen(true);
  });

  const closePanel = contextSafe(() => {
    if (!open) return;
    gsap.to(panel.current, {
      autoAlpha: 0,
      y: -12,
      duration: 0.3,
      ease: 'power2.in',
      overwrite: true,
      onComplete: () => gsap.set(panel.current, { display: 'none' }),
    });
    setOpen(false);
  });

  return (
    <header className="nav" ref={root}>
      <div className="nav-bar glass" ref={bar}>
        <button
          type="button"
          className="nav-menu-btn"
          onClick={() => (open ? closePanel() : openPanel())}
          aria-expanded={open}
        >
          <span className="nav-menu-bars" aria-hidden="true">
            <i />
            <i />
          </span>
          {open ? 'Cerrar' : 'Menú'}
        </button>

        <a href="#inicio" className="nav-logo" onClick={closePanel} aria-label="Web Neuron, inicio">
          <BrainCircuit size={22} strokeWidth={1.6} />
        </a>

        <a href="#contacto" className="nav-contact" onClick={closePanel}>
          Contacto
          <ArrowUpRight size={15} strokeWidth={2} />
        </a>
      </div>

      <nav className="nav-panel glass" ref={panel} aria-label="Navegación principal">
        <ul>
          {LINKS.map((l, i) => (
            <li className="nav-panel-item" key={l.href}>
              <a href={l.href} onClick={closePanel}>
                <span className="nav-panel-num">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-panel-item nav-panel-foot">
          <span className="label">Escríbenos</span>
          <a href="mailto:webneuronsupport@gmail.com" className="nav-panel-mail">
            webneuronsupport@gmail.com
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
