import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Zap, 
  ArrowUpRight, 
  Eye, 
  Compass, 
  PenTool,
  Smartphone,
  SlidersHorizontal,
  Fingerprint
} from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { TiltCard } from './TiltCard';
import { BorderBeamCard } from './BorderBeamCard';
import { GlassmorphismCard } from './GlassmorphismCard';
import { MagneticCard } from './MagneticCard';
import { OutlineDrawCard } from './OutlineDrawCard';
import { GyroTiltCard } from './GyroTiltCard';
import { SwipeRevealCard } from './SwipeRevealCard';
import { HapticPressCard } from './HapticPressCard';

export const CardAnimationDemo: React.FC = () => {
  return (
    <section id="demo" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 relative w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Animation Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Card Animation Variants
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
            Test and compare the interaction physics across touch and pointer devices.
          </p>
        </div>

        {/* 1. Core Desktop & Interaction Variants */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-1">
            Cursor & Hover Physics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            
            {/* 1. Spotlight Card */}
            <div className="flex flex-col">
              <div className="mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>01. Spotlight Card</span>
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Radial mouse-tracking gradient highlight
                </p>
              </div>

              <SpotlightCard className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      Spotlight
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      CSS Radial
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    OnyxChat Protocol
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Cursor position calculates dynamic radial gradient highlight on hover with smooth opacity transitions.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Kotlin
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      libp2p
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
              <div className="mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>02. 3D Parallax Tilt</span>
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Multi-axis 3D perspective rotation with springs
                </p>
              </div>

              <TiltCard className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                      3D Tilt
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Framer Motion
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    SHIELD Security
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Multi-axis parallax rotation following mouse cursor with spring return physics (`stiffness: 300, damping: 25`).
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Go
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      eBPF
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-purple-600 dark:text-purple-400 font-medium">
                  <span>Tilt cursor across card</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </TiltCard>
            </div>

            {/* 3. Border Beam Card */}
            <div className="flex flex-col">
              <div className="mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>03. Border Beam</span>
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Conic glowing gradient sweep along perimeter
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

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    KryptonIDE Native
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Subtle rotating conic gradient beam that illuminates the outer perimeter on hover without obscuring text.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Kotlin
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Compose
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Hover to speed beam</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </BorderBeamCard>
            </div>

            {/* 4. Glassmorphism Card */}
            <div className="flex flex-col">
              <div className="mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>04. Vision Pro Glass</span>
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Frosted glass panel over dynamic glowing ambient orbs
                </p>
              </div>

              <GlassmorphismCard className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                      Glassmorphism
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                      Vision Pro
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Sednicon Engine
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    Multi-layered backdrop blur with animated chromatic ambient light spheres drifting underneath frosted glass.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 rounded text-xs bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300">
                      TypeScript
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300">
                      React
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/30 dark:border-slate-700/50 flex items-center justify-between text-xs text-pink-600 dark:text-pink-400 font-medium">
                  <span>Ambient glow active</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </GlassmorphismCard>
            </div>

          </div>
        </div>

        {/* 2. Touch & Mobile-First Sensory Variants */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 px-1">
            Sensory & Motion Physics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">

            {/* 5. Magnetic Pull Card */}
            <div className="flex flex-col">
              <div className="mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>05. Magnetic Pull Card</span>
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Physically attracts and tracks towards cursor position
                </p>
              </div>

              <MagneticCard className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      Magnetic Physics
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Vector Spring
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Mesh Peer Discovery
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    The entire card translates smoothly toward the cursor via vector spring physics, snapping back on exit.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      P2P
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      libp2p
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-medium">
                  <span>Move cursor across edges</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </MagneticCard>
            </div>

            {/* 6. Outline Draw Card */}
            <div className="flex flex-col">
              <div className="mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5" />
                  <span>06. Outline Path Draw</span>
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sharp perimeter border draws around the card on hover
                </p>
              </div>

              <OutlineDrawCard className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      Path Reveal
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Staggered SVG
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Zero-Bloat Compiler
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Staggered border segments trace the perimeter sequentially clockwise on hover with 300ms ease transitions.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Rust
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      eBPF
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  <span>Hover to trigger perimeter draw</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </OutlineDrawCard>
            </div>

            {/* 7. Gyroscope Tilt Card */}
            <div className="flex flex-col">
              <div className="mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>07. Gyroscope Parallax</span>
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Device orientation tilt tracking (Beta & Gamma)
                </p>
              </div>

              <GyroTiltCard className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                      Gyroscope Tilt
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/40">
                      Sensory API
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Spatial Matrix Node
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Reacts to physical tilt angles via hardware gyroscope sensors with smooth auto-breathe fallback.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Hardware Sensor
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Spatial 3D
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                  <span>Tilt phone / move cursor</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </GyroTiltCard>
            </div>

            {/* 8. Swipe Action Reveal Card */}
            <div className="flex flex-col">
              <div className="mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>08. Swipe Action Drawer</span>
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Drag left to reveal hidden action tools
                </p>
              </div>

              <SwipeRevealCard className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                      Gesture Drawer
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40">
                      iOS Mail Drag
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    Interactive Action Card
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    Horizontal gesture swipe with spring snapping threshold to reveal quick actions underneath.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Pan Gestures
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Spring Snap
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-rose-600 dark:text-rose-400 font-medium">
                  <span>Swipe card horizontally</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </SwipeRevealCard>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
