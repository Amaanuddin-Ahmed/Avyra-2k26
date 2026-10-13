import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speedY: number;
  speedX: number;
  pulseSpeed: number;
  pulsePhase: number;
  colorType: 'blue' | 'ice' | 'white';
}

export const BackgroundAtmosphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Visibility change handler to save battery & GPU
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initialize particles (lightweight: 45-60 particles on desktop, 25 on mobile)
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 55;
    const particles: Particle[] = [];

    const colors = {
      blue: 'rgba(40, 107, 255,',
      ice: 'rgba(142, 191, 255,',
      white: 'rgba(245, 248, 255,',
    };

    for (let i = 0; i < particleCount; i++) {
      const typeRandom = Math.random();
      const colorType: 'blue' | 'ice' | 'white' = 
        typeRandom < 0.4 ? 'blue' : typeRandom < 0.75 ? 'ice' : 'white';

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
        speedY: (Math.random() - 0.5) * 0.25,
        speedX: (Math.random() - 0.5) * 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
        colorType,
      });
    }

    // Animation loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;
          p.pulsePhase += p.pulseSpeed;

          // Wrap boundaries smoothly
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }

        const currentAlpha = Math.max(0.1, Math.min(0.9, p.alpha + Math.sin(p.pulsePhase) * 0.3));

        // Draw particle with gentle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${colors[p.colorType]} ${currentAlpha})`;
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = 'rgba(40, 107, 255, 0.7)';
        ctx.fill();

        // Occasional diamond crossflare on white stars
        if (p.colorType === 'white' && currentAlpha > 0.6) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.6})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 2.5, p.y);
          ctx.lineTo(p.x + p.size * 2.5, p.y);
          ctx.moveTo(p.x, p.y - p.size * 2.5);
          ctx.lineTo(p.x, p.y + p.size * 2.5);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep Navy/Midnight Ambient Gradients */}
      <div className="absolute inset-0 bg-[#030817]" />
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[1200px] h-[700px] rounded-full bg-[#0A1F48]/40 blur-[130px]" />
      <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[#06132D]/70 blur-[140px]" />
      <div className="absolute top-[65%] -right-[10%] w-[700px] h-[700px] rounded-full bg-[#0A1F48]/35 blur-[150px]" />
      
      {/* Electric Blue Core Glow Flares */}
      <div className="absolute top-[10%] left-[20%] w-[450px] h-[450px] rounded-full bg-electric/15 blur-[120px]" />
      <div className="absolute top-[80%] left-[30%] w-[550px] h-[550px] rounded-full bg-electric/10 blur-[130px]" />

      {/* Atmospheric Disco Spotlights from Top Corners (Poster Accurate) */}
      <div className="absolute -top-12 -left-12 w-[650px] h-[850px] spotlight-beam-left transform rotate-12 opacity-70 blur-2xl pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-[650px] h-[850px] spotlight-beam-right transform -rotate-12 opacity-70 blur-2xl pointer-events-none" />

      {/* Subtle Cosmic Noise / Starfield Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-80" 
      />
    </div>
  );
};
