/**
 * Registro central de GSAP.
 *
 * Los plugins se registran una sola vez, al importar este módulo. Cualquier
 * componente que necesite GSAP importa desde aquí y no vuelve a llamar a
 * registerPlugin, que es la causa habitual de que un plugin "no exista"
 * en producción tras el tree-shaking.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin, useGSAP);

// Curvas por defecto para todo el sitio. Duración algo larga y salida suave:
// es lo que da la cadencia pausada del estilo Apple en lugar de un "pop".
gsap.defaults({
  duration: 1.05,
  ease: 'power3.out',
});

export { gsap, ScrollTrigger, SplitText, useGSAP };
