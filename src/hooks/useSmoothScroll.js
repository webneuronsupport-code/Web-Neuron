import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

/**
 * Scroll suave con Lenis, sincronizado con GSAP.
 *
 * Tres cosas importan aquí:
 *
 * 1. Lenis avanza desde el ticker de GSAP, no desde su propio
 *    requestAnimationFrame. Un solo reloj para todo evita el micro-desfase
 *    entre el scroll y las animaciones con scrub.
 * 2. Cada scroll de Lenis llama a ScrollTrigger.update, porque Lenis no emite
 *    los eventos de scroll nativos en los que ScrollTrigger confía.
 * 3. lagSmoothing(0) desactiva la compensación de retardo de GSAP. Con ella
 *    activada, un frame lento hace que el ticker salte y el scroll da un tirón
 *    visible.
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Quien pide movimiento reducido se queda con el scroll nativo del
    // sistema: el scroll suave es precisamente lo que marea. Sin listener de
    // anclas, los enlaces internos vuelven al salto instantáneo del navegador,
    // que es el comportamiento correcto en ese caso.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.15,
      // Curva exponencial: arranca rápido y frena mucho al final.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Anclas internas. Se gestionan a mano en lugar de con la opción `anchors`
    // de Lenis porque esa no llega a cancelar el salto nativo del navegador: el
    // enlace aterrizaba de golpe en el destino y solo después Lenis corregía el
    // desplazamiento, con lo que se veía un salto seco. Una única delegación en
    // document cubre todos los enlaces de la página, presentes y futuros.
    const onClick = (event) => {
      // Respeta los modificadores: ctrl/cmd/shift abren en otra pestaña o
      // ventana y no deben interceptarse.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      // El offset deja el destino por debajo de la barra flotante.
      lenis.scrollTo(target, { offset: -92, duration: 1.5 });
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);
}
