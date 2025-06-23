'use client';

import { useEffect, useRef } from 'react';

export default function SplineFlowerAlt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log('SplineFlowerAlt component mounted');
    
    const loadSpline = async () => {
      try {
        const { Application } = await import('@splinetool/runtime');
        
        if (canvasRef.current) {
          const app = new Application(canvasRef.current);
          await app.load('https://prod.spline.design/E3BeEaHP4XLHK-Oz/scene.splinecode');
          console.log('Spline loaded with runtime');
        }
      } catch (error) {
        console.error('Error loading Spline:', error);
      }
    };

    loadSpline();
  }, []);

  return (
    <div className="flower-container">
      <div 
        className="spline-flower-container"
        style={{
          width: '800px',
          height: '600px',
          aspectRatio: '4/3',
          position: 'relative'
        }}
      >
        <canvas 
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block'
          }}
        />
      </div>
    </div>
  );
}