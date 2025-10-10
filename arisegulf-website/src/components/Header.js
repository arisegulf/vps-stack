import React from 'react';

// We will copy the logo into the src folder in the next step.
import logo from '../logo.png';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="AriseGulf Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-gray-800 ml-3">AriseGulf</span>
        </div>
        <a 
          href="#contact"
          className="bg-blue-600 text-white font-bold rounded-full py-2 px-6 hover:bg-blue-700 transition duration-300"
        >
          Contact Us
        </a>
      </div>
    </header>
  );
};

export default Header;
