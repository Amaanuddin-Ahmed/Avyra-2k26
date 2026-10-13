import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { DiamondStar } from '../ui/DiamondStar';
import { EVENT_DATA } from '../../data/event';

export const HeroSection: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      {/* Top Disco Ball Accent (Inspired by Poster Top Right) */}
      <div 
        className="absolute top-2 right-4 sm:right-12 md:right-24 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none opacity-85 select-none"
        aria-hidden="true"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Wire */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[1.5px] h-16 bg-gradient-to-b from-white/10 to-silver/60" />
          {/* Ball body */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-slate-200 via-blue-900 to-[#030817] p-[1px] shadow-[0_0_35px_rgba(142,191,255,0.45)] border border-white/30 relative overflow-hidden">
            {/* Mirror grid pattern */}
            <div className="w-full h-full rounded-full opacity-60 bg-[radial-gradient(#8EBFFF_1px,transparent_1px)] [background-size:6px_6px] animate-spin-very-slow" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
          </div>
          {/* Sparkle flare emitting from disco ball */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-electric/25 rounded-full blur-xl" />
          <DiamondStar size={24} className="absolute top-1 right-2" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center text-center my-auto py-8">
        
        {/* CSE 1 PRESENTS Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          <div className="h-px w-10 sm:w-20 md:w-32 bg-gradient-to-r from-transparent to-silver/70" />
          <div className="flex flex-col items-center">
            <span className="text-sm sm:text-base md:text-lg font-bold tracking-[0.35em] text-silver-light uppercase font-sans">
              CSE 1
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.45em] text-ice/80 uppercase mt-0.5">
              P R E S E N T S
            </span>
          </div>
          <div className="h-px w-10 sm:w-20 md:w-32 bg-gradient-to-l from-transparent to-silver/70" />
        </motion.div>

        {/* Center Display: AVYRA 2K26 with Orbital Ring & Crystal Bevels */}
        <div className="relative my-4 sm:my-6 flex items-center justify-center w-full">
          
          {/* Glowing Elliptical Orbital Ring (Directly from Poster) */}
          <svg 
            className="absolute -inset-x-8 sm:-inset-x-16 -inset-y-10 sm:-inset-y-16 w-[115%] sm:w-[125%] h-[150%] max-w-4xl mx-auto pointer-events-none select-none z-0" 
            viewBox="0 0 800 350" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Primary Orbit Ellipse */}
            <ellipse 
              cx="400" 
              cy="175" 
              rx="370" 
              ry="115" 
              transform="rotate(-11 400 175)" 
              stroke="url(#orbitGradient)" 
              strokeWidth="2" 
              strokeDasharray="9 4" 
              className="opacity-90 drop-shadow-[0_0_12px_rgba(40,107,255,0.9)]"
            />
            {/* Secondary Thin Orbital Echo */}
            <ellipse 
              cx="400" 
              cy="175" 
              rx="360" 
              ry="95" 
              transform="rotate(-6 400 175)" 
              stroke="rgba(142, 191, 255, 0.45)" 
              strokeWidth="1.2" 
            />
            <defs>
              <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#286BFF" stopOpacity="0.3" />
                <stop offset="40%" stopColor="#F5F8FF" stopOpacity="1" />
                <stop offset="70%" stopColor="#8EBFFF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#286BFF" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Diamond stars positioned on the orbit rings */}
          <DiamondStar size={20} className="absolute -top-3 left-[12%] sm:left-[18%] z-20 hidden xs:inline-flex" />
          <DiamondStar size={26} className="absolute top-[8%] right-[8%] sm:right-[14%] z-20" />
          <DiamondStar size={18} className="absolute -bottom-2 left-[24%] z-20" />

          {/* Core AVYRA Title with Metallic Bevel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 px-4"
          >
            {/* Background Aura */}
            <div className="absolute inset-0 bg-electric/25 blur-[55px] rounded-full scale-125 pointer-events-none" />

            <h1 className="relative font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[145px] font-black tracking-wider uppercase leading-none select-none">
              {/* Metallic Glass Text Styling */}
              <span className="metallic-text drop-shadow-[0_10px_25px_rgba(3,8,23,0.9)] relative inline-block">
                AVYRA
                {/* Embedded Diamond Flares on Letter Accents */}
                <span className="absolute top-[32%] left-[12%] -translate-x-1/2 -translate-y-1/2">
                  <DiamondStar size={20} />
                </span>
                <span className="absolute top-[18%] right-[22%] -translate-x-1/2 -translate-y-1/2">
                  <DiamondStar size={18} />
                </span>
              </span>
            </h1>

            {/* 2K26 Sub-badge */}
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="text-sm sm:text-lg md:text-xl font-bold tracking-[0.5em] text-ice-light/90 font-sans uppercase">
                2 K 2 6
              </span>
            </div>
          </motion.div>
        </div>

        {/* Tagline: WHERE IT ALL BEGINS (Poster exact styling with flanking stars) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 sm:mt-8 flex flex-col items-center justify-center"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
            <DiamondStar size={16} />
            <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-ice/60" />
            <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-[0.2em] text-luminous uppercase metallic-text-silver">
              {EVENT_DATA.tagline}
            </p>
            <div className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-ice/60" />
            <DiamondStar size={16} />
          </div>
        </motion.div>

        {/* Triple Info Pods (Poster Exact Layout: Date | Time | Venue) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-10 sm:mt-12 w-full max-w-2xl mx-auto"
        >
          <div className="glass-panel rounded-2xl py-5 px-4 sm:px-8 grid grid-cols-3 divide-x divide-white/10 shadow-[0_8px_32px_rgba(0,10,35,0.6)]">
            
            {/* DATE */}
            <div className="flex flex-col items-center justify-center px-2">
              <div className="w-10 h-10 rounded-xl bg-electric/15 border border-electric/30 flex items-center justify-center text-ice mb-2">
                <Calendar size={20} />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-silver uppercase mb-1">
                DATE
              </span>
              <span className="text-sm sm:text-lg md:text-xl font-bold text-white tracking-wide font-sans">
                {EVENT_DATA.date}
              </span>
              <span className="text-[10px] text-ice/70 font-medium hidden sm:block">
                {EVENT_DATA.weekday}
              </span>
            </div>

            {/* TIME */}
            <div className="flex flex-col items-center justify-center px-2">
              <div className="w-10 h-10 rounded-xl bg-electric/15 border border-electric/30 flex items-center justify-center text-ice mb-2">
                <Clock size={20} />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-silver uppercase mb-1">
                TIME
              </span>
              <span className="text-sm sm:text-lg md:text-xl font-bold text-white tracking-wide font-sans">
                {EVENT_DATA.time}
              </span>
              <span className="text-[10px] text-ice/70 font-medium hidden sm:block">
                Onwards
              </span>
            </div>

            {/* VENUE */}
            <div className="flex flex-col items-center justify-center px-2">
              <div className="w-10 h-10 rounded-xl bg-electric/15 border border-electric/30 flex items-center justify-center text-ice mb-2">
                <MapPin size={20} />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-silver uppercase mb-1">
                VENUE
              </span>
              <span className="text-sm sm:text-lg md:text-xl font-bold text-white tracking-wide font-sans">
                {EVENT_DATA.venue}
              </span>
              <span className="text-[10px] text-ice/70 font-medium hidden sm:block">
                MGIT Campus
              </span>
            </div>

          </div>
        </motion.div>

        {/* Institution Branding (Poster Footer Exact) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-8 flex items-center justify-center gap-3 opacity-80 hover:opacity-100 transition-opacity"
        >
          {/* MGIT Gold Seal Emblem */}
          <div className="w-6 h-6 rounded-full border border-amber-400/60 bg-amber-500/20 flex items-center justify-center text-[9px] font-bold text-amber-200">
            M
          </div>
          <span className="font-serif text-xs sm:text-sm tracking-[0.25em] text-silver-light uppercase">
            {EVENT_DATA.institution}
          </span>
        </motion.div>
      </div>

      {/* Gentle Scroll Invitation Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-6 flex flex-col items-center justify-center gap-1.5 text-silver/60 hover:text-ice transition-colors cursor-pointer"
        onClick={() => {
          const el = document.getElementById('welcome');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-xs uppercase tracking-widest font-medium">Discover AVYRA</span>
        <ChevronDown size={18} className="animate-bounce text-ice" />
      </motion.div>
    </section>
  );
};
