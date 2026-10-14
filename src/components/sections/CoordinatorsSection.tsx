import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { DiamondStar } from '../ui/DiamondStar';
import { COORDINATORS } from '../../data/coordinators';
import { User, Play, Pause } from 'lucide-react';

export const CoordinatorsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Dynamically ensure the marquee has enough items per half to span wide screens seamlessly
  const repeatCount = Math.max(2, Math.ceil(12 / COORDINATORS.length));
  const halfSequence = Array.from({ length: repeatCount }, () => COORDINATORS).flat();
  const marqueeItems = [...halfSequence, ...halfSequence];

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
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-silver hover:text-white transition-colors cursor-pointer"
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
                className="w-56 sm:w-64 h-[370px] sm:h-[400px] shrink-0 group focus-within:ring-2 focus-within:ring-electric rounded-2xl transition-transform duration-300 hover:-translate-y-1.5 flex flex-col"
                tabIndex={0}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
              >
                <GlassCard 
                  glow={idx % 5 === 0}
                  className="p-4 sm:p-5 flex flex-col items-center justify-between text-center h-full w-full overflow-hidden border-white/10 group-hover:border-electric/60 transition-all duration-300"
                >
                  {/* Photo Frame with strict fixed height and clipping */}
                  <div className="relative w-full h-[240px] sm:h-[265px] rounded-xl p-0.5 bg-gradient-to-tr from-electric/40 via-white/20 to-ice/30 shadow-[0_0_15px_rgba(40,107,255,0.25)] group-hover:shadow-[0_0_25px_rgba(40,107,255,0.55)] transition-all shrink-0">
                    <div className="w-full h-full rounded-[10px] bg-[#06132D] flex items-center justify-center border border-white/10 overflow-hidden relative">
                      {coord.image ? (
                        <div className="w-full h-full overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.04]">
                          <img 
                            src={coord.image} 
                            alt={coord.name}
                            loading="lazy"
                            style={{ 
                              objectPosition: coord.imagePosition || 'center top',
                              transform: `scale(${coord.imageScale || 1})`,
                              transformOrigin: coord.imageOrigin || coord.imagePosition || 'center top',
                            }}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-silver/40">
                          <User size={40} />
                          <span className="text-[10px] uppercase tracking-widest mt-2 font-mono">
                            Photo
                          </span>
                        </div>
                      )}
                    </div>
                    <DiamondStar size={14} className="absolute -top-1.5 -right-1.5 z-10" />
                  </div>

                  {/* Coordinator Name (Strict uniform height and centering for all decks) */}
                  <div className="w-full h-14 sm:h-16 flex items-center justify-center text-center px-1 shrink-0 mt-2">
                    <h3 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-ice transition-colors uppercase leading-snug line-clamp-2">
                      {coord.name}
                    </h3>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
