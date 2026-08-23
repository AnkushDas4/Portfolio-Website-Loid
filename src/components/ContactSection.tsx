import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Github, Check, AlertCircle, Loader2, ArrowUpRight, MessageSquare } from 'lucide-react';
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
          subject: formData.subject,
          payload: formData.message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.status === 'success') {
        setStatus('success');
        setStatusMessage(data.message || 'Message sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || `Server returned error status ${response.status}`);
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setStatusMessage(err?.message || 'Could not send message automatically. Please email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 relative w-full border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Contact
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
            Have an open-source collaboration, project inquiry, or questions? Send me a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8 items-start">
          {/* Direct Contact Links */}
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white dark:bg-[#0f121a] border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Direct Channels
              </h3>

              {/* Email */}
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-medium">Email</span>
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                  className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Send className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>@AnkushDas</span>
                </a>
              </div>

              {/* GitHub */}
              <div className="space-y-1">
                <span className="text-xs text-slate-500 font-medium">GitHub</span>
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0" />
                  <span>@AnkushDas4</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0f121a]/60 border border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500 space-y-1">
              <div className="font-medium text-slate-700 dark:text-slate-300">
                Location & Timezone
              </div>
              <div>{PORTFOLIO_DATA.personal.location} (UTC+5:30)</div>
              <div>Typical response time: within 24 hours.</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#0f121a] border border-slate-200 dark:border-slate-800/90 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Rivers"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  disabled={isSubmitting}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project inquiry / Collaboration"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  disabled={isSubmitting}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, timeline, or inquiry..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none disabled:opacity-50"
                />
              </div>

              {/* Status feedback alerts */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2"
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
                    className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-300 text-xs space-y-1"
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
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
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
