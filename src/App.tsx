import React, { useState, useEffect } from 'react';
import { CanvasBackground } from './components/CanvasBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IdentityPhilosophy } from './components/IdentityPhilosophy';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { TechRadar } from './components/TechRadar';
import { TechJourneyTimeline } from './components/TechJourneyTimeline';
import { TerminalConsole } from './components/TerminalConsole';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';

export const App: React.FC = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  useEffect(() => {
    // Ensure initial scroll position starts at the top (Hero) on all devices
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#06080e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      {/* 3D Dynamic Interactive Particle Background */}
      <CanvasBackground />

      {/* Cyber Grid Background Overlay */}
      <div className="fixed inset-0 bg-grid-cyber pointer-events-none opacity-40 z-0" />

      {/* Global Navigation HUD */}
      <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <IdentityPhilosophy />
        <ProjectsShowcase />
        <TechRadar />
        <TechJourneyTimeline />
        <TerminalConsole />
        <ContactSection />
      </main>

      {/* Executive Footer */}
      <Footer />

      {/* Quick Search Command Palette (Cmd+K) */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
    </div>
  );
};

export default App;
