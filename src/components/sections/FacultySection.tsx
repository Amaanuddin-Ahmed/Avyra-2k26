import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { DiamondStar } from '../ui/DiamondStar';
import { FACULTY_MEMBERS } from '../../data/faculty';
import { Award, GraduationCap, UserCheck } from 'lucide-react';

export const FacultySection: React.FC = () => {
  const roleIcons = [GraduationCap, Award, UserCheck];

  return (
    <section 
      id="faculty" 
      className="relative min-h-[80vh] py-28 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden flex flex-col justify-center"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-electric/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-3"
          >
            <DiamondStar size={16} />
            <span className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-ice">
              Distinguished Leadership
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
            Honourable <span className="metallic-text">Guests</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-base sm:text-xl text-silver-light font-light"
          >
            Guiding the vision of MGIT and inspiring the next generation of engineers and leaders.
          </motion.p>
        </div>

        {/* 3 Faculty Cards Grid (Desktop 3 columns, Tablet/Mobile responsive stack) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {FACULTY_MEMBERS.map((faculty, index) => {
            const Icon = roleIcons[index % roleIcons.length];

            return (
              <motion.div
                key={faculty.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="h-full"
              >
                <GlassCard 
                  glow={index === 0}
                  className="p-8 sm:p-10 h-full flex flex-col items-center text-center group border-white/10 hover:border-electric/50"
                >
                  {/* Portrait Placeholder with Dignified Crest Avatar */}
                  <div className="relative mb-6">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-electric via-white/40 to-ice shadow-[0_0_25px_rgba(40,107,255,0.4)] group-hover:shadow-[0_0_35px_rgba(40,107,255,0.65)] transition-shadow">
                      <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0A1F48] to-[#030817] flex flex-col items-center justify-center border border-white/20 overflow-hidden relative">
                        <Icon size={38} className="text-ice-light group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute bottom-1 text-[9px] uppercase tracking-widest text-silver/70 font-semibold">
                          MGIT
                        </div>
                      </div>
                    </div>
                    {/* Small Accent Star */}
                    <DiamondStar size={16} className="absolute top-1 right-1" />
                  </div>

                  {/* Role Badge */}
                  <div className="mb-3 px-3.5 py-1 rounded-full bg-electric/15 border border-electric/30 text-xs sm:text-sm font-semibold tracking-wider text-ice uppercase">
                    {faculty.role}
                  </div>

                  {/* Name (Large, Prominent, Editorial) */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide mt-1 group-hover:text-ice-light transition-colors">
                    {faculty.name}
                  </h3>

                  {/* Department / Institution */}
                  {faculty.department && (
                    <p className="mt-3 text-xs sm:text-sm text-silver font-normal leading-relaxed">
                      {faculty.department}
                    </p>
                  )}

                  {/* Dignified Footer Strip */}
                  <div className="mt-auto pt-6 w-full border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-silver/70 tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-electric" />
                    <span>Honourable Guest of Honour</span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
