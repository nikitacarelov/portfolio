'use client';
import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Correct import for App Router
import './globals.css';
import Grid from './components/Grid'; // Ensure the path is correct
import Header from './components/Header'; // Import the Header component

const HomeContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentState, setCurrentState] = useState('home');
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // New state for hover
  const [isTransitioning, setIsTransitioning] = useState(false); // New transition state
  const [animate, setAnimateName] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false); // New state for fade-in

  // Refs for scrolling
  const scrollContainerRef = useRef(null);
  const portfolioRef = useRef(null);
  const aboutRef = useRef(null);
  const homeRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const state = searchParams.get('state');
    if (state) {
      setCurrentState(state);
      setAnimateName(state !== 'home');
    }
    setLoading(false);
    setTimeout(() => setIsLoaded(true), 100); // Delay to ensure fade-in works
  }, [searchParams]);

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
    router.push(`/?state=${states[newIndex]}`); // Now router is defined
  };

  useEffect(() => {
    const handleWheel = (event) => {
      // Prevent default side scrolling
      event.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime < 500) return; // throttle to avoid rapid toggling
      setLastScrollTime(now);

      if (event.deltaY > 0) {
        toggleState('down');
      } else if (event.deltaY < 0) {
        toggleState('up');
      }
    };

    const handleTouchMove = (event) => {
      // Prevent touch scrolling
      event.preventDefault();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [lastScrollTime]);

  const handleTouchStart = (event) => {
    setIsHovered(true);
    // Prevent default behavior to avoid unwanted scrolling
    event.preventDefault();
  };

  const handleTouchEnd = (event) => {
    setIsHovered(false);
    // Handle touch end event
    toggleState('down');
    // Prevent default behavior
    event.preventDefault();
  };

  const handleNavigation = (url) => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(url);
    }, 500); // Match this duration with the CSS transition duration
  };

  return (
    <main className="min-h-screen bg-transparent flex flex-col items-center justify-center font-serif">
      <Header currentState={currentState} setCurrentState={setCurrentState} setAnimateName={setAnimateName} />
      <div className={`content-container ${isTransitioning ? 'fade-out' : ''} ${isLoaded ? 'fade-in' : 'fade-out'} flex flex-col items-center justify-center`}>
        <Grid />

        <button
          className={`absolute center shadow-lg mx-auto text-center transition-transform duration-1000 ease-in-out ${animate ? '-translate-y-20' : 'translate-y-0'} 
            w-[350px] h-[100px] sm:w-[450px] sm:h-[140px] md:w-[550px] md:h-[150px]`}
          onClick={() => toggleState('down')}
          onMouseEnter={() => setIsHovered(true)} // Set hover state on mouse enter
          onMouseLeave={() => setIsHovered(false)} // Reset hover state on mouse leave
          onTouchStart={handleTouchStart} // Handle touch start
          onTouchEnd={handleTouchEnd} // Handle touch end
          style={{ cursor: 'pointer', background: 'transparent', border: 'none', zIndex: '1000' }}
        >
        </button>

        <div
          className={`absolute center p-10 shadow-lg max-w-screen-lg mx-auto text-center transition-transform duration-1000 ease-in-out ${animate ? '-translate-y-20' : 'translate-y-0'}`}
        >
          <div className="flex flex-col gap-0 items-center font-dosis">
            <h1 className={`text-5xl sm:text-7xl md:text-8xl font-thin text-text tracking-wide transition-opacity duration-[300ms] ease-in-out ${!animate && isHovered ? 'opacity-50' : ''} ${animate && !isHovered ? 'opacity-20' : ''} ${animate && isHovered ? 'opacity-10' : ''}`}>
              Nikita Carelov
            </h1>
            <p className={`text-xl sm:text-2xl md:text-2xl text-text font-thin italic transition-opacity duration-[1500ms] ${animate ? 'opacity-5' : 'opacity-50'}`}>
              Future Mechanical Eng | 3D Artist | Developer
            </p>
          </div>
        </div>

        {/* Always Render Scrollable Row */}
        <div className={`relative w-full overflow-hidden transition-all duration-1000 ${currentState === 'home' ? ' opacity-0' : ' opacity-100'}`}>
          <div ref={scrollContainerRef} className="overflow-x-auto whitespace-nowrap flex transition-all duration-[1000ms] mt-20 no-scrollbar px-20">
            <div ref={homeRef} className="inline-block w-full flex-shrink-0">
              {/* Home content */}
            </div>
            <div ref={aboutRef} className="inline-block w-full flex-shrink-0 flex-wrap ">
              <div className={`font-dosis flex justify-center ${currentState === 'about' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[1000ms] mx-4`}>
                <p className="text-lg text-wrap font-medium whitespace-pre-line max-w-xs sm:max-w-sm md:max-w-md lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
                  I am a Mechanical Engineering student and AI enthusiast with a passion for 3D Art and Software Development.<br />
                </p>
              </div>
            </div>
            <div ref={portfolioRef} className="inline-block w-full flex-shrink-0">
              <div className={`font-dosis grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 justify-center ${currentState === 'portfolio' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[1000ms] mx-4`}>
                <button
                  className="text-white hover:text-gray-600 font-bold py-4 px-8 text-lg transition-colors duration-300"
                  onClick={() => handleNavigation('/Robotics')}
                >
                  Robotics
                </button>
                <button
                  className="text-white hover:text-gray-600 font-bold py-4 px-8 text-lg transition-colors duration-300"
                  onClick={() => handleNavigation('/Software')}
                >
                  Software
                </button>
                <button
                  className="text-white hover:text-gray-600 font-bold py-4 px-8 text-lg transition-colors duration-300"
                  onClick={() => handleNavigation('/3dArt')}
                >
                  3D Art
                </button>
                <button
                  className="text-white hover:text-gray-600 font-bold py-4 px-8 text-lg transition-colors duration-300"
                  onClick={() => handleNavigation('/Ai')}
                >
                  AI
                </button>
              </div>
            </div>

            <div ref={contactRef} className="inline-block w-full flex-shrink-0">
              <div className={`font-dosis flex justify-center ${currentState === 'contact' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[1000ms] mx-4`}>
                <p className="text-lg text-wrap font-medium whitespace-pre-line max-w-xs sm:max-w-sm md:max-w-md lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
                  Feel free to reach out to me via email at nikitacarelov@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent flex flex-col items-center justify-center font-serif transition-all duration-1000 ease-in-out">
      <Suspense>
        <HomeContent />
      </Suspense>
    </main>
  );
}
