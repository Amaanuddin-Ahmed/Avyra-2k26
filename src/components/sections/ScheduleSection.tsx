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
  Utensils, 
  Clock, 
  MapPin 
} from 'lucide-react';

export const ScheduleSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineCardsRef = useRef<HTMLDivElement>(null);

  // Scroll progress through the schedule cards area specifically (not the header!)
  const { scrollYProgress } = useScroll({
    target: timelineCardsRef,
    offset: ["start center", "end end"]
  });

  // 3D Aeroplane-like flight scrollytelling path:
  // Glides and banks (pitch, roll, lateral yaw) down the timeline decks
  const xAvyra = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    ["-22vw", "22vw", "-18vw", "18vw", "-15vw", "15vw", "-10vw", "12vw"]
  );

  // Aeroplane banking roll (rotateZ) as it turns corners
  const rollAvyra = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [-14, 14, -12, 12, -10, 10, -6, 0]
  );

  // Aeroplane pitch (rotateX) diving down through the decks
  const pitchAvyra = useTransform(
    scrollYProgress,
    [0, 0.5, 0.85, 1],
    [18, 5, -8, 0]
  );

  // Depth scale and flight altitude
  const scaleAvyra = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7, 0.9, 1],
    [0.9, 1.05, 0.95, 0.85, 0.68]
  );

  // Pearlescent shimmer when reaching the final deck
  const pearlGlow = useTransform(
    scrollYProgress,
    [0.85, 0.95, 1],
    [0, 0.75, 1]
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
      className="relative min-h-screen pt-28 pb-32 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* SECTION HEADER - Cleanly isolated with ample margin so nothing overlaps it! */}
        <div className="text-center max-w-2xl mx-auto mb-20 sm:mb-24 relative z-20">
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
            OFFICIAL EVENT <span className="metallic-text">SCHEDULE</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-base sm:text-xl text-silver-light font-light"
          >
            A meticulously choreographed itinerary of joy, performances, ceremonies, and refreshments.
          </motion.p>
        </div>

        {/* TIMELINE DECK CONTAINER - Contains the 3D Sticky Flying Element & Timeline Cards */}
        <div ref={timelineCardsRef} className="relative">
          
          {/* STICKY 3D SCROLLYTELLING "AVYRA" AEROPLANE-LIKE ELEMENT */}
          {/* Position sticky below the header, gliding down through the schedule decks */}
          <div 
            className="pointer-events-none sticky top-36 sm:top-40 left-0 right-0 w-full flex items-center justify-center select-none z-30 py-2 overflow-hidden"
            style={{ perspective: 1000 }}
            aria-hidden="true"
          >
            <motion.div
              style={{ 
                x: xAvyra, 
                rotateZ: rollAvyra, 
                rotateX: pitchAvyra,
                scale: scaleAvyra 
              }}
              className="relative transition-all duration-150"
            >
              {/* Beveled Crystalline Metallic Typography (Exact Poster Aesthetics) */}
              <div className="relative px-6 sm:px-8 py-2.5 rounded-3xl bg-[#06132D]/70 backdrop-blur-md border border-electric/40 shadow-[0_10px_35px_rgba(40,107,255,0.4)] flex items-center justify-center">
                
                {/* Luminous Diamond Flare on letter vertex */}
                <DiamondStar size={16} className="absolute -top-1.5 left-4" />
                <DiamondStar size={14} className="absolute -bottom-1.5 right-6" />

                <span className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-widest uppercase metallic-text drop-shadow-[0_4px_20px_rgba(40,107,255,0.8)]">
                  AVYRA
                </span>

                {/* Shimmering Pearlescent Glow when completing the flight past deck 8 */}
                <motion.div 
                  style={{ opacity: pearlGlow }}
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-200/25 via-pink-300/35 to-cyan-300/35 blur-md pointer-events-none"
                />
              </div>
            </motion.div>
          </div>

          {/* Central Connecting Glowing Timeline Line */}
          <div 
            className="absolute left-6 md:left-1/2 top-6 bottom-6 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-electric via-ice to-electric/30 shadow-[0_0_12px_rgba(40,107,255,0.8)] z-10" 
            aria-hidden="true"
          />

          {/* Schedule Deck Items List */}
          <div className="space-y-12 sm:space-y-16 relative z-20">
            {SCHEDULE_ITEMS.map((item, index) => {
              const Icon = iconMap[item.iconName];
              const isEven = index % 2 === 1;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, delay: 0.05 }}
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

                  {/* Card Container */}
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

                  {/* Empty Spacer Column for Desktop Alternation */}
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
