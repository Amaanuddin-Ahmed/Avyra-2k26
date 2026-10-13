import React, { useRef, useState, useEffect } from 'react';
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
  Utensils, 
  Clock, 
  MapPin 
} from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress through the entire schedule timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  // Gliding docking positions for Crystalline AVYRA:
  // Starts left (Event 1), moves right (Event 2), left (Event 3), right (Event 4),
  // left (Event 5), right (Event 6), left (Event 7), right (Event 8), then docks to corner!
  const xAvyra = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25, 0.38, 0.5, 0.62, 0.75, 0.88, 1],
    ["-28%", "28%", "-26%", "26%", "-24%", "24%", "-22%", "22%", "38%"]
  );

  const rotateAvyra = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [-4, 3, -3, 2, 0]
  );

  const scaleAvyra = useTransform(
    scrollYProgress,
    [0, 0.88, 1],
    [1, 0.95, 0.65] // Final pearl docking scales down to 0.65
  );

  // Pearl glow transition at the finale
  const pearlGlow = useTransform(
    scrollYProgress,
    [0.85, 0.95, 1],
    [0, 0.7, 1]
  );

  const iconMap = {
    sparkles: Sparkles,
    cake: Cake,
    mic: Mic,
    disc: Disc,
    music: Music,
    heart: Heart,
    gift: Gift,
    utensils: Utensils,
  };

  return (
    <section 
      id="schedule" 
      ref={containerRef}
      className="relative min-h-screen pt-12 pb-28 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden"
    >
      {/* FLOATING CRYSTALLINE AVYRA TYPOGRAPHY (Docking Beside Timeline Cards) */}
      <div 
        className="pointer-events-none sticky top-28 left-0 right-0 w-full flex items-center justify-center select-none z-0 py-2 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          style={{ 
            x: xAvyra, 
            rotate: rotateAvyra, 
            scale: scaleAvyra 
          }}
          className="relative transition-all duration-300"
        >
          {/* Crystalline Glass Display Text */}
          <div className="relative px-6 py-2 rounded-3xl bg-white/[0.03] backdrop-blur-sm border border-white/10 shadow-[0_0_35px_rgba(40,107,255,0.25)]">
            <span className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-ice-light to-electric-glow drop-shadow-[0_4px_16px_rgba(40,107,255,0.6)]">
              AVYRA
            </span>

            {/* Pearlescent Shimmer Overlay for Finale */}
            <motion.div 
              style={{ opacity: pearlGlow }}
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-100/20 via-pink-200/30 to-cyan-200/30 blur-md pointer-events-none"
            />
          </div>
        </motion.div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-5xl mx-auto relative z-10 mt-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <DiamondStar size={16} />
            <span className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-ice">
              Curated Event Sequence
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
            className="mt-3 text-base sm:text-xl text-silver-light font-light"
          >
            A meticulously choreographed itinerary of joy, performances, ceremonies, and refreshments.
          </motion.p>
        </div>

        {/* Central Connecting Timeline Line */}
        <div className="relative">
          {/* Vertical Glowing Trail */}
          <div 
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-electric via-ice to-electric/30 shadow-[0_0_12px_rgba(40,107,255,0.8)]" 
            aria-hidden="true"
          />

          {/* Schedule Items List */}
          <div className="space-y-10 sm:space-y-14">
            {SCHEDULE_ITEMS.map((item, index) => {
              const Icon = iconMap[item.iconName];
              const isEven = index % 2 === 1; // Alternating 0-indexed

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, delay: index * 0.06 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node with Glowing Diamond */}
                  <div 
                    className="absolute left-6 md:left-1/2 top-7 -translate-x-1/2 z-20 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#020817] border-2 border-electric flex items-center justify-center shadow-[0_0_15px_rgba(40,107,255,0.9)]">
                      <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    </div>
                  </div>

                  {/* Card Container (Alternating on desktop, offset on mobile) */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                    isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                  }`}>
                    <GlassCard 
                      glow={index === 0 || index === SCHEDULE_ITEMS.length - 1}
                      className="p-6 sm:p-8 group hover:scale-[1.02] transition-transform"
                    >
                      {/* Top Header */}
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
                            Thursday, 15 Oct 2026
                          </span>
                        </div>
                      </div>

                      {/* Prominent Time Display */}
                      <div className={`flex items-center gap-2 mb-2 font-sans ${
                        isEven ? 'md:justify-end' : ''
                      }`}>
                        <Clock size={18} className="text-ice-light shrink-0" />
                        <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                          {item.time}
                        </span>
                      </div>

                      {/* Event Title */}
                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-luminous tracking-wide mt-1">
                        {item.title}
                      </h3>

                      {/* Description */}
                      {item.description && (
                        <p className="mt-3 text-sm sm:text-base md:text-lg text-silver-light font-normal leading-relaxed">
                          {item.description}
                        </p>
                      )}

                      {/* Venue Badge */}
                      <div className={`mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-silver ${
                        isEven ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        <MapPin size={13} className="text-ice" />
                        <span>{item.venueBadge || "Venue: E-101 • MGIT"}</span>
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
