import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="bg-gray-100 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Get In Touch</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Have a project in mind or want to learn more about our services? We'd love to hear from you. Reach out to us to start the conversation.
        </p>
        <a 
          href="mailto:arisegulf@gmail.com"
          className="bg-blue-600 text-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider hover:bg-blue-700 transition duration-300"
        >
          arisegulf@gmail.com
        </a>
      </div>
    </section>
  );
};

export default Contact;
