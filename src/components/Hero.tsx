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
  Flame
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

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
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Headline, Identity & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-start"
        >
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span>{PORTFOLIO_DATA.hero.badge}</span>
          </motion.div>

          {/* Holographic Name / Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.05]">
            <span className="block text-slate-400 font-mono text-xl sm:text-2xl font-normal mb-2 tracking-widest">
              &gt; IDENT: {PORTFOLIO_DATA.hero.handle}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
              {PORTFOLIO_DATA.hero.name}
            </span>
          </h1>

          {/* Title & Organization */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xl sm:text-2xl font-bold text-cyan-400 font-mono">
              {PORTFOLIO_DATA.hero.title}
            </span>
            <span className="text-slate-500">•</span>
            <a
              href={PORTFOLIO_DATA.company.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHoverBlip()}
              className="text-lg sm:text-xl font-semibold text-slate-300 hover:text-white underline decoration-cyan-500/50 underline-offset-4 transition-colors"
            >
              {PORTFOLIO_DATA.company.name}
            </a>
          </div>

          {/* Bio statement */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-light">
            {PORTFOLIO_DATA.hero.bio}
          </p>

          {/* Roles Pill Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {PORTFOLIO_DATA.hero.roles.map((role) => (
              <span
                key={role}
                className="px-3 py-1 rounded-lg text-xs font-mono text-slate-300 bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors"
              >
                {role}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollTo('projects')}
              onMouseEnter={() => sound.playHoverBlip()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm hover:shadow-neon-cyan transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Layers className="w-4 h-4" />
              <span>Explore Architecture</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => scrollTo('terminal')}
              onMouseEnter={() => sound.playHoverBlip()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-panel border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 font-mono text-sm transition-all transform hover:-translate-y-0.5"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch CLI</span>
            </button>

            <button
              onClick={() => scrollTo('contact')}
              onMouseEnter={() => sound.playHoverBlip()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-panel border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white text-sm transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </button>
          </div>
        </motion.div>

        {/* Right Column: Interactive Live Telemetry HUD Widget */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="relative"
        >
          {/* Glowing Backing Aura */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-3xl blur-xl pointer-events-none" />

          {/* HUD Container */}
          <div className="relative rounded-2xl glass-panel-glow p-6 border border-cyan-500/30 overflow-hidden">
            {/* Header Telemetry */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">NODE TELEMETRY</div>
                  <div className="text-sm font-bold text-white font-mono">SEDNIUM-CORE // 01</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400">STATUS</div>
                <div className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  ONLINE
                </div>
              </div>
            </div>

            {/* Grid Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                  <span>SYSTEM UPTIME</span>
                  <Radio className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-base font-bold font-mono text-cyan-300">
                  {formatUptime(secondsOnline)}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                  <span>PACKETS ROUTED</span>
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-base font-bold font-mono text-amber-300">
                  {packetCount.toLocaleString()} pkts
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                  <span>EDGE LATENCY</span>
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-base font-bold font-mono text-emerald-400">
                  {PORTFOLIO_DATA.hero.telemetry.nodeLatency}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                  <span>BUILD PIPELINE</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div className="text-xs font-bold font-mono text-indigo-300 truncate">
                  MOBILE NATIVE
                </div>
              </div>
            </div>

            {/* Geolocation & Coordinates */}
            <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{PORTFOLIO_DATA.hero.location}</span>
              </div>
              <span className="text-slate-500 font-mono">{PORTFOLIO_DATA.hero.coordinates}</span>
            </div>

            {/* Live Terminal Log Stream Simulation */}
            <div className="mt-4 p-3 rounded-xl bg-black/80 border border-cyan-500/20 font-mono text-[11px] text-slate-400 space-y-1 overflow-hidden">
              <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>[MESH ROUTER ACTIVE]</span>
              </div>
              <div className="truncate text-slate-400">&gt; p2p_handshake: Onyx Triple-Lock verified.</div>
              <div className="truncate text-slate-500">&gt; eBPF XDP filter: 0 dropped packets.</div>
              <div className="truncate text-cyan-300/80">&gt; KryptonIDE daemon: listening on local PTY bridge...</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Stats & Key Achievements Bar */}
      <div className="max-w-7xl mx-auto w-full mt-16 pt-8 border-t border-slate-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PORTFOLIO_DATA.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => sound.playHoverBlip()}
              className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/40 transition-all group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono group-hover:text-cyan-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] font-mono text-cyan-400/80 mt-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
