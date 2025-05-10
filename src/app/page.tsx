"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Test from "../../public/images/test-image-2.png"

export default function Home() {
  // Add grid overlay (visible in your design)
  const showGridOverlay = false;

  return (
    <main className="page">

      {/* NOISE SVG OVERLAY */}
      <div className="noise-overlay">
        <svg id="noise" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise-filter">
            <feTurbulence type="fractalNoise" baseFrequency=".4" numOctaves="3" stitchTiles="stitch"></feTurbulence>
            <feColorMatrix type="saturate" values="0"></feColorMatrix>
            <feComponentTransfer>
              <feFuncR type="linear" slope="0.5"></feFuncR>
              <feFuncG type="linear" slope="0.5"></feFuncG>
              <feFuncB type="linear" slope="0.5"></feFuncB>
              <feFuncA type="linear" slope="1"></feFuncA>
            </feComponentTransfer>
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.75" intercept="-0.38"/>
              <feFuncG type="linear" slope="1.75" intercept="-0.38"/>
              <feFuncB type="linear" slope="1.75" intercept="-0.38"/>
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
        <section className="intro-section">
          <div className="intro-content">
            <div className="intro-header">
              <h1>Aditya Das is a multidisciplinary designer and engineer who builds interfaces, websites, brand identities, and more. He is  dreaming of a world filled with delight and magic, where all things are created with love. ❀</h1>
              
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
        <section className="projects-section">
          <div className="projects-section-header">
            <h2 className="projects-section-header-left">01</h2>
            <h2 className="projects-section-header-center">Product</h2>
            <h2 className="projects-section-header-right">✿</h2>
          </div>
          
          <div className="project-grid">
            <Link className="project-card" href="/">
              <Image className="project-image" src={Test} alt="Test">
              </Image>
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