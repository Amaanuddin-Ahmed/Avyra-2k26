import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { DiamondStar } from '../ui/DiamondStar';

interface CinematicIntroProps {
  onEnter: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onEnter }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse magnetic tilt
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTransitioning) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePos({
      x: (clientX - centerX) / 35,
      y: (clientY - centerY) / 35,
    });
  };

  const handleStartTransition = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      onEnter();
    }, 2200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleStartTransition();
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 overflow-hidden bg-[#020817] flex flex-col items-center justify-center select-none"
      role="region"
      aria-label="Cinematic Opening Experience"
    >
      {/* Background Deep Cosmic Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(40,107,255,0.28)_0%,rgba(2,8,23,0.98)_75%)] pointer-events-none" />

      {/* Floating Ambient Stardust Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${(i * 3.4) % 100}vw`,
              y: `${(i * 7.1) % 100}vh`,
              opacity: 0.2 + (i % 5) * 0.15,
            }}
            animate={
              isTransitioning
                ? {
                    scale: [1, 5],
                    x: `${((i * 3.4) % 100) > 50 ? 125 : -25}vw`,
                    y: `${((i * 7.1) % 100) > 50 ? 125 : -25}vh`,
                    opacity: [0.9, 0],
                  }
                : {
                    y: [`${(i * 7.1) % 100}vh`, `${((i * 7.1 + 3) % 100)}vh`],
                    opacity: [0.3, 0.8, 0.3],
                  }
            }
            transition={{
              duration: isTransitioning ? 1.5 : 4 + (i % 3),
              repeat: isTransitioning ? 0 : Infinity,
              ease: isTransitioning ? [0.4, 0, 0.2, 1] : "easeInOut",
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-ice shadow-[0_0_8px_#8EBFFF]"
          />
        ))}
      </div>

      {/* Skip Intro Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={onEnter}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-30 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-silver-light/80 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-electric"
        aria-label="Skip cinematic introduction"
      >
        <span>Skip Intro</span>
        <ArrowRight size={14} />
      </motion.button>

      {/* Center Interactive Crystalline Centerpiece */}
      <div 
        className="relative flex flex-col items-center justify-center cursor-pointer z-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleStartTransition}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Step into AVYRA 2K26"
      >
        {/* Pulsing Energy Shockwave Waves */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.95 }}
              animate={{ scale: 32, opacity: 0 }}
              transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-48 h-48 rounded-full border-2 border-white bg-radial-electric pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Ambient Nebula Halo */}
        <motion.div
          animate={{
            scale: isTransitioning ? 30 : isHovered ? 1.3 : 1,
            opacity: isTransitioning ? 1 : isHovered ? 0.9 : 0.65,
          }}
          transition={{ duration: isTransitioning ? 1.8 : 0.4 }}
          className="absolute w-88 h-88 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-electric via-[#38bdf8]/50 to-electric-deep blur-[95px] pointer-events-none"
        />

        {/* Triple Orbital Energy Rings with Poster-Style Ellipses */}
        <motion.div
          animate={
            isTransitioning
              ? { scale: 22, opacity: 0, rotate: 180 }
              : { rotate: 360 }
          }
          transition={
            isTransitioning
              ? { duration: 1.6, ease: "easeOut" }
              : { duration: 24, repeat: Infinity, ease: "linear" }
          }
          className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-dashed border-ice/40 pointer-events-none"
        />
        <motion.div
          animate={
            isTransitioning
              ? { scale: 16, opacity: 0, rotate: -180 }
              : { rotate: -360 }
          }
          transition={
            isTransitioning
              ? { duration: 1.6, ease: "easeOut" }
              : { duration: 18, repeat: Infinity, ease: "linear" }
          }
          className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full border border-electric/50 pointer-events-none shadow-[0_0_25px_rgba(40,107,255,0.5)]"
        />

        {/* The Crystalline Sparkle & Beveled AVYRA Emblem */}
        <motion.div
          animate={{
            x: mousePos.x,
            y: mousePos.y,
            scale: isTransitioning ? 38 : isHovered ? 1.22 : [1, 1.07, 1],
            rotate: isTransitioning ? 90 : 0,
          }}
          transition={
            isTransitioning
              ? { duration: 2, ease: [0.22, 1, 0.36, 1] }
              : {
                  scale: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                  x: { type: "spring", stiffness: 150, damping: 15 },
                  y: { type: "spring", stiffness: 150, damping: 15 },
                }
          }
          className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center select-none"
        >
          {/* Multi-point Crystal Flare SVG */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-[0_0_45px_rgba(142,191,255,1)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Primary Sharp Beveled Vertical & Horizontal Ray Spikes */}
            <path
              d="M100 0 Q100 82 0 100 Q100 118 100 200 Q100 118 200 100 Q100 82 100 0 Z"
              fill="url(#sparkleCoreGrad)"
            />
            {/* Diagonal Secondary Diamond Spikes */}
            <path
              d="M100 20 Q100 82 20 100 Q100 118 100 180 Q100 118 180 100 Q100 82 100 20 Z"
              fill="url(#sparkleRayGrad)"
              transform="rotate(45 100 100)"
              opacity="0.85"
            />
            {/* Crystalline Prismatic Facets */}
            <circle cx="100" cy="100" r="22" fill="#FFFFFF" />
            <circle cx="100" cy="100" r="34" fill="#8EBFFF" opacity="0.6" />

            <defs>
              <linearGradient id="sparkleCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#E2EDFF" />
                <stop offset="65%" stopColor="#8EBFFF" />
                <stop offset="100%" stopColor="#286BFF" />
              </linearGradient>
              <linearGradient id="sparkleRayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#8EBFFF" />
                <stop offset="100%" stopColor="#0b1d54" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Monogram / Crystal Diamond Accents */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-serif text-lg sm:text-xl font-black tracking-widest text-[#030817] drop-shadow-[0_0_6px_white]">
              A
            </span>
          </div>

          <DiamondStar size={20} className="absolute -top-2 left-6" />
          <DiamondStar size={18} className="absolute -bottom-2 right-6" />
        </motion.div>

        {/* Refined Interaction Prompt: STEP INTO AVYRA */}
        <motion.div
          animate={{
            opacity: isTransitioning ? 0 : 1,
            y: isTransitioning ? 20 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <div className="group flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#06132D]/90 border border-electric/50 hover:border-white shadow-[0_0_30px_rgba(40,107,255,0.6)] backdrop-blur-md transition-all hover:scale-105">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span className="font-serif text-sm sm:text-base font-bold tracking-[0.35em] text-white uppercase group-hover:text-ice-light transition-colors">
              STEP INTO AVYRA
            </span>
            <Sparkles size={16} className="text-ice-light group-hover:rotate-12 transition-transform" />
          </div>

          <span className="text-[11px] sm:text-xs tracking-widest text-silver/70 uppercase">
            Click or tap the luminous star to enter
          </span>
        </motion.div>
      </div>

      {/* Full-Screen Ice-Blue & White Light Flash Dissolve */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, times: [0, 0.6, 0.85, 1], ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-gradient-to-t from-[#8EBFFF] via-white to-[#F5F8FF] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
