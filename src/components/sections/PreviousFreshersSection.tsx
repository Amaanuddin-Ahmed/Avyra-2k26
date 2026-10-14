import React from 'react';
import { motion } from 'framer-motion';
import { DiamondStar } from '../ui/DiamondStar';
import { Sparkles, FolderHeart, ArrowUpRight } from 'lucide-react';
import { GALLERY_PHOTOS } from '../../data/gallery';

export const PreviousFreshersSection: React.FC = () => {
  const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1R9VUv49iLd3bsOPnFomaB88PQBQcvYpv?usp=sharing";

  // Duplicate for seamless infinite continuous loop
  const continuousStream = [...GALLERY_PHOTOS, ...GALLERY_PHOTOS];

  return (
    <section 
      id="gallery" 
      className="relative min-h-[80vh] py-24 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden flex flex-col justify-center"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-electric/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <DiamondStar size={16} />
            <span className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-ice">
              Archived Memories & Legacy
            </span>
            <DiamondStar size={16} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-luminous tracking-tight"
          >
            Explore Our <span className="metallic-text">Last Year Freshers</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-3 text-base sm:text-xl text-silver-light font-light max-w-2xl mx-auto"
          >
            OG's of MGIT celebrating AVYRA — unforgettable memories, boundless energy, and the legacy of CSE 1.
          </motion.p>
        </div>

        {/* CONTINUOUS PHOTO STREAM (Infinite marquee - real photos from Google Drive) */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Edge Gradient Fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#020817] to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#020817] to-transparent z-20" />

          <div className="flex items-center gap-6 w-max animate-marquee-gallery hover:[animation-play-state:paused]">
            {continuousStream.map((item, idx) => (
              <div 
                key={`${item.num}-${idx}`}
                className="w-72 sm:w-88 shrink-0 group rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 hover:border-electric/70 transition-all duration-300"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#0A1F48]">
                  <img 
                    src={item.src} 
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle glass reflection edge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BELOW PHOTO STREAM: VIEW FULL DRIVE BUTTON */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 flex items-center justify-center"
        >
          <a
            href={DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-electric via-electric-glow to-electric hover:shadow-electric-glow hover:scale-105 transition-all shadow-[0_0_25px_rgba(40,107,255,0.45)]"
          >
            <FolderHeart size={18} />
            <span>View Full Drive</span>
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

        {/* UPCOMING AVYRA 2K26 HIGHLIGHTS DIVISION WITH COLORFUL GLOWING SVG BORDER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="mt-16 max-w-3xl mx-auto relative rounded-3xl p-1 overflow-hidden"
        >
          {/* Animated Colorful Glowing SVG Border */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-500 via-cyan-400 to-electric animate-spin-very-slow blur-sm opacity-80" />
          
          <div className="relative rounded-[22px] bg-gradient-to-r from-[#06132D] via-[#0A1F48] to-[#06132D] p-6 sm:p-10 text-center border border-white/20 shadow-[0_0_40px_rgba(56,189,248,0.35)] backdrop-blur-xl">
            {/* Colorful SVG Border Accent */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none rounded-[22px]" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect 
                x="2" 
                y="2" 
                width="99%" 
                height="98%" 
                rx="20" 
                fill="none" 
                stroke="url(#rainbowGlow)" 
                strokeWidth="2" 
                strokeDasharray="16 8"
                className="animate-pulse-slow"
              />
              <defs>
                <linearGradient id="rainbowGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F2A7D4" />
                  <stop offset="40%" stopColor="#38bdf8" />
                  <stop offset="70%" stopColor="#286BFF" />
                  <stop offset="100%" stopColor="#F2A7D4" />
                </linearGradient>
              </defs>
            </svg>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-cyan-400/50 text-cyan-200 text-xs font-bold tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(56,189,248,0.4)]">
              <Sparkles size={14} className="text-cyan-300" />
              <span>UPCOMING EVENT HIGHLIGHTS</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide">
              AVYRA 2K26 Highlights Gallery — Coming Soon!
            </h3>

            <p className="mt-3 text-base sm:text-lg text-silver-light font-light max-w-xl mx-auto">
              "Capturing today's memories for tomorrow."
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
