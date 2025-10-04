'use client'

import { useEffect, useRef } from 'react'

export default function HomeFlower() {
  const viewerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Create and append the spline viewer
    const createViewer = async () => {
      // Dynamically import the Spline viewer
      await import('@splinetool/viewer')
      
      // Create the viewer element
      const viewer = document.createElement('spline-viewer')
      viewer.setAttribute('url', 'https://prod.spline.design/yVGRCwkstbPpZofU/scene.splinecode')
      
      if (viewerRef.current) {
        viewerRef.current.innerHTML = ''
        viewerRef.current.appendChild(viewer)
      }
    }

    createViewer()
  }, [])

  return (
    <div 
      ref={viewerRef}
      className="w-full h-screen overflow-hidden pointer-events-none"
      style={{ width: '100%', height: '100vh' }}
    />
  )
}