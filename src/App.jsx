import { useEffect } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Process from './components/Process';
import Results from './components/Results';
import Contact from './components/Contact';

function App() {
  useSmoothScroll();

  useEffect(() => {
    // Las fuentes y las imágenes cambian la altura de la página después del
    // primer render. Sin este refresh, los ScrollTrigger se quedan calculados
    // sobre un layout que ya no existe y disparan en el sitio equivocado.
    const refresh = () => ScrollTrigger.refresh();

    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);

    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <Results />
      </main>
      <Contact />
    </>
  );
}

export default App;
