import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { DiamondStar } from '../ui/DiamondStar';

interface CinematicIntroProps {
  onEnter: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onEnter }) => {
  const shouldReduceMotion = useReducedMotion();
  const [pullProgress, setPullProgress] = useState(0); // 0 to 1
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'awakening' | 'unwrapping' | 'portal' | 'warp'>('idle');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);
  const dragStartY = useRef<number>(0);
  const progressRef = useRef(0);
  progressRef.current = pullProgress;

  // Trigger the full cinematic transition
  const triggerTransition = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    if (shouldReduceMotion) {
      setTimeout(() => onEnter(), 400);
      return;
    }

    // Phase A: Awakening (0 - 500ms)
    setPhase('awakening');
    setPullProgress(0.35);

    // Phase B: Ribbon Opening & Separation (500ms - 1300ms)
    setTimeout(() => {
      setPhase('unwrapping');
      setPullProgress(0.75);
    }, 500);

    // Phase C: Portal Formation (1300ms - 2000ms)
    setTimeout(() => {
      setPhase('portal');
      setPullProgress(1);
    }, 1200);

    // Phase D: Warp through light (2000ms - 2600ms)
    setTimeout(() => {
      setPhase('warp');
    }, 1900);

    // Phase E: Reveal Homepage
    setTimeout(() => {
      onEnter();
    }, 2600);
  }, [isTransitioning, shouldReduceMotion, onEnter]);

  // Handle pointer parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTransitioning) return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePos({
      x: (e.clientX - centerX) / 40,
      y: (e.clientY - centerY) / 40,
    });
  };

  // Wheel interaction: scroll down pulls the ribbon progressively
  useEffect(() => {
    if (isTransitioning) return;

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;
      e.preventDefault();

      if (e.deltaY > 0) {
        // Scrolling down advances the ribbon
        const newProgress = Math.min(1, progressRef.current + e.deltaY * 0.0035);
        setPullProgress(newProgress);
        if (newProgress >= 0.72) {
          triggerTransition();
        }
      } else if (e.deltaY < 0) {
        // Scrolling up eases the ribbon back
        setPullProgress((prev) => Math.max(0, prev + e.deltaY * 0.003));
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isTransitioning, triggerTransition]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isTransitioning || touchStartY.current === null) return;
    const deltaY = e.touches[0].clientY - touchStartY.current;
    if (deltaY > 15) {
      // Swiping down
      const progress = Math.min(1, deltaY / 220);
      setPullProgress(progress);
      if (progress >= 0.7) {
        triggerTransition();
      }
    } else if (deltaY < -15) {
      // Swiping up can also advance if user prefers scroll-up gesture
      const progress = Math.min(1, Math.abs(deltaY) / 220);
      setPullProgress(progress);
      if (progress >= 0.7) {
        triggerTransition();
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartY.current = null;
    if (!isTransitioning && pullProgress < 0.7) {
      // Spring back to 0
      setPullProgress(0);
    }
  };

  // Mouse drag support for ribbon
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTransitioning) return;
    isDragging.current = true;
    dragStartY.current = e.clientY;
  };

  const handleMouseUp = () => {
    if (isDragging.current && !isTransitioning) {
      isDragging.current = false;
      if (pullProgress < 0.65) {
        setPullProgress(0);
      }
    }
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging.current || isTransitioning) return;
    const deltaY = e.clientY - dragStartY.current;
    if (deltaY > 0) {
      const progress = Math.min(1, deltaY / 200);
      setPullProgress(progress);
      if (progress >= 0.65) {
        isDragging.current = false;
        triggerTransition();
      }
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      triggerTransition();
    }
  };

  // Stardust stars configuration
  const starfield = [
    { x: 12, y: 18, size: 2, delay: 0 },
    { x: 84, y: 14, size: 2.5, delay: 0.6 },
    { x: 22, y: 78, size: 2, delay: 1.2 },
    { x: 88, y: 82, size: 1.8, delay: 0.3 },
    { x: 38, y: 22, size: 1.5, delay: 0.8 },
    { x: 70, y: 32, size: 2, delay: 1.5 },
    { x: 16, y: 48, size: 1.2, delay: 0.4 },
    { x: 82, y: 62, size: 1.6, delay: 1.1 },
    { x: 48, y: 88, size: 2, delay: 0.7 },
    { x: 32, y: 64, size: 1.5, delay: 1.4 },
    { x: 64, y: 18, size: 2.2, delay: 0.2 },
    { x: 92, y: 42, size: 1.4, delay: 0.9 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMoveCapture={handleDragMove}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Celestial Ribbon Portal - Step into AVYRA 2K26"
      className="fixed inset-0 z-50 overflow-hidden bg-[#020817] flex flex-col items-center justify-between py-10 px-4 sm:px-8 select-none focus:outline-none"
    >
      {/* 1. DEEP LAYERED COSMIC BACKGROUND */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#06132D] to-[#020817] pointer-events-none" 
        aria-hidden="true"
      />

      {/* Volumetric Soft Electric Nebula behind Crystal */}
      <motion.div
        animate={{
          scale: isTransitioning ? [1, 2.8, 12] : isHovered ? 1.2 : [1, 1.08, 1],
          opacity: isTransitioning ? [0.6, 0.95, 0] : isHovered ? 0.75 : 0.5,
        }}
        transition={{
          duration: isTransitioning ? 2.4 : 5,
          repeat: isTransitioning ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(40,107,255,0.45)_0%,rgba(56,189,248,0.2)_40%,transparent_70%)] blur-[70px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Radiant Light Rays Emitter */}
      <motion.div
        animate={{
          rotate: 360,
          opacity: isTransitioning ? [0.4, 0.9, 0] : [0.2, 0.38, 0.2],
          scale: isTransitioning ? [1, 2.5, 8] : 1,
        }}
        transition={{
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          opacity: { duration: isTransitioning ? 2.2 : 6, repeat: isTransitioning ? 0 : Infinity, ease: "easeInOut" },
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] pointer-events-none opacity-30 select-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 800 800" className="w-full h-full">
          <defs>
            <radialGradient id="rayGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8EBFFF" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#286BFF" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#06132D" stopOpacity="0.05" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          {Array.from({ length: 16 }).map((_, idx) => (
            <polygon
              key={idx}
              points="400,400 375,0 425,0"
              transform={`rotate(${idx * 22.5} 400 400)`}
              fill="url(#rayGrad)"
            />
          ))}
        </svg>
      </motion.div>

      {/* Controlled Starfield */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {starfield.map((star, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: isTransitioning ? [0.6, 1, 0] : [0.25, 0.9, 0.25],
              scale: isTransitioning ? [1, 1.8, 0] : [1, 1.25, 1],
            }}
            transition={{
              duration: isTransitioning ? 1.8 : 3.5 + star.delay,
              repeat: isTransitioning ? 0 : Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            className="absolute rounded-full bg-white shadow-[0_0_8px_#8EBFFF]"
          />
        ))}
      </div>

      {/* Skip Intro Button in Top Corner */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={onEnter}
        className="self-end z-30 flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-mono tracking-widest uppercase text-silver-light/75 hover:text-white bg-white/5 border border-white/10 hover:border-white/30 backdrop-blur-md transition-all focus:outline-none focus:ring-1 focus:ring-cyan-300"
        aria-label="Skip opening and proceed directly to website"
      >
        <span>Skip Intro</span>
        <ArrowRight size={13} className="text-cyan-300" />
      </motion.button>

      {/* 2. MAIN CENTER STAGE: CRYSTAL + CELESTIAL RIBBON + PORTAL */}
      <div 
        className="relative flex-1 w-full max-w-4xl flex flex-col items-center justify-center my-auto z-20 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* TOP BRAND CALLOUT */}
        <motion.div
          animate={{
            opacity: isTransitioning ? 0 : 1,
            y: isTransitioning ? -20 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-cyan-300/60" />
          <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.45em] text-[#B9DCFF]/90 uppercase">
            AN EXPERIENCE BY CSE 1
          </span>
          <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-cyan-300/60" />
        </motion.div>

        {/* INTERACTIVE CELESTIAL OBJECT & RIBBON CONTAINER */}
        <motion.div
          animate={{
            x: mousePos.x,
            y: mousePos.y + (pullProgress * 15),
            scale: isTransitioning 
              ? phase === 'warp' ? 24 : phase === 'portal' ? 3.5 : 1.3
              : 1 + (pullProgress * 0.08) + (isHovered ? 0.04 : 0),
            rotateZ: isTransitioning ? (phase === 'warp' ? 45 : 12) : 0,
          }}
          transition={{
            x: { type: "spring", stiffness: 120, damping: 14 },
            y: { type: "spring", stiffness: 120, damping: 14 },
            scale: { duration: isTransitioning ? (phase === 'warp' ? 1.1 : 0.8) : 0.3 },
            rotateZ: { duration: 1.5, ease: "easeInOut" },
          }}
          className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center will-change-transform"
        >
          {/* A. THREE FINE ORBITAL RINGS */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
            viewBox="0 0 400 400"
            fill="none"
            aria-hidden="true"
          >
            {/* Primary Orbit */}
            <ellipse 
              cx="200" 
              cy="200" 
              rx="180" 
              ry="70" 
              transform="rotate(-24 200 200)" 
              stroke="url(#ringGrad1)" 
              strokeWidth="1.5"
              strokeDasharray="8 6"
              className="opacity-75"
            />
            {/* Secondary Counter-Orbit */}
            <ellipse 
              cx="200" 
              cy="200" 
              rx="165" 
              ry="55" 
              transform="rotate(32 200 200)" 
              stroke="url(#ringGrad2)" 
              strokeWidth="1.2"
              className="opacity-60"
            />
            {/* Third Fine Celestial Halo */}
            <circle 
              cx="200" 
              cy="200" 
              r="135" 
              stroke="rgba(185, 220, 255, 0.2)" 
              strokeWidth="1"
              strokeDasharray="4 8"
            />

            <defs>
              <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1a4ed8" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="ringGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a4ed8" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#B9DCFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>

          {/* Tiny orbital stars gliding on rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: isTransitioning ? 6 : 28, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-[28%] left-[8%] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FFFFFF]" />
            <div className="absolute bottom-[24%] right-[10%] w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
          </motion.div>

          {/* B. THE FACETED CELESTIAL CRYSTAL (CENTRAL OBJECT) */}
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center">
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full drop-shadow-[0_0_35px_rgba(56,189,248,0.7)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Crystal Prismatic Gradients */}
                <linearGradient id="facetTop" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="45%" stopColor="#B9DCFF" />
                  <stop offset="100%" stopColor="#1a4ed8" />
                </linearGradient>
                <linearGradient id="facetRight" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="60%" stopColor="#0b1d54" />
                  <stop offset="100%" stopColor="#06132D" />
                </linearGradient>
                <linearGradient id="facetBottom" x1="50%" y1="100%" x2="50%" y2="0%">
                  <stop offset="0%" stopColor="#0b1d54" />
                  <stop offset="50%" stopColor="#1a4ed8" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id="facetLeft" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#B9DCFF" />
                  <stop offset="55%" stopColor="#1a4ed8" />
                  <stop offset="100%" stopColor="#06132D" />
                </linearGradient>
                <radialGradient id="crystalCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="35%" stopColor="#B9DCFF" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Four-Pointed Faceted Crystal Star Geometry */}
              {/* Top Sharp Spire */}
              <polygon points="150,15 175,130 150,150 125,130" fill="url(#facetTop)" stroke="#B9DCFF" strokeWidth="1" strokeOpacity="0.8" />
              {/* Right Sharp Spire */}
              <polygon points="285,150 170,175 150,150 170,125" fill="url(#facetRight)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.8" />
              {/* Bottom Sharp Spire */}
              <polygon points="150,285 125,170 150,150 175,170" fill="url(#facetBottom)" stroke="#1a4ed8" strokeWidth="1" strokeOpacity="0.8" />
              {/* Left Sharp Spire */}
              <polygon points="15,150 130,125 150,150 130,175" fill="url(#facetLeft)" stroke="#B9DCFF" strokeWidth="1" strokeOpacity="0.8" />

              {/* Diagonal Diamond Interlocking Facets */}
              <polygon points="150,15 150,150 205,95" fill="rgba(255,255,255,0.4)" />
              <polygon points="285,150 150,150 205,205" fill="rgba(56,189,248,0.3)" />
              <polygon points="150,285 150,150 95,205" fill="rgba(11,29,84,0.5)" />
              <polygon points="15,150 150,150 95,95" fill="rgba(185,220,255,0.35)" />

              {/* Brilliant Inner Radiant Gem Core */}
              <circle cx="150" cy="150" r="42" fill="url(#crystalCore)" />
              <polygon points="150,118 178,150 150,182 122,150" fill="rgba(255,255,255,0.85)" stroke="#38bdf8" strokeWidth="1.5" />

              {/* Intentionally Integrated Celestial Monogram "A" inside the Crystal Core */}
              <path
                d="M150 132 L159 158 H141 Z M144 153 H156"
                stroke="#020817"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="opacity-80"
              />
            </svg>

            {/* Sparkle Flares along facets */}
            <DiamondStar size={18} className="absolute top-2 left-[30%]" />
            <DiamondStar size={16} className="absolute bottom-6 right-[28%]" />
          </div>

          {/* C. THE SIGNATURE CELESTIAL RIBBON (WRAPS IN 3D AROUND CRYSTAL) */}
          <div 
            onClick={triggerTransition}
            className="absolute inset-0 flex items-center justify-center cursor-pointer pointer-events-auto"
            title="Pull or click the celestial ribbon to enter"
          >
            <svg 
              viewBox="0 0 400 400" 
              className="w-full h-full overflow-visible"
              fill="none"
            >
              <defs>
                <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.85" />
                  <stop offset="70%" stopColor="#1a4ed8" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#B9DCFF" stopOpacity="0.95" />
                </linearGradient>
                <filter id="ribbonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="glow" />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>
              </defs>

              {/* Ribbon Path 1: Back strand (passing behind crystal) */}
              <motion.path
                d={
                  isTransitioning
                    ? "M-80,240 C50,120 180,80 480,-40"
                    : `M40,${220 - pullProgress * 40} C120,${140 - pullProgress * 50} 280,${130 - pullProgress * 40} 360,${180 + pullProgress * 20}`
                }
                stroke="url(#ribbonGrad)"
                strokeWidth={isTransitioning ? 8 : 4 + pullProgress * 3}
                strokeLinecap="round"
                filter="url(#ribbonGlow)"
                className="transition-all duration-300 opacity-75"
              />

              {/* Ribbon Path 2: Front main loop (passing in front of crystal with dynamic opening) */}
              <motion.path
                d={
                  isTransitioning
                    ? "M-120,160 C120,380 280,380 520,160"
                    : `M${30 - pullProgress * 50},${190 + pullProgress * 45} C${120 - pullProgress * 30},${275 + pullProgress * 55} ${280 + pullProgress * 30},${275 + pullProgress * 55} ${370 + pullProgress * 50},${190 + pullProgress * 45}`
                }
                stroke="url(#ribbonGrad)"
                strokeWidth={isTransitioning ? 10 : 5 + pullProgress * 4}
                strokeLinecap="round"
                filter="url(#ribbonGlow)"
                className="transition-all duration-300 drop-shadow-[0_0_15px_rgba(56,189,248,0.9)]"
              />

              {/* Luminous endpoints of the ribbon */}
              <circle 
                cx={30 - pullProgress * 50} 
                cy={190 + pullProgress * 45} 
                r={4 + pullProgress * 3} 
                fill="#FFFFFF" 
                filter="url(#ribbonGlow)" 
              />
              <circle 
                cx={370 + pullProgress * 50} 
                cy={190 + pullProgress * 45} 
                r={4 + pullProgress * 3} 
                fill="#FFFFFF" 
                filter="url(#ribbonGlow)" 
              />
            </svg>
          </div>

          {/* D. PORTAL ENERGY VORTEX RINGS (Appears dynamically in Phase B & C) */}
          <AnimatePresence>
            {isTransitioning && (
              <>
                {/* Expanding Concentric Energy Shockwave Waves */}
                <motion.div
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: [0.3, 2.5, 36], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-64 h-64 rounded-full border-4 border-cyan-300 shadow-[0_0_50px_#38bdf8] pointer-events-none"
                />
                <motion.div
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: [0.2, 1.8, 28], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-56 h-56 rounded-full border-2 border-white shadow-[0_0_35px_#FFFFFF] pointer-events-none"
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* TYPOGRAPHY: AVYRA 2K26 & INVITATION */}
        <motion.div
          animate={{
            opacity: isTransitioning ? 0 : 1,
            y: isTransitioning ? 25 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="text-center mt-6 flex flex-col items-center"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black tracking-[0.22em] uppercase select-none">
            <span className="crystal-3d-text">
              AVYRA 2K26
            </span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm md:text-base font-light tracking-[0.16em] text-[#B9DCFF]/85 max-w-md italic">
            “Some beginnings deserve to be experienced.”
          </p>
        </motion.div>

        {/* 3. SIGNATURE INTERACTION PROMPT: PULL THE RIBBON TO BEGIN */}
        <motion.div
          animate={{
            opacity: isTransitioning ? 0 : 1,
            y: isTransitioning ? 30 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="mt-8 sm:mt-10 flex flex-col items-center text-center"
        >
          {/* Main Pull Prompt */}
          <div 
            onClick={triggerTransition}
            className="group flex flex-col items-center gap-1.5 cursor-pointer"
          >
            <div className="flex items-center gap-2.5 px-6 py-2 rounded-full bg-gradient-to-r from-electric/20 via-cyan-400/20 to-electric/20 border border-cyan-400/40 group-hover:border-white shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all group-hover:scale-105">
              <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
              <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-white group-hover:text-cyan-200 transition-colors">
                PULL THE RIBBON TO BEGIN
              </span>
              <Sparkles size={14} className="text-cyan-300" />
            </div>

            {/* Instruction with animated pulse arrow */}
            <div className="flex items-center gap-1.5 mt-1 text-[11px] sm:text-xs tracking-widest text-[#B9DCFF]/70 uppercase font-sans">
              <span>Scroll, swipe, or drag to enter</span>
              <ChevronDown size={14} className="text-cyan-300 animate-bounce" />
            </div>
          </div>

          {/* Direct ENTER AVYRA Action Button (Clear Fallback) */}
          <button
            onClick={triggerTransition}
            className="mt-4 px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-[#020817] bg-gradient-to-r from-white via-[#B9DCFF] to-cyan-300 hover:from-white hover:to-white shadow-[0_0_25px_rgba(255,255,255,0.7)] hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-300"
            aria-label="Enter AVYRA 2K26"
          >
            ENTER AVYRA
          </button>
        </motion.div>
      </div>

      {/* FOOTER NOTICE */}
      <motion.div
        animate={{
          opacity: isTransitioning ? 0 : 0.6,
        }}
        className="z-20 text-[10px] tracking-[0.25em] text-[#B9DCFF]/60 uppercase font-mono text-center"
      >
        CSE 1 • MAHATMA GANDHI INSTITUTE OF TECHNOLOGY
      </motion.div>

      {/* 4. SEAMLESS WARP THROUGH LIGHT FLASH DISPERSION */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: phase === 'warp' ? [0, 0.9, 1, 0] : [0, 0.4, 0.8] 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-gradient-to-b from-[#8EBFFF] via-white to-[#06132D] pointer-events-none"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
