'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './luv.css';
import Header from '../components/Header'; // Adjust the path as necessary
import Image from 'next/image'
import Render11 from './Render11.png'
import Differential from './Differential.gif'
import Scissors from './Scissors.gif'
import Exploded from './ExplodedSus.png'
import UnderTheHood from './UnderTheHood.png'
2
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
    <div className="">
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
                <div className='font-dosis inline-block content-center text-xs sm:text-tiny md:text-base lg:text-lg'>
                  June 2024<br />

                  Tools Used: <br />
                  Solidworks,
                  Unreal Engine 5,
                  Datasmith
                </div>
              </div>
            </div>

            <div className="inline-block w-full flex-shrink-0 flex-wrap">
              <div className={`flex justify-center transition-opacity duration-[1000ms]`}>
                <div className="flex justify-center mt-10">
                  <Image
                    src={Render11} // Adjust the path to your image
                    alt="Unreal Engine 5 render"
                    width={1000} // Set the width of the image
                    height={1000} // Set the height of the image
                    className="rounded-md" // Add any additional classes if necessary
                  />
                </div>
              </div>
              <div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit">
                This project consisted of redesigning the CSA LUV concept.<br />
                Over two weeks, I reverse engineered, modeled in SolidWorks, and rendered the concept vehicle in Unreal Engine.<br />
                Everything was modeled by me with inspiration from the <a href="https://www.asc-csa.gc.ca/eng/astronomy/moon-exploration/canadian-utility-rover-on-the-moon.asp" className="text-gray-400 underline">public images of the LUV</a>.
              </div>

            </div>

            <h2 className="content-center text-center text-nowrap font-dosis text-3xl sm:text-4xl md:text-5xl font-thin text-text tracking-wide py-5">
              Differential Suspension
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center transition-opacity duration-[1000ms] flex-wrap">
              <div className="w-full md:w-1/2 flex justify-center p-4">
                <Image
                  src={Differential} // Adjust the path to your image
                  alt=""
                  layout="responsive"
                  width={1000}
                  height={1000}
                  className="rounded-md object-contain w-full h-auto" // Ensure the image scales correctly
                />
              </div>
              <div className="w-full md:w-1/2 flex justify-center items-center p-4">
                <div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit">
                  The suspension for this vehicle requires a differential, so I implemented a simple differential system hidden within the sheet metal frame of the vehicle.
                  Besides having few parts, this system requires no springs and can be more reliable and robust than a rocker bogie or a wishbone system.


                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center transition-opacity duration-[1000ms] flex-wrap">
              <div className="w-full md:w-1/2 flex justify-center items-center p-4">
                <div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit">
                  A sealed bearing and adequate gasketing/sealant must be applied at the flange intersections to prevent dust from entering the assembly.
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center p-4">
                <Image
                  src={Exploded} // Adjust the path to your image
                  alt=""
                  layout="responsive"
                  width={1000}
                  height={1000}
                  className="rounded-md object-contain w-full h-auto" // Ensure the image scales correctly
                />
              </div>
            </div>
            <h2 className="content-center text-center text-nowrap font-dosis text-3xl sm:text-4xl md:text-5xl font-thin text-text tracking-wide">
              Scissor Lift
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center transition-opacity duration-[1000ms] flex-wrap">
              <div className="w-full md:w-1/2 flex justify-center p-4">
                <Image
                  src={Scissors} // Adjust the path to your image
                  alt=""
                  layout="responsive"
                  width={1000}
                  height={1000}
                  className="rounded-md object-contain w-full h-auto" // Ensure the image scales correctly
                />
              </div>
              <div className="w-full md:w-1/2 flex justify-center items-center p-4">
                <div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit">
                  The scissor lift design includes two main lead screw actuators connected to the first link and two gripper actuators. In this design, all the actuators are located outside of the enclosure, so adequate dustproofing isrequired for these components.
                </div>
              </div>
            </div>
            
            <h2 className="content-center text-center text-nowrap font-dosis text-3xl sm:text-4xl md:text-5xl font-thin text-text tracking-wide py-5">
              Enclosure
            </h2>
            
            <div className="inline-block w-full flex-shrink-0 flex-wrap">
              <div className={`flex justify-center transition-opacity duration-[1000ms]`}>
                <div className="flex justify-center">
                  <Image
                    src={UnderTheHood} // Adjust the path to your image
                    alt="Unreal Engine 5 render"
                    width={1000} // Set the width of the image
                    height={1000} // Set the height of the image
                    className="rounded-md" // Add any additional classes if necessary
                  />
                </div>
              </div>
              <div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit">
                Like the suspension legs, the enclosure is made of sheet metal plates riveted together with corner brackets. Rivets are preferred to welding and bolting for crack resistance and long term reliability under temperature gradients.
              </div>

              <h2 className="content-center text-center text-nowrap font-dosis text-3xl sm:text-4xl md:text-5xl font-thin text-text tracking-wide py-5">
              Next Steps
            </h2>
            <div className="font-dosis text-xl text-wrap font-medium whitespace-pre-line max-w-fit">
              To come: full Unreal Engine blueprint implemnetation, control system and power system simulation within unreal engine.
              Fun simulator video game.
                            </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default LUVPage;
