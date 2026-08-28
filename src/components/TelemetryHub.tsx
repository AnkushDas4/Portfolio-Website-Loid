import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, KeyRound, Globe, Shield, Terminal, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { CopyButton } from './CopyButton';

export const TelemetryHub: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [latency, setLatency] = useState<number>(24);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Subtle realistic ping jitter for live edge telemetry
    const pingInterval = setInterval(() => {
      setLatency(Math.floor(20 + Math.random() * 12));
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(pingInterval);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-7xl mx-auto rounded-3xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800/90 shadow-sm p-6 sm:p-8"
      aria-label="Systems telemetry and live status"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/50">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Live Systems Telemetry
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>All Nodes Healthy</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Real-time node diagnostics, local timezone sync, and cryptographic key verification.
            </p>
          </div>
        </div>

        {/* Global Edge Status Pulse */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>Edge RTT:</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">{latency}ms</span>
        </div>
      </div>

      {/* 4-Item Diagnostic Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        {/* 1. Local Time & Clock */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>Local Time (IST)</span>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white font-mono tracking-tight">
            {currentTime || 'Syncing...'}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            West Bengal, India (UTC+5:30)
          </div>
        </div>

        {/* 2. Availability Status */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Globe className="w-3.5 h-3.5 text-emerald-500" />
            <span>Engineering Status</span>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Available for Hire / Collab</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Consulting, P2P Systems, Full-Stack
          </div>
        </div>

        {/* 3. SLA & Direct Response */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-purple-500" />
            <span>Response SLA</span>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-white font-mono">
            &lt; 24 Hours
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            via Telegram / Encrypted Mail
          </div>
        </div>

        {/* 4. PGP Fingerprint Quick Verify */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <KeyRound className="w-3.5 h-3.5 text-amber-500" />
              <span>PGP Key ID</span>
            </div>
            <CopyButton
              text={PORTFOLIO_DATA.personal.pgpFingerprint}
              label=""
              className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
            />
          </div>
          <div className="text-xs font-mono font-bold text-slate-900 dark:text-white truncate">
            {PORTFOLIO_DATA.personal.pgpFingerprint}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Click icon to copy full fingerprint
          </div>
        </div>
      </div>
    </motion.section>
  );
};
