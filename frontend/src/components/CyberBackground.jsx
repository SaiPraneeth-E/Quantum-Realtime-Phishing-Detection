import React from 'react';

export default function CyberBackground({ variant = 'grid' }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030712]">
      {variant === 'grid' && (
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, #0891b2 1px, transparent 1px), linear-gradient(to bottom, #0891b2 1px, transparent 1px)`,
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }}
        />
      )}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/30 rounded-full blur-[120px] mix-blend-screen mix-blend-lighten pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[150px] mix-blend-screen mix-blend-lighten pointer-events-none" />
    </div>
  );
}
