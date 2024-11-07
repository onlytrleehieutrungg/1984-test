"use client";
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex fixed z-99 top-0 w-full bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Logo</div>
        <ul className={`md:flex md:space-x-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <li><a href="#home" className="block py-2 md:py-0 hover:text-gray-300">Home</a></li>
          <li><a href="#about" className="block py-2 md:py-0 hover:text-gray-300">About</a></li>
          <li><a href="#services" className="block py-2 md:py-0 hover:text-gray-300">Services</a></li>
          <li><a href="#contact" className="block py-2 md:py-0 hover:text-gray-300">Contact</a></li>
        </ul>
        <div className="md:hidden" onClick={toggleMenu}>
          <button className="text-2xl focus:outline-none">
            ☰
          </button>
        </div>
      </div>
      {/* Mobile menu (visible when isOpen is true) */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gray-800`}>
        <ul className="space-y-2 p-4">
          <li><a href="#home" className="block py-2 hover:text-gray-300">Home</a></li>
          <li><a href="#about" className="block py-2 hover:text-gray-300">About</a></li>
          <li><a href="#services" className="block py-2 hover:text-gray-300">Services</a></li>
          <li><a href="#contact" className="block py-2 hover:text-gray-300">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
