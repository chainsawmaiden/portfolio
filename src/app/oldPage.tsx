"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import Test from "../../public/images/test-image-2.png"
import TestHover from "../../public/images/test-image-3.png"

export default function Home() {
  // Add grid overlay (visible in your design)
  const showGridOverlay = false;
  
  // Refs for scroll animation
  const introSectionRef = useRef<HTMLElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  
  // Set up scroll effect
  useEffect(() => {
    // Function to handle scroll
    const handleScroll = () => {
      if (introSectionRef.current) {
        const scrollY = window.scrollY;
        const fadeStartAt = 1; // Start fading out at 1px of scroll
        const fadeEndAt = 450; // Completely faded out by 350px of scroll
        
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
    };
  }, []);

  return (
    <main className="page">

      {/* NOISE SVG OVERLAY */}
      <div className="noise-overlay">
        <svg id="noise" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise-filter">
            <feTurbulence type="fractalNoise" baseFrequency=".4" numOctaves="3" stitchTiles="stitch"></feTurbulence>
            <feColorMatrix type="saturate" values="0"></feColorMatrix>
            <feComponentTransfer>
              <feFuncR type="linear" slope="0.5" intercept="0.5"></feFuncR>
              <feFuncG type="linear" slope="0.5" intercept="0.5"></feFuncG>
              <feFuncB type="linear" slope="0.5" intercept="0.5"></feFuncB>
              <feFuncA type="linear" slope="1"></feFuncA>
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
        </svg>
      </div>

      {/* Grid overlay - debug */}
      {showGridOverlay && (
        <div className="grid-overlay">
          {Array(12).fill(0).map((_, i) => (
            <div key={i} className="grid-line"></div>
          ))}
        </div>
      )}

      {/* NAVBAR */}
      <nav>
        
        <Link href="/" className="nav-link">Home</Link>
        <Link href="/product" className="nav-link">Product</Link>
        <Link href="/craft" className="nav-link">Craft</Link>
        <Link href="/about" className="nav-link">About</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
      </nav>

      {/* HERO CONTENT */}
      <div className="hero">

        {/* INTRODUCTION */}
        <section ref={introSectionRef} className="intro-section">
          <div className="intro-content">
            <div className="intro-header">
              <h1>❀ Aditya Das is a multidisciplinary designer and engineer who builds interfaces, websites, brand identities, and more. He is dreaming of a world filled with delight and magic, where all things are created with love.</h1>
              
              <h1>Currently leading design at Biography. Previously at Sony and Volta. Studying Art and Math at Yale.</h1>
            </div>

            <div className="intro-list-container">
              <div className="stacked intro-list-stacked">
                <h3>Product ✿</h3>
                <div className="stacked intro-list-items">
                  <Link href="/">Biography</Link>
                  <Link href="/">Volta</Link>
                  <Link href="/">Spotify Redesign</Link>
                  <Link href="/">Cimu</Link>
                </div>
              </div>

              <div className="stacked intro-list-stacked">
                <h3>Craft ❁</h3>
                <div className="stacked intro-list-items">
                  <Link href="/">Alice Longyu Gao</Link>
                  <Link href="/">etc</Link>
                  <Link href="/">etc</Link>
                  <Link href="/">etc</Link>
                  <Link href="/">etc</Link>
                  <Link href="/">etc</Link>
                  <Link href="/">etc</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section ref={projectsSectionRef} className="projects-section">
          <div className="projects-section-header">
            <h2 className="projects-section-header-left">01</h2>
            <h2 className="projects-section-header-center">Product</h2>
            <h2 className="projects-section-header-right">✿</h2>
          </div>
          
          <div className="project-grid">
            <Link className="project-card" href="/">
              <div className="project-image-container">
                <Image className="project-image" src={Test} alt="Project Image" />
                <Image className="project-image project-image-hover" src={TestHover} alt="Project Image Hover" />
              </div>
              <div className="project-info">
                <div className="project-title-flex">
                  <p className="project-title">Volta, Internship</p>
                  <p>400K+ User Growth</p>
                </div>
                <p>Product Design, Identity</p>
              </div>
            </Link>
            <Link className="project-card" href="/">
              <div className="project-image-container">
                <Image className="project-image" src={Test} alt="Project Image" />
                <Image className="project-image project-image-hover" src={TestHover} alt="Project Image Hover" />
              </div>
              <div className="project-info">
                <div className="project-title-flex">
                  <p className="project-title">Volta, Internship</p>
                  <p>400K+ User Growth</p>
                </div>
                <p>Product Design, Identity</p>
              </div>
            </Link>
            <Link className="project-card" href="/">
              <div className="project-image-container">
                <Image className="project-image" src={Test} alt="Project Image" />
                <Image className="project-image project-image-hover" src={TestHover} alt="Project Image Hover" />
              </div>
              <div className="project-info">
                <div className="project-title-flex">
                  <p className="project-title">Volta, Internship</p>
                  <p>400K+ User Growth</p>
                </div>
                <p>Product Design, Identity</p>
              </div>
            </Link>
            <Link className="project-card" href="/">
              <div className="project-image-container">
                <Image className="project-image" src={Test} alt="Project Image" />
                <Image className="project-image project-image-hover" src={TestHover} alt="Project Image Hover" />
              </div>
              <div className="project-info">
                <div className="project-title-flex">
                  <p className="project-title">Volta, Internship</p>
                  <p>400K+ User Growth</p>
                </div>
                <p>Product Design, Identity</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}