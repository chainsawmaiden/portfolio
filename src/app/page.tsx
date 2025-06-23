import Link from "next/link";
import { getProjectsByType } from "@/sanity/lib/projects";

//debug
import Image from "next/image";
// Remove this line: import flower1 from "../../public/images/flower-3.svg";

// Custom Components
import ProjectCard from "@/components/ProjectCard";
import ProjectsList from "@/components/ProjectsList";
import HomeAnimation from "@/components/HomeAnimation";
import Noise from "@/components/Noise";
import SplineFlower from "@/components/SplineFlower"; // Add this importversion

import LoadingOverlay from "@/components/LoadingOverlay";
import Navbar from "@/components/Navbar";

export default async function Home() {
  // Fetch projects from Sanity
  const productProjects = await getProjectsByType('product');
  const craftProjects = await getProjectsByType('craft');
  
  // Show grid overlay for debugging (set to false in production)
  const showGridOverlay = true;
  
  return (
    <main className="page">
      {/* Client-side animation logic */}
      <LoadingOverlay />
      <HomeAnimation />
      
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
              <SplineFlower />
              
              <h1>Aditya Das is a multidisciplinary designer who specializes in making interfaces, websites, brand identities, and more. He is dreaming of a world filled with delight and magic, where all things are made with love.</h1>
              
              <h1>Currently leading design at Biography. Previously at Sony and Volta. Studying Art and Math at Yale.</h1>
            </div>

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