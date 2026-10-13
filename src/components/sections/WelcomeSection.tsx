import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { DiamondStar } from '../ui/DiamondStar';
import { Sparkles, Heart } from 'lucide-react';

export const WelcomeSection: React.FC = () => {
  // Generate random drifting petal parameters
  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across width
      delay: Math.random() * 6,
      duration: 7 + Math.random() * 6,
      size: 10 + Math.random() * 12,
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <section 
      id="welcome" 
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden flex flex-col justify-center"
    >
      {/* Falling Blossom Petals Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{ 
              top: '-5%', 
              left: `${petal.x}%`, 
              opacity: 0,
              rotate: petal.rotation 
            }}
            animate={{ 
              top: '105%', 
              left: `${(petal.x + (Math.sin(petal.id) * 15) + 100) % 100}%`, 
              opacity: [0, 0.85, 0.85, 0],
              rotate: petal.rotation + 360 
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "linear",
            }}
            className="absolute select-none"
          >
            <svg 
              width={petal.size} 
              height={petal.size * 1.3} 
              viewBox="0 0 30 40" 
              fill="none" 
              className="drop-shadow-[0_2px_8px_rgba(242,167,212,0.45)]"
            >
              {/* Sakura Petal Shape */}
              <path 
                d="M15 0 C25 10 30 25 15 40 C0 25 5 10 15 0 Z" 
                fill="url(#petalGradient)" 
                opacity="0.85"
              />
              <defs>
                <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF0F8" />
                  <stop offset="50%" stopColor="#F2A7D4" />
                  <stop offset="100%" stopColor="#D96BA8" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Main Content Layout with Sakura Tree on right / background */}
      <div className="max-w-6xl mx-auto w-full relative z-20">
        
        {/* Top Tagline / Category */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="w-8 h-px bg-blossom" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-blossom flex items-center gap-2">
            <Heart size={14} className="fill-blossom/30 text-blossom" />
            A Heartfelt Welcome From Seniors
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Senior Invitation & MGIT Welcome (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* SENIOR INVITATION */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.15] text-luminous tracking-tight">
                The OGs of <span className="metallic-text">CSE 1</span> bring you a celebration to remember.
              </h2>
              
              <p className="mt-6 text-lg sm:text-xl md:text-2xl text-silver-light font-light leading-relaxed">
                One department. Two batches. Countless memories waiting to be made. <strong className="text-white font-semibold">CSE 1</strong> invites its newest members to begin their MGIT journey with a day filled with energy, laughter, and unforgettable moments.
              </p>
            </motion.div>

            {/* WELCOME TO MGIT GLASS CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <GlassCard glow className="p-6 sm:p-10 border-l-4 border-l-blossom">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-blossom/20 border border-blossom/40 text-blossom">
                    <Sparkles size={22} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-ice-light font-semibold">
                      Department of Computer Science & Engineering
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
                      Welcome to MGIT. Your next chapter starts here.
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-base sm:text-lg md:text-xl text-silver-light/95 font-normal leading-relaxed">
                  To our wonderful freshers: welcome to a journey of discovery, friendship, challenges, and growth. May you find your people, discover what you're capable of, and turn every opportunity into a step towards something extraordinary. Here's to new beginnings and the memories we'll create together.
                </p>

                <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-electric/20 border border-electric/40 flex items-center justify-center font-serif text-sm font-bold text-ice">
                      26
                    </div>
                    <div>
                      <div className="text-xs text-silver">Batch of 2026</div>
                      <div className="text-sm font-bold text-white">Class of CSE 1</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blossom bg-blossom/10 border border-blossom/20 px-3.5 py-1.5 rounded-full">
                    <span>Thursday, 15 Oct 2026</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blossom" />
                    <span>E-101</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

          </div>

          {/* Right Column: Pink Blossom Tree Artistic Display (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Sakura Blossom Glow Aura */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-blossom/15 blur-[90px] pointer-events-none" />
            
            <GlassCard className="p-6 sm:p-8 w-full max-w-md mx-auto text-center border-blossom/20 bg-gradient-to-b from-[#0A1F48]/50 to-[#030817]/80">
              
              {/* Elegant SVG Sakura Blossom Tree Illustration */}
              <div className="relative w-full aspect-square max-w-[320px] mx-auto flex items-center justify-center">
                <svg 
                  viewBox="0 0 400 400" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-[0_0_25px_rgba(242,167,212,0.35)]"
                >
                  <circle cx="200" cy="200" r="160" fill="url(#moonGlow)" opacity="0.25" />
                  
                  {/* Tree Trunk & Branches */}
                  <path 
                    d="M200 360 C195 310 190 270 205 230 C215 200 230 180 250 160 C265 145 285 135 305 130 M205 230 C190 200 170 175 145 155 C125 140 105 135 90 135 M225 185 C230 160 220 135 200 115 C185 100 175 80 170 60 M200 360 C205 320 215 280 205 230" 
                    stroke="#8596B8" 
                    strokeWidth="10" 
                    strokeLinecap="round" 
                  />
                  <path 
                    d="M170 175 C155 160 140 145 125 120 M245 165 C260 150 275 130 285 105" 
                    stroke="#697D9E" 
                    strokeWidth="6" 
                    strokeLinecap="round" 
                  />

                  {/* Blossom Canopy Clusters */}
                  {/* Center Cluster */}
                  <circle cx="200" cy="115" r="45" fill="url(#sakuraGrad)" opacity="0.9" />
                  <circle cx="170" cy="85" r="35" fill="url(#sakuraGrad)" opacity="0.85" />
                  {/* Left Cluster */}
                  <circle cx="125" cy="140" r="42" fill="url(#sakuraGrad)" opacity="0.9" />
                  <circle cx="95" cy="130" r="30" fill="url(#sakuraGrad)" opacity="0.8" />
                  {/* Right Cluster */}
                  <circle cx="270" cy="145" r="45" fill="url(#sakuraGrad)" opacity="0.9" />
                  <circle cx="305" cy="125" r="32" fill="url(#sakuraGrad)" opacity="0.8" />
                  <circle cx="240" cy="95" r="36" fill="url(#sakuraGrad)" opacity="0.85" />
                  
                  {/* Highlight Sparkles */}
                  <circle cx="190" cy="100" r="3" fill="#FFFFFF" />
                  <circle cx="280" cy="135" r="3" fill="#FFFFFF" />
                  <circle cx="130" cy="130" r="3" fill="#FFFFFF" />

                  <defs>
                    <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#8EBFFF" />
                      <stop offset="100%" stopColor="#030817" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="sakuraGrad" cx="40%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="35%" stopColor="#FBD2EB" />
                      <stop offset="75%" stopColor="#F2A7D4" />
                      <stop offset="100%" stopColor="#D96BA8" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              {/* Caption */}
              <div className="mt-4">
                <span className="font-serif text-lg font-semibold text-white tracking-wide block">
                  New Beginnings in Full Bloom
                </span>
                <span className="text-xs text-silver mt-1 block">
                  Where memories will flourish and take root.
                </span>
              </div>
            </GlassCard>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
