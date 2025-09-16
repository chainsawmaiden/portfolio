import Link from "next/link";
import { getProjectsByType } from "@/sanity/lib/projects";

//debug
import Image from "next/image";

// Custom Components
import ProjectCard from "@/components/ProjectCard";
import HomeAnimation from "@/components/HomeAnimation";
import SplineFlower from "@/components/SplineFlower";
import LoadingOverlay from "@/components/LoadingOverlay";
import Navbar from "@/components/Navbar";
import DownArrowText from "@/components/DownArrowText";
import GridOverlay from "@/components/GridOverlay";

export default async function Home() {
  // Run a simple Sanity query, but do not render results
  const productProjects = await getProjectsByType('product');
  // const craftProjects = await getProjectsByType('craft');
  
  return (
    <main className="page">
      <LoadingOverlay />
      <Navbar />

      {/* Grid overlay for development - set enabled={true} to show grid */}
      <GridOverlay enabled={false} />

      {/* HERO CONTENT */}
      <div className="hero">
        
        {/* INTRODUCTION */}
        <HomeAnimation />
        <section id="intro-section" className="intro-section">
          
          <div className="intro-content">

            <div className="intro-header-spline-container">
              <div className="intro-header">
                <h2 className="h1-subtitle">Aditya Das</h2>
                <h1 className="h1-title">A designer dreaming towards a world of <br />love, magic, and empathy.</h1>
              </div>

              <SplineFlower />
            </div>
            
            {/* Down Arrow Text */}
            <DownArrowText />
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