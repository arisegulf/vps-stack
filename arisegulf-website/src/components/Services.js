import React from 'react';

// Placeholder for icons. We can use a library like Heroicons later.
const ServiceIcon = () => (
  <svg className="w-16 h-16 mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>
);

const services = [
  {
    title: 'Workflow Automation',
    description: 'We build robust, scalable automation solutions using tools like n8n to streamline your business processes and save you time.',
  },
  {
    title: 'Custom AI Chatbots',
    description: 'Engage your customers with intelligent, 24/7 chatbots built on modern platforms like Flowise, tailored to your business needs.',
  },
  {
    title: 'Data Management Solutions',
    description: 'From data collection to visualization, we use tools like Baserow and Metabase to create a single source of truth for your business data.',
  },
  {
    title: 'Intelligent Document Processing',
    description: 'Extract, classify, and validate information from your documents automatically using our custom AI-powered RAG pipelines.',
  },
];

const Services = () => {
  return (
    <section id="services" className="bg-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Our Services</h2>
        <p className="text-center text-gray-600 mb-12">We offer a range of AI-powered solutions to elevate your business.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <ServiceIcon />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
