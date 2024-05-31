'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [animate, setAnimateName] = useState(false);
  const [showButtons, setShowPortfolioButtons] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showHome, setShowHome] = useState(true);

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
    if (!showHome) {
      if (showAbout) {
        scrollToSection(aboutRef);
      } else if (showButtons) {
        scrollToSection(portfolioRef);
      } else if (showContact) {
        scrollToSection(contactRef);
      }
    }
  }, [showHome, showAbout, showButtons, showContact]);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center font-serif transition-all duration-700">
      <header className="w-full py-5 text-white flex justify-between items-center px-10 bg-black">
        <div className="ml-auto absolute top-0 right-0 mr-10 mt-5 font-dosis">
          <button
            className="text-white hover:text-gray-800 font-bold py-2 px-4 transition-colors duration-300"
            onClick={() => {
              setShowHome(true);
              setShowPortfolioButtons(false);
              setShowAbout(false);
              setShowContact(false);
              setAnimateName(false);
            }}
          >
            Home
          </button>

          <button
            className="text-white hover:text-gray-800 font-bold py-2 px-4 transition-colors duration-300"
            onClick={() => {
              setShowHome(false);
              setShowPortfolioButtons(false);
              setShowAbout(true);
              setShowContact(false);
              setAnimateName(true);
            }}
          >
            About
          </button>
          <button
            className="text-white hover:text-gray-800 py-2 px-4 font-bold ml-2 transition-colors duration-300"
            onClick={() => {
              setShowHome(false);
              setShowAbout(false);
              setAnimateName(true);
              setShowPortfolioButtons(true);
              setShowContact(false);
            }}
          >
            Portfolio
          </button>
          <button
            className="text-white hover:text-gray-800 py-2 px-4 font-bold ml-2 transition-colors duration-300"
            onClick={() => {
              setShowHome(false);
              setShowAbout(false);
              setAnimateName(true);
              setShowPortfolioButtons(false);
              setShowContact(true);
            }}
          >
            Contact
          </button>
        </div>
      </header>

      <div className={`absolute center p-10 shadow-lg max-w-screen-lg mx-auto text-center transition-all duration-700 ease-in-out ${animate ? '-translate-y-20 opacity-20' : 'translate-y-0 opacity-100'}`}>
        <div className="flex flex-col gap-0 items-center font-dosis">
          <h1 className={`text-8xl font-thin text-text tracking-wide transition-all`}>
            Nikita Carelov
          </h1>
          <p className="text-2xl text-text opacity-50 font-thin italic">Mechanical Engineer | 3D Artist | Developer</p>
        </div>
      </div>

      {/* Conditionally Render Scrollable Row */}
      <div className={`relative w-full overflow-hidden transition-all duration-700 ${showHome ? 'h-0 opacity-0' : 'h-auto opacity-100'}`}>
        {!showHome && (
          <div ref={scrollContainerRef} className="overflow-x-auto whitespace-nowrap flex transition-opacity duration-1000 mt-20 no-scrollbar px-20">
            <div ref={homeRef} className="inline-block w-full flex-shrink-0">
              {/* Whitespace Section for Home */}
            </div>
            <div ref={portfolioRef} className="inline-block w-full flex-shrink-0">
              <div className={`flex justify-center ${showButtons ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 mx-4`}>
                <button className="text-white hover:text-gray-800 font-bold py-4 px-8 text-lg transition-colors duration-300">
                  Robotics
                </button>
                <button className="text-white hover:text-gray-800 font-bold py-4 px-8 text-lg transition-colors duration-300">
                  Software
                </button>
                <button className="text-white hover:text-gray-800 font-bold py-4 px-8 text-lg transition-colors duration-300">
                  3D Art
                </button>
                <button className="text-white hover:text-gray-800 font-bold py-4 px-8 text-lg transition-colors duration-300">
                  AI
                </button>
              </div>
            </div>
            <div ref={aboutRef} className="inline-block w-full flex-shrink-0">
              <div className={`flex justify-center ${showAbout ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 mx-4`}>
                <p className="text-lg text-text font-medium whitespace-pre-line">
                  I am a Mechanical Engineer with a passion for 3D Art and Software Development...<br />
                  Here is another line.<br />
                  And another line.
                </p>
              </div>
            </div>
            <div ref={contactRef} className="inline-block w-full flex-shrink-0">
              <div className={`flex justify-center ${showContact ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 mx-4`}>
                <p className="text-lg text-text font-medium">
                  Feel free to reach out to me via email at contact@example.com.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
