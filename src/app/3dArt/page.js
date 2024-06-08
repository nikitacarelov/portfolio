'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './3dart.css';
import Header from '../components/Header'; // Adjust the path as necessary

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
            {/* Add the rest of your page content here */}
          </>
        )}
      </div>
    </div>
  );
};

export default ArtPage;
