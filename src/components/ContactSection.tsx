import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Github, Check, AlertCircle, Loader2, MessageSquare, Phone } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message || isSubmitting) return;

    setIsSubmitting(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact Inquiry',
          payload: formData.message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.status === 'success') {
        setStatus('success');
        setStatusMessage('Thank you! Your message was delivered successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to dispatch email.');
      }
    } catch (err: any) {
      setStatus('error');
      setStatusMessage(err?.message || 'Could not send message automatically. Please email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-12 pb-6 relative w-full border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Contact
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
            Have an open-source collaboration, project inquiry, or questions? Send me a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Direct Contact Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0f121a] border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Direct Channels
              </h3>

              {/* Email */}
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-medium">Email</span>
                <a
                  href={PORTFOLIO_DATA.personal.emailLink}
                  className="flex items-center gap-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="truncate">{PORTFOLIO_DATA.personal.email}</span>
                </a>
              </div>

              {/* Telegram */}
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-medium">Telegram</span>
                <a
                  href={PORTFOLIO_DATA.personal.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Send className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>{PORTFOLIO_DATA.personal.telegramHandle}</span>
                </a>
              </div>

              {/* Phone / Mobile */}
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-medium">Mobile / Phone</span>
                <a
                  href={PORTFOLIO_DATA.personal.phoneLink}
                  className="flex items-center gap-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{PORTFOLIO_DATA.personal.phone}</span>
                </a>
              </div>

              {/* GitHub */}
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-medium">GitHub</span>
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0" />
                  <span>@AnkushDas4</span>
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0f121a]/60 border border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500 space-y-1.5">
              <div className="font-semibold text-slate-700 dark:text-slate-300">
                Location & Timezone
              </div>
              <div>{PORTFOLIO_DATA.personal.location} (UTC+5:30)</div>
              <div>Typical response time: within 24 hours.</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0f121a] border border-slate-200 dark:border-slate-800/90 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Rivers"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  disabled={isSubmitting}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project inquiry / Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, timeline, or inquiry..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none disabled:opacity-50"
                />
              </div>

              {/* Status feedback alerts */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{statusMessage}</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-300 text-xs space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
                      <span>{statusMessage}</span>
                    </div>
                    <div className="pl-6 pt-0.5">
                      <a
                        href={`mailto:${PORTFOLIO_DATA.personal.email}?subject=${encodeURIComponent(formData.subject || 'Inquiry')}&body=${encodeURIComponent(formData.message)}`}
                        className="font-medium underline hover:text-rose-900 dark:hover:text-rose-200"
                      >
                        Click to open your default email client &rarr;
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Message Sent</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
