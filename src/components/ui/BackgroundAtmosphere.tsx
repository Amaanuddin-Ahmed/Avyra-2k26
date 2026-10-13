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
  colorType: 'blue' | 'ice' | 'white' | 'cyan';
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 75;
    const particles: Particle[] = [];

    const colors = {
      blue: 'rgba(40, 107, 255,',
      ice: 'rgba(142, 191, 255,',
      white: 'rgba(245, 248, 255,',
      cyan: 'rgba(56, 189, 248,',
    };

    for (let i = 0; i < particleCount; i++) {
      const typeRandom = Math.random();
      const colorType: 'blue' | 'ice' | 'white' | 'cyan' = 
        typeRandom < 0.35 ? 'blue' : typeRandom < 0.65 ? 'ice' : typeRandom < 0.85 ? 'cyan' : 'white';

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.6 + 0.25,
        speedY: (Math.random() - 0.5) * 0.2,
        speedX: (Math.random() - 0.5) * 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
        colorType,
      });
    }

    // Occasional shooting star
    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 120,
      speed: 12,
      angle: Math.PI / 4,
      opacity: 0,
      active: false,
    };

    let shootingStarTimer = 0;

    const triggerShootingStar = () => {
      if (prefersReducedMotion) return;
      shootingStar.x = Math.random() * (canvas.width * 0.7);
      shootingStar.y = Math.random() * (canvas.height * 0.4);
      shootingStar.length = Math.random() * 80 + 80;
      shootingStar.speed = Math.random() * 8 + 10;
      shootingStar.opacity = 1;
      shootingStar.active = true;
    };

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render cosmic particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.speedX;
          p.y += p.speedY;
          p.pulsePhase += p.pulseSpeed;

          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }

        const currentAlpha = Math.max(0.1, Math.min(0.9, p.alpha + Math.sin(p.pulsePhase) * 0.3));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${colors[p.colorType]} ${currentAlpha})`;
        ctx.shadowBlur = p.size * 5;
        ctx.shadowColor = 'rgba(40, 107, 255, 0.75)';
        ctx.fill();

        // 4-point cross diffraction flare on brighter stars
        if (p.colorType === 'white' && currentAlpha > 0.65) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size * 3, p.y);
          ctx.lineTo(p.x + p.size * 3, p.y);
          ctx.moveTo(p.x, p.y - p.size * 3);
          ctx.lineTo(p.x, p.y + p.size * 3);
          ctx.stroke();
        }
      }

      // Render shooting star
      shootingStarTimer++;
      if (shootingStarTimer > 400 && !shootingStar.active && Math.random() < 0.02) {
        triggerShootingStar();
        shootingStarTimer = 0;
      }

      if (shootingStar.active) {
        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
        const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

        const grad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
        grad.addColorStop(0, 'rgba(40, 107, 255, 0)');
        grad.addColorStop(0.6, `rgba(142, 191, 255, ${shootingStar.opacity * 0.5})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${shootingStar.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shootingStar.x, shootingStar.y);
        ctx.stroke();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.02;

        if (shootingStar.opacity <= 0) {
          shootingStar.active = false;
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
      {/* Deep Midnight Blue Layers */}
      <div className="absolute inset-0 bg-[#020817]" />
      
      {/* Active Glowing Nebula Gradients */}
      <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1300px] h-[750px] rounded-full bg-[#0b1d54]/35 blur-[140px]" />
      <div className="absolute top-[35%] -left-[10%] w-[650px] h-[650px] rounded-full bg-[#06132D]/80 blur-[150px]" />
      <div className="absolute top-[60%] -right-[10%] w-[750px] h-[750px] rounded-full bg-[#0A1F48]/40 blur-[150px]" />
      
      {/* Electric Cobalt & Blue Pulses */}
      <div className="absolute top-[15%] left-[25%] w-[500px] h-[500px] rounded-full bg-[#1a4ed8]/15 blur-[130px]" />
      <div className="absolute top-[75%] left-[30%] w-[600px] h-[600px] rounded-full bg-[#38bdf8]/10 blur-[140px]" />

      {/* Atmospheric Stage Spotlights */}
      <div className="absolute -top-12 -left-12 w-[700px] h-[900px] spotlight-beam-left transform rotate-12 opacity-75 blur-2xl pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-[700px] h-[900px] spotlight-beam-right transform -rotate-12 opacity-75 blur-2xl pointer-events-none" />

      {/* Starfield Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-85" 
      />
    </div>
  );
};
