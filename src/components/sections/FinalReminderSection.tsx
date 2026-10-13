import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { DiamondStar } from '../ui/DiamondStar';
import { EVENT_DATA } from '../../data/event';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Instagram, 
  Sparkles, 
  Heart, 
  ArrowUpRight, 
  CalendarPlus 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FinalReminderSection: React.FC = () => {
  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.75 },
      colors: ['#286BFF', '#8EBFFF', '#F5F8FF', '#F2A7D4', '#38bdf8'],
    });
  };

  // Google Calendar Link generator
  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent("AVYRA 2K26 — CSE 1 Freshers' Party");
    const details = encodeURIComponent(
      "Where It All Begins. CSE 1 Freshers' Party at MGIT. Be ready for the grand inauguration, performances, and memories!"
    );
    const location = encodeURIComponent("E-101, Mahatma Gandhi Institute of Technology (MGIT)");
    const dates = "20261015T040000Z/20261015T083000Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <footer 
      id="reminder" 
      className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-t from-electric/20 via-electric/5 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* Grand Invitation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <GlassCard glow className="p-8 sm:p-14 text-center border-electric/40 shadow-electric-lg overflow-hidden relative">
            
            {/* Top decorative diamond stars */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <DiamondStar size={18} />
              <span className="text-xs sm:text-sm font-bold tracking-[0.4em] uppercase text-ice">
                The Final Call
              </span>
              <DiamondStar size={18} />
            </div>

            {/* Main Headline */}
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight uppercase">
              See you at <span className="metallic-text">AVYRA!</span>
            </h2>

            {/* Supporting Copy */}
            <p className="mt-6 text-lg sm:text-2xl text-silver-light font-light max-w-2xl mx-auto leading-relaxed">
              Pack your excitement for the day — let's kick it off together.
            </p>

            {/* Key Event Details Grid */}
            <div className="mt-10 py-6 px-4 sm:px-8 bg-[#020817]/70 rounded-2xl border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-electric/20 border border-electric/40 flex items-center justify-center text-ice mb-2">
                  <Calendar size={20} />
                </div>
                <span className="text-xs uppercase tracking-widest text-silver font-semibold">Date</span>
                <span className="text-lg sm:text-xl font-bold text-white mt-0.5">15 October 2026</span>
                <span className="text-xs text-ice/80">Thursday</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-electric/20 border border-electric/40 flex items-center justify-center text-ice mb-2">
                  <Clock size={20} />
                </div>
                <span className="text-xs uppercase tracking-widest text-silver font-semibold">Time</span>
                <span className="text-lg sm:text-xl font-bold text-white mt-0.5">9:30 AM</span>
                <span className="text-xs text-ice/80">Onwards</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-electric/20 border border-electric/40 flex items-center justify-center text-ice mb-2">
                  <MapPin size={20} />
                </div>
                <span className="text-xs uppercase tracking-widest text-silver font-semibold">Venue</span>
                <span className="text-lg sm:text-xl font-bold text-white mt-0.5">E-101</span>
                <span className="text-xs text-ice/80">MGIT Campus</span>
              </div>

            </div>

            {/* Call to Actions (Add to Calendar & Celebrate) */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={createGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={triggerConfetti}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-electric via-electric-glow to-electric hover:shadow-electric-glow hover:scale-105 transition-all shadow-[0_0_25px_rgba(40,107,255,0.5)]"
              >
                <CalendarPlus size={18} />
                <span>Add to Calendar</span>
              </a>

              <button
                onClick={triggerConfetti}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold uppercase tracking-wider text-silver-light hover:text-white bg-white/5 border border-white/15 hover:bg-white/10 transition-all"
              >
                <Sparkles size={18} className="text-ice" />
                <span>Celebrate AVYRA</span>
              </button>
            </div>

          </GlassCard>
        </motion.div>

        {/* INSTAGRAM CONNECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 flex flex-col items-center justify-center text-center"
        >
          <a
            href={EVENT_DATA.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3.5 px-8 py-4 rounded-2xl bg-[#06132D]/80 border border-electric/30 hover:border-electric transition-all shadow-glass hover:shadow-[0_0_30px_rgba(40,107,255,0.4)] hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <Instagram size={22} />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-silver/80 block">
                Official Social Channel
              </span>
              <span className="text-base sm:text-lg font-bold text-white group-hover:text-ice-light transition-colors flex items-center gap-1.5">
                Connect with us on Instagram
                <ArrowUpRight size={16} className="text-ice" />
              </span>
            </div>
          </a>
          <span className="text-xs text-silver/60 mt-2 font-mono">
            @avyra.2026
          </span>
        </motion.div>

        {/* FOOTER & CREATOR CREDIT */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-serif text-sm tracking-widest text-white uppercase font-bold">
              AVYRA 2K26 • CSE 1
            </span>
            <span className="text-xs text-silver mt-0.5">
              Mahatma Gandhi Institute of Technology (MGIT)
            </span>
          </div>

          {/* Exact Glass-outline Box: Made by Amaann... with love */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-silver/30 bg-[#06132D]/40 backdrop-blur-sm shadow-[0_0_15px_rgba(184,199,228,0.15)] hover:border-ice/60 transition-colors">
            <Heart size={14} className="text-blossom fill-blossom/40" />
            <span className="text-xs sm:text-sm font-medium tracking-wide text-silver-light">
              Made by Amaann... with love
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};
