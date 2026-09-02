import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, ShieldCheck, Activity, GitBranch, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'security' | 'benchmarks' | 'flow'>('architecture');

  useEffect(() => {
    if (project) {
      setActiveTab('architecture');
      sound.playActivateHum();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [project, onClose]);

  if (!project) return null;

  const arch = project.architecture;

  const tabs = [
    { id: 'architecture', label: 'Layers', fullLabel: 'System Layers', icon: Layers },
    { id: 'security', label: 'Security', fullLabel: 'Security & Crypto', icon: ShieldCheck },
    { id: 'benchmarks', label: 'Metrics', fullLabel: 'Benchmarks & Telemetry', icon: Activity },
    { id: 'flow', label: 'Pipeline', fullLabel: 'Data Flow Pipeline', icon: GitBranch },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Frosted Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClickSound();
            onClose();
          }}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-500/10 z-10 flex flex-col no-scrollbar"
        >
          {/* Modal Header */}
          <div className="sticky top-0 z-20 flex items-start justify-between p-4 sm:p-6 md:p-8 bg-white/95 dark:bg-[#0c0f17]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="pr-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                  Architecture Deep Dive
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                <span className="text-xs font-semibold text-slate-500 truncate max-w-[120px] sm:max-w-none">{project.name}</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {project.name}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 mt-0.5 sm:mt-1 line-clamp-1">
                {project.tagline}
              </p>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                title="GitHub Repo"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                title="Live Website"
                aria-label="Live Website"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  sound.playClickSound();
                  onClose();
                }}
                className="p-2 rounded-xl text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Tab Navigation on Mobile */}
          <div className="px-4 sm:px-8 py-2.5 border-b border-slate-100 dark:border-slate-800/80 flex items-center overflow-x-auto no-scrollbar gap-1.5 sm:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClickSound();
                    setActiveTab(tab.id as typeof activeTab);
                  }}
                  className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer select-none whitespace-nowrap shrink-0 min-h-[36px] ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    <span className="sm:hidden">{tab.label}</span>
                    <span className="hidden sm:inline">{tab.fullLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Modal Content Body */}
          <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
            {/* Tab 1: System Layers */}
            {activeTab === 'architecture' && arch?.layers && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 sm:space-y-4"
              >
                <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Multi-Tier Architectural Stack
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {arch.layers.map((layer, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#121622] border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 truncate">
                            {layer.name}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono font-semibold bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                            {layer.tech}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                          {layer.role}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {layer.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 2: Security Specifications */}
            {activeTab === 'security' && arch?.securitySpec && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 sm:space-y-4"
              >
                <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Zero-Knowledge & Cryptographic Invariants
                </div>
                <div className="space-y-2.5 sm:space-y-3">
                  {arch.securitySpec.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#121622] border border-slate-200/80 dark:border-slate-800/80 flex items-start gap-3"
                    >
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">
                          {sec.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {sec.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 3: Benchmarks & Telemetry */}
            {activeTab === 'benchmarks' && arch?.benchmarks && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 sm:space-y-4"
              >
                <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Performance & Resource Metrics
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {arch.benchmarks.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-[#121622] border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between"
                    >
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                        {b.label}
                      </div>
                      <div className="text-xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono tracking-tight my-1.5 sm:my-2">
                        {b.value}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {b.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 4: Data Flow Pipeline */}
            {activeTab === 'flow' && arch?.dataFlow && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 sm:space-y-4"
              >
                <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Sequential Protocol Lifecycle
                </div>
                <div className="relative pl-7 sm:pl-8 space-y-4 sm:space-y-6 border-l-2 border-blue-500/30 ml-2.5">
                  {arch.dataFlow.map((step) => (
                    <div key={step.step} className="relative">
                      <div className="absolute -left-[35px] sm:-left-[39px] top-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center ring-4 ring-white dark:ring-[#0c0f17]">
                        {step.step}
                      </div>
                      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-[#121622] border border-slate-200/80 dark:border-slate-800/80">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">
                          {step.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-6 bg-slate-50/80 dark:bg-[#0a0d14]/80 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all min-h-[40px] w-full sm:w-auto"
              >
                <span>Launch Live Node</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
