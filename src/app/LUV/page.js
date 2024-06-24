'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './robotics.css';
import Header from '../components/Header'; // Adjust the path as necessary
import Image from 'next/image'
import Render11 from './Render11.png'

const LUVPage = () => {
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
    <div className="min-h-screen">
      <Header />
      <div className={`content-container ${isTransitioning ? 'fade-out' : ''}`}>
        {loading
        }
        {!loading && (
          <div>
            <div class="flex justify-center gap-2 pt-10 py-10">
              <h1 className={`content-center text-center text-nowrap font-dosis text-5xl sm:text-7xl md:text-8xl font-thin text-text tracking-wide transition-all duration-[300ms] ease-in-out`}>
                LUV redesign
              </h1>
              <h1 className={`text-center font-dosis text-8xl font-thin text-text tracking-wide transition-all duration-[300ms] ease-in-out`}>
                |
              </h1>
              <div className='flex content-center'>
                <div className='font-dosis inline-block content-center text-xl'>
                  June 2024<br />

                  Tools Used: <br />
                  Solidworks,
                  Unreal Engine 5,
                  Datasmith Plugin
                </div>
              </div>
            </div>

            <div className="inline-block w-full flex-shrink-0 flex-wrap mx-4">
              <div className={`flex justify-center transition-opacity duration-[1000ms]`}>
                <div className="flex justify-center mt-10">
                  <Image
                    src={Render11} // Adjust the path to your image
                    alt=""
                    width={1000} // Set the width of the image
                    height={1000} // Set the height of the image
                    className="rounded-md" // Add any additional classes if necessary
                  />
                </div>
              </div>
              <div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit">
                This project consisted of redesigning the CSA LUV concept.<br/>
                Over two weeks in the month of June, I analyzed, redesigned, modeled and rendered the vehicle in Unreal Engine.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LUVPage;
