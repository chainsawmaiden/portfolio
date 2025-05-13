import Link from "next/link";
import { getProjectsByType } from "@/sanity/lib/projects";

//debug
//import Image from "next/image";
//import Test from "../../public/images/test-image-2.png"
//import TestHover from "../../public/images/test-image-3.png"

// Custom Components
import ProjectCard from "@/components/ProjectCard";
import ProjectsList from "@/components/ProjectsList";
import HomeAnimation from "@/components/HomeAnimation";
import Noise from "@/components/Noise";

import LoadingOverlay from "@/components/LoadingOverlay";

export default async function Home() {
  // Fetch projects from Sanity
  const productProjects = await getProjectsByType('product');
  const craftProjects = await getProjectsByType('craft');
  
  // Show grid overlay for debugging (set to false in production)
  const showGridOverlay = false;
  
  return (
    <main className="page">
      {/* Client-side animation logic */}
      <LoadingOverlay />
      <Noise />
      <HomeAnimation />
      
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
        <section id="intro-section" className="intro-section">
          <div className="intro-content">
            <div className="intro-header">
              <h1>❀ Aditya Das is a multidisciplinary designer and engineer who builds interfaces, websites, brand identities, and more. He is dreaming of a world filled with delight and magic, where all things are created with love.</h1>
              
              <h1>Currently leading design at Biography. Previously at Sony and Volta. Studying Art and Math at Yale.</h1>
            </div>

            <div className="intro-list-container">
              <ProjectsList 
                title="Product"
                projects={productProjects}
                type="product"
              />

              <ProjectsList 
                title="Craft"
                projects={craftProjects}
                type="craft"
              />
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
            {productProjects.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>

        <section className="projects-section">
          <div className="projects-section-header">
            <h2 className="projects-section-header-left">02</h2>
            <h2 className="projects-section-header-center">Craft</h2>
            <h2 className="projects-section-header-right">❁</h2>
          </div>
          
          <div className="project-grid three-columns">
            {craftProjects.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}