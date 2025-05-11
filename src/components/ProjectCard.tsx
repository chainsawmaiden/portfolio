import Link from "next/link";
import Image from "next/image";
import { Project } from "@/sanity/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link className="project-card" href={`/${project.slug.current}`}>
      <div className="project-image-container">
        {project.mainImageUrl && (
          <Image 
            className="project-image" 
            src={project.mainImageUrl} 
            alt={project.title} 
            width={600} 
            height={400} 
          />
        )}
        {project.hoverImageUrl && (
          <Image 
            className="project-image project-image-hover" 
            src={project.hoverImageUrl} 
            alt={`${project.title} hover`} 
            width={600} 
            height={400} 
          />
        )}
      </div>
      <div className="project-info">
        <div className="project-title-flex">
          <p className="project-title">{project.title}</p>
          {project.additionalInfo && (
            <p>{project.additionalInfo}</p>
          )}
        </div>
        <p>{project.skills}</p>
      </div>
    </Link>
  );
}