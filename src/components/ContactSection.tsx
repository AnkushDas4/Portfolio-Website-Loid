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

    // Simulate direct dispatch
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      // Construct mailto link fallback
      const mailtoLink = `mailto:${PORTFOLIO_DATA.contact.email}?subject=${encodeURIComponent(
        `[Transmission] ${formData.subject || 'CTO Inquiry'} from ${formData.name}`
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>DIRECT TRANSMISSION CHANNEL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Initiate Contact
          </h2>
          <p className="text-slate-400 text-base sm:text-lg font-light">
            Available for decentralized systems architecture, strategic CTO advisory, and high-performance engineering collaborations.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          {/* Left Column: Direct Links & PGP */}
          <div className="space-y-6">
            {/* Quick Cards */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>Encrypted Comms Directory</span>
              </h3>

              {/* Email Item */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">DIRECT EMAIL</div>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                      className="text-sm sm:text-base font-mono font-bold text-white hover:text-cyan-300 transition-colors"
                    >
                      {PORTFOLIO_DATA.contact.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(PORTFOLIO_DATA.contact.email, 'email')}
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Item */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">VOICE / TELEGRAM</div>
                    <a
                      href={`tel:${PORTFOLIO_DATA.contact.phone.replace(/\s+/g, '')}`}
                      className="text-sm sm:text-base font-mono font-bold text-white hover:text-emerald-300 transition-colors"
                    >
                      {PORTFOLIO_DATA.contact.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(PORTFOLIO_DATA.contact.phone, 'phone')}
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                  title="Copy phone number"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location & Timezone */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">BASE LOCATION</div>
                  <div className="text-sm sm:text-base font-mono text-white">
                    {PORTFOLIO_DATA.contact.location} (IST • UTC +5:30)
                  </div>
                </div>
              </div>

              {/* PGP Fingerprint Box */}
              <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                    <Key className="w-4 h-4" />
                    <span>PGP KEY FINGERPRINT</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PORTFOLIO_DATA.contact.pgpFingerprint, 'pgp')}
                    className="text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1"
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
                <div className="text-xs font-mono text-amber-300/90 break-all select-all">
                  {PORTFOLIO_DATA.contact.pgpFingerprint}
                </div>
              </div>
            </div>

            {/* GitHub & Organization Profiles */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={PORTFOLIO_DATA.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHoverBlip()}
                className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-400 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-white" />
                  <div>
                    <div className="text-xs font-mono text-slate-400">PERSONAL</div>
                    <div className="text-xs sm:text-sm font-bold text-white font-mono">@AnkushDas4</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </a>

              <a
                href={PORTFOLIO_DATA.contact.sedniumGithub}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHoverBlip()}
                className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-400 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-xs font-mono text-slate-400">SEDNIUM ORG</div>
                    <div className="text-xs sm:text-sm font-bold text-white font-mono">Sednium-Tech</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column: Encrypted Transmission Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-3xl glass-panel-glow border border-cyan-500/30"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-sm font-bold text-white font-mono">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>DISPATCH TRANSMISSION</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ENCRYPTED ENDPOINT
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    YOUR IDENTIFIER / NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Satoshi Nakamoto"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-white font-mono text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    RETURN EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="satoshi@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-white font-mono text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  SUBJECT / AREA OF INTEREST
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Decentralized P2P Architecture Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-white font-mono text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  TRANSMISSION PAYLOAD *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your architecture requirements, project vision, or technical inquiries..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-white font-mono text-sm outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                onMouseEnter={() => sound.playHoverBlip()}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold font-mono text-sm hover:shadow-neon-cyan transition-all disabled:opacity-50"
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
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
