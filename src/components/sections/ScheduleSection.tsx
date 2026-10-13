import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { DiamondStar } from '../ui/DiamondStar';
import { SCHEDULE_ITEMS } from '../../data/schedule';
import { 
  Sparkles, 
  Cake, 
  Mic, 
  Disc, 
  Music, 
  Heart, 
  Gift, 
  Clock 
} from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked interpolation for kinetic editorial AVYRA typography
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Gliding horizontally back-and-forth across the schedule experience
  const xAvyra = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["-25%", "25%", "-15%", "20%", "-10%"]
  );
  
  const rotateAvyra = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-3, 2, -2]
  );

  const iconMap = {
    sparkles: Sparkles,
    cake: Cake,
    mic: Mic,
    disc: Disc,
    music: Music,
    heart: Heart,
    gift: Gift,
  };

  return (
    <section 
      id="schedule" 
      ref={containerRef}
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden"
    >
      {/* KINETIC FLOATING AVYRA WORDMARK (CherryFizz / Dora Inspired) */}
      <div 
        className="pointer-events-none sticky top-1/3 left-0 right-0 w-full flex items-center justify-center select-none overflow-hidden z-0 py-8 opacity-25 md:opacity-35"
        aria-hidden="true"
      >
        <motion.div
          style={{ x: xAvyra, rotate: rotateAvyra }}
          className="whitespace-nowrap"
        >
          <span className="font-serif text-[18vw] font-black tracking-widest text-transparent uppercase bg-clip-text bg-gradient-to-r from-electric/40 via-ice/50 to-electric-glow/40 drop-shadow-[0_0_40px_rgba(40,107,255,0.4)]">
            A V Y R A
          </span>
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <DiamondStar size={16} />
            <span className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-ice">
              Programme Itinerary
            </span>
            <DiamondStar size={16} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-luminous tracking-tight"
          >
            Official Event <span className="metallic-text">Schedule</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-base sm:text-xl text-silver-light font-light"
          >
            A meticulously curated timeline of celebrations, performances, and memories at E-101.
          </motion.p>
        </div>

        {/* Central Connecting Timeline Line (Desktop & Tablet) */}
        <div className="relative">
          {/* Vertical Glowing Trail */}
          <div 
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-electric via-ice to-electric/30 shadow-[0_0_12px_rgba(40,107,255,0.8)]" 
            aria-hidden="true"
          />

          {/* Schedule Items List */}
          <div className="space-y-12 sm:space-y-16">
            {SCHEDULE_ITEMS.map((item, index) => {
              const Icon = iconMap[item.iconName];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node with Glowing Diamond */}
                  <div 
                    className="absolute left-6 md:left-1/2 top-7 -translate-x-1/2 z-20 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#030817] border-2 border-electric flex items-center justify-center shadow-[0_0_15px_rgba(40,107,255,0.9)]">
                      <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    </div>
                  </div>

                  {/* Card Container (Offset on mobile, alternating on desktop) */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                    isEven ? 'md:pr-14 md:text-right' : 'md:pl-14 md:text-left'
                  }`}>
                    <GlassCard 
                      glow={index === 0 || index === SCHEDULE_ITEMS.length - 1}
                      className="p-6 sm:p-8 group hover:scale-[1.02] transition-transform"
                    >
                      {/* Top Meta Header */}
                      <div className={`flex items-center gap-3 mb-3 ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}>
                        <div className="w-10 h-10 rounded-xl bg-electric/20 border border-electric/40 flex items-center justify-center text-ice-light group-hover:bg-electric group-hover:text-white transition-colors shadow-[0_0_12px_rgba(40,107,255,0.4)]">
                          <Icon size={20} />
                        </div>
                        <div>
                          <span className="text-xs uppercase tracking-widest font-bold text-ice block">
                            Event {index + 1 < 10 ? `0${index + 1}` : index + 1}
                          </span>
                          <span className="text-xs text-silver">
                            Thursday, 15 Oct
                          </span>
                        </div>
                      </div>

                      {/* Prominent Time Display */}
                      <div className="flex items-center gap-2 mb-2 font-sans">
                        <Clock size={18} className="text-ice-light shrink-0" />
                        <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                          {item.time}
                        </span>
                      </div>

                      {/* Event Title */}
                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-luminous tracking-wide mt-2">
                        {item.title}
                      </h3>

                      {/* Description */}
                      {item.description && (
                        <p className="mt-3 text-sm sm:text-base md:text-lg text-silver-light font-normal leading-relaxed">
                          {item.description}
                        </p>
                      )}

                      {/* Special Highlight Tag for Highlights */}
                      <div className={`mt-5 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-silver ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-electric-bright" />
                        <span>Venue: E-101 • MGIT</span>
                      </div>
                    </GlassCard>
                  </div>

                  {/* Empty Spacer Column for Desktop Grid Alternation */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
