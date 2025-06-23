import Link from "next/link";
import { getProjectsByType } from "@/sanity/lib/projects";

//debug
import Image from "next/image";

// Custom Components
import ProjectCard from "@/components/ProjectCard";
import HomeAnimation from "@/components/HomeAnimation";
import SplineFlower from "@/components/SplineFlower"; // Add this importversion

import LoadingOverlay from "@/components/LoadingOverlay";
import Navbar from "@/components/Navbar";

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
      
      {/* Grid overlay - debug */}
      {showGridOverlay && (
        <div className="grid-overlay">
          {Array(12).fill(0).map((_, i) => (
            <div key={i} className="grid-line"></div>
          ))}
        </div>
      )}
      
      <Navbar />

      {/* HERO CONTENT */}
      <div className="hero">
        
        {/* INTRODUCTION */}
        <section id="intro-section" className="intro-section">
          
          <div className="intro-content">

            <div className="intro-header">
              <h2 className="h1-subtitle">Aditya Das</h2>
              <h1 className="h1-title">A designer dreaming towards a world of <br />love, magic, and empathy.</h1>
            </div>

            <SplineFlower />
          </div>
        </section>

        {/* PROJECTS */}
        <section className="projects-section">
          
          <div className="project-grid">
            {productProjects.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}