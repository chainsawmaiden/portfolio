'use client';

import { useEffect, useRef, useState } from 'react';

export default function SplineFlower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const largeCanvasRef = useRef<HTMLCanvasElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log('SplineFlower component mounted');
    
    const loadSpline = async () => {
      try {
        // Import Spline dynamically
        const { Application } = await import('@splinetool/runtime');
        
        // Load small flower
        if (canvasRef.current) {
          const app = new Application(canvasRef.current);
          await app.load('https://prod.spline.design/5P9TkCNByo4MlMcm/scene.splinecode');
          console.log('Small Spline loaded with runtime');
        }

        // Load large flower
        if (largeCanvasRef.current) {
          const largeApp = new Application(largeCanvasRef.current);
          await largeApp.load('https://prod.spline.design/OrvuNhouArzgjFLG/scene.splinecode');
          console.log('Large Spline loaded with runtime');
        }
      } catch (error) {
        console.error('Error loading Spline:', error);
        setHasError(true);
      }
    };

    loadSpline();
  }, []);

  return (
    <>
      {/* Small flower container */}
      <div 
        className="flower-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="spline-flower-container">
          {hasError ? (
            <div style={{ fontSize: '10px', color: 'blue' }}>[flower]</div>
          ) : (
            <canvas 
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
              }}
            />
          )}
        </div>
      </div>

      {/* Large flower container - shown on hover */}
      <div 
        className={`flower-container-large ${isHovered && "flower-container-large-show"}`}
        style={{
          opacity: isHovered ? 0.5 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}
      >
        <div className="spline-flower-container-large">
          {!hasError && (
            <canvas 
              ref={largeCanvasRef}
              style={{
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}