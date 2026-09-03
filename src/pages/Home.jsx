import React from 'react';
import Hero from '../components/Hero';
// import HeroNew from '../components/HeroNew'; // Ocultando la propuesta fallida
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
        {/* <HeroNew /> */}
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
