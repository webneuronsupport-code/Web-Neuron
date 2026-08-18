import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from './lib/gsap';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import Header from './components/Header';
import GlobalChrome from './components/GlobalChrome';
import Home from './pages/Home';
import VirtualAssistants from './pages/VirtualAssistants';

import CrmOmnicanal from './pages/CrmOmnicanal';

function App() {
  useSmoothScroll();
  const location = useLocation();

  useEffect(() => {
    // Las fuentes y las imágenes cambian la altura de la página después del
    // primer render. Sin este refresh, los ScrollTrigger se quedan calculados
    // sobre un layout que ya no existe y disparan en el sitio equivocado.
    const refresh = () => ScrollTrigger.refresh();

    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);

    return () => window.removeEventListener('load', refresh);
  }, []);

  // Hacer scroll al principio cada vez que cambiamos de ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <GlobalChrome />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asistentes-virtuales" element={<VirtualAssistants />} />
        <Route path="/crm-omnicanal" element={<CrmOmnicanal />} />
      </Routes>
    </>
  );
}

export default App;
