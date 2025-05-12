'use client';

import { useRef, useEffect } from 'react';

interface SelfHostedVideoProps {
  src: string;
  type?: string;
  className?: string;
  posterImage?: string;
}

export default function SelfHostedVideo({ 
  src, 
  type = 'video/mp4', 
  className = '',
  posterImage
}: SelfHostedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Make sure video is properly loaded and configured
    if (videoRef.current) {
      // Set up video attributes
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.autoplay = true;
      videoRef.current.loop = true;
      
      // Force play (helps on some browsers)
      const playPromise = videoRef.current.play();
      
      // Handle promise to avoid DOMException errors
      if (playPromise !== undefined) {
        playPromise
          .catch(() => {
            // Auto-play was prevented - try muted auto-play
            if (videoRef.current) {
              videoRef.current.muted = true;
              return videoRef.current.play();
            }
          })
          .catch(error => {
            console.error("Video play failed:", error);
          });
      }
    }
    
    // Cleanup
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
    };
  }, [src]);

  return (
    <div className="video-container" style={{ pointerEvents: 'none', width: '100%', height: '100%' }}>
      <video
        ref={videoRef}
        className={className}
        poster={posterImage}
        playsInline
        muted
        loop
        autoPlay
        disablePictureInPicture
        disableRemotePlayback
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src={src} type={type} />
      </video>
    </div>
  );
}