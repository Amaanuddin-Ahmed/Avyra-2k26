import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { DiamondStar } from '../ui/DiamondStar';
import { COORDINATORS } from '../../data/coordinators';
import { User, Play, Pause, Sparkles, Orbit, Layers } from 'lucide-react';

export const CoordinatorsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [activeView, setActiveView] = useState<'marquee' | 'orbit'>('marquee');
  const [selectedCoord, setSelectedCoord] = useState(0);

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...COORDINATORS, ...COORDINATORS];

  return (
    <section 
      id="coordinators" 
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden flex flex-col justify-center"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-electric/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <DiamondStar size={16} />
            <span className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-ice">
              The Architects Behind The Night
            </span>
            <DiamondStar size={16} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-luminous tracking-tight uppercase"
          >
            MEET OUR AVYRA <span className="metallic-text">COORDINATORS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-base sm:text-xl text-silver-light font-light max-w-2xl mx-auto"
          >
            The dedicated seniors of CSE 1 working tirelessly to make this celebration an extraordinary milestone for MGIT freshers.
          </motion.p>

          {/* Mode Switcher: Infinite Stream vs Orbital Glass Deck */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="inline-flex items-center p-1 rounded-full bg-navy-deep/80 border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setActiveView('marquee')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeView === 'marquee'
                    ? 'bg-electric text-white shadow-[0_0_15px_rgba(40,107,255,0.6)]'
                    : 'text-silver hover:text-white'
                }`}
              >
                <Layers size={14} />
                <span>Continuous Stream</span>
              </button>

              <button
                onClick={() => setActiveView('orbit')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeView === 'orbit'
                    ? 'bg-electric text-white shadow-[0_0_15px_rgba(40,107,255,0.6)]'
                    : 'text-silver hover:text-white'
                }`}
              >
                <Orbit size={14} />
                <span>Orbital Glass Deck</span>
              </button>
            </div>

            {/* Marquee Play/Pause Toggle */}
            {activeView === 'marquee' && (
              <button
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? "Resume scrolling" : "Pause scrolling"}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-silver hover:text-white transition-colors"
                title={isPaused ? "Resume movement" : "Pause movement"}
              >
                {isPaused ? <Play size={14} /> : <Pause size={14} />}
              </button>
            )}
          </div>
        </div>

        {/* VIEW 1: CONTINUOUS HORIZONTAL MARQUEE GALLERY */}
        {activeView === 'marquee' && (
          <div 
            className="relative w-full overflow-hidden py-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Fade Gradients at Edges */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#030817] to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#030817] to-transparent z-20" />

            <div 
              className={`flex items-center gap-6 w-max ${
                isPaused ? '' : 'animate-[marquee_38s_linear_infinite]'
              }`}
              style={{
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              {marqueeItems.map((coord, idx) => (
                <div 
                  key={`${coord.id}-${idx}`}
                  className="w-64 sm:w-72 shrink-0 group focus-within:ring-2 focus-within:ring-electric rounded-2xl"
                  tabIndex={0}
                  onFocus={() => setIsPaused(true)}
                  onBlur={() => setIsPaused(false)}
                >
                  <GlassCard 
                    glow={idx % 4 === 0}
                    className="p-6 flex flex-col items-center text-center h-full border-white/10 group-hover:border-electric/60"
                  >
                    {/* Photo Placeholder */}
                    <div className="relative mb-5 w-24 h-24 rounded-2xl p-0.5 bg-gradient-to-tr from-electric via-white/30 to-ice shadow-[0_0_18px_rgba(40,107,255,0.35)] group-hover:shadow-[0_0_25px_rgba(40,107,255,0.6)] transition-all">
                      <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-[#0A1F48] to-[#030817] flex flex-col items-center justify-center border border-white/10 overflow-hidden">
                        <User size={34} className="text-ice-light group-hover:scale-110 transition-transform" />
                        <span className="text-[9px] uppercase tracking-wider text-silver/60 mt-1">Photo</span>
                      </div>
                      <DiamondStar size={14} className="absolute -top-1.5 -right-1.5" />
                    </div>

                    {/* Role Tag */}
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ice bg-electric/15 px-3 py-1 rounded-full border border-electric/30 mb-2">
                      {coord.role}
                    </span>

                    {/* Coordinator Name */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide mt-1 group-hover:text-ice-light transition-colors">
                      {coord.name}
                    </h3>

                    <span className="text-xs text-silver mt-1">
                      {coord.department}
                    </span>

                    <div className="mt-4 pt-3 w-full border-t border-white/10 flex items-center justify-center gap-1.5 text-[10px] text-silver/70 tracking-widest uppercase">
                      <Sparkles size={11} className="text-electric" />
                      <span>Organizing Team</span>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: THE COORDINATOR GLASS-DECK (Clockwise Orbital Deck) */}
        {activeView === 'orbit' && (
          <div className="relative py-12 flex flex-col items-center justify-center">
            
            {/* Center Focus Card */}
            <div className="w-full max-w-md mx-auto mb-10">
              <GlassCard glow className="p-8 text-center border-electric/40">
                <div className="relative w-28 h-28 mx-auto mb-4 rounded-2xl p-0.5 bg-gradient-to-tr from-electric via-white to-ice shadow-[0_0_25px_rgba(40,107,255,0.5)]">
                  <div className="w-full h-full rounded-[14px] bg-navy-deep flex flex-col items-center justify-center">
                    <User size={40} className="text-ice-light" />
                    <span className="text-[10px] text-silver mt-1 uppercase">Coordinator</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-electric/20 text-ice text-xs font-semibold tracking-wider uppercase border border-electric/40">
                  {COORDINATORS[selectedCoord].role}
                </span>

                <h3 className="font-serif text-2xl font-bold text-white tracking-wide mt-3">
                  {COORDINATORS[selectedCoord].name}
                </h3>

                <p className="text-sm text-silver mt-1">
                  Department of Computer Science & Engineering • {COORDINATORS[selectedCoord].department}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 text-xs text-silver-light">
                  Active in AVYRA 2K26 Stage, Logistics & Freshers Welcome
                </div>
              </GlassCard>
            </div>

            {/* Orbiting Glass Cards Ring */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 w-full">
              {COORDINATORS.map((coord, index) => {
                const isSelected = selectedCoord === index;
                return (
                  <button
                    key={coord.id}
                    onClick={() => setSelectedCoord(index)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-electric/25 border-electric shadow-[0_0_20px_rgba(40,107,255,0.5)] scale-105'
                        : 'bg-[#06132D]/60 border-white/10 hover:border-ice/40 hover:bg-[#06132D]/90'
                    }`}
                  >
                    <div className="w-10 h-10 mx-auto rounded-lg bg-navy-dark flex items-center justify-center mb-2 border border-white/10">
                      <User size={18} className={isSelected ? "text-white" : "text-silver"} />
                    </div>
                    <div className="text-xs font-bold text-white truncate">{coord.name}</div>
                    <div className="text-[10px] text-ice/80 truncate mt-0.5">{coord.role}</div>
                  </button>
                );
              })}
            </div>

          </div>
        )}

        {/* Central Data Updating Note for User */}
        <div className="mt-12 text-center text-xs text-silver/60">
          <span>Coordinator profiles are easily updated in </span>
          <code className="text-ice bg-white/5 px-2 py-0.5 rounded border border-white/10">
            src/data/coordinators.ts
          </code>
        </div>

      </div>
    </section>
  );
};
