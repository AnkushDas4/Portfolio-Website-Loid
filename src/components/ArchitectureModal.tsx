import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Zap, 
  Lock, 
  Radio, 
  Key, 
  Send, 
  Activity, 
  Shield, 
  Database, 
  Code2, 
  Terminal, 
  Package, 
  Palette, 
  Minimize2, 
  FileCode 
} from 'lucide-react';
import { Project } from '../data/portfolioData';
import { sound } from '../utils/audio';

const flowIconMap: Record<string, React.ElementType> = {
  Lock,
  Radio,
  Key,
  Send,
  Activity,
  Shield,
  Database,
  CheckCircle: CheckCircle2,
  Code2,
  Cpu,
  Terminal,
  Package,
  Palette,
  Minimize2,
  FileCode,
  Zap
};

interface ArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClickSound();
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-3xl glass-panel-glow border border-cyan-500/40 rounded-3xl p-5 sm:p-8 shadow-2xl z-10 my-4 sm:my-8 max-h-[88vh] sm:max-h-[85vh] overflow-y-auto no-scrollbar"
        >
          {/* Glowing Aura Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          {/* Close Button */}
          <button
            onClick={() => {
              sound.playClickSound();
              onClose();
            }}
            onMouseEnter={() => sound.playHoverBlip()}
            className="absolute top-4 sm:top-5 right-4 sm:top-5 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-400 transition-all z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pr-10">
            <img 
              src={project.logo} 
              alt={project.name} 
              className="w-12 sm:w-14 h-12 sm:h-14 p-2 sm:p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 object-contain shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.2)]" 
            />
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  {project.category}
                </span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-[10px] sm:text-xs font-mono text-emerald-400 font-semibold">
                  {project.statusLabel}
                </span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white font-mono">
                {project.name}
              </h3>
            </div>
          </div>

          {/* Tagline & Description */}
          <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-5 sm:mb-6 font-light">
            {project.description}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="p-2.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-[10px] sm:text-xs font-mono text-slate-400 mb-0.5 truncate">
                  {metric.label}
                </div>
                <div className="text-xs sm:text-lg font-bold font-mono text-cyan-300 truncate">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Protocol Flow Nodes */}
          {project.flowNodes && project.flowNodes.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
                <Layers className="w-4 h-4" />
                <span>Protocol Data Flow Pipeline</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                {project.flowNodes.map((node, i) => {
                  const NodeIcon = flowIconMap[node.icon] || Cpu;
                  return (
                    <div 
                      key={node.title} 
                      className="p-3 rounded-xl bg-black/60 border border-cyan-500/20 flex flex-col justify-between relative group hover:border-cyan-400 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <NodeIcon className="w-4 h-4 text-cyan-400" />
                        <span className="text-[10px] font-mono text-slate-500">0{i+1}</span>
                      </div>
                      <div className="text-xs font-bold font-mono text-white mb-0.5">
                        {node.title}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight font-mono">
                        {node.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Architecture Specifications */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
              <Cpu className="w-4 h-4" />
              <span>Architectural Specifications</span>
            </div>
            <div className="space-y-2 sm:space-y-2.5">
              {project.architectureDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="mb-6 sm:mb-8">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">
              Tech Stack & Dependencies
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4 border-t border-slate-800">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHoverBlip()}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs sm:text-sm hover:shadow-neon-cyan transition-all"
            >
              <span>Live System</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHoverBlip()}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl glass-panel border border-slate-700 hover:border-slate-500 text-slate-200 text-xs sm:text-sm font-mono transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Org</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
