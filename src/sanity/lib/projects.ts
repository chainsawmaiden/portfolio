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
  mainImage: any
  hoverImage: any
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
      order
    }
  `)
  
  // Add image URLs for easier consumption in React components
  return projects.map(project => ({
    ...project,
    mainImageUrl: urlFor(project.mainImage).url(),
    hoverImageUrl: urlFor(project.hoverImage).url()
  }))
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
      order
    }
  `, { type })
  
  // Add image URLs for easier consumption in React components
  return projects.map(project => ({
    ...project,
    mainImageUrl: urlFor(project.mainImage).url(),
    hoverImageUrl: urlFor(project.hoverImage).url()
  }))
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
      order,
      description
    }
  `, { slug })
  
  if (projects.length === 0) {
    return null
  }
  
  const project = projects[0]
  return {
    ...project,
    mainImageUrl: urlFor(project.mainImage).url(),
    hoverImageUrl: urlFor(project.hoverImage).url()
  }
}