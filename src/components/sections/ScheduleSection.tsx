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
  const sevenDecksRef = useRef<HTMLDivElement>(null);

  // Decks 1 to 7 are the active flight flightpath decks
  const mainSevenDecks = SCHEDULE_ITEMS.slice(0, 7);
  const finalDeck = SCHEDULE_ITEMS[7]; // 8th deck (Lunch & Refreshments)

  // Scroll progress through the first 7 decks specifically
  const { scrollYProgress } = useScroll({
    target: sevenDecksRef,
    offset: ["start 65%", "end 65%"]
  });

  // 1. CONTINUOUS DOWNWARD DESCENT (top: Y movement down through Decks 1 to 7)
  const topAvyra = useTransform(
    scrollYProgress,
    [0.0, 0.166, 0.333, 0.50, 0.666, 0.833, 1.0, 1.06],
    ["6%", "21%", "35%", "50%", "65%", "79%", "94%", "100%"]
  );

  // 2. HORIZONTAL ALTERNATION (x: flies into empty space beside each deck)
  // Deck 1 (Left card) -> AVYRA on Right (+250px)
  // Deck 2 (Right card) -> AVYRA on Left (-250px)
  // Deck 3 (Left card) -> AVYRA on Right (+250px)
  // Deck 4 (Right card) -> AVYRA on Left (-250px)
  // Deck 5 (Left card) -> AVYRA on Right (+250px)
  // Deck 6 (Right card) -> AVYRA on Left (-250px)
  // Deck 7 (Left card) -> AVYRA on Right (+250px)
  const xAvyra = useTransform(
    scrollYProgress,
    [
      0.0,    // Deck 1: Right empty space
      0.08,   // Banking turn across timeline
      0.166,  // Deck 2: Left empty space
      0.25,   // Banking turn across timeline
      0.333,  // Deck 3: Right empty space
      0.416,  // Banking turn across timeline
      0.50,   // Deck 4: Left empty space
      0.583,  // Banking turn across timeline
      0.666,  // Deck 5: Right empty space
      0.75,   // Banking turn across timeline
      0.833,  // Deck 6: Left empty space
      0.916,  // Banking turn across timeline
      1.0,    // Deck 7: Right empty space
      1.06    // Final departure dive
    ],
    [
      "25%", "-2%", "-25%", "2%", "25%", "-2%", "-25%", "2%", "25%", "-2%", "-25%", "2%", "25%", "35%"
    ]
  );

  // 3. AEROPLANE BANKING ROLL (rotateZ: banks in the direction of lateral flight)
  const rollAvyra = useTransform(
    scrollYProgress,
    [
      0.0, 0.08, 0.166, 0.25, 0.333, 0.416, 0.50, 0.583, 0.666, 0.75, 0.833, 0.916, 1.0, 1.06
    ],
    [
      0, -18, 0, 18, 0, -18, 0, 18, 0, -18, 0, 18, 0, 26
    ]
  );

  // 4. AEROPLANE NOSE-DOWN DIVE PITCH (rotateX: dips down as it travels between decks)
  const pitchAvyra = useTransform(
    scrollYProgress,
    [
      0.0, 0.08, 0.166, 0.25, 0.333, 0.416, 0.50, 0.583, 0.666, 0.75, 0.833, 0.916, 1.0, 1.06
    ],
    [
      0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0, 15, 0, 32
    ]
  );

  // 5. OPACITY: Stays fully visible through 7th deck, then disappears completely!
  const opacityAvyra = useTransform(
    scrollYProgress,
    [0.0, 0.95, 1.0, 1.04, 1.07],
    [1, 1, 1, 0.6, 0]
  );

  // 6. SCALE: Slight aerodynamic depth scaling during flight, shrinks upon exit
  const scaleAvyra = useTransform(
    scrollYProgress,
    [0.0, 0.5, 0.95, 1.0, 1.07],
    [1.0, 1.05, 1.0, 0.95, 0.4]
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
        
        {/* SECTION HEADER - Cleanly isolated with ample margin */}
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

        {/* MAIN TIMELINE DECKS CONTAINER */}
        <div className="relative">
          
          {/* Central Connecting Glowing Timeline Line */}
          <div 
            className="absolute left-6 md:left-1/2 top-6 bottom-6 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-electric via-ice to-electric/30 shadow-[0_0_12px_rgba(40,107,255,0.8)] z-10" 
            aria-hidden="true"
          />

          {/* FIRST 7 DECKS WRAPPER: Houses the 3D Flying Aeroplane AVYRA Element */}
          <div ref={sevenDecksRef} className="relative space-y-12 sm:space-y-16">
            
            {/* 3D SCROLLYTELLING "AVYRA" AEROPLANE FLYING DOWN THROUGH THE 7 DECKS */}
            <motion.div
              style={{
                top: topAvyra,
                left: "50%",
                x: xAvyra,
                rotateZ: rollAvyra,
                rotateX: pitchAvyra,
                scale: scaleAvyra,
                opacity: opacityAvyra,
              }}
              className="hidden md:flex pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 z-30 select-none items-center justify-center will-change-transform"
              aria-hidden="true"
            >
              {/* Supersonic 3D Aeroplane Chassis */}
              <div className="relative flex items-center justify-center px-6 py-3">
                
                {/* Aerodynamic Delta Wings Behind Wordmark */}
                <div className="absolute inset-x-0 h-12 -top-1 flex items-center justify-between pointer-events-none">
                  {/* Left Wing */}
                  <div className="w-20 h-4 bg-gradient-to-r from-electric/50 via-electric/25 to-transparent skew-x-[35deg] rounded-l-full border-t border-l border-electric/60 shadow-[0_0_20px_rgba(40,107,255,0.4)] relative">
                    <span className="absolute -top-1 left-1 w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                    <span className="absolute -top-1 left-1 w-2 h-2 rounded-full bg-cyan-200" />
                  </div>

                  {/* Right Wing */}
                  <div className="w-20 h-4 bg-gradient-to-l from-electric/50 via-electric/25 to-transparent -skew-x-[35deg] rounded-r-full border-t border-r border-electric/60 shadow-[0_0_20px_rgba(40,107,255,0.4)] relative">
                    <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-ice animate-ping" />
                    <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-ice" />
                  </div>
                </div>

                {/* Twin Supersonic Ion Thruster Exhaust Trails */}
                <div className="absolute -bottom-5 flex items-center gap-10 pointer-events-none">
                  <div className="w-2.5 h-10 bg-gradient-to-b from-electric via-cyan-400 to-transparent rounded-full blur-[2px] opacity-80 animate-pulse" />
                  <div className="w-2.5 h-10 bg-gradient-to-b from-electric via-cyan-400 to-transparent rounded-full blur-[2px] opacity-80 animate-pulse" />
                </div>

                {/* Main Crystalline Fuselage Capsule */}
                <div className="relative px-7 py-3 rounded-2xl bg-[#06132D]/90 backdrop-blur-xl border border-electric/60 shadow-[0_12px_35px_rgba(40,107,255,0.6),inset_0_1px_2px_rgba(255,255,255,0.3)] flex flex-col items-center justify-center">
                  
                  {/* Micro Flight Callout */}
                  <div className="flex items-center gap-1.5 mb-0.5 text-[9px] font-mono tracking-[0.35em] text-cyan-300 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>FLIGHT AVYRA • CSE 1</span>
                  </div>

                  {/* Crystalline Faceted Typography matching Poster */}
                  <div className="relative flex items-center justify-center">
                    <DiamondStar size={16} className="absolute -top-2 -left-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                    <DiamondStar size={14} className="absolute -bottom-1 -right-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.9)]" />

                    <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.25em] uppercase metallic-text drop-shadow-[0_4px_22px_rgba(40,107,255,0.95)]">
                      AVYRA
                    </span>
                  </div>

                  {/* Aerodynamic Speed Vanes */}
                  <div className="w-full h-0.5 mt-1 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
                </div>

              </div>
            </motion.div>

            {/* Render First 7 Decks */}
            {mainSevenDecks.map((item, index) => {
              const Icon = iconMap[item.iconName];
              const isEven = index % 2 === 1;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.65, delay: 0.05 }}
                  className={`relative flex flex-col md:flex-row items-center ${
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
                      glow={index === 0}
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

                  {/* Empty Spacer Column for Desktop Alternation with Celestial Waypoint Frame */}
                  <div className="hidden md:flex md:w-1/2 items-center justify-center p-6">
                    <div className="w-full max-w-xs h-28 rounded-2xl border border-electric/15 bg-gradient-to-b from-electric/5 via-transparent to-transparent flex flex-col items-center justify-center text-center p-4 relative group">
                      <div className="w-10 h-10 rounded-full border border-electric/25 flex items-center justify-center text-ice/40 group-hover:text-cyan-300 group-hover:border-electric/50 transition-colors">
                        <DiamondStar size={14} />
                      </div>
                      <span className="mt-2 text-[10px] tracking-[0.28em] uppercase text-silver/50 font-mono">
                        AIRSPACE • WAYPOINT 0{index + 1}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* FINAL 8TH DECK: Lunch & Refreshments (AVYRA is disappeared after the 7th deck!) */}
          {finalDeck && (
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7 }}
              className="relative flex flex-col md:flex-row items-center md:flex-row-reverse mt-12 sm:mt-16"
            >
              {/* Timeline Center Node */}
              <div 
                className="absolute left-6 md:left-1/2 top-7 -translate-x-1/2 z-20 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-8 h-8 rounded-full bg-[#020817] border-2 border-electric flex items-center justify-center shadow-[0_0_15px_rgba(40,107,255,0.9)]">
                  <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              {/* Card Container */}
              <div className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-12 md:text-right">
                <GlassCard glow className="p-6 sm:p-8 group hover:scale-[1.02] transition-transform border-electric/50">
                  {/* Top Header */}
                  <div className="flex items-center gap-3 mb-3 md:flex-row-reverse">
                    <div className="w-10 h-10 rounded-xl bg-electric/20 border border-electric/40 flex items-center justify-center text-ice-light group-hover:bg-electric group-hover:text-white transition-colors shadow-[0_0_12px_rgba(40,107,255,0.4)]">
                      <Utensils size={20} />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest font-bold text-ice block">
                        Event 08
                      </span>
                      <span className="text-xs text-silver">
                        Thursday, 15 Oct 2026
                      </span>
                    </div>
                  </div>

                  {/* Prominent Time Display */}
                  <div className="flex items-center gap-2 mb-2 font-sans md:justify-end">
                    <Clock size={18} className="text-ice-light shrink-0" />
                    <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                      {finalDeck.time}
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-luminous tracking-wide mt-1">
                    {finalDeck.title}
                  </h3>

                  {/* Description */}
                  {finalDeck.description && (
                    <p className="mt-3 text-sm sm:text-base md:text-lg text-silver-light font-normal leading-relaxed">
                      {finalDeck.description}
                    </p>
                  )}

                  {/* Venue Badge */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-silver md:justify-end">
                    <MapPin size={13} className="text-ice" />
                    <span>{finalDeck.venueBadge || "Venue: To be announced on event day"}</span>
                  </div>
                </GlassCard>
              </div>

              {/* Empty Spacer Column for Final Deck */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};
