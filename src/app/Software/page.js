'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './software.css';
import Header from '../components/Header'; // Adjust the path as necessary

const SoftwarePage = () => {
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
          <>
            <div className='font-dosis text-5xl h-screen flex items-center justify-center'>
              Coming Soon
              </div>
          </>
        )}
      </div>
    </div>
  );
};


export default SoftwarePage;
