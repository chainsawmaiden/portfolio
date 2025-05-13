'use client';

import { useEffect, useState, useRef } from 'react';

export default function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const MIN_LOADING_TIME = 1000; // Minimum 1 second display time

  useEffect(() => {
    // Setup video element
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.autoplay = true;
      videoRef.current.loop = true;
      
      const playPromise = videoRef.current.play();
      
      // Handle promise to avoid DOMException errors
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented - try muted auto-play
          if (videoRef.current) {
            videoRef.current.muted = true;
            return videoRef.current.play();
          }
        });
      }
    }

    // Function to hide loader
    const hideLoader = () => {
      const elapsedTime = Date.now() - startTimeRef.current;
      
      // Ensure the loader displays for at least MIN_LOADING_TIME
      if (elapsedTime >= MIN_LOADING_TIME) {
        if (loadingRef.current) {
          loadingRef.current.style.opacity = '0';
        }
        
        // Set a delay before completely removing the loader from the DOM
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // 500ms for the fade-out transition
      } else {
        // If minimum time hasn't elapsed, wait for the remainder
        const remainingTime = MIN_LOADING_TIME - elapsedTime;
        timerRef.current = setTimeout(() => {
          if (loadingRef.current) {
            loadingRef.current.style.opacity = '0';
          }
          
          // Set a delay before completely removing the loader from the DOM
          setTimeout(() => {
            setIsLoading(false);
          }, 500); // 500ms for the fade-out transition
        }, remainingTime);
      }
    };

    // Function to check if all assets have loaded
    const checkIfLoaded = () => {
      if (document.readyState === 'complete') {
        hideLoader();
      }
    };

    // Listen for load event
    window.addEventListener('load', hideLoader);
    
    // Also check immediately in case the page is already loaded
    checkIfLoaded();

    // Cleanup event listeners
    return () => {
      window.removeEventListener('load', hideLoader);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      ref={loadingRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--white-50)',
        zIndex: 9999, // Position above everything, including the noise layer
        transition: 'opacity 0.5s ease-out',
      }}
    >
      <video
        ref={videoRef}
        src="/videos/loading-2.mp4"
        width={256}
        height={256}
        muted
        autoPlay
        loop
        playsInline
        style={{
          width: '256px',
          height: '256px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
    </div>
  );
}