import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Sparkles, Heart } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';

export const WelcomeSection: React.FC = () => {
  return (
    <section 
      id="welcome" 
      className="relative min-h-screen py-28 px-4 sm:px-6 lg:px-12 z-10 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-20">
        
        {/* Top Category Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
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

        {/* Spacious 2-Column Layout with Comfortable Gap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Sincere Invitation & Welcome (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* The Iconic OGs of CSE 1 Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold leading-[1.15] text-luminous tracking-tight">
                The OGs of <span className="metallic-text">CSE 1</span> bring you a celebration to remember.
              </h2>
              
              <p className="mt-5 text-lg sm:text-xl md:text-2xl text-silver-light font-light leading-relaxed">
                One department. Two batches. Countless memories waiting to be made. <strong className="text-white font-semibold">CSE 1</strong> invites its newest members to begin their MGIT journey with a day filled with energy, laughter, and unforgettable moments.
              </p>
            </motion.div>

            {/* WELCOME TO MGIT GLASS CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.15 }}
            >
              <GlassCard glow className="p-6 sm:p-9 border-l-4 border-l-blossom">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-blossom/20 border border-blossom/40 text-blossom">
                    <Sparkles size={22} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-ice-light font-semibold">
                      Department of Computer Science & Engineering
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                      Welcome to MGIT. Your next chapter starts here.
                    </h3>
                  </div>
                </div>

                <p className="mt-3 text-base sm:text-lg text-silver-light/95 font-normal leading-relaxed">
                  To our wonderful freshers: welcome to a journey of discovery, friendship, challenges, and growth. May you find your people, discover what you're capable of, and turn every opportunity into a step towards something extraordinary. Here's to new beginnings and the memories we'll create together.
                </p>

                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-electric/25 border border-electric/40 flex items-center justify-center font-serif text-sm font-bold text-white shadow-[0_0_12px_rgba(40,107,255,0.4)]">
                      26
                    </div>
                    <div>
                      <div className="text-xs text-silver">Batch of 2026</div>
                      <div className="text-sm font-bold text-white">Class of CSE 1</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blossom bg-blossom/10 border border-blossom/20 px-4 py-2 rounded-full">
                    <span>{EVENT_DATA.fullDateString}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blossom" />
                    <span>Venue: {EVENT_DATA.venue}</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

          </div>

          {/* Right Column: Clean, Spacious Framed Celebration Poster (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 0.25 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Soft Ambient Cyan-Pink Glow */}
            <div className="absolute w-72 sm:w-88 h-72 sm:h-88 rounded-full bg-gradient-to-tr from-blossom/20 via-electric/15 to-cyan-400/15 blur-[90px] pointer-events-none" />
            
            <div className="relative w-full max-w-sm sm:max-w-md mx-auto group">
              <div className="p-3 sm:p-4 rounded-3xl bg-[#06132D]/70 border border-white/15 backdrop-blur-xl shadow-[0_0_40px_rgba(242,167,212,0.25),0_0_60px_rgba(40,107,255,0.2)] transition-all group-hover:border-blossom/40">
                
                {/* Poster Artwork Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] w-full border border-white/10 shadow-inner bg-[#030817]">
                  <img 
                    src="/images/poster.png" 
                    alt="AVYRA 2K26 Official Event Artwork" 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/85 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="px-3 py-1 rounded-full bg-[#020817]/85 border border-blossom/40 text-blossom font-semibold backdrop-blur-md">
                      Freshers 2K26
                    </span>
                    <span className="text-white/90 font-serif font-bold tracking-wider">
                      MGIT • E-101
                    </span>
                  </div>
                </div>

                {/* Caption Footer */}
                <div className="mt-3 px-2 py-1 flex items-center justify-between text-xs text-silver">
                  <span className="font-serif font-semibold text-white tracking-wide">
                    New Beginnings in Full Bloom
                  </span>
                  <span className="text-blossom/90 flex items-center gap-1 font-medium">
                    <Sparkles size={13} />
                    Where Memories Begin
                  </span>
                </div>

              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
