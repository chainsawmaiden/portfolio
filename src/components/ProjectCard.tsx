"use client"

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/sanity/lib/projects";
import YouTubeEmbed from "./YouTubeEmbed";
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  // Get main media
  const mainImage = project.mainImage ? urlFor(project.mainImage).url() : null;
  const mainMedia = project.mainMedia || null;
  
  // Get hover media
  const hoverImage = project.hoverImage ? urlFor(project.hoverImage).url() : null;
  const hoverMedia = project.hoverMedia || null;
  
  // Handle media rendering depending on type
  const renderMedia = (media: any, isMain: boolean) => {
    if (!media) {
      // Fallback to legacy image fields
      const imageUrl = isMain ? mainImage : hoverImage;
      if (imageUrl) {
        return (
          <Image 
            className={`project-image ${!isMain ? 'project-image-hover' : ''}`}
            src={imageUrl}
            alt={isMain ? project.title : `${project.title} hover`}
            width={600}
            height={400}
            priority={isMain}
          />
        );
      }
      return null;
    }
    
    // Handle new media types
    if (media.mediaType === 'image' && media.image) {
      const imageUrl = urlFor(media.image).url();
      return (
        <Image 
          className={`project-image ${!isMain ? 'project-image-hover' : ''}`}
          src={imageUrl}
          alt={isMain ? project.title : `${project.title} hover`}
          width={600}
          height={400}
          priority={isMain}
        />
      );
    } else if (media.mediaType === 'youtube' && media.youtubeUrl) {
      return (
        <div className={`project-video ${!isMain ? 'project-video-hover' : ''}`}>
          <YouTubeEmbed
            url={media.youtubeUrl}
            start={media.youtubeStart || 0}
            end={media.youtubeEnd}
            playing={isMain || isHovering}
            muted={true}
            controls={false}
            loop={true}
          />
        </div>
      );
    }
    
    return null;
  };

  return (
    <Link 
      className="project-card" 
      href={`/${project.slug.current}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="project-image-container">
        {/* Main media */}
        {renderMedia(mainMedia, true)}
        
        {/* Hover media */}
        {renderMedia(hoverMedia, false)}
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