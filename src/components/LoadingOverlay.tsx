'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './LoadingOverlay.module.css';
import Image from 'next/image';

export default function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // For fade-in effect
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // To track which image is currently displayed
  const imagesRef = useRef<string[]>(['/images/loading-1.svg', '/images/loading-2.svg']);
  const minDurationRef = useRef<number>(250); // Minimum 0.25 seconds display time
  const startTimeRef = useRef<number>(Date.now());
  const readyToHideRef = useRef<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fade in as soon as component mounts
  useEffect(() => {
    // Small delay before showing to ensure smooth fade-in
    setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    // Initially remove the content-visible class
    document.body.classList.remove('content-visible');

    // Start the image alternation interval
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex(prev => (prev === 0 ? 1 : 0));
    }, 150); // Switch every 0.25 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Function to check if minimum time has elapsed and content is ready
  const checkCanHide = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTimeRef.current;
    
    // Only hide if both minimum time has passed AND content is ready
    if (elapsedTime >= minDurationRef.current && readyToHideRef.current) {
      // Start the fade out process
      setIsFadingOut(true);
      
      // Clear the interval when fading out
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Remove the component after fade out completes
      setTimeout(() => {
        setIsLoading(false);
        
        // Add the content-visible class to body to trigger main content animations
        document.body.classList.add('content-visible');
      }, 500); // 0.5 second fade-out duration
    }
  };

  useEffect(() => {
    // Function to handle when page content is loaded
    const handleLoadComplete = () => {
      readyToHideRef.current = true;
      checkCanHide();
    };

    // Set up event listener for page load complete
    if (document.readyState === 'complete') {
      handleLoadComplete();
    } else {
      window.addEventListener('load', handleLoadComplete);
    }

    // Fallback timer (maximum loading time - set to 15s to be safe)
    const fallbackTimer = setTimeout(() => {
      readyToHideRef.current = true;
      checkCanHide();
    }, 15000); 

    // Set a regular interval to check if we can hide
    const checkInterval = setInterval(() => {
      checkCanHide();
    }, 100);

    return () => {
      window.removeEventListener('load', handleLoadComplete);
      clearTimeout(fallbackTimer);
      clearInterval(checkInterval);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // If not loading, don't render anything
  if (!isLoading) return null;

  return (
    <div className={`${styles.overlay} ${isFadingOut ? styles.fadeOut : ''}`}>
      <div className={`${styles.container} ${isVisible ? styles.fadeIn : ''}`}>
        <div className={styles.imageContainer}>
          <Image
            src={imagesRef.current[currentImageIndex]}
            alt="Loading"
            width={326}
            height={326}
            priority
          />
        </div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  );
}