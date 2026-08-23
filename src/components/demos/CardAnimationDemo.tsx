import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Zap, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { TiltCard } from './TiltCard';
import { BorderBeamCard } from './BorderBeamCard';

export const CardAnimationDemo: React.FC = () => {
  return (
    <section id="demo" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 relative w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 sm:mb-12 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Card Animation Variants Comparison
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Move your cursor or touch each card below to test and compare the three animation physics.
          </p>
        </div>

        {/* 3 Cards Side-by-Side Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* 1. Spotlight Card */}
          <div className="flex flex-col">
            <div className="mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Variant 1: Spotlight</span>
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                Radial mouse tracking gradient on surface
              </p>
            </div>

            <SpotlightCard className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Spotlight Physics
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    CSS Radial
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  OnyxChat Client
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Cursor position calculates dynamic radial gradient highlight on hover with smooth opacity transitions.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Kotlin
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    libp2p
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Noise
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-medium">
                <span>Hover over card</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </SpotlightCard>
          </div>

          {/* 2. Tilt Card */}
          <div className="flex flex-col">
            <div className="mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Variant 2: 3D Parallax Tilt</span>
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                3D rotation physics with spring dampening
              </p>
            </div>

            <TiltCard className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                    3D Spring Tilt
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Framer Motion
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  SHIELD Protocol
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Multi-axis parallax rotation following mouse cursor with spring return physics (`stiffness: 300, damping: 25`).
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Go
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    eBPF
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Redis
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-purple-600 dark:text-purple-400 font-medium">
                <span>Tilt mouse across card</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </TiltCard>
          </div>

          {/* 3. Border Beam Card */}
          <div className="flex flex-col">
            <div className="mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Variant 3: Border Beam</span>
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                Conic glowing gradient sweep along borders
              </p>
            </div>

            <BorderBeamCard className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Border Beam
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Conic Beam
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  KryptonIDE Native
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Subtle rotating conic gradient beam that illuminates the outer perimeter on hover without obscuring text.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Kotlin
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Compose
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Tree-sitter
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <span>Hover to accelerate beam</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </BorderBeamCard>
          </div>

        </div>
      </div>
    </section>
  );
};
