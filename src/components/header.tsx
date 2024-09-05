import React from 'react';
import clipboardIcon from '../assets/clipboard.png'; 
const Header = () => {
  return (
    <header className="bg-white border-b-2 border-custom-purple p-4 flex items-center gap-x-24">

      <div className="flex items-center ml-24">
        <img src={clipboardIcon} alt="Icon" className="w-8 h-8 mr-4" />
        <span className="text-lg  text-custom-purple font-semibold">Gerenciador de Tarefas</span>
      </div>

      <nav className="flex space-x-6">
        <a href="/" className="text-custom-purple hover:custom-purple-900">Home</a>
        <a href="/tasks" className="text-custom-purple hover:custom-purple-900">Ver Tarefas</a>
      </nav>
   
      <div className="w-8"></div> 
   
    </header>
  );
};

export default Header;