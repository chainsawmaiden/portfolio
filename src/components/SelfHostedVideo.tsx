'use client';

import { useRef, useEffect, useState } from 'react';

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
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  
  useEffect(() => {
    // Make sure video is properly loaded and configured
    if (videoRef.current) {
      // Set up video attributes
      videoRef.current.muted = true;
      videoRef.current.playsInline = true;
      videoRef.current.autoplay = true;
      videoRef.current.loop = true;
      
      // Listen for metadata loaded to get the actual video dimensions
      videoRef.current.addEventListener('loadedmetadata', () => {
        if (videoRef.current) {
          const videoWidth = videoRef.current.videoWidth;
          const videoHeight = videoRef.current.videoHeight;
          
          if (videoWidth && videoHeight) {
            const ratio = videoWidth / videoHeight;
            setAspectRatio(ratio);
            console.log(`Video aspect ratio: ${ratio} (${videoWidth}x${videoHeight})`);
          }
        }
      });
      
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
    <div className="video-container">
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
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          borderRadius: '16px'
        }}
      >
        <source src={src} type={type} />
      </video>
    </div>
  );
}