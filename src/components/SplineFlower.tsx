'use client';

import { useEffect, useRef, useState } from 'react';

export default function SplineFlowerAlt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  //const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log('SplineFlowerAlt component mounted');
    
    const loadSpline = async () => {
      try {
        // Import Spline dynamically
        const { Application } = await import('@splinetool/runtime');
        
        if (canvasRef.current) {
          const app = new Application(canvasRef.current);
          await app.load('https://prod.spline.design/E3BeEaHP4XLHK-Oz/scene.splinecode');
          console.log('Spline loaded with runtime');
          //setIsLoaded(true);
        }
      } catch (error) {
        console.error('Error loading Spline:', error);
        setHasError(true);
      }
    };

    loadSpline();
  }, []);

  return (
    
    <div className="flower-container">
    <div 
      className="spline-flower-container"
    >
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
      <div style={{ 
        position: 'absolute', 
        bottom: '-20px', 
        fontSize: '8px', 
        color: 'green',
        whiteSpace: 'nowrap'
      }}>
        {/*isLoaded ? 'Runtime Loaded' : 'Runtime Loading...'*/}
      </div>
    </div>
    </div>
  );
}