"use client";

import React from 'react';
import './test.css';
import Grid from '../components/Grid'; // Ensure the import is correct

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans-serif transition-all duration-700">
      <div className="background-layer"></div>
      <div className="main-container">
      <Grid />
        <h1 className="text-8xl font-medium text-black tracking-wide">
          Hello world
        </h1>
      </div>
    </main>
  );
}