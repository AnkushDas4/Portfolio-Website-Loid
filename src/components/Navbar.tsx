import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Layers, 
  Cpu, 
  Network, 
  GitCommit, 
  Mail, 
  Volume2, 
  VolumeX, 
  Search, 
  ExternalLink,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { sound } from '../utils/audio';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isSoundOn, setIsSoundOn] = useState<boolean>(sound.getSoundState());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Terminal },
    { id: 'philosophy', label: 'Philosophy', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'radar', label: 'Radar', icon: Network },
    { id: 'timeline', label: 'Timeline', icon: GitCommit },
    { id: 'terminal', label: 'Console', icon: Terminal },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 240;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    sound.playClickSound();
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const nextState = sound.toggleMute();
    setIsSoundOn(nextState);
  };

  return (
    <>
      {/* Top HUD Status Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 md:px-8 py-3 pointer-events-none transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Logo & Status Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            <MagneticButton strength={0.3}>
              <button 
                onClick={() => scrollToSection('hero')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel border border-cyan-500/30 hover:border-cyan-400 text-slate-100 transition-all group"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse" />
                <span className="font-mono font-bold tracking-wider text-xs sm:text-sm group-hover:text-cyan-400 transition-colors">
                  LØID<span className="text-cyan-400">.SYS</span>
                </span>
              </button>
            </MagneticButton>

            {/* Live Node Badge (Desktop & Tablet) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel text-xs font-mono text-slate-400 border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>NODE:</span>
              <span className="text-emerald-400 font-semibold">{PORTFOLIO_DATA.hero.location}</span>
            </div>
          </div>

          {/* Quick Action Dock */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <MagneticButton strength={0.3}>
              <button
                onClick={onOpenCommandPalette}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl glass-panel border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all shadow-sm"
                title="Command Palette (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] bg-slate-800/80 border border-slate-700 rounded text-slate-400">
                  ⌘K
                </kbd>
              </button>
            </MagneticButton>

            {/* Sound Toggle */}
            <MagneticButton strength={0.3}>
              <button
                onClick={handleToggleSound}
                className={`p-2 rounded-xl glass-panel border transition-all text-xs ${
                  isSoundOn 
                    ? 'border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.2)]' 
                    : 'border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
                title={isSoundOn ? 'Mute Audio FX' : 'Enable Audio FX'}
                aria-label="Toggle Sound Effects"
              >
                {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </MagneticButton>

            {/* Sednium Official Link (Desktop) */}
            <MagneticButton strength={0.3} className="hidden md:inline-block">
              <a
                href={PORTFOLIO_DATA.company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 hover:border-cyan-400 text-cyan-300 hover:text-cyan-200 text-xs font-mono transition-all"
              >
                <span>sednium.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </MagneticButton>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl glass-panel border border-slate-800 text-slate-400 hover:text-white md:hidden"
              aria-label="Toggle navigation drawer"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 text-cyan-400" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down HUD Drawer Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-3 p-4 rounded-3xl glass-panel-glow border border-cyan-500/40 shadow-2xl max-w-6xl mx-auto md:hidden pointer-events-auto"
            >
              <div className="grid grid-cols-2 gap-2 mb-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl text-xs font-mono transition-all ${
                        isActive
                          ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                          : 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <a
                  href={PORTFOLIO_DATA.company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>sednium.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-slate-500">{PORTFOLIO_DATA.hero.location}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Centered Floating Bottom Navigation Dock (Mobile & Desktop) */}
      <motion.nav 
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 25 }}
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#080c16]/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex items-center justify-center gap-1 sm:gap-2 max-w-[94vw] w-auto"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <MagneticButton key={item.id} strength={0.2}>
              <button
                onClick={() => scrollToSection(item.id)}
                aria-label={item.label}
                className={`relative px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 text-xs font-mono transition-all group outline-none shrink-0 ${
                  isActive
                    ? 'text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-cyan-500/20 border border-cyan-400/60 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-300'}`} />
                <span className="hidden md:inline relative z-10">{item.label}</span>
              </button>
            </MagneticButton>
          );
        })}
      </motion.nav>
    </>
  );
};
