import React from 'react';

const technologies = [
  'React',
  'Tailwind CSS',
  'Python',
  'Node.js',
  'Docker',
  'Nginx',
  'n8n',
  'Flowise',
  'Baserow',
  'Qdrant',
  'PostgreSQL',
  'Git & GitHub',
];

const TechStack = () => {
  return (
    <section id="tech-stack" className="bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Technology Stack</h2>
        <p className="text-center text-gray-600 mb-12">We use modern, reliable, and scalable technologies to build our solutions.</p>
        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-blue-100 text-blue-800 font-semibold py-2 px-4 rounded-full shadow-sm">
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
