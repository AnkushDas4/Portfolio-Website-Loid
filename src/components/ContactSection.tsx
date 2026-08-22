import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  ShieldCheck
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { MagneticButton } from './MagneticButton';
import { SpotlightCard } from './SpotlightCard';

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
  const [sentSuccess, setSentSuccess] = useState<boolean>(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playActivateHum();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      const mailtoLink = `mailto:${PORTFOLIO_DATA.contact.email}?subject=${encodeURIComponent(
        `[Transmission] ${formData.subject || 'CTO Inquiry'} from ${formData.name}`
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
    }, 800);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>DIRECT TRANSMISSION CHANNEL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 sm:mb-4">
            Initiate Contact
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-light">
            Available for decentralized systems architecture, strategic CTO advisory, and high-performance engineering collaborations.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 sm:gap-12 items-start">
          {/* Left Column: Direct Links & PGP */}
          <div className="space-y-4 sm:space-y-6">
            <SpotlightCard
              enableTilt={true}
              spotlightColor="rgba(0, 240, 255, 0.14)"
              className="p-5 sm:p-8 glass-panel border border-slate-800 space-y-4 sm:space-y-6"
            >
              <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>Encrypted Comms Directory</span>
              </h3>

              {/* Email Item */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center gap-2.5 sm:gap-3 truncate pr-2">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] sm:text-xs font-mono text-slate-400">DIRECT EMAIL</div>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                      className="text-xs sm:text-base font-mono font-bold text-white hover:text-cyan-300 transition-colors truncate block"
                    >
                      {PORTFOLIO_DATA.contact.email}
                    </a>
                  </div>
                </div>

                <MagneticButton strength={0.4}>
                  <button
                    onClick={() => copyToClipboard(PORTFOLIO_DATA.contact.email, 'email')}
                    className="p-2 sm:p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all shrink-0 active:scale-95"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </MagneticButton>
              </div>

              {/* Phone Item */}
              <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-2.5 sm:gap-3 truncate pr-2">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] sm:text-xs font-mono text-slate-400">VOICE / TELEGRAM</div>
                    <a
                      href={`tel:${PORTFOLIO_DATA.contact.phone.replace(/\s+/g, '')}`}
                      className="text-xs sm:text-base font-mono font-bold text-white hover:text-emerald-300 transition-colors truncate block"
                    >
                      {PORTFOLIO_DATA.contact.phone}
                    </a>
                  </div>
                </div>

                <MagneticButton strength={0.4}>
                  <button
                    onClick={() => copyToClipboard(PORTFOLIO_DATA.contact.phone, 'phone')}
                    className="p-2 sm:p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all shrink-0 active:scale-95"
                    title="Copy phone number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </MagneticButton>
              </div>

              {/* Location & Timezone */}
              <div className="flex items-center gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                  <MapPin className="w-4 sm:w-5 h-4 sm:h-5" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] sm:text-xs font-mono text-slate-400">BASE LOCATION</div>
                  <div className="text-xs sm:text-base font-mono text-white truncate">
                    {PORTFOLIO_DATA.contact.location} (IST • UTC +5:30)
                  </div>
                </div>
              </div>

              {/* PGP Fingerprint Box */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-black/60 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-cyan-400">
                    <Key className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
                    <span>PGP KEY FINGERPRINT</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PORTFOLIO_DATA.contact.pgpFingerprint, 'pgp')}
                    className="text-[11px] sm:text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1 shrink-0 active:scale-95"
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
            </SpotlightCard>

            {/* GitHub & Organization Profiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <MagneticButton strength={0.3} className="w-full">
                <a
                  href={PORTFOLIO_DATA.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all flex items-center justify-between group"
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
              </MagneticButton>

              <MagneticButton strength={0.3} className="w-full">
                <a
                  href={PORTFOLIO_DATA.contact.sedniumGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all flex items-center justify-between group"
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
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Encrypted Transmission Form with Spotlight */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-5 sm:p-8 rounded-3xl glass-panel-glow border border-cyan-500/30"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white font-mono">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>DISPATCH TRANSMISSION</span>
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ENCRYPTED
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono text-slate-400 mb-1">
                    YOUR IDENTIFIER / NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Satoshi Nakamoto"
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-white font-mono text-base sm:text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-mono text-slate-400 mb-1">
                    RETURN EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="satoshi@domain.com"
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-white font-mono text-base sm:text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-mono text-slate-400 mb-1">
                  SUBJECT / AREA OF INTEREST
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Decentralized Architecture Collaboration"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-white font-mono text-base sm:text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-mono text-slate-400 mb-1">
                  TRANSMISSION PAYLOAD *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your architecture requirements, project vision, or technical inquiries..."
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-white font-mono text-base sm:text-sm outline-none transition-colors resize-none"
                />
              </div>

              <MagneticButton strength={0.3} className="w-full">
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-slate-950 font-bold font-mono text-xs sm:text-sm shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all disabled:opacity-50"
                >
                  {isSending ? (
                    <span>TRANSMITTING PACKETS...</span>
                  ) : sentSuccess ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>TRANSMISSION DISPATCHED</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>DISPATCH SECURE TRANSMISSION</span>
                    </>
                  )}
                </button>
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
