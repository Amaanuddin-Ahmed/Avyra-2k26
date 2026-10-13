import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { DiamondStar } from '../ui/DiamondStar';
import { Clock, Sparkles, MapPin, ArrowRight, Radio } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';

export const WatchRevealSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(new Date());

  // Real-time ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute live angles
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = ((hours % 12) + minutes / 60 + seconds / 3600) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;

  // Format digital string
  const formattedDigital = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  // Scroll-tied 3D rotation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 0, 18]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -12]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.88, 1, 1, 0.92]);

  return (
    <section 
      id="watch-reveal" 
      ref={sectionRef}
      className="relative min-h-[90vh] py-20 px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background radial lighting flare */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-electric/15 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        
        {/* Intro Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-3"
        >
          <DiamondStar size={16} />
          <span className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-ice">
            The Countdown & Real-Time Chronometer
          </span>
          <DiamondStar size={16} />
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-luminous tracking-tight"
        >
          Moments in Motion: <span className="metallic-text">The Hour of AVYRA</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-3 text-base sm:text-xl text-silver max-w-2xl font-light"
        >
          Tracking every fleeting second leading to October 15, 2026. At 09:30 AM sharp, the doors of E-101 swing open.
        </motion.p>

        {/* Real-time Interactive 3D Chronograph Timepiece */}
        <div style={{ perspective: 1200 }} className="my-10 w-full flex flex-col items-center justify-center">
          <motion.div
            style={{ rotateY, rotateX, scale }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-92 md:h-92 flex items-center justify-center select-none"
          >
            {/* Glowing Orbital Ring around Watch */}
            <div className="absolute inset-0 rounded-full border border-electric/40 shadow-[0_0_40px_rgba(40,107,255,0.35)] animate-spin-very-slow pointer-events-none" />
            <div className="absolute -inset-4 rounded-full border border-dashed border-ice/20 animate-spin-very-slow [animation-direction:reverse] pointer-events-none" />
            
            {/* Watch Bezel & Body */}
            <div className="relative w-full h-full rounded-full shadow-[0_25px_60px_rgba(0,8,25,0.9),0_0_50px_rgba(40,107,255,0.35)] p-2 bg-gradient-to-tr from-[#06132D] via-[#0A1F48] to-[#112D69] border border-white/25">
              
              {/* Outer Polished Rim */}
              <div className="w-full h-full rounded-full p-2.5 bg-gradient-to-br from-white/30 via-slate-800 to-[#020817] shadow-inner relative flex items-center justify-center">
                
                {/* Watch Dial Face */}
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#06132D] to-[#020510] relative flex items-center justify-center overflow-hidden border border-electric/35 shadow-inner">
                  
                  {/* Radial Sunburst Texture */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,107,255,0.3)_0%,transparent_70%)]" />

                  {/* 12 Hour Indices */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-full h-full flex justify-center py-2 pointer-events-none"
                      style={{ transform: `rotate(${i * 30}deg)` }}
                    >
                      <div 
                        className={`rounded-full ${
                          i % 3 === 0 
                            ? 'w-1.5 h-4 bg-gradient-to-b from-white to-ice shadow-[0_0_8px_#8EBFFF]' 
                            : 'w-1 h-2.5 bg-silver/60'
                        }`} 
                      />
                    </div>
                  ))}

                  {/* Dial Branding */}
                  <div className="absolute top-[24%] flex flex-col items-center">
                    <span className="font-serif text-[11px] sm:text-xs font-bold tracking-widest metallic-text">
                      AVYRA
                    </span>
                    <span className="text-[7px] tracking-[0.25em] text-ice-light uppercase">
                      CHRONO 2K26
                    </span>
                  </div>

                  {/* Live Local Time Indicator Badge */}
                  <div className="absolute bottom-[24%] flex flex-col items-center">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-electric/20 border border-electric/40 text-[8px] font-mono font-bold text-ice">
                      <Radio size={8} className="text-emerald-400 animate-pulse" />
                      <span>{formattedDigital}</span>
                    </div>
                    <span className="text-[6px] uppercase tracking-widest text-silver/70 mt-0.5">
                      LIVE LOCAL TIME
                    </span>
                  </div>

                  {/* Central Pivot Nut */}
                  <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_white] z-30 border border-slate-700" />

                  {/* Real-Time Live Hour Hand */}
                  <div 
                    className="absolute z-20 w-1.5 h-16 sm:h-20 origin-bottom rounded-full bg-gradient-to-t from-silver via-white to-ice shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                    style={{ 
                      bottom: '50%', 
                      transform: `rotate(${hourAngle}deg)`, 
                      transformOrigin: '50% 100%' 
                    }}
                  >
                    <div className="w-1.5 h-3 rounded-full bg-electric mt-1" />
                  </div>

                  {/* Real-Time Live Minute Hand */}
                  <div 
                    className="absolute z-20 w-1 h-22 sm:h-26 origin-bottom rounded-full bg-gradient-to-t from-silver via-white to-luminous shadow-[0_0_10px_rgba(142,191,255,0.8)]"
                    style={{ 
                      bottom: '50%', 
                      transform: `rotate(${minuteAngle}deg)`, 
                      transformOrigin: '50% 100%' 
                    }}
                  >
                    <div className="w-1 h-4 rounded-full bg-ice mt-1" />
                  </div>

                  {/* Real-Time Live Second Hand */}
                  <div 
                    className="absolute z-25 w-[1.5px] h-24 sm:h-28 origin-bottom bg-electric-bright shadow-[0_0_12px_#286BFF]"
                    style={{ 
                      bottom: '50%', 
                      transform: `rotate(${secondAngle}deg)`, 
                      transformOrigin: '50% 100%' 
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white -mt-0.5" />
                  </div>

                </div>

              </div>

              {/* Watch Crown at 3 o'clock */}
              <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-3 h-6 bg-gradient-to-r from-slate-400 to-slate-200 rounded-r-md border border-slate-600 shadow-md" />

            </div>

            <DiamondStar size={24} className="absolute -top-3 -right-3 z-30" />
          </motion.div>
        </div>

        {/* Official Inauguration Card (09:30 AM Event Kickoff) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2 }}
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
                    Event 01 • Opening Ceremony
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
                <Clock size={14} /> Schedule timeline begins below
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
