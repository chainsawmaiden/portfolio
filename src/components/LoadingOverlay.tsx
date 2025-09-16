'use client';

import { useState, useEffect } from 'react';
import styles from './LoadingOverlay.module.css';
import Image from 'next/image';

export default function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    // Force scroll to top to prevent scroll jump
    window.scrollTo(0, 0);
    
    // Alternate between loading images every 200ms
    const imageInterval = setInterval(() => {
      setCurrentImage(prev => prev === 1 ? 2 : 1);
    }, 200);
    
    // Simple timeout - remove after 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('content-visible');
      window.scrollTo(0, 0); // Force scroll to top after loading
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(imageInterval);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.container} ${styles.fadeIn}`}>
        <div className={styles.imageContainer}>
          <Image
            src={`/images/loading-${currentImage}.svg`}
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