import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} AriseGulf. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
