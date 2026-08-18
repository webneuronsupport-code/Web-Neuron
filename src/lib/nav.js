import { useEffect, useState } from 'react';

/* Las dos listas viven aquí porque en móvil se intercambian: la cabecera pasa a
   llevar las secciones y el submenú lateral pasa a llevar los productos. Tenerlas
   duplicadas en cada componente garantizaba que un día se desincronizaran. */

// Secciones de la página de inicio. Se navegan por ancla.
export const SECTIONS = [
  { hash: '#inicio', label: 'Inicio' },
  { hash: '#servicios', label: 'Servicios' },
  { hash: '#proceso', label: 'Proceso' },
  { hash: '#resultados', label: 'Resultados' },
  { hash: '#contacto', label: 'Contacto' },
];

// Páginas de producto. Son rutas reales.
export const PAGES = [
  { to: '/', label: 'Inicio' },
  { to: '/asistentes-virtuales', label: 'Asistentes Virtuales' },
  { to: '/crm-omnicanal', label: 'CRM Omnicanal' },
];

/* Un ancla suelta («#servicios») solo funciona si ya estamos en el inicio; desde
   una página de producto hay que navegar primero. El scroll suave engancha las
   que empiezan por «#», así que la forma corta es además la que queremos cuando
   sí estamos en casa. */
export const anchorHref = (hash, pathname) =>
  pathname === '/' ? hash : `/${hash}`;

// El intercambio sigue el mismo corte que el botón de menú de la cabecera: por
// encima de 768 px cada menú se queda con su contenido de siempre.
export const MOBILE_QUERY = '(max-width: 768px)';

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};
