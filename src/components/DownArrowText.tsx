'use client';

export default function DownArrowText() {
  const scrollToProjects = () => {
    document.querySelector('.projects-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div 
      className="down-arrow-text"
      onClick={scrollToProjects}
    >
      <p>Scroll to explore</p>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="down-arrow-svg"
      >
        <path 
          d="M7 10l5 5 5-5" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
} 