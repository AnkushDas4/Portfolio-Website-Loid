import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Send, 
  Check, 
  Copy, 
  Key, 
  Radio, 
  MessageSquare, 
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [copiedPgp, setCopiedPgp] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSending, setIsSending] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const copyToClipboard = (text: string, type: 'email' | 'phone' | 'pgp') => {
    sound.playClickSound();
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else if (type === 'pgp') {
      setCopiedPgp(true);
      setTimeout(() => setCopiedPgp(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || isSending) return;

    sound.playActivateHum();
    setIsSending(true);
    setSubmissionStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          payload: formData.message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.status === 'success') {
        sound.playHoverBlip();
        setSubmissionStatus('success');
        setStatusMessage(data.message || 'Transmission dispatched successfully to Sednium Core Node.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || `Server returned status ${response.status}`);
      }
    } catch (err: any) {
      console.error('Contact transmission failure:', err);
      setSubmissionStatus('error');
      setStatusMessage(err?.message || 'Transmission packets dropped. Fallback mail client available.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 flex flex-col items-center box-border relative overflow-hidden"
    >
      {/* Content Width Constraint */}
      <div className="w-full max-w-3xl space-y-6 flex flex-col">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>DIRECT TRANSMISSION CHANNEL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Initiate Contact
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-light">
            Available for decentralized systems architecture, strategic CTO advisory, and high-performance engineering collaborations.
          </p>
        </div>

        {/* 1. Encrypted Comms Directory Card */}
        <div className="w-full overflow-hidden rounded-2xl border border-cyan-500/20 glass-panel p-5 sm:p-7 space-y-4 shadow-xl">
          <h3 className="text-sm sm:text-base font-bold text-white font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-400" />
            <span>Encrypted Comms Directory</span>
          </h3>

          {/* Email Item */}
          <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-colors w-full">
            <div className="flex items-center gap-2.5 sm:gap-3 truncate pr-2">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-[10px] sm:text-xs font-mono text-slate-400">DIRECT EMAIL</div>
                <a
                  href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                  className="text-xs sm:text-sm font-mono font-bold text-white hover:text-cyan-300 transition-colors truncate block"
                >
                  {PORTFOLIO_DATA.contact.email}
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(PORTFOLIO_DATA.contact.email, 'email')}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all shrink-0 active:scale-95 cursor-pointer"
              title="Copy email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone Item */}
          <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-colors w-full">
            <div className="flex items-center gap-2.5 sm:gap-3 truncate pr-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-[10px] sm:text-xs font-mono text-slate-400">VOICE / TELEGRAM</div>
                <a
                  href={`tel:${PORTFOLIO_DATA.contact.phone.replace(/\s+/g, '')}`}
                  className="text-xs sm:text-sm font-mono font-bold text-white hover:text-emerald-300 transition-colors truncate block"
                >
                  {PORTFOLIO_DATA.contact.phone}
                </a>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(PORTFOLIO_DATA.contact.phone, 'phone')}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all shrink-0 active:scale-95 cursor-pointer"
              title="Copy phone number"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Location & Timezone */}
          <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 w-full">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-[10px] sm:text-xs font-mono text-slate-400">BASE LOCATION</div>
              <div className="text-xs sm:text-sm font-mono text-white truncate">
                {PORTFOLIO_DATA.contact.location} (IST • UTC +5:30)
              </div>
            </div>
          </div>

          {/* PGP Fingerprint Box */}
          <div className="p-3 sm:p-4 rounded-xl bg-black/60 border border-cyan-500/20 w-full">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-cyan-400">
                <Key className="w-3.5 h-3.5 shrink-0" />
                <span>PGP KEY FINGERPRINT</span>
              </div>
              <button
                onClick={() => copyToClipboard(PORTFOLIO_DATA.contact.pgpFingerprint, 'pgp')}
                className="text-[10px] sm:text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer"
              >
                {copiedPgp ? (
                  <span className="text-emerald-400">Copied!</span>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="text-[10px] sm:text-xs font-mono text-amber-300/90 break-all select-all">
              {PORTFOLIO_DATA.contact.pgpFingerprint}
            </div>
          </div>
        </div>

        {/* 2. GitHub & Organization Profiles (2 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
          <a
            href={PORTFOLIO_DATA.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 sm:p-5 rounded-2xl glass-panel border border-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all flex items-center justify-between group overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-white" />
              <div>
                <div className="text-[10px] sm:text-xs font-mono text-slate-400">PERSONAL</div>
                <div className="text-xs sm:text-sm font-bold text-white font-mono">@AnkushDas4</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </a>

          <a
            href={PORTFOLIO_DATA.contact.sedniumGithub}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 sm:p-5 rounded-2xl glass-panel border border-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all flex items-center justify-between group overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-[10px] sm:text-xs font-mono text-slate-400">SEDNIUM ORG</div>
                <div className="text-xs sm:text-sm font-bold text-white font-mono">Sednium-Tech</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </a>
        </div>

        {/* 3. Encrypted Transmission Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full overflow-hidden rounded-2xl border border-cyan-500/30 glass-panel-glow p-5 sm:p-7 shadow-xl"
        >
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white font-mono">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>DISPATCH TRANSMISSION</span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ENCRYPTED
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 w-full">
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-mono text-slate-400 mb-1">
                  YOUR IDENTIFIER / NAME *
                </label>
                <input
                  type="text"
                  required
                  disabled={isSending}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Satoshi Nakamoto"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-white font-mono text-base sm:text-sm outline-none transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-mono text-slate-400 mb-1">
                  RETURN EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  disabled={isSending}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="satoshi@domain.com"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-white font-mono text-base sm:text-sm outline-none transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-mono text-slate-400 mb-1">
                SUBJECT / AREA OF INTEREST
              </label>
              <input
                type="text"
                disabled={isSending}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Decentralized Architecture Collaboration"
                className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-white font-mono text-base sm:text-sm outline-none transition-colors disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-mono text-slate-400 mb-1">
                TRANSMISSION PAYLOAD *
              </label>
              <textarea
                required
                rows={4}
                disabled={isSending}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your architecture requirements, project vision, or technical inquiries..."
                className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-white font-mono text-base sm:text-sm outline-none transition-colors resize-none disabled:opacity-50"
              />
            </div>

            {/* Terminal Status Alert Toast */}
            <AnimatePresence>
              {submissionStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2.5 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                >
                  <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                  <div>
                    <span className="font-bold">&gt; TRANSMISSION DISPATCHED [200 OK]:</span> {statusMessage}
                  </div>
                </motion.div>
              )}

              {submissionStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 font-mono text-xs space-y-1 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                >
                  <div className="flex items-center gap-2 font-bold text-rose-400">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>&gt; TRANSMISSION ERROR:</span>
                  </div>
                  <div className="pl-6 text-[11px] text-rose-200">
                    {statusMessage}
                  </div>
                  <div className="pl-6 pt-1">
                    <a
                      href={`mailto:${PORTFOLIO_DATA.contact.email}?subject=${encodeURIComponent(formData.subject || 'CTO Inquiry')}&body=${encodeURIComponent(formData.message)}`}
                      className="text-cyan-300 underline font-semibold hover:text-cyan-200"
                    >
                      Click here to dispatch via native email client &rarr;
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-2 w-full">
              <button
                type="submit"
                disabled={isSending}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-slate-950 font-bold font-mono text-xs sm:text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all disabled:opacity-60 active:scale-98 cursor-pointer"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>TRANSMITTING PACKETS TO CORE NODE...</span>
                  </>
                ) : submissionStatus === 'success' ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>TRANSMISSION DISPATCHED</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="truncate">DISPATCH SECURE TRANSMISSION</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

      </div>
    </section>
  );
};
