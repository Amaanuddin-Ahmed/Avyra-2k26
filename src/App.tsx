import React from 'react';
import { Navbar } from './components/ui/Navbar';
import { BackgroundAtmosphere } from './components/ui/BackgroundAtmosphere';
import { HeroSection } from './components/sections/HeroSection';
import { WelcomeSection } from './components/sections/WelcomeSection';
import { WatchRevealSection } from './components/sections/WatchRevealSection';
import { ScheduleSection } from './components/sections/ScheduleSection';
import { FacultySection } from './components/sections/FacultySection';
import { CoordinatorsSection } from './components/sections/CoordinatorsSection';
import { FinalReminderSection } from './components/sections/FinalReminderSection';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#030817] text-[#F5F8FF] selection:bg-[#286BFF]/40 selection:text-white">
      {/* Dynamic Ambient Background System */}
      <BackgroundAtmosphere />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Structured Experiential Flow */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Cinematic Hero */}
        <HeroSection />

        {/* 2 & 3. Sakura Blossom Tree, Falling Petals & Senior Welcome to MGIT */}
        <WelcomeSection />

        {/* 4. Luxury Watch & 09:30 AM Inauguration Reveal */}
        <WatchRevealSection />

        {/* 5. Signature Kinetic AVYRA Typography & 7 Glass Schedule Panels */}
        <ScheduleSection />

        {/* 6. Honourable Guests (Principal, HOD, Faculty Coordinator) */}
        <FacultySection />

        {/* 7. AVYRA Coordinators (Continuous Loop & Orbital Deck) */}
        <CoordinatorsSection />

        {/* 8. Final Reminder, Instagram Connection & Creator Credit */}
        <FinalReminderSection />
      </main>
    </div>
  );
};

export default App;
