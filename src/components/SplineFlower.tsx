import Spline from '@splinetool/react-spline/next';

export default function SplineFlower() {
  return (
    <div className="spline-flower-container">
      <Spline 
        className='spline-flower'
        scene="https://prod.spline.design/yVGRCwkstbPpZofU/scene.splinecode"
      />
      <div className="spline-flower-shadow"></div>
    </div>
  );
}