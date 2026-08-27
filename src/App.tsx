import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SpotlightGrid } from './components/SpotlightGrid';
import { CustomCursor } from './components/CustomCursor';

export const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Default to dark mode or user preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <SpotlightGrid className="bg-[#fafafa] dark:bg-[#0b0d13] text-slate-900 dark:text-slate-100 selection:bg-blue-500/20 selection:text-blue-900 dark:selection:text-blue-200 font-sans transition-colors duration-200">
      {/* Desktop-only sleek circular custom cursor */}
      <CustomCursor />

      {/* Global Navigation */}
      <Navbar 
        darkMode={darkMode} 
        onToggleTheme={() => setDarkMode(!darkMode)} 
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <ExperienceTimeline />
        <ProjectsShowcase />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </SpotlightGrid>
  );
};

export default App;
