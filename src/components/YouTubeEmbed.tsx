'use client';

import { useEffect, useRef, useState } from 'react';

interface YouTubeEmbedProps {
  url: string;
  start?: number;
  end?: number;
  playing?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
}

// Function to extract YouTube video ID from URL
const extractYouTubeId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function YouTubeEmbed({ 
  url, 
  start = 0, 
  end, 
  playing = true,
  muted = true,
  controls = false,
  loop = true
}: YouTubeEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  
  useEffect(() => {
    // Extract video ID from URL
    const id = extractYouTubeId(url);
    setVideoId(id);
  }, [url]);

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  // Construct embed URL with parameters
  let embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1`;
  
  // Add parameters
  if (start) embedUrl += `&start=${start}`;
  if (end) embedUrl += `&end=${end}`;
  if (playing) embedUrl += '&autoplay=1';
  if (muted) embedUrl += '&mute=1';
  if (!controls) embedUrl += '&controls=0';
  if (loop) embedUrl += '&loop=1&playlist=' + videoId;
  
  // Add additional parameters for a cleaner look
  embedUrl += '&showinfo=0&rel=0&iv_load_policy=3';

  return (
    <div className="youtube-embed-container">
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}