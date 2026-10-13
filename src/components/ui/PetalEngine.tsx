import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  oscillationSpeed: number;
  oscillationPhase: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

interface PetalEngineProps {
  active?: boolean;
}

export const PetalEngine: React.FC<PetalEngineProps> = ({ active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const isMobile = window.innerWidth < 768;
    const petalCount = prefersReducedMotion ? 0 : isMobile ? 12 : 26;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 8,
        speedY: Math.random() * 0.8 + 0.6,
        speedX: Math.random() * 0.4 + 0.2,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        oscillationPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.45 + 0.4,
      });
    }

    const drawPetal = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      // Draw Sakura Petal Shape
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.8, -size * 0.6, size * 0.9, size * 0.6, 0, size);
      ctx.bezierCurveTo(-size * 0.9, size * 0.6, -size * 0.8, -size * 0.6, 0, -size);

      const grad = ctx.createLinearGradient(0, -size, 0, size);
      grad.addColorStop(0, '#FFF5FA');
      grad.addColorStop(0.5, '#F2A7D4');
      grad.addColorStop(1, '#D96BA8');
      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(242, 167, 212, 0.4)';
      ctx.shadowBlur = 6;
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.oscillationPhase += p.oscillationSpeed;
        p.y += p.speedY;
        p.x += Math.sin(p.oscillationPhase) * 1.2 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = canvas.width + 20;
        }

        drawPetal(p.x, p.y, p.size, p.rotation, p.opacity);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 w-full h-full"
      aria-hidden="true"
    />
  );
};
