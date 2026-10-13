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

interface GlowingSparkle {
  x: number;
  y: number;
  maxSize: number;
  currentSize: number;
  phase: number;
  speed: number;
  maxAlpha: number;
  color: string;
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
    // Greatly reduced petals (only 6 on desktop, 3 on mobile)
    const petalCount = prefersReducedMotion ? 0 : isMobile ? 3 : 7;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 7,
        speedY: Math.random() * 0.5 + 0.4,
        speedX: Math.random() * 0.3 + 0.15,
        oscillationSpeed: Math.random() * 0.015 + 0.008,
        oscillationPhase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        opacity: Math.random() * 0.35 + 0.3,
      });
    }

    // Glowing peripheral sparkles that start small, enlarge, glow, and disappear
    // Located mainly in empty areas (margins < 25% or > 75% width, or extreme top/bottom)
    const sparkleCount = isMobile ? 8 : 16;
    const sparkles: GlowingSparkle[] = [];

    const getEmptySpaceX = () => {
      // Avoid the center 50% where primary text resides
      return Math.random() < 0.5
        ? Math.random() * (canvas.width * 0.22) // Left margin
        : canvas.width * 0.78 + Math.random() * (canvas.width * 0.22); // Right margin
    };

    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        x: getEmptySpaceX(),
        y: Math.random() * canvas.height,
        maxSize: Math.random() * 5 + 4,
        currentSize: 0,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        maxAlpha: Math.random() * 0.6 + 0.3,
        color: i % 2 === 0 ? '#8EBFFF' : '#FFFFFF',
      });
    }

    const drawPetal = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.8, -size * 0.6, size * 0.9, size * 0.6, 0, size);
      ctx.bezierCurveTo(-size * 0.9, size * 0.6, -size * 0.8, -size * 0.6, 0, -size);

      const grad = ctx.createLinearGradient(0, -size, 0, size);
      grad.addColorStop(0, '#FFF5FA');
      grad.addColorStop(0.5, '#F2A7D4');
      grad.addColorStop(1, '#D96BA8');
      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(242, 167, 212, 0.3)';
      ctx.shadowBlur = 5;
      ctx.fill();

      ctx.restore();
    };

    const drawGlowingSparkle = (s: GlowingSparkle) => {
      const sinVal = Math.sin(s.phase);
      // Only draw when sinVal > 0 (pulsing in and out)
      if (sinVal <= 0) return;

      const progress = sinVal; // 0 to 1
      const size = s.maxSize * progress;
      const alpha = s.maxAlpha * progress;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = 'rgba(142, 191, 255, 0.9)';
      ctx.shadowBlur = size * 3;

      // 4-point Diamond Star
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y - size * 2);
      ctx.quadraticCurveTo(s.x, s.y, s.x + size * 2, s.y);
      ctx.quadraticCurveTo(s.x, s.y, s.x, s.y + size * 2);
      ctx.quadraticCurveTo(s.x, s.y, s.x - size * 2, s.y);
      ctx.quadraticCurveTo(s.x, s.y, s.x, s.y - size * 2);
      ctx.fill();

      // Center bright core
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(s.x, s.y, size * 0.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render glowing sparkles in empty space
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.phase += s.speed;

        // When a cycle completes (crosses 2*PI), optionally respawn in a new empty coordinate
        if (s.phase > Math.PI * 2) {
          s.phase = 0;
          s.x = getEmptySpaceX();
          s.y = Math.random() * canvas.height;
        }

        drawGlowingSparkle(s);
      }

      // Render minimal petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.oscillationPhase += p.oscillationSpeed;
        p.y += p.speedY;
        p.x += Math.sin(p.oscillationPhase) * 0.8 + p.speedX;
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
