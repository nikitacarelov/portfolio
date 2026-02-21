'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './humanoid.css';
import Header from '../components/Header'; // Adjust the path as necessary
import Image from 'next/image'
import Humanoid from './Humanoid.png'
import Printed_Model from './Printed_Model.jpeg'
import Motor_controller_PCB_bottom from './Motor_controller_PCB_bottom.jpeg'
import Motor_controller_PCB_top from './Motor_controller_PCB_top.jpeg'



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
          {/* Title block */}
          <div className="flex justify-center gap-2 pt-10 py-10">
              <h1 className={`content-center text-nowrap text-center font-dosis text-5xl sm:text-6xl md:text-7xl font-thin text-text tracking-wide transition-all duration-[300ms] ease-in-out`}>
              Small Humanoid
            </h1>
              <h1 className={`text-center font-dosis text-8xl font-thin text-text tracking-wide transition-all duration-[300ms] ease-in-out`}>
              |
            </h1>
            <div className="flex content-center">
                <div className='font-dosis inline-block content-center text-xs sm:text-tiny md:text-base lg:text-lg'>
                2024 — Ongoing<br />
                Tools Used: EasyEDA, Python <br />
                SolidWorks, 3D Printing, Milling
              </div>
            </div>
          </div>

          {/* Hero render */}
          <div className="flex flex-col items-center gap-3 pt-6">
            <Image
              src={Humanoid}
              alt="Humanoid CAD render"
              width={450}
              height={450}
              className="rounded-md"
            />
            <p className="font-dosis text-sm text-center max-w-md">
              Early CAD concept of a compact humanoid robot focused on human-like proportions
              and joint placement for future dynamic locomotion experiments.
            </p>
          </div>

          {/* Printed prototype */}
          <div className="flex flex-col items-center gap-3 pt-16">
            <Image
              src={Printed_Model}
              alt="3D printed humanoid prototype"
              width={450}
              height={450}
              className="rounded-md"
            />
            <p className="font-dosis text-sm text-center max-w-md">
              First physical prototype produced with FDM 3D printing to validate geometry,
              assembly tolerances, and actuator packaging constraints.
            </p>
          </div>

          {/* Motor controller PCB top */}
          <div className="flex flex-col items-center gap-3 pt-16">
            <Image
              src={Motor_controller_PCB_top}
              alt="Motor controller PCB top view"
              width={450}
              height={450}
              className="rounded-md"
            />
            <p className="font-dosis text-sm text-center max-w-md">
              Custom motor controller PCB designed to drive multiple small actuators with
              closed-loop feedback for future limb control.
            </p>
          </div>

          {/* Motor controller PCB bottom */}
          <div className="flex flex-col items-center gap-3 pt-16">
            <Image
              src={Motor_controller_PCB_bottom}
              alt="Motor controller PCB bottom view"
              width={450}
              height={450}
              className="rounded-md"
            />
            <p className="font-dosis text-sm text-center max-w-md">
              Bottom layer routing showing power distribution and signal breakout for
              compact integration inside the torso assembly.
            </p>
          </div>

          {/* Coming soon */}
          <div className="font-dosis text-5xl h-screen flex justify-center items-center pt-20">
            Detailed write-up coming soon
          </div>
        </>
        )}
      </div>
    </div>
  );
};

export default HumanoidPage;