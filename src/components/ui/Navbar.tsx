import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Users, Instagram, Menu, X, ArrowUpRight, Camera } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Schedule', href: '#schedule', icon: Calendar },
    { name: 'Faculty', href: '#faculty', icon: Sparkles },
    { name: 'Coordinators', href: '#coordinators', icon: Users },
    { name: 'Memories', href: '#gallery', icon: Camera },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-[#020817]/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_20px_rgba(0,8,30,0.5)]' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a 
          href="#hero" 
          className="group flex items-center gap-2.5 text-luminous transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric rounded-lg px-2 py-1"
          aria-label="AVYRA 2K26 Home"
        >
          <div className="w-7 h-7 rounded-full bg-electric/20 border border-electric/40 flex items-center justify-center shadow-[0_0_12px_rgba(40,107,255,0.6)]">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
          <span className="font-serif text-lg sm:text-xl font-bold tracking-widest metallic-text">
            AVYRA
          </span>
          <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-electric/20 border border-electric/30 text-ice-light tracking-wider uppercase">
            2K26
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#06132D]/70 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md shadow-glass">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-silver-light hover:text-white px-3.5 py-1.5 rounded-full transition-colors hover:bg-white/5"
            >
              {link.name}
            </a>
          ))}
          <a
            href={EVENT_DATA.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-electric to-electric-glow hover:from-electric-bright hover:to-electric px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(40,107,255,0.4)] transition-all ml-1"
          >
            <Instagram size={13} />
            <span>Instagram</span>
            <ArrowUpRight size={12} />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-electric"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#020817]/95 border-b border-white/10 backdrop-blur-xl px-4 pt-3 pb-6 animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-silver-light hover:text-white hover:bg-white/5 rounded-xl"
              >
                <link.icon size={18} className="text-ice" />
                {link.name}
              </a>
            ))}
            <a
              href={EVENT_DATA.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 mt-2 text-base font-semibold text-white bg-electric/20 border border-electric/40 rounded-xl"
            >
              <span className="flex items-center gap-3">
                <Instagram size={18} className="text-ice" />
                Connect on Instagram
              </span>
              <ArrowUpRight size={18} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
