"use client";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Navbar: React.FC = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <nav className="flex fixed z-99 top-0 w-full bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {!isOpen && <div className="text-2xl font-bold">Logo</div>}
        <ul
          className={`md:flex md:space-x-6 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <li>
            <div className="md:hidden text-2xl font-bold">Logo</div>
          </li>
          <li>
            <a href="#home" className="block py-2 md:py-0 hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="block py-2 md:py-0 hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="block py-2 md:py-0 hover:text-gray-300"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block py-2 md:py-0 hover:text-gray-300"
            >
              Contact
            </a>
          </li>
        </ul>
        <div className="flex items-start h-full md:hidden" onClick={toggleMenu}>
          <button className="text-2xl focus:outline-none">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
