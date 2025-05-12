// src/sanity/lib/projects.ts
import { client } from './client'
import { urlFor } from './image'

// Define project type interface
export interface Project {
  _id: string
  title: string
  listTitle: string
  slug: { current: string }
  projectType: 'product' | 'craft'
  skills: string
  additionalInfo?: string
  // Legacy fields
  mainImage?: any
  hoverImage?: any
  // New media fields
  mainMedia?: {
    mediaType: 'image' | 'youtube'
    image?: any
    youtubeUrl?: string
    youtubeStart?: number
    youtubeEnd?: number
  }
  hoverMedia?: {
    mediaType: 'image' | 'youtube'
    image?: any
    youtubeUrl?: string
    youtubeStart?: number
    youtubeEnd?: number
  }
  order: number
  mainImageUrl?: string
  hoverImageUrl?: string
}

// Fetch all projects
export async function getAllProjects(): Promise<Project[]> {
  const projects = await client.fetch<Project[]>(`
    *[_type == "project"] | order(projectType asc, order asc) {
      _id,
      title,
      listTitle,
      slug,
      projectType,
      skills,
      additionalInfo,
      mainImage,
      hoverImage,
      mainMedia,
      hoverMedia,
      order
    }
  `)
  
  // Process URLs for legacy images (if present)
  return projects.map(project => {
    const enhancedProject = { ...project };
    
    // Add image URLs for legacy fields if they exist
    if (project.mainImage) {
      enhancedProject.mainImageUrl = urlFor(project.mainImage).url();
    }
    if (project.hoverImage) {
      enhancedProject.hoverImageUrl = urlFor(project.hoverImage).url();
    }
    
    return enhancedProject;
  });
}

// Fetch projects by type (product or craft)
export async function getProjectsByType(type: 'product' | 'craft'): Promise<Project[]> {
  const projects = await client.fetch<Project[]>(`
    *[_type == "project" && projectType == $type] | order(order asc) {
      _id,
      title,
      listTitle,
      slug,
      projectType,
      skills,
      additionalInfo,
      mainImage,
      hoverImage,
      mainMedia,
      hoverMedia,
      order
    }
  `, { type })
  
  // Process URLs for legacy images (if present)
  return projects.map(project => {
    const enhancedProject = { ...project };
    
    // Add image URLs for legacy fields if they exist
    if (project.mainImage) {
      enhancedProject.mainImageUrl = urlFor(project.mainImage).url();
    }
    if (project.hoverImage) {
      enhancedProject.hoverImageUrl = urlFor(project.hoverImage).url();
    }
    
    return enhancedProject;
  });
}

// Fetch a single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await client.fetch<Project[]>(`
    *[_type == "project" && slug.current == $slug] {
      _id,
      title,
      listTitle,
      slug,
      projectType,
      skills,
      additionalInfo,
      mainImage,
      hoverImage,
      mainMedia,
      hoverMedia,
      order
    }
  `, { slug })
  
  if (projects.length === 0) {
    return null
  }
  
  const project = projects[0];
  const enhancedProject = { ...project };
  
  // Add image URLs for legacy fields if they exist
  if (project.mainImage) {
    enhancedProject.mainImageUrl = urlFor(project.mainImage).url();
  }
  if (project.hoverImage) {
    enhancedProject.hoverImageUrl = urlFor(project.hoverImage).url();
  }
  
  return enhancedProject;
}