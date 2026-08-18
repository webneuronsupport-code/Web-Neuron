import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Services from '../components/Services';
import ProcessWipe from '../components/ProcessWipe';
import Process from '../components/Process';
import Results from '../components/Results';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <Marquee />
        <Services />
        <ProcessWipe />
        <Process />
        <Results />
      </main>
      <Contact />
    </>
  );
};

export default Home;
