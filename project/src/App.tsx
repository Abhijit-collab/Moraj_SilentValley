import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { Routes, Route } from 'react-router-dom';
import SketchfabExterior from './pages/SketchfabExterior';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/home/Hero';
import About from './components/home/About';
import PropertyShowcase from './components/home/PropertyShowcase';
import Services from './components/home/Services';
import Contact from './components/home/Contact';

const App: React.FC = () => {
  useEffect(() => {
    ReactGA.initialize('G-XXXXXXXXXX');
  }, []);

  return (
    <Routes>
      <Route path="/sketchfab-exterior" element={<SketchfabExterior />} />
      <Route path="*" element={
        <div className="flex flex-col min-h-screen bg-white">
          <Header />
          <main className="flex-grow">
            <section id="home">
              <Hero title="Moraj Silent Valley" subtitle="A quiet place in a great neighborhood. Enjoy unlimited nature and the charms of city life." />
            </section>

            <section id="about">
              <About />
            </section>

            <section id="property">
              <PropertyShowcase />
            </section>

            <section id="services">
              <Services />
            </section>

            <section id="contact">
              <Contact />
            </section>
          </main>
          <Footer />
        </div>
      } />
    </Routes>
  );
};

export default App;