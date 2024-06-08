'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './Header.css'; // Create this CSS file if needed

const Header = ({ currentState, setCurrentState, setAnimateName }) => {
  const router = useRouter();

  const handleNavigation = (state) => {
    if (setCurrentState) {
      setCurrentState(state);
    }
    if (setAnimateName) {
      setAnimateName(state !== 'home');
    }
    router.push(`/?state=${state}`);
  };

  return (
    <header className="w-full py-5 text-white flex justify-between items-center px-10" style={{ backgroundColor: 'transparent' }}>
      <div className="ml-auto absolute top-0 right-0 mr-10 mt-5 font-dosis">
        <button
          className={`text-white hover:opacity-50 font-bold py-2 px-4 transition-all duration-300 ${currentState === 'home' ? 'opacity-60' : ' '}`}
          onClick={() => handleNavigation('home')}
        >
          Home
        </button>
        <button
          className={`text-white hover:opacity-50 font-bold py-2 px-4 transition-all duration-300 ${currentState === 'about' ? 'opacity-60' : ' '}`}
          onClick={() => handleNavigation('about')}
        >
          About
        </button>
        <button
          className={`text-white hover:opacity-50 font-bold py-2 px-4 transition-all duration-300 ${currentState === 'portfolio' ? 'opacity-60' : ' '}`}
          onClick={() => handleNavigation('portfolio')}
        >
          Portfolio
        </button>
        <button
          className={`text-white hover:opacity-50 font-bold py-2 px-4 transition-all duration-300 ${currentState === 'contact' ? 'opacity-60' : ' '}`}
          onClick={() => handleNavigation('contact')}
        >
          Contact
        </button>
      </div>
    </header>
  );
};

export default Header;
