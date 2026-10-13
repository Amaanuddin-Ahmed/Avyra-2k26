import React from 'react';

interface DiamondStarProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const DiamondStar: React.FC<DiamondStarProps> = ({ 
  className = '', 
  size = 24,
  glow = true 
}) => {
  return (
    <span 
      className={`inline-flex items-center justify-center relative select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {glow && (
        <span 
          className="absolute inset-0 rounded-full bg-electric/40 blur-[6px] animate-pulse-slow" 
        />
      )}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_0_8px_rgba(142,191,255,0.8)]"
      >
        <path 
          d="M50 0 Q50 42 0 50 Q50 58 50 100 Q50 58 100 50 Q50 42 50 0 Z" 
          fill="url(#starGradient)" 
        />
        <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
        <defs>
          <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#E2EDFF" />
            <stop offset="75%" stopColor="#8EBFFF" />
            <stop offset="100%" stopColor="#286BFF" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
};
