import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { DiamondStar } from '../ui/DiamondStar';
import { COORDINATORS } from '../../data/coordinators';
import { User, Play, Pause, Sparkles } from 'lucide-react';

export const CoordinatorsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...COORDINATORS, ...COORDINATORS];

  return (
    <section 
      id="coordinators" 
      className="relative min-h-[70vh] py-24 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden flex flex-col justify-center"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-electric/10 rounded-full blur-[140px] pointer-events-none" />

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
              Organizing Committee
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
            className="mt-3 text-base sm:text-xl text-silver-light font-light max-w-2xl mx-auto"
          >
            The dedicated senior committee of CSE 1 uniting to orchestrate a celebration of memories for MGIT.
          </motion.p>

          {/* Pause / Play control */}
          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Resume movement" : "Pause movement"}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-silver hover:text-white transition-colors"
            >
              {isPaused ? <Play size={13} /> : <Pause size={13} />}
              <span>{isPaused ? "Resume Stream" : "Pause Stream"}</span>
            </button>
          </div>
        </div>

        {/* CONTINUOUS HORIZONTAL MARQUEE STREAM */}
        <div 
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Edge Gradient Fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#020817] to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#020817] to-transparent z-20" />

          <div 
            className={`flex items-center gap-6 w-max ${
              isPaused ? '' : 'animate-marquee'
            }`}
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {marqueeItems.map((coord, idx) => (
              <div 
                key={`${coord.id}-${idx}`}
                className="w-56 sm:w-64 shrink-0 group focus-within:ring-2 focus-within:ring-electric rounded-2xl"
                tabIndex={0}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
              >
                <GlassCard 
                  glow={idx % 5 === 0}
                  className="p-5 flex flex-col items-center text-center h-full border-white/10 group-hover:border-electric/60"
                >
                  {/* Square Empty Frame Placeholder for Photo */}
                  <div className="relative mb-4 w-36 h-36 sm:w-40 sm:h-40 rounded-2xl p-0.5 bg-gradient-to-tr from-electric/40 via-white/20 to-ice/30 shadow-[0_0_15px_rgba(40,107,255,0.25)] group-hover:shadow-[0_0_25px_rgba(40,107,255,0.55)] transition-all">
                    <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-[#0A1F48]/80 to-[#020817] flex flex-col items-center justify-center border border-white/10 overflow-hidden relative">
                      {/* Blank frame placeholder */}
                      <User size={42} className="text-silver/40 group-hover:text-ice group-hover:scale-105 transition-all" />
                      <span className="text-[10px] uppercase tracking-widest text-silver/50 mt-2 font-mono">
                        Photo
                      </span>
                    </div>
                    <DiamondStar size={14} className="absolute -top-1 -right-1" />
                  </div>

                  {/* Coordinator Name */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide mt-1 group-hover:text-ice-light transition-colors">
                    {coord.name}
                  </h3>

                  {/* Unified Title */}
                  <span className="text-xs font-semibold uppercase tracking-wider text-ice bg-electric/15 px-3 py-1 rounded-full border border-electric/30 mt-2">
                    {coord.role}
                  </span>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
