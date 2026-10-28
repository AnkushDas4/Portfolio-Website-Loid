import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Copy, Mail, Send, MessageSquare } from 'lucide-react';
import { 
  copyText, 
  SummaryGroup, 
  buildMailtoUrl, 
  buildTelegramUrl, 
  buildWhatsAppUrl,
  WorktreeBranch 
} from '../../utils/intake';

interface IntakeSuccessProps {
  refId: string;
  brandName: string;
  primaryDomain: string;
  groups: SummaryGroup[];
  summaryText: string;
  branch?: WorktreeBranch;
}

export const IntakeSuccess: React.FC<IntakeSuccessProps> = ({ 
  refId, 
  brandName, 
  primaryDomain, 
  groups, 
  summaryText,
  branch = 'launchpad-full'
}) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const mailtoUrl = buildMailtoUrl(refId, brandName, summaryText, branch);
  const telegramUrl = buildTelegramUrl(refId, brandName, primaryDomain, branch);
  const whatsappUrl = buildWhatsAppUrl(refId, brandName, primaryDomain, branch);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handleCopy = async () => {
    const ok = await copyText(summaryText);
    setCopyState(ok ? 'copied' : 'failed');
    window.setTimeout(() => setCopyState('idle'), 2500);
  };

  const branchTitle =
    branch === 'launchpad-full'
      ? 'Website + Domain Launch Spec'
      : branch === 'redesign-existing'
      ? 'Website Redesign Spec'
      : 'Domain Procurement & DNS Spec';

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="rounded-2xl p-6 sm:p-8 bg-slate-900 text-white dark:bg-[#121622] border border-slate-800 dark:border-slate-700/80 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-5 h-5" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-white/10 text-emerald-400">
            Ref {refId}
          </span>
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-400">
            {branchTitle}
          </span>
        </div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          role="status"
          className="text-2xl sm:text-3xl font-bold tracking-tight focus:outline-none"
        >
          Launchpad Spec Generated!
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300 max-w-xl">
          Your project configuration is ready. Send it directly to our engineering desk via Email, WhatsApp, or Telegram. We review specs in 2–4 hours and reply with initial live mocks and availability confirmation before any invoice.
        </p>

        {/* Action dispatch buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={mailtoUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Launch Email Draft (mailto)</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Notify on WhatsApp</span>
          </a>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors"
          >
            <Send className="w-4 h-4 text-sky-400" />
            <span>Telegram</span>
          </a>
        </div>
      </motion.div>

      <div className="rounded-2xl p-5 sm:p-7 bg-white dark:bg-[#0f121a] border border-slate-200 dark:border-slate-800/90 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Your Project Spec Summary</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Copy this for your own records or quote Reference <code className="font-mono text-blue-500 font-semibold">{refId}</code> when texting us.</p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[44px]"
          >
            {copyState === 'copied' ? (
              <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
            ) : (
              <Copy className="w-4 h-4" aria-hidden="true" />
            )}
            <span>{copyState === 'copied' ? 'Copied to Clipboard' : copyState === 'failed' ? 'Copy failed, select the text below' : 'Copy Complete Spec'}</span>
          </button>
        </div>
        <span className="sr-only" aria-live="polite">{copyState === 'copied' ? 'Summary copied to clipboard' : ''}</span>

        <div className="space-y-6">
          {groups.map((g) => (
            <section key={g.title}>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">{g.title}</h4>
              <dl className="divide-y divide-slate-100 dark:divide-slate-800/80 border-y border-slate-100 dark:border-slate-800/80">
                {g.rows.map((r) => (
                  <div key={r.label} className="grid grid-cols-1 sm:grid-cols-3 gap-0.5 sm:gap-4 py-2.5">
                    <dt className="text-xs text-slate-500 dark:text-slate-400 sm:pt-0.5">{r.label}</dt>
                    <dd className="sm:col-span-2 text-sm text-slate-800 dark:text-slate-200 break-words whitespace-pre-line select-text">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>

      <a
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to portfolio
      </a>
    </div>
  );
};
