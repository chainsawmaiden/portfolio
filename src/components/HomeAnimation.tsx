'use client';

import { useEffect, useRef, useState } from "react";
import LoadingAnimation from "./LoadingAnimation";

export default function HomeAnimation() {
  const [pageLoaded, setPageLoaded] = useState(false);
  // Refs for scroll animation
  const introSectionRef = useRef<HTMLElement | null>(null);
  
  // Set up scroll effect
  useEffect(() => {
    // Get the intro section element
    introSectionRef.current = document.getElementById('intro-section') as HTMLElement;
    
    // Wait a bit to set page as loaded
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);
    
    // Function to handle scroll
    const handleScroll = () => {
      if (introSectionRef.current) {
        const scrollY = window.scrollY;
        const fadeStartAt = 1; // Start fading out at 1px of scroll
        const fadeEndAt = 450; // Completely faded out by 450px of scroll
        
        if (scrollY > fadeStartAt) {
          const opacity = Math.max(0, 1 - (scrollY - fadeStartAt) / (fadeEndAt - fadeStartAt));
          const blurValue = 4 * (1 - opacity); // Max 4px blur when opacity is 0

          const scroll = Math.max(0, scrollY - fadeStartAt);
          
          introSectionRef.current.style.opacity = opacity.toString();
          introSectionRef.current.style.filter = `blur(${blurValue}px)`;
          introSectionRef.current.style.transform = `translate(0px, -${scroll * .125}px)`;
          
          if (scrollY > fadeEndAt) {
            introSectionRef.current.classList.add('intro-fade-out');
          } else {
            introSectionRef.current.classList.remove('intro-fade-out');
          }
        } else {
          // Reset styles when back at top
          introSectionRef.current.style.opacity = '1';
          introSectionRef.current.style.filter = 'blur(0px)';
          introSectionRef.current.style.transform = `translate(0px, 0px)`;
          introSectionRef.current.classList.remove('intro-fade-out');
        }
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set correct state
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <LoadingAnimation />
    </>
  );
}