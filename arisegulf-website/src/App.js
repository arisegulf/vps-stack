import React from 'react';

// We will create these component files in the next steps
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-gray-100 text-gray-800">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;