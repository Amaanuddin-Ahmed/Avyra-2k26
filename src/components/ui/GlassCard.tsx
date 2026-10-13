import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = false,
  hoverEffect = true,
  ...props
}) => {
  return (
    <div
      className={`
        relative rounded-2xl transition-all duration-300
        ${glow ? 'glass-panel-glow' : 'glass-panel'}
        ${hoverEffect ? 'hover:border-electric/50 hover:shadow-[0_0_30px_rgba(40,107,255,0.25)] hover:-translate-y-1' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Subtle top specular highlight reflection */}
      <div 
        className="pointer-events-none absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" 
        aria-hidden="true" 
      />
      {children}
    </div>
  );
};
