import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { DiamondStar } from '../ui/DiamondStar';
import { Sparkles, Camera, ArrowUpRight, FolderHeart, Calendar } from 'lucide-react';

export const PreviousFreshersSection: React.FC = () => {
  const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1R9VUv49iLd3bsOPnFomaB88PQBQcvYpv?usp=sharing";

  // Curated showcase memory highlight cards
  const memoryCards = [
    { title: "Stage Euphoria", tag: "Performances", desc: "Electrifying dance choreography and stage applause." },
    { title: "Crowd Melodies", tag: "Singing", desc: "Acoustic anthems echoing across MGIT halls." },
    { title: "The Welcoming Roses", tag: "Tradition", desc: "Heartfelt smiles welcoming every fresher with flowers." },
    { title: "Batch Unity", tag: "Memories", desc: "Seniors and juniors united as one department." },
    { title: "Grand Cake Cutting", tag: "Celebration", desc: "A sweet ceremonial kick-off to lifelong college years." },
    { title: "Candid Laughter", tag: "Behind the Scenes", desc: "Spontaneous joy captured in timeless frames." },
  ];

  // Duplicate for seamless infinite marquee loop
  const marqueeCards = [...memoryCards, ...memoryCards];

  return (
    <section 
      id="gallery" 
      className="relative min-h-[80vh] py-24 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden flex flex-col justify-center"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-electric/10 rounded-full blur-[140px] pointer-events-none" />

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
            Unforgettable memories, boundless energy, and the legacy of CSE 1.
          </motion.p>

          {/* Primary Action Button: Explore Full Drive */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex items-center justify-center"
          >
            <a
              href={DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-electric via-electric-glow to-electric hover:shadow-electric-glow hover:scale-105 transition-all shadow-[0_0_25px_rgba(40,107,255,0.45)]"
            >
              <FolderHeart size={18} />
              <span>Explore Full Drive</span>
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>

        {/* CONTINUOUS PHOTO MARQUEE STREAM */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Edge Gradient Fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#020817] to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#020817] to-transparent z-20" />

          <div className="flex items-center gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
            {marqueeCards.map((card, idx) => (
              <div 
                key={`${card.title}-${idx}`}
                className="w-72 sm:w-80 shrink-0 group rounded-2xl"
              >
                <GlassCard 
                  glow={idx % 3 === 0}
                  className="p-6 flex flex-col h-full border-white/10 group-hover:border-electric/60"
                >
                  {/* Photo Frame Container */}
                  <div className="relative mb-4 w-full aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-[#0A1F48] to-[#020817] border border-white/10 flex flex-col items-center justify-center p-4">
                    <Camera size={36} className="text-ice-light/60 group-hover:scale-110 group-hover:text-ice transition-transform" />
                    <span className="text-[11px] font-semibold text-silver/70 tracking-wider uppercase mt-2">
                      {card.tag}
                    </span>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#020817]/80 text-[9px] font-mono text-ice border border-white/10">
                      CSE 1 Archives
                    </div>
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-wider text-ice mb-1 block">
                    {card.tag}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-white tracking-wide group-hover:text-ice-light transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-silver mt-2 leading-relaxed">
                    {card.desc}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Highlights Banner: AVYRA 2K26 Highlights Gallery — Coming Soon! */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="mt-14 max-w-3xl mx-auto"
        >
          <GlassCard glow className="p-6 sm:p-8 text-center border-electric/40 bg-gradient-to-r from-[#06132D]/90 via-[#0A1F48]/80 to-[#06132D]/90">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/20 border border-electric/40 text-ice text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles size={13} />
              <span>Future Spotlight</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              AVYRA 2K26 Highlights Gallery — Coming Soon!
            </h3>

            <p className="mt-2 text-sm sm:text-base text-silver-light font-light">
              “Capturing today's memories for tomorrow.”
            </p>
          </GlassCard>
        </motion.div>

      </div>
    </section>
  );
};
