'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);

  const isActive = (path: string) => {
    if (pathname !== '/') {
      return pathname.startsWith(path);
    } else {
      if (path === '/') return activeSection === 'home';
      if (path === '#work') return activeSection === 'work';
      return false;
    }
  };

  // Calculate and set CSS custom properties for positioning
  useEffect(() => {
    if (!navRef.current) return;

    const updatePositions = () => {
      const nav = navRef.current;
      if (!nav) return;

      const links = nav.querySelectorAll('.nav-link');
      let currentLeft = 2; // Starting position (accounting for nav padding)

      links.forEach((link, index) => {
        const linkElement = link as HTMLElement;
        const width = linkElement.offsetWidth;
        
        // Set CSS custom properties for each link's position and width
        const sections = ['home', 'work', 'about', 'contact'];
        const sectionName = sections[index];
        
        nav.style.setProperty(`--${sectionName}-left`, `${currentLeft}px`);
        nav.style.setProperty(`--${sectionName}-width`, `${width}px`);
        
        currentLeft += width;
      });
    };

    // Update positions after component mounts and when window resizes
    updatePositions();
    window.addEventListener('resize', updatePositions);

    return () => {
      window.removeEventListener('resize', updatePositions);
    };
  }, []);

  // Update nav classes based on active section
  useEffect(() => {
    if (!navRef.current) return;

    const nav = navRef.current;
    
    // Remove all active classes
    nav.classList.remove('active-home', 'active-work', 'active-about', 'active-contact');
    
    // Add the appropriate active class and has-active class
    if (pathname !== '/') {
      if (pathname.startsWith('/about')) {
        nav.classList.add('active-about', 'has-active');
      } else if (pathname.startsWith('/contact')) {
        nav.classList.add('active-contact', 'has-active');
      }
    } else {
      nav.classList.add(`active-${activeSection}`, 'has-active');
    }
  }, [activeSection, pathname]);

  useEffect(() => {
    if (pathname === '/') {
      setActiveSection('home');
    }
  }, [pathname]);

  const handleSectionChange = (section: string) => {
    if (section !== activeSection) {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setActiveSection(section);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleSectionChange('work');
    
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
    
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return (
    <nav ref={navRef} className={isTransitioning ? 'transitioning' : ''}>
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