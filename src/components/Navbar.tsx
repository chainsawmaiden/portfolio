'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const isActive = (path: string) => {
    if (pathname !== '/') {
      return pathname.startsWith(path);
    } else {
      if (path === '/') return activeSection === 'home';
      if (path === '#work') return activeSection === 'work';
      return false;
    }
  };

  useEffect(() => {
    if (pathname === '/') {
      setActiveSection('home');
    }
  }, [pathname]);

  const handleSectionChange = (section: string) => {
    if (section !== activeSection) {
      setIsTransitioning(true);
      
      // Small delay to create smooth transition effect
      setTimeout(() => {
        setActiveSection(section);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleSectionChange('work');
    
    // Smooth scroll to work section
    const workSection = document.querySelector('#work') || document.querySelector('.projects-section');
    if (workSection) {
      workSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleHomeClick = () => {
    handleSectionChange('home');
    
    // Smooth scroll to top
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return (
    <nav className={isTransitioning ? 'transitioning' : ''}>
      <Link 
        href="/" 
        className={`nav-link ${isActive('/') ? 'active' : ''}`}
        onClick={handleHomeClick}
      >
        Home
      </Link>
      <a 
        href="#work" 
        className={`nav-link ${isActive('#work') ? 'active' : ''}`}
        onClick={handleWorkClick}
      >
        Work
      </a>
      <Link 
        href="/about" 
        className={`nav-link ${isActive('/about') ? 'active' : ''}`}
      >
        About
      </Link>
      <Link 
        href="/contact" 
        className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
      >
        Contact
      </Link>
    </nav>
  );
}