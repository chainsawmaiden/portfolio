'use client';

interface GridOverlayProps {
  enabled?: boolean;
}

export default function GridOverlay({ enabled = false }: GridOverlayProps) {
  if (!enabled) return null;

  return (
    <div className="grid-overlay">
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="grid-line"></div>
      ))}
    </div>
  );
} 