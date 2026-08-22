import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Terminal, 
  Layers, 
  Cpu, 
  Network, 
  GitCommit, 
  Mail, 
  ExternalLink, 
  X,
  ArrowRight
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaletteItem {
  id: string;
  title: string;
  category: 'Section' | 'Project' | 'Skill' | 'Link';
  icon: React.ElementType;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollTo = (id: string) => {
    sound.playClickSound();
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const paletteItems: PaletteItem[] = [
    // Sections
    { id: 'sec-hero', title: 'Home & Identity Telemetry', category: 'Section', icon: Terminal, action: () => scrollTo('hero') },
    { id: 'sec-phil', title: 'Mobile-Native Philosophy & Matrix', category: 'Section', icon: Cpu, action: () => scrollTo('philosophy') },
    { id: 'sec-proj', title: 'Featured Projects & Architectures', category: 'Section', icon: Layers, action: () => scrollTo('projects') },
    { id: 'sec-radar', title: 'Tech Stack & Molecular Radar', category: 'Section', icon: Network, action: () => scrollTo('radar') },
    { id: 'sec-time', title: 'Career & Circuit Odyssey Timeline', category: 'Section', icon: GitCommit, action: () => scrollTo('timeline') },
    { id: 'sec-term', title: 'Interactive CLI Terminal', category: 'Section', icon: Terminal, action: () => scrollTo('terminal') },
    { id: 'sec-cont', title: 'Encrypted Contact & Transmissions', category: 'Section', icon: Mail, action: () => scrollTo('contact') },

    // Projects
    ...PORTFOLIO_DATA.projects.map((p) => ({
      id: `proj-${p.id}`,
      title: `${p.name} — ${p.tagline}`,
      category: 'Project' as const,
      icon: Layers,
      action: () => scrollTo('projects')
    })),

    // External Links
    {
      id: 'ext-sednium',
      title: 'Sednium Technologies Official Website',
      category: 'Link',
      icon: ExternalLink,
      action: () => window.open(PORTFOLIO_DATA.company.url, '_blank')
    },
    {
      id: 'ext-github',
      title: 'Ankush Das GitHub Profile',
      category: 'Link',
      icon: ExternalLink,
      action: () => window.open(PORTFOLIO_DATA.contact.github, '_blank')
    }
  ];

  const filteredItems = query.trim() === ''
    ? paletteItems
    : paletteItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playClickSound();
        onClose();
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        sound.playClickSound();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        sound.playHoverBlip();
        setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        sound.playHoverBlip();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              sound.playClickSound();
              onClose();
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-xl glass-panel-glow border border-cyan-500/40 rounded-3xl p-4 shadow-2xl z-10 overflow-hidden"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-800">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search sections, systems, skills, or links..."
                className="w-full bg-transparent text-white font-mono text-sm outline-none placeholder:text-slate-500 caret-cyan-400"
              />
              <button
                onClick={() => {
                  sound.playClickSound();
                  onClose();
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="mt-3 max-h-80 overflow-y-auto space-y-1 pr-1 no-scrollbar">
              {filteredItems.length === 0 ? (
                <div className="text-center py-8 text-xs font-mono text-slate-500">
                  No matching systems or routes found.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = selectedIndex === idx;

                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => {
                        sound.playHoverBlip();
                        setSelectedIndex(idx);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 shadow-sm'
                          : 'hover:bg-slate-900/60 border border-transparent text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <div>
                          <div className="text-xs sm:text-sm font-medium font-mono truncate">{item.title}</div>
                          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{item.category}</div>
                        </div>
                      </div>

                      <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'translate-x-1 text-cyan-400' : 'text-slate-600'}`} />
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Guide */}
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 px-2">
              <span>Navigation: ↑ ↓ Enter</span>
              <span>Esc to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
