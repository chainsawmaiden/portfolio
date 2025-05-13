'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './LoadingOverlay.module.css';

export default function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // For fade-in effect
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const minDurationRef = useRef<number>(1000); // Minimum 0.75 seconds display time
  const startTimeRef = useRef<number>(Date.now());
  const readyToHideRef = useRef<boolean>(false);

  // Fade in as soon as component mounts
  useEffect(() => {
    // Small delay before showing to ensure smooth fade-in
    setTimeout(() => {
      setIsVisible(true);
    }, 50);
  }, []);

  // Function to check if minimum time has elapsed and content is ready
  const checkCanHide = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTimeRef.current;
    
    // Only hide if both minimum time has passed AND content is ready
    if (elapsedTime >= minDurationRef.current && readyToHideRef.current) {
      // Start the fade out process
      setIsFadingOut(true);
      
      // Remove the component after fade out completes
      setTimeout(() => {
        setIsLoading(false);
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

    // Check if video exists
    const checkVideo = () => {
      const videoElement = document.createElement('video');
      videoElement.src = '/videos/rendering.mp4';
      videoElement.onloadeddata = () => {
        // Video exists, no error
      };
      videoElement.onerror = () => {
        console.error('Loading video not found at /videos/rendering.mp4');
        setVideoError(true);
      };
    };
    
    checkVideo();

    return () => {
      window.removeEventListener('load', handleLoadComplete);
      clearTimeout(fallbackTimer);
      clearInterval(checkInterval);
    };
  }, []);

  // If not loading, don't render anything
  if (!isLoading) return null;

  return (
    <div className={`${styles.overlay} ${isFadingOut ? styles.fadeOut : ''}`}>
      <div className={`${styles.videoContainer} ${isVisible ? styles.fadeIn : ''}`}>
        {!videoError ? (
          <video
            ref={videoRef}
            className={styles.loadingVideo}
            src="/videos/rendering.mp4"
            autoPlay
            loop={true}
            muted
            playsInline
            onLoadedData={(e) => {
              // When video metadata is loaded, update the minimum duration if needed
              if (videoRef.current && videoRef.current.duration) {
                // Use minimum of 0.75 seconds, but respect actual video length if longer
                const videoDuration = Math.max(videoRef.current.duration * 1000, 750);
                minDurationRef.current = videoDuration;
              }
            }}
            onEnded={() => {
              // When video ends naturally, mark as ready to hide
              readyToHideRef.current = true;
              checkCanHide();
            }}
          />
        ) : (
          <div className={styles.fallbackLoader}>
            <div className={styles.spinner}></div>
          </div>
        )}
      </div>
    </div>
  );
}