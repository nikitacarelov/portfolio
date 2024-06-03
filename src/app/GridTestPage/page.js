"use client";
import React, { useEffect } from 'react';
import { createNoise2D } from 'simplex-noise';


const NoiseTest = () => {
  useEffect(() => {
    const noise2D = createNoise2D();
    const noiseValue = noise2D(0, 1);


    console.log('Simplex noise value at (0, 0):', noiseValue);
  }, []);

  return <div>Check the console for simplex noise value</div>;
};

export default NoiseTest;
