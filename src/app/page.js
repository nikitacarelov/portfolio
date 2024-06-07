'use client';
import React, { useState, useRef, useEffect } from 'react';
import './globals.css';
import Grid from './components/Grid'; // Ensure the path is correct

export default function Home() {
  const [animate, setAnimateName] = useState(false);
  const [currentState, setCurrentState] = useState('home');
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // New state for hover

  // Refs for scrolling
  const scrollContainerRef = useRef(null);
  const portfolioRef = useRef(null);
  const aboutRef = useRef(null);
  const homeRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    const container = scrollContainerRef.current;
    const section = ref.current;
    if (container && section) {
      const containerRect = container.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const scrollPosition = sectionRect.left - containerRect.left + container.scrollLeft - containerRect.width / 2 + sectionRect.width / 2;
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (currentState !== 'home') {
      if (currentState === 'about') {
        scrollToSection(aboutRef);
      } else if (currentState === 'portfolio') {
        scrollToSection(portfolioRef);
      } else if (currentState === 'contact') {
        scrollToSection(contactRef);
      }
    }
  }, [currentState]);

  const toggleState = (direction) => {
    const states = ['home', 'about', 'portfolio', 'contact'];
    const currentIndex = states.indexOf(currentState);
    let newIndex;

    if (direction === 'down') {
      newIndex = (currentIndex + 1) % states.length;
    } else if (direction === 'up') {
      newIndex = (currentIndex - 1 + states.length) % states.length;
    }

    setCurrentState(states[newIndex]);
    setAnimateName(states[newIndex] !== 'home');
  };

  useEffect(() => {
    const handleWheel = (event) => {
      const now = Date.now();
      if (now - lastScrollTime < 500) return; // throttle to avoid rapid toggling
      setLastScrollTime(now);

      if (event.deltaY > 0) {
        toggleState('down');
      } else if (event.deltaY < 0) {
        toggleState('up');
      }
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [lastScrollTime]);

  return (
    <main className="min-h-screen bg-transparent flex flex-col items-center justify-center font-serif transition-all duration-1000 ease-in-out">
      <header className="w-full py-5 text-white flex justify-between items-center px-10" style={{ backgroundColor: 'transparent' }}>
        <div className="ml-auto absolute top-0 right-0 mr-10 mt-5 font-dosis">
          <button
            className={`text-white hover:opacity-50 font-bold py-2 px-4 transition-all duration-300 ${currentState === 'home' ? 'opacity-60' : ' '}`}
            onClick={() => {
              setCurrentState('home');
              setAnimateName(false);
            }}
          >
            Home
          </button>

          <button
            className={`text-white hover:opacity-50 font-bold py-2 px-4 transition-all duration-300 ${currentState === 'about' ? 'opacity-60' : ' '}`}
            onClick={() => {
              setCurrentState('about');
              setAnimateName(true);
            }}
          >
            About
          </button>
          <button
            className={`text-white hover:opacity-50 font-bold py-2 px-4 transition-all duration-300 ${currentState === 'portfolio' ? 'opacity-60' : ' '}`}
            onClick={() => {
              setCurrentState('portfolio');
              setAnimateName(true);
            }}
          >
            Portfolio
          </button>
          <button
            className={`text-white hover:opacity-50 font-bold py-2 px-4 transition-all duration-300 ${currentState === 'contact' ? 'opacity-60' : ' '}`}
            onClick={() => {
              setCurrentState('contact');
              setAnimateName(true);
            }}
          >
            Contact
          </button>
        </div>
      </header>
      <Grid />
      <button
        className={`absolute center shadow-lg max-w-screen-lg mx-auto text-center transition-all duration-1000 ease-in-out ${animate ? '-translate-y-20' : 'translate-y-0'}`}
        onClick={() => toggleState('down')}
        onMouseEnter={() => setIsHovered(true)} // Set hover state on mouse enter
        onMouseLeave={() => setIsHovered(false)} // Reset hover state on mouse leave
        style={{ cursor: 'pointer', background: 'transparent', border: 'none', zIndex: '1000', padding: '20px', width: '500px', height: '150px' }}
      >
      </button>

      <div
        className={`absolute center p-10 shadow-lg max-w-screen-lg mx-auto text-center transition-all duration-1000 ease-in-out ${animate ? '-translate-y-20' : 'translate-y-0'}`}>
        <div className="flex flex-col gap-0 items-center font-dosis">
          <h1 className={`text-8xl font-thin text-text tracking-wide transition-all duration-[1000ms] ease-in-out ${!animate && isHovered ? 'opacity-50' : ' '} ${animate && !isHovered ? 'opacity-20' : ' '} ${animate && isHovered ? 'opacity-10' : ' '}`}>
            Nikita Carelov
          </h1>
          <p className={`text-2xl text-text font-thin italic transition-opacity duration-[1500ms] ${animate ? 'opacity-5' : 'opacity-50'}`}>
            Mechanical Engineer | 3D Artist | Developer
          </p>
        </div>
      </div>
      {/* Always Render Scrollable Row */}
      <div className={`relative w-full overflow-hidden transition-all duration-1000 ${currentState === 'home' ? ' opacity-0' : ' opacity-100'}`}>
        <div ref={scrollContainerRef} className="overflow-x-auto whitespace-nowrap flex transition-all duration-[1000ms] mt-20 no-scrollbar px-20">
          <div ref={homeRef} className="inline-block w-full flex-shrink-0">
            {/* Home content */}
          </div>
          <div ref={aboutRef} className="inline-block w-full flex-shrink-0">
            <div className={`flex justify-center ${currentState === 'about' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[1000ms] mx-4`}>
              <p className="text-lg text-text font-medium whitespace-pre-line">
                I am a Mechanical Engineer with a passion for 3D Art and Software Development...<br />
                Here is another line.<br />
                And another line.
              </p>
            </div>
          </div>
          <div ref={portfolioRef} className="inline-block w-full flex-shrink-0">
            <div className={`flex justify-center ${currentState === 'portfolio' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[1000ms] mx-4`}>
              <button className="text-white hover:text-gray-600 font-bold py-4 px-8 text-lg transition-colors duration-300">
                Robotics
              </button>
              <button className="text-white hover:text-gray-600 font-bold py-4 px-8 text-lg transition-colors duration-300">
                Software
              </button>
              <button className="text-white hover:text-gray-600 font-bold py-4 px-8 text-lg transition-colors duration-300">
                3D Art
              </button>
              <button className="text-white hover:text-gray-600 font-bold py-4 px-8 text-lg transition-colors duration-300">
                AI
              </button>
            </div>
          </div>
          <div ref={contactRef} className="inline-block w-full flex-shrink-0">
            <div className={`flex justify-center ${currentState === 'contact' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[1000ms] mx-4`}>
              <p className="text-lg text-text font-medium">
                Feel free to reach out to me via email at contact@example.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
