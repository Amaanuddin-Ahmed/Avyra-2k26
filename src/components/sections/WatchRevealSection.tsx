import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { DiamondStar } from '../ui/DiamondStar';
import { Clock, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';

export const WatchRevealSection: React.FC = () => {
  return (
    <section 
      id="watch-reveal" 
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background radial lighting flare that intensifies */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-electric/20 blur-[130px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* Intro Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <DiamondStar size={16} />
          <span className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-ice">
            The Moment of Commencement
          </span>
          <DiamondStar size={16} />
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-luminous tracking-tight"
        >
          When Time Stands Still: <span className="metallic-text">09:30 AM</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-4 text-base sm:text-xl text-silver max-w-2xl font-light"
        >
          Every great journey has a precise starting point. At nine-thirty sharp, the doors of E-101 open to unveil AVYRA 2K26.
        </motion.p>

        {/* The Luxury Chronograph Watch Focal Point */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-12 w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 flex items-center justify-center select-none"
        >
          {/* Orbital Glowing Ring around Watch */}
          <div className="absolute inset-0 rounded-full border border-electric/40 shadow-[0_0_40px_rgba(40,107,255,0.4)] animate-spin-very-slow pointer-events-none" />
          <div className="absolute -inset-4 rounded-full border border-dashed border-ice/20 animate-spin-very-slow [animation-direction:reverse] pointer-events-none" />
          
          {/* Watch Body (Precision SVG Chronograph) */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-88 md:h-88 rounded-full shadow-[0_20px_60px_rgba(0,10,35,0.9),0_0_45px_rgba(40,107,255,0.35)] p-2 bg-gradient-to-tr from-[#06132D] via-[#0A1F48] to-[#112D69] border border-white/20">
            
            {/* Outer Bezel with Polished Silver Texture */}
            <div className="w-full h-full rounded-full p-2.5 bg-gradient-to-br from-white/30 via-slate-800 to-[#030817] shadow-inner relative flex items-center justify-center">
              
              {/* Bezel markers ring */}
              <div className="absolute inset-2 rounded-full border border-white/10 flex items-center justify-center" />

              {/* Watch Dial Face */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#06132D] to-[#020510] relative flex items-center justify-center overflow-hidden border border-electric/30">
                
                {/* Sunburst radial dial texture */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,107,255,0.25)_0%,transparent_70%)]" />

                {/* Dial Hour Indices (12 hours) */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-full flex justify-center py-2 pointer-events-none"
                    style={{ transform: `rotate(${i * 30}deg)` }}
                  >
                    <div 
                      className={`rounded-full ${
                        i % 3 === 0 
                          ? 'w-1.5 h-4 bg-gradient-to-b from-white to-ice shadow-[0_0_6px_#8EBFFF]' 
                          : 'w-1 h-2.5 bg-silver/60'
                      }`} 
                    />
                  </div>
                ))}

                {/* AVYRA 2K26 Chronograph Brand on Dial */}
                <div className="absolute top-[26%] flex flex-col items-center">
                  <span className="font-serif text-[11px] sm:text-xs font-bold tracking-widest metallic-text">
                    AVYRA
                  </span>
                  <span className="text-[7px] tracking-[0.25em] text-ice-light uppercase">
                    CHRONO 2K26
                  </span>
                </div>

                {/* Subdial (Small Seconds / MGIT Emblem) */}
                <div className="absolute bottom-[22%] w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/15 bg-navy-deep/60 flex items-center justify-center">
                  <span className="text-[7px] font-bold text-ice uppercase tracking-wider">MGIT</span>
                </div>

                {/* Hands Pivot Center Nut */}
                <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_white] z-30 border border-slate-700" />

                {/* Hour Hand: Locked precisely to 9:30 (midway between 9 and 10 = 285 deg) */}
                <div 
                  className="absolute z-20 w-1.5 h-16 sm:h-20 origin-bottom rounded-full bg-gradient-to-t from-silver via-white to-ice shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                  style={{ 
                    bottom: '50%', 
                    transform: 'rotate(285deg)', 
                    transformOrigin: '50% 100%' 
                  }}
                >
                  <div className="w-1.5 h-3 rounded-full bg-electric mt-1" />
                </div>

                {/* Minute Hand: Locked precisely to 30 mins (pointing down = 180 deg) */}
                <div 
                  className="absolute z-20 w-1 h-22 sm:h-26 origin-bottom rounded-full bg-gradient-to-t from-silver via-white to-luminous shadow-[0_0_10px_rgba(142,191,255,0.8)]"
                  style={{ 
                    bottom: '50%', 
                    transform: 'rotate(180deg)', 
                    transformOrigin: '50% 100%' 
                  }}
                >
                  <div className="w-1 h-4 rounded-full bg-ice mt-1" />
                </div>

                {/* Second Hand: Electric blue needle pointing to 12 (0 deg) with counterweight */}
                <div 
                  className="absolute z-25 w-[1.5px] h-24 sm:h-28 origin-bottom bg-electric-bright shadow-[0_0_12px_#286BFF]"
                  style={{ 
                    bottom: '50%', 
                    transform: 'rotate(0deg)', 
                    transformOrigin: '50% 100%' 
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white -mt-0.5" />
                </div>

              </div>

            </div>

            {/* Watch Crown on Right (3 o'clock) */}
            <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-3 h-6 bg-gradient-to-r from-slate-400 to-slate-200 rounded-r-md border border-slate-600 shadow-md" />

          </div>

          <DiamondStar size={24} className="absolute -top-3 -right-3 z-30" />
        </motion.div>

        {/* Inauguration Reveal Card (The Grand 09:30 AM Awakening) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="w-full max-w-xl"
        >
          <GlassCard glow className="p-6 sm:p-8 border-electric/40">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-electric/25 border border-electric/50 flex items-center justify-center text-white shadow-[0_0_15px_rgba(40,107,255,0.5)]">
                  <Sparkles size={24} />
                </div>
                <div className="text-left">
                  <span className="text-xs font-semibold tracking-widest text-ice uppercase block">
                    Event 01 • Inauguration
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    The Grand Inauguration
                  </h3>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold font-sans text-electric-bright tracking-tight">
                  09:30 AM
                </div>
                <div className="text-xs text-silver flex items-center gap-1 justify-end">
                  <MapPin size={12} className="text-ice" />
                  <span>Venue: {EVENT_DATA.venue}</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm sm:text-base text-silver-light text-left leading-relaxed">
              Lighting of the ceremonial lamp, traditional blessings, and the official opening address marking the inception of AVYRA 2K26.
            </p>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-silver">
              <span className="flex items-center gap-1.5 text-ice font-medium">
                <Clock size={14} /> Schedule sequence begins below
              </span>
              <a 
                href="#schedule" 
                className="flex items-center gap-1 text-white hover:text-electric-bright font-semibold transition-colors"
              >
                <span>View Full Schedule</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </GlassCard>
        </motion.div>

      </div>
    </section>
  );
};
