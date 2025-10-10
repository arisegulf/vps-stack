import React from 'react';

// We can use an image from your Arise Images folder later.
// For now, we'll use a simple background color.

const Hero = () => {
  return (
    <section className="bg-blue-700 text-white">
      <div className="container mx-auto px-6 text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          AI-Powered Automation & Intelligent Solutions
        </h1>
        <p className="text-lg md:text-xl mb-8">
          We transform your business processes with cutting-edge AI and workflow automation.
        </p>
        <a 
          href="#services" 
          className="bg-white text-blue-700 font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider hover:bg-blue-100 transition duration-300"
        >
          Explore Our Services
        </a>
      </div>
    </section>
  );
};

export default Hero;
