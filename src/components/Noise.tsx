export default function Noise() {
  // NOISE OVERLAY
  return (
  <div className="noise-overlay">
    <svg id="noise" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <filter id="noise-filter">
        <feTurbulence type="fractalNoise" baseFrequency=".4" numOctaves="3" stitchTiles="stitch"></feTurbulence>
        <feColorMatrix type="saturate" values="0"></feColorMatrix>
        <feComponentTransfer>
          <feFuncR type="linear" slope="0.5" intercept="0.5"></feFuncR>
          <feFuncG type="linear" slope="0.5" intercept="0.5"></feFuncG>
          <feFuncB type="linear" slope="0.5" intercept="0.5"></feFuncB>
          <feFuncA type="linear" slope="1"></feFuncA>
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
    </svg>
  </div>)
}