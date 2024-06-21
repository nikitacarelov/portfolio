'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './robotics.css';
import Header from '../components/Header'; // Adjust the path as necessary

const RoboticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(false); // Set loading to false after initial load
  }, []);

  const handleNavigation = (url) => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(url);
    }, 500); // Match this duration with the CSS transition duration
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className={`content-container ${isTransitioning ? 'fade-out' : ''}`}>
        {loading
        }
        {!loading && (
          <div>
          <h1 className={`text-5xl sm:text-7xl md:text-8xl font-thin text-text tracking-wide transition-all duration-[300ms] ease-in-out`}>
          Nikita Carelov
        </h1>
          <div className="inline-block w-full flex-shrink-0 flex-wrap mx-4">
            <div className={`flex justify-center transition-opacity duration-[1000ms]`}>
              <p className="text-lg text-wrap font-medium whitespace-pre-line max-w-fit">
                I am a Mechanical Engineer with a passion for 3D Art and Software Development...<br />
                Here is another line.<br />
                And another line.
              </p>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoboticsPage;
