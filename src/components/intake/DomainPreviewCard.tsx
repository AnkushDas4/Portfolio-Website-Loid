import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Lock, ShieldCheck, Zap, Server, ExternalLink } from 'lucide-react';
import { Tld } from '../../utils/intake';

interface DomainPreviewCardProps {
  primaryDomain: string;
  tld: Tld;
  brandName: string;
}

export const DomainPreviewCard: React.FC<DomainPreviewCardProps> = ({
  primaryDomain,
  tld,
  brandName,
}) => {
  // Format the target live URL preview
  const computeDomain = (): string => {
    const raw = primaryDomain.trim().toLowerCase().replace(/^[a-z]+:\/\//i, '').replace(/\/.*$/, '');
    const cleanBrand = (brandName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'yourbrand').replace(/^-+|-+$/g, '');

    if (tld === 'sednium-subdomain') {
      const slug = raw ? raw.split('.')[0] : cleanBrand;
      return `${slug || 'yourbrand'}.sednium.com`;
    }

    if (!raw) {
      if (tld === 'in') return `${cleanBrand}.in`;
      if (tld === 'com') return `${cleanBrand}.com`;
      return `${cleanBrand}.in`;
    }

    // If raw already has a valid dot and extension
    if (raw.includes('.')) {
      if (tld === 'in' && !raw.endsWith('.in')) {
        return `${raw.split('.')[0]}.in`;
      }
      if (tld === 'com' && !raw.endsWith('.com')) {
        return `${raw.split('.')[0]}.com`;
      }
      return raw;
    }

    if (tld === 'in') return `${raw}.in`;
    if (tld === 'com') return `${raw}.com`;
    if (tld === 'other') return `${raw}.org`;
    return `${raw}.in`;
  };

  const domain = computeDomain();
  const displayBrand = brandName.trim() || 'Your Brand';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4"
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono font-medium text-slate-400 pl-2">
            Live DNS & Browser Preview
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active Simulation</span>
        </span>
      </div>

      {/* Simulated Browser Address Bar */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90 text-xs sm:text-sm font-mono">
        <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="text-emerald-400 font-semibold select-none">https://</span>
        <span className="text-white font-bold tracking-wide break-all">{domain}</span>
        <span className="text-slate-500 select-none">/</span>
      </div>

      {/* Mini Viewport Card */}
      <div className="p-4 rounded-xl bg-gradient-to-b from-slate-950/60 to-slate-900/60 border border-slate-800/60 text-center space-y-1.5">
        <div className="text-xs uppercase tracking-wider font-mono text-slate-400">
          Destination Site
        </div>
        <div className="text-base sm:text-lg font-extrabold text-white tracking-tight">
          {displayBrand}
        </div>
        <div className="text-xs text-slate-400 max-w-sm mx-auto">
          Securely routed with edge HTTPS, custom DNS records & WHOIS protection.
        </div>
      </div>

      {/* Dynamic Diagnostics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
        <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60 space-y-0.5">
          <div className="flex items-center gap-1 text-slate-400">
            <Server className="w-3 h-3 text-blue-400" />
            <span>DNS Routing</span>
          </div>
          <div className="font-semibold text-slate-200">Cloudflare Anycast</div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60 space-y-0.5">
          <div className="flex items-center gap-1 text-slate-400">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>SSL / TLS</span>
          </div>
          <div className="font-semibold text-emerald-300">Auto-Provisioned</div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60 space-y-0.5">
          <div className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3 h-3 text-purple-400" />
            <span>WHOIS Privacy</span>
          </div>
          <div className="font-semibold text-slate-200">Shielded ID</div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60 space-y-0.5">
          <div className="flex items-center gap-1 text-slate-400">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Propagation</span>
          </div>
          <div className="font-semibold text-slate-200">&lt; 2 Hours SLA</div>
        </div>
      </div>
    </motion.div>
  );
};
