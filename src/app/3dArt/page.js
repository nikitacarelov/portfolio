'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './3dart.css';
import Header from '../components/Header'; // Adjust the path as necessary
import FoggyMorning from './FoggyMorning.gif'
import LightPost from './LightPostTest.gif'
import Image from 'next/image'
import Knight from './Knight.gif'

const ArtPage = () => {
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
            <div class="flex justify-center gap-2 pt-10 py-10 mt-10">
              <h1 className={`content-center text-center text-nowrap font-dosis text-5xl sm:text-7xl md:text-8xl font-thin text-text tracking-wide transition-all duration-[300ms] ease-in-out`}>
                3D Art
              </h1>

            </div>


            <div className="inline-block w-full flex-shrink-0 flex-wrap">
              <div class="flex gap-2 ">
                <h1 className={`content-center  text-nowrap font-dosis text-3xl sm:text-5xl md:text-6xl font-thin text-text tracking-wide transition-all duration-[300ms] ease-in-out`}>
                  1. Light Post Test              </h1>
                  <h1 className={`text-center font-dosis text-4xl sm:text-5xl md:text-6xl font-thin text-text tracking-wide transition-all duration-[300ms] ease-in-out`}>
                  |
                </h1>
                <div className='flex content-center'>
                  <div className='font-dosis inline-block content-center text-tiny sm:text-xl md:text-2xl lg:text-2xl'>
                    Summer 2023 <br />
                    Tool Used: Blender 3D
                  </div>
                </div>
              </div>

              <div className={`flex justify-center transition-opacity duration-[1000ms]`}>
                <div className="flex justify-center">
                <Image
                    src={LightPost} // Adjust the path to your image
                    alt="Blender Render"
                    width={1000} // Set the width of the image
                    height={1000} // Set the height of the image
                    className="rounded-md" // Add any additional classes if necessary
                    unoptimized
                  />

                </div>
              </div>
              <div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit">
                When I first started learning to use Blender, I had some fun with light animation. I made a cartoony shader in the shader graph and played around with emissivity. The models are all simple shapes with various noise map modifiers.
              </div>

            </div>

            <div className="inline-block w-full flex-shrink-0 flex-wrap mt-10">
              <div class="flex gap-2 ">
              <h1 className={`content-center  text-nowrap font-dosis text-3xl sm:text-5xl md:text-6xl font-thin text-text tracking-wide transition-all duration-[300ms] ease-in-out`}>
                  2. Foggy Morning              </h1>
                  <h1 className={`text-center font-dosis text-4xl sm:text-5xl md:text-6xl font-thin text-text tracking-wide transition-all duration-[300ms] ease-in-out`}>
                  |
                </h1>
                <div className='flex content-center'>
                  <div className='font-dosis inline-block content-center text-tiny sm:text-xl md:text-2xl lg:text-2xl'>
                    Summer 2023 <br />
                    Tool Used: Blender 3D
                  </div>
                </div>
              </div>

              <div className={`flex justify-center transition-opacity duration-[1000ms]`}>
                <div className="flex justify-center">
                <Image
                    src={FoggyMorning} // Adjust the path to your image
                    alt="Blender Render"
                    width={1000} // Set the width of the image
                    height={1000} // Set the height of the image
                    className="rounded-md" // Add any additional classes if necessary
                    unoptimized
                  />
                </div>
              </div>
              <div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit">
                This was an experiment with volumetric scattering, noismap landscape generation, animating displacement maps, cloth simulation for the sail and animating the light color. This is supposed to look like a timelapse of a sinking viking ship.
              </div>

            </div>
            <div className="inline-block w-full flex-shrink-0 flex-wrap mt-10">
              <div class="flex gap-2 ">
              <h1 className={`content-center  text-nowrap font-dosis text-3xl sm:text-5xl md:text-6xl font-thin text-text tracking-wide transition-all duration-[300ms] ease-in-out`}>
                  3. Knight Model              </h1>
                  <h1 className={`text-center font-dosis text-4xl sm:text-5xl md:text-6xl font-thin text-text tracking-wide transition-all duration-[300ms] ease-in-out`}>
                  |
                </h1>
                <div className='flex content-center'>
                  <div className='font-dosis inline-block content-center text-tiny sm:text-xl md:text-2xl lg:text-2xl'>
                    Fall 2023 <br />
                    Tool Used: Blender 3D
                  </div>
                </div>
              </div>

              <div className={`flex justify-center transition-opacity duration-[1000ms]`}>
                <div className="flex justify-center">
                <Image
                    src={Knight} // Adjust the path to your image
                    alt="Blender Render"
                    width={1000} // Set the width of the image
                    height={1000} // Set the height of the image
                    className="rounded-md" // Add any additional classes if necessary
                    unoptimized
                  />
                </div>
              </div>
              <div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit pb-10">
                My first attempt at modeling clothes. Similar shading is used as with the light post, but I modeled and rigged a humanoid with emissive circles at the eyes. 
              </div>
            </div>


          </>
        )}
      </div>
    </div>
  );
};

export default ArtPage;
