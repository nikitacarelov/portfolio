'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './humanoid.css';
import Header from '../components/Header'; // Adjust the path as necessary
import Image from 'next/image'
import Humanoid from './Humanoid.png'


const HumanoidPage = () => {
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
            <div className={`flex justify-center transition-opacity duration-[1000ms] gap-2 pt-10 py-10 mt-20`}>
              <div className="flex justify-center">
                <Image
                  src={Humanoid} // Adjust the path to your image
                  alt="tmp image"
                  width={400} // Set the width of the image
                  height={400} // Set the height of the image
                  className="rounded-md" // Add any additional classes if necessary
                />
              </div>
            </div>
            <div className='font-dosis text-5xl h-screen flex justify-center'>
              Coming Soon
            </div>
            
          </>
        )}
      </div>
    </div>
  );
};

export default HumanoidPage;