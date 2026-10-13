import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { DiamondStar } from '../ui/DiamondStar';
import { Clock, Sparkles, MapPin, ArrowRight, Radio, Calendar } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';

export const WatchRevealSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(new Date());

  // Countdown to 15 October 2026, 09:30:00 AM IST
  const targetDate = new Date("2026-10-15T09:30:00+05:30").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
      setTime(new Date());
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Live watch hands calculation
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = ((hours % 12) + minutes / 60 + seconds / 3600) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;

  // Scroll perspective
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-12, 0, 12]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -8]);

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
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-3"
        >
          <DiamondStar size={16} />
          <span className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-ice">
            The Countdown to Inauguration
          </span>
          <DiamondStar size={16} />
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-luminous tracking-tight"
        >
          Countdown to <span className="metallic-text">15 October 2026</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-3 text-base sm:text-xl text-silver max-w-2xl font-light"
        >
          Every second brings us closer to the celebration. At 9:30 AM sharp, the doors of E-101 open for AVYRA 2K26.
        </motion.p>

        {/* MAIN AREA: LIVE COUNTDOWN TIMER PODS (Days, Hours, Minutes, Seconds) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="w-full max-w-3xl my-10"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            
            {/* DAYS */}
            <GlassCard glow className="p-5 sm:p-7 text-center border-electric/40">
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-black metallic-text tracking-tight block">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-ice mt-2 block">
                Days
              </span>
            </GlassCard>

            {/* HOURS */}
            <GlassCard glow className="p-5 sm:p-7 text-center border-electric/40">
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-black metallic-text tracking-tight block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-ice mt-2 block">
                Hours
              </span>
            </GlassCard>

            {/* MINUTES */}
            <GlassCard glow className="p-5 sm:p-7 text-center border-electric/40">
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-black metallic-text tracking-tight block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-ice mt-2 block">
                Minutes
              </span>
            </GlassCard>

            {/* SECONDS */}
            <GlassCard glow className="p-5 sm:p-7 text-center border-electric/40">
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-cyan-300 drop-shadow-[0_0_12px_#38bdf8] tracking-tight block">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-ice mt-2 block">
                Seconds
              </span>
            </GlassCard>

          </div>
        </motion.div>

        {/* COMPACT REFINED LUXURY TIMEPIECE (Placed smaller beside event specs) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 w-full max-w-xl"
        >
          {/* Small 3D Watch */}
          <div style={{ perspective: 800 }}>
            <motion.div 
              style={{ rotateY, rotateX }}
              className="relative w-36 h-36 rounded-full shadow-[0_15px_35px_rgba(0,8,25,0.9),0_0_25px_rgba(40,107,255,0.35)] p-1.5 bg-gradient-to-tr from-[#06132D] via-[#0A1F48] to-[#112D69] border border-white/20 flex items-center justify-center select-none"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#06132D] to-[#020510] relative flex items-center justify-center overflow-hidden border border-electric/30">
                {/* 12 Hour Indices */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-full flex justify-center py-1 pointer-events-none"
                    style={{ transform: `rotate(${i * 30}deg)` }}
                  >
                    <div className={`rounded-full ${i % 3 === 0 ? 'w-1 h-2 bg-white' : 'w-0.5 h-1.5 bg-silver/60'}`} />
                  </div>
                ))}

                {/* Dial Center Branding */}
                <span className="absolute top-[28%] font-serif text-[7px] font-bold tracking-widest text-white">
                  AVYRA
                </span>

                {/* Pivot Nut */}
                <div className="w-2.5 h-2.5 rounded-full bg-white z-30 shadow-[0_0_6px_white]" />

                {/* Hour Hand */}
                <div 
                  className="absolute z-20 w-1 h-9 origin-bottom rounded-full bg-white shadow-sm"
                  style={{ bottom: '50%', transform: `rotate(${hourAngle}deg)`, transformOrigin: '50% 100%' }}
                />

                {/* Minute Hand */}
                <div 
                  className="absolute z-20 w-0.5 h-12 origin-bottom rounded-full bg-ice shadow-sm"
                  style={{ bottom: '50%', transform: `rotate(${minuteAngle}deg)`, transformOrigin: '50% 100%' }}
                />

                {/* Second Hand */}
                <div 
                  className="absolute z-25 w-[1px] h-13 origin-bottom bg-electric-bright shadow-[0_0_6px_#286BFF]"
                  style={{ bottom: '50%', transform: `rotate(${secondAngle}deg)`, transformOrigin: '50% 100%' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Timepiece Label & Live Status */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-ice uppercase tracking-wider mb-1">
              <Radio size={12} className="text-emerald-400 animate-pulse" />
              <span>Real-Time Local Clock Active</span>
            </div>
            <p className="text-sm text-silver font-light">
              Official Inauguration programmed for <strong className="text-white">Thursday, 15 Oct 2026</strong> at <strong>09:30 AM IST</strong>.
            </p>
          </div>
        </motion.div>

        {/* Inauguration Event Reveal Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.35 }}
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
