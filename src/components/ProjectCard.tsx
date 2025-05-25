'use client';

import Link from "next/link";
import NextImage from "next/image"; // Renamed to avoid conflict
import { Project } from "@/sanity/lib/projects";
import SelfHostedVideo from "./SelfHostedVideo";
import { useState, useRef, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";

// Must match project card type from sanity/lib/projects.ts
interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    listTitle: string;
    slug: { current: string };
    projectType: 'product' | 'craft';
    skills: string;
    additionalInfo?: string;
    mainImage?: any;
    hoverImage?: any;
    mainMedia?: {
      mediaType: 'image' | 'video' | 'youtube';
      image?: any;
      videoUrl?: string;
      videoPoster?: any;
    };
    hoverMedia?: {
      mediaType: 'image' | 'video' | 'youtube';
      image?: any;
      videoUrl?: string;
      videoPoster?: any;
    };
    order: number;
    mainImageUrl?: string;
    hoverImageUrl?: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(16/9); // Default aspect ratio
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Get main media
  const mainImage = project.mainImage ? urlFor(project.mainImage).url() : null;
  const mainMedia = project.mainMedia || null;
  
  // Get hover media
  const hoverImage = project.hoverImage ? urlFor(project.hoverImage).url() : null;
  const hoverMedia = project.hoverMedia || null;
  
  // Update container height based on media aspect ratio
  useEffect(() => {
    // Only run this if we're client-side
    if (typeof window === 'undefined') return;
    
    const updateAspectRatio = () => {
      // Check if we have a video first
      if (mainMedia && mainMedia.mediaType === 'video' && mainMedia.videoUrl) {
        // For videos, we need to create a temp video element to get dimensions
        const video = document.createElement('video');
        video.style.display = 'none'; // Hide it
        
        // When metadata is loaded, we can get the dimensions
        video.onloadedmetadata = () => {
          const ratio = video.videoWidth / video.videoHeight;
          if (ratio > 0) { // Make sure we got valid dimensions
            setAspectRatio(ratio);
            
            // Apply aspect ratio to container
            if (containerRef.current) {
              containerRef.current.style.paddingBottom = `${(1/ratio) * 100}%`;
            }
          }
          
          // Clean up
          document.body.removeChild(video);
        };
        
        // Handle load error
        video.onerror = () => {
          console.error("Error loading video for aspect ratio calculation");
          document.body.removeChild(video);
          fallbackToImage(); // Try using image instead
        };
        
        // Add to DOM temporarily and start loading
        document.body.appendChild(video);
        video.src = mainMedia.videoUrl;
        
      } else {
        fallbackToImage();
      }
    };
    
    const fallbackToImage = () => {
      // Fallback to using image for aspect ratio
      let imageUrl: string | null = null;
      
      // Determine which image to use for aspect ratio calculation
      if (mainMedia && mainMedia.mediaType === 'image' && mainMedia.image) {
        imageUrl = urlFor(mainMedia.image).url();
      } else if (mainImage) {
        imageUrl = mainImage;
      }
      
      if (imageUrl) {
        // Create a temporary image to get natural dimensions
        const imgElement = new window.Image(); // Use window.Image to avoid conflict
        imgElement.onload = () => {
          const ratio = imgElement.width / imgElement.height;
          if (ratio > 0) { // Make sure we got valid dimensions
            setAspectRatio(ratio);
            
            // Apply aspect ratio to container
            if (containerRef.current) {
              containerRef.current.style.paddingBottom = `${(1/ratio) * 100}%`;
            }
          }
        };
        imgElement.src = imageUrl;
      }
    };
    
    updateAspectRatio();
  }, [mainImage, mainMedia]);
  
  
  // Handle media rendering depending on type
  const renderMedia = (media: any, isMain: boolean) => {
    try {
      if (!media) {
        // Fallback to legacy image fields
        const imageUrl = isMain ? mainImage : hoverImage;
        if (imageUrl) {
          return (
            <NextImage 
              className={`project-image ${!isMain ? 'project-image-hover' : ''}`}
              src={imageUrl}
              alt={isMain ? project.title : `${project.title} hover`}
              fill={true}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={isMain}
              style={{ objectFit: 'cover' }}
            />
          );
        }
        return null;
      }
      
      // Handle media types
      if (media.mediaType === 'image' && media.image) {
        try {
          const imageUrl = urlFor(media.image).url();
          return (
            <NextImage 
              className={`project-image ${!isMain ? 'project-image-hover' : ''}`}
              src={imageUrl}
              alt={isMain ? project.title : `${project.title} hover`}
              fill={true}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={isMain}
              style={{ objectFit: 'cover' }}
            />
          );
        } catch (error) {
          console.error("Error rendering image:", error);
          return null;
        }
      } else if (media.mediaType === 'video' && media.videoUrl) {
        // Get poster image if available
        const posterUrl = media.videoPoster ? urlFor(media.videoPoster).url() : undefined;
        
        return (
          <div 
            className={`project-video ${!isMain ? 'project-video-hover' : ''}`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <SelfHostedVideo
              src={media.videoUrl}
              posterImage={posterUrl}
              className={`project-video-player ${!isMain ? 'project-video-player-hover' : ''}`}
            />
          </div>
        );
      }
    } catch (error) {
      console.error("Error in renderMedia:", error);
    }
    
    return null;
  };

  return (
    <Link 
      className="project-card" 
      href={`/${project.slug?.current || '#'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div 
        ref={containerRef}
        className="project-image-container"
        style={{ 
          position: 'relative',
          width: '100%', 
          paddingBottom: `${(1/aspectRatio) * 100}%`, // Set height based on aspect ratio
          overflow: 'hidden',
        }}
      >
        {/* Main media */}
        {renderMedia(mainMedia, true)}
        
        {/* Hover media */}
        {renderMedia(hoverMedia, false)}
      </div>
      <div className="project-info">
        <div className="project-title-flex">
          <p className="project-title">{project.title || 'Untitled'}</p>
          {project.additionalInfo && (
            <p>{project.additionalInfo}</p>
          )}
        </div>
        <p>{project.skills || ''}</p>
      </div>
    </Link>
  );
}