import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Lock, ShieldCheck, Zap, Server, Sparkles, Layout } from 'lucide-react';
import { Tld, WorktreeBranch, VisualVibe, labelOf, VISUAL_VIBE_OPTIONS } from '../../utils/intake';

interface DomainPreviewCardProps {
  primaryDomain: string;
  tld: Tld;
  brandName: string;
  branch?: WorktreeBranch;
  visualVibe?: VisualVibe | '';
  existingWebsite?: string;
  sectionsCount?: number;
}

export const DomainPreviewCard: React.FC<DomainPreviewCardProps> = ({
  primaryDomain,
  tld,
  brandName,
  branch = 'launchpad-full',
  visualVibe,
  existingWebsite = '',
  sectionsCount = 4,
}) => {
  // Format the target live URL preview
  const computeDomain = (): string => {
    const targetRaw = (branch === 'redesign-existing' && !primaryDomain) ? existingWebsite : primaryDomain;
    const raw = targetRaw.trim().toLowerCase().replace(/^[a-z]+:\/\//i, '').replace(/\/.*$/, '');
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
  const vibeLabel = visualVibe ? labelOf(VISUAL_VIBE_OPTIONS, visualVibe) : 'Modern Tech';

  const branchBadge =
    branch === 'launchpad-full'
      ? { label: 'Turnkey Launch: Site + Domain', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }
      : branch === 'redesign-existing'
      ? { label: 'Site Redesign + DNS Pointing', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
      : { label: 'Domain Procurement & DNS', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };

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
            Live Browser & Edge Simulator
          </span>
        </div>

        <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded-full border ${branchBadge.color}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span>{branchBadge.label}</span>
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
      <div className="p-4 rounded-xl bg-gradient-to-b from-slate-950/70 to-slate-900/70 border border-slate-800/80 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-mono text-slate-400">
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <span>Preview Destination</span>
        </div>
        <div className="text-base sm:text-lg font-extrabold text-white tracking-tight">
          {displayBrand}
        </div>
        
        {branch !== 'domain-only' ? (
          <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/10 text-slate-300">
              <Layout className="w-3 h-3 text-blue-400" />
              <span>{sectionsCount} Core Sections</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/10 text-slate-300">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{vibeLabel}</span>
            </span>
          </div>
        ) : (
          <div className="text-xs text-slate-400 max-w-sm mx-auto">
            Configured with Anycast DNS records, SSL certification & clean name routing.
          </div>
        )}
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
            <span>SSL Certificate</span>
          </div>
          <div className="font-semibold text-emerald-300">Auto Edge HTTPS</div>
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
            <span>Delivery SLA</span>
          </div>
          <div className="font-semibold text-slate-200">{branch === 'domain-only' ? '< 6 Hours' : '< 48 Hours'}</div>
        </div>
      </div>
    </motion.div>
  );
};
