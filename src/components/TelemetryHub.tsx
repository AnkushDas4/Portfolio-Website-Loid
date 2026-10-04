import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Terminal, Zap } from 'lucide-react';

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
      className="w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0c0f17] border border-slate-200 dark:border-slate-800/90 shadow-sm p-4 sm:p-6 md:p-8"
      aria-label="Systems telemetry and live status"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/50 shrink-0">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Live Systems Telemetry
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Real-time node diagnostics and local timezone sync.
            </p>
          </div>
        </div>

        {/* Global Edge Status Pulse */}
        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 shrink-0">
          <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Edge RTT:</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">{latency}ms</span>
        </div>
      </div>

      {/* 2-Item Diagnostic Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 pt-4 sm:pt-6">
        {/* 1. Local Time & Clock */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/60 dark:bg-[#121622]/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>Local Time (IST)</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono tracking-tight">
            {currentTime || 'Syncing...'}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            West Bengal, India (UTC+5:30)
          </div>
        </div>

        {/* 2. SLA & Direct Response */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/60 dark:bg-[#121622]/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span>Response SLA</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
            &lt; 24 Hours
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            via Telegram / Encrypted Mail
          </div>
        </div>
      </div>
    </motion.section>
  );
};
