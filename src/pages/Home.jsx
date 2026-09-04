import React from 'react';
import Hero from '../components/Hero';
// El Hero horizontal se probó y se descartó. Se queda el archivo por si acaso,
// pero el que va a producción es Hero: el del chip con la tipografía colosal.
// Ojo al reactivarlo: GlobalChrome (la navegación lateral y la tarjeta) se
// renderiza DENTRO de Hero, así que cambiar de hero se lleva por delante el
// cromo de toda la portada.
// import HeroNew from '../components/HeroNew';
import Marquee from '../components/Marquee';
// import PainPoints from '../components/PainPoints';
import Services from '../components/Services';
import ProcessWipe from '../components/ProcessWipe';
import Process from '../components/Process';
import Results from '../components/Results';
import ContactForm from '../components/ContactForm';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <Marquee />
        {/* <PainPoints /> */}
        <Services />
        <ProcessWipe />
        <Process />
        <Results />
      </main>
      <ContactForm />
      <Contact />
    </>
  );
};

export default Home;
