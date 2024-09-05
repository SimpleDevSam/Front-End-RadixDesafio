import React from 'react';

const Footer = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-2 border-custom-purple p-4 flex justify-center items-center max-h-">
      <p className="text-custom-purple text-center">
        Gestão de Tarefas - Desafio Técnico Radix Engenharia e Software © {currentYear}
      </p>
    </footer>
  );
};

export default Footer;
