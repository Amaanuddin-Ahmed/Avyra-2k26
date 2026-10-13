import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/ui/Navbar';
import { BackgroundAtmosphere } from './components/ui/BackgroundAtmosphere';
import { PetalEngine } from './components/ui/PetalEngine';
import { CinematicIntro } from './components/sections/CinematicIntro';
import { HeroSection } from './components/sections/HeroSection';
import { WelcomeSection } from './components/sections/WelcomeSection';
import { WatchRevealSection } from './components/sections/WatchRevealSection';
import { ScheduleSection } from './components/sections/ScheduleSection';
import { FacultySection } from './components/sections/FacultySection';
import { CoordinatorsSection } from './components/sections/CoordinatorsSection';
import { PreviousFreshersSection } from './components/sections/PreviousFreshersSection';
import { FinalReminderSection } from './components/sections/FinalReminderSection';

export const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [showPetals, setShowPetals] = useState(false);

  // Activate petals once user enters or scrolls
  const handleEnterExperience = () => {
    setHasEntered(true);
    setTimeout(() => {
      setShowPetals(true);
    }, 1200);
  };

  // If user accesses directly via hash link (e.g. #schedule), bypass intro automatically
  useEffect(() => {
    if (window.location.hash) {
      setHasEntered(true);
      setShowPetals(true);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020817] text-[#F5F8FF] selection:bg-[#286BFF]/40 selection:text-white">
      {/* 1. CINEMATIC INTERACTIVE OPENING EXPERIENCE (Sparkle & Zoom-through-light) */}
      <AnimatePresence>
        {!hasEntered && (
          <CinematicIntro onEnter={handleEnterExperience} />
        )}
      </AnimatePresence>

      {/* 2. ACTIVE 4K COSMIC BACKGROUND SYSTEM */}
      <BackgroundAtmosphere />

      {/* 3. CONTINUOUS CHERRY BLOSSOM PETAL PARTICLE ENGINE */}
      <PetalEngine active={showPetals} />

      {/* 4. GLOBAL NAVIGATION */}
      <Navbar />

      {/* 5. NARRATIVE JOURNEY */}
      <main className="relative z-10 flex flex-col">
        {/* Cinematic Hero */}
        <HeroSection />

        {/* Welcome to MGIT & Senior Invitation */}
        <WelcomeSection />

        {/* Real-time Watch & Inauguration Countdown */}
        <WatchRevealSection />

        {/* Crystalline AVYRA & 8-Item Schedule Timeline */}
        <ScheduleSection />

        {/* Our Beloved Faculty */}
        <FacultySection />

        {/* 15 Coordinators Directory */}
        <CoordinatorsSection />

        {/* Explore Our Last Year Freshers */}
        <PreviousFreshersSection />

        {/* Final Celebratory Reminder & Footer Credit */}
        <FinalReminderSection />
      </main>
    </div>
  );
};

export default App;
