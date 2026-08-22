import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Layers, 
  Mail, 
  Cpu, 
  Radio, 
  ShieldCheck, 
  Activity, 
  ArrowRight,
  Sparkles,
  MapPin,
  Flame,
  Zap
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { MagneticButton } from './MagneticButton';
import { SpotlightCard } from './SpotlightCard';

export const Hero: React.FC = () => {
  const [secondsOnline, setSecondsOnline] = useState<number>(142940);
  const [packetCount, setPacketCount] = useState<number>(8429);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsOnline((prev) => prev + 1);
      setPacketCount((prev) => prev + Math.floor(Math.random() * 5 + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (totalSec: number) => {
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${days}d ${hours}h ${mins}m ${secs}s`;
  };

  const scrollTo = (id: string) => {
    sound.playClickSound();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-20 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-8 sm:gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Headline, Identity & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-start"
        >
          {/* Status Badge with pulse glow */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.03, borderColor: 'rgba(0,240,255,0.6)' }}
            onMouseEnter={() => sound.playHoverBlip()}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-[11px] sm:text-xs font-mono mb-4 sm:mb-6 shadow-[0_0_12px_rgba(0,240,255,0.12)] max-w-full truncate cursor-default transition-all"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="truncate">{PORTFOLIO_DATA.hero.badge}</span>
          </motion.div>

          {/* Holographic Name / Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3 sm:mb-4 leading-[1.1]">
            <span className="block text-slate-400 font-mono text-base sm:text-xl font-normal mb-1 sm:mb-2 tracking-widest">
              &gt; IDENT: {PORTFOLIO_DATA.hero.handle}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 hover:brightness-125 transition-all">
              {PORTFOLIO_DATA.hero.name}
            </span>
          </h1>

          {/* Title & Organization */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="text-lg sm:text-2xl font-bold text-cyan-400 font-mono">
              {PORTFOLIO_DATA.hero.title}
            </span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <motion.a
              href={PORTFOLIO_DATA.company.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, color: '#00f0ff' }}
              onMouseEnter={() => sound.playHoverBlip()}
              className="text-base sm:text-xl font-semibold text-slate-300 underline decoration-cyan-500/50 underline-offset-4 transition-colors"
            >
              {PORTFOLIO_DATA.company.name}
            </motion.a>
          </div>

          {/* Bio statement */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-6 sm:mb-8 font-light">
            {PORTFOLIO_DATA.hero.bio}
          </p>

          {/* Roles Pill Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-10">
            {PORTFOLIO_DATA.hero.roles.map((role) => (
              <motion.span
                key={role}
                whileHover={{ y: -3, scale: 1.04, borderColor: '#00f0ff', color: '#00f0ff' }}
                onMouseEnter={() => sound.playHoverBlip()}
                className="px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono text-slate-300 bg-slate-900/80 border border-slate-800 transition-colors cursor-default"
              >
                {role}
              </motion.span>
            ))}
          </div>

          {/* Magnetic CTAs */}
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <MagneticButton strength={0.4} onClick={() => scrollTo('projects')}>
              <button className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                <Layers className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Explore Architecture</span>
                <ArrowRight className="w-4 h-4 ml-1 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </MagneticButton>

            <MagneticButton strength={0.3} onClick={() => scrollTo('terminal')}>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl glass-panel border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 font-mono text-sm transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Launch CLI</span>
              </button>
            </MagneticButton>

            <MagneticButton strength={0.25} onClick={() => scrollTo('contact')}>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl glass-panel border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white text-sm transition-all">
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </button>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right Column: Interactive Live Telemetry HUD Widget */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="relative w-full"
        >
          <SpotlightCard
            enableTilt={true}
            spotlightColor="rgba(0, 240, 255, 0.16)"
            className="glass-panel-glow p-4 sm:p-6 border border-cyan-500/30"
          >
            {/* Header Telemetry */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4 mb-4 sm:mb-5">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="p-1.5 sm:p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Activity className="w-4 sm:w-5 h-4 sm:h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-mono text-slate-400">NODE TELEMETRY</div>
                  <div className="text-xs sm:text-sm font-bold text-white font-mono">SEDNIUM-CORE // 01</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] sm:text-[10px] font-mono text-slate-400">STATUS</div>
                <div className="text-[11px] sm:text-xs font-mono text-emerald-400 font-semibold flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  ONLINE
                </div>
              </div>
            </div>

            {/* Grid Metrics */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 mb-4 sm:mb-5">
              <motion.div 
                whileHover={{ y: -2, borderColor: 'rgba(0,240,255,0.4)' }}
                className="p-2.5 sm:p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 transition-colors"
              >
                <div className="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs font-mono mb-1">
                  <span>UPTIME</span>
                  <Radio className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-cyan-400" />
                </div>
                <div className="text-xs sm:text-sm md:text-base font-bold font-mono text-cyan-300 truncate">
                  {formatUptime(secondsOnline)}
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -2, borderColor: 'rgba(245,158,11,0.4)' }}
                className="p-2.5 sm:p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 transition-colors"
              >
                <div className="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs font-mono mb-1">
                  <span>ROUTED</span>
                  <Flame className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-400" />
                </div>
                <div className="text-xs sm:text-sm md:text-base font-bold font-mono text-amber-300 truncate">
                  {packetCount.toLocaleString()} pkts
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -2, borderColor: 'rgba(16,185,129,0.4)' }}
                className="p-2.5 sm:p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 transition-colors"
              >
                <div className="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs font-mono mb-1">
                  <span>LATENCY</span>
                  <Cpu className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-400" />
                </div>
                <div className="text-xs sm:text-sm md:text-base font-bold font-mono text-emerald-400">
                  {PORTFOLIO_DATA.hero.telemetry.nodeLatency}
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -2, borderColor: 'rgba(99,102,241,0.4)' }}
                className="p-2.5 sm:p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 transition-colors"
              >
                <div className="flex items-center justify-between text-slate-400 text-[10px] sm:text-xs font-mono mb-1">
                  <span>PIPELINE</span>
                  <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-indigo-400" />
                </div>
                <div className="text-[10px] sm:text-xs font-bold font-mono text-indigo-300 truncate">
                  MOBILE NATIVE
                </div>
              </motion.div>
            </div>

            {/* Geolocation & Coordinates */}
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between text-[11px] sm:text-xs font-mono">
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300 truncate">
                <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{PORTFOLIO_DATA.hero.location}</span>
              </div>
              <span className="text-slate-500 shrink-0 text-[10px] sm:text-xs">{PORTFOLIO_DATA.hero.coordinates}</span>
            </div>

            {/* Live Terminal Log Stream Simulation */}
            <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-xl bg-black/80 border border-cyan-500/20 font-mono text-[10px] sm:text-[11px] text-slate-400 space-y-1 overflow-hidden">
              <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>[MESH ROUTER ACTIVE]</span>
              </div>
              <div className="truncate text-slate-400">&gt; p2p_handshake: Onyx Triple-Lock verified.</div>
              <div className="truncate text-slate-500">&gt; eBPF XDP filter: 0 dropped packets.</div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>

      {/* Bottom Stats & Key Achievements Bar with Spotlight Physics */}
      <div className="max-w-7xl mx-auto w-full mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-800/80">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {PORTFOLIO_DATA.stats.map((stat, idx) => (
            <SpotlightCard
              key={stat.label}
              enableTilt={true}
              spotlightColor="rgba(0, 240, 255, 0.2)"
              className="p-3.5 sm:p-5 glass-panel border border-slate-800 hover:border-cyan-500/50 transition-all group"
            >
              <div className="text-xl sm:text-3xl font-extrabold text-white font-mono group-hover:text-cyan-300 transition-colors truncate">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-sm text-slate-400 font-medium mt-1 leading-tight">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-cyan-400/80 mt-1.5 sm:mt-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 shrink-0" />
                <span className="truncate">{stat.change}</span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};
