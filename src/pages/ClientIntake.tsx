import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Globe, 
  Server, 
  Search, 
  Send, 
  Sun, 
  Moon, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { SpotlightGrid } from '../components/SpotlightGrid';
import { IntakeSuccess } from '../components/intake/IntakeSuccess';
import { 
  TextField, 
  ChoiceField, 
  SelectField, 
  KeywordField 
} from '../components/intake/FormControls';
import { 
  EMPTY_VALUES, 
  IntakeValues, 
  Errors, 
  FieldKey,
  validate, 
  normalizeValues, 
  buildSummaryGroups, 
  buildSummaryText, 
  generateRefId, 
  buildMailtoUrl, 
  TLD_OPTIONS, 
  PLATFORM_OPTIONS, 
  HOSTING_OPTIONS, 
  GEO_OPTIONS, 
  RADIUS_OPTIONS, 
  LIMITS,
  FIELD_ORDER,
  SummaryGroup
} from '../utils/intake';

export const ClientIntake: React.FC = () => {
  const [dark, toggleTheme] = useTheme();
  const [values, setValues] = useState<IntakeValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  
  // Submission state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [refId, setRefId] = useState<string>('');
  const [summaryGroups, setSummaryGroups] = useState<SummaryGroup[]>([]);
  const [summaryText, setSummaryText] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  // Field change handler
  const setField = <K extends keyof IntakeValues>(key: K, val: IntakeValues[K]) => {
    setValues((prev) => {
      const next = { ...prev, [key]: val };
      // Clear error immediately when user begins correcting
      if (errors[key as FieldKey]) {
        setErrors((prevErr) => {
          const nextErr = { ...prevErr };
          delete nextErr[key as FieldKey];
          return nextErr;
        });
      }
      return next;
    });
  };

  const handleBlur = (key: FieldKey) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    const currentErrors = validate(values);
    if (currentErrors[key]) {
      setErrors((prev) => ({ ...prev, [key]: currentErrors[key] }));
    }
  };

  const navigateHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.pushState) {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      window.location.href = '/';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Find first error and scroll to it
      const firstErrorKey = FIELD_ORDER.find((k) => validationErrors[k]);
      if (firstErrorKey) {
        const el = document.getElementById(`group-${firstErrorKey}`) || document.getElementById(`field-${firstErrorKey}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const focusable = el.querySelector<HTMLElement>('input, select, textarea, button');
          focusable?.focus();
        }
      }
      return;
    }

    // Process valid submission
    const clean = normalizeValues(values);
    const newRefId = generateRefId();
    const groups = buildSummaryGroups(clean);
    const summary = buildSummaryText(groups, newRefId);

    setRefId(newRefId);
    setSummaryGroups(groups);
    setSummaryText(summary);
    setIsSubmitted(true);

    // Launch mail client via mailto
    const mailto = buildMailtoUrl(newRefId, clean.brandName, summary);
    window.location.href = mailto;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SpotlightGrid className="min-h-screen bg-[#fafafa] dark:bg-[#0b0d13] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-blue-500/20 selection:text-blue-900 dark:selection:text-blue-200">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#0b0d13]/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a
            href="/"
            onClick={navigateHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 -ml-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Back to Portfolio</span>
          </a>

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-900/60 bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Domain & SEO Intake (₹1.2k – ₹1.5k)</span>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        {isSubmitted ? (
          <IntakeSuccess
            refId={refId}
            brandName={values.brandName}
            primaryDomain={values.primaryDomain}
            groups={summaryGroups}
            summaryText={summaryText}
          />
        ) : (
          <div className="space-y-8 sm:space-y-10">
            {/* Page Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/80 mb-3">
                <Globe className="w-3.5 h-3.5" />
                <span>Domain Procurement & SEO Foundations</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Client Onboarding & Technical Intake
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                Please provide your essential business, domain, and SEO requirements. We handle legitimate WHOIS domain registration, DNS record propagation, and Google search foundations.
              </p>
            </div>

            {/* WHOIS Security Guarantee Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-transparent border border-blue-200/80 dark:border-blue-800/50 flex items-start gap-3.5"
            >
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>WHOIS & Domain Ownership Guarantee</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">100% Direct Ownership</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your domain will be registered strictly under your verified business identity (official email & phone). You retain full ICANN administrative ownership, EPP authorization transfer keys, and DNS control.
                </p>
              </div>
            </motion.div>

            {/* Onboarding Form */}
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* SECTION A */}
              <section className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#121622]/80 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    A
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      Client & WHOIS Registrant Identity
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Official registry contact info required for ICANN ownership verification.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField
                    name="fullName"
                    label="Full Legal Name"
                    required
                    value={values.fullName}
                    placeholder="e.g. Rahul Sharma"
                    error={touched.fullName ? errors.fullName : undefined}
                    onChange={(v) => setField('fullName', v)}
                    onBlur={() => handleBlur('fullName')}
                  />
                  <TextField
                    name="brandName"
                    label="Business / Brand Name"
                    required
                    value={values.brandName}
                    placeholder="e.g. Apex Studio"
                    error={touched.brandName ? errors.brandName : undefined}
                    onChange={(v) => setField('brandName', v)}
                    onBlur={() => handleBlur('brandName')}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField
                    name="email"
                    label="Official Email Address"
                    required
                    type="email"
                    hint="Primary domain owner email for ICANN registry verification."
                    value={values.email}
                    placeholder="e.g. contact@yourbrand.com"
                    error={touched.email ? errors.email : undefined}
                    onChange={(v) => setField('email', v)}
                    onBlur={() => handleBlur('email')}
                  />
                  <TextField
                    name="phone"
                    label="Phone / WhatsApp Number"
                    required
                    type="tel"
                    hint="Used for urgent registry SMS OTPs & domain verification."
                    value={values.phone}
                    placeholder="e.g. 98765 43210"
                    prefix="+91"
                    error={touched.phone ? errors.phone : undefined}
                    onChange={(v) => setField('phone', v)}
                    onBlur={() => handleBlur('phone')}
                  />
                </div>

                <TextField
                  name="cityState"
                  label="City & State"
                  required
                  hint="Required for registry geographical contact records and local search citation."
                  value={values.cityState}
                  placeholder="e.g. Kolkata, West Bengal"
                  error={touched.cityState ? errors.cityState : undefined}
                  onChange={(v) => setField('cityState', v)}
                  onBlur={() => handleBlur('cityState')}
                />
              </section>

              {/* SECTION B */}
              <section className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#121622]/80 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    B
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      Domain Specifications
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Your chosen web address and alternative fallbacks in case of premium tiers.
                    </p>
                  </div>
                </div>

                <TextField
                  name="primaryDomain"
                  label="Preferred Primary Domain"
                  required
                  hint="Type your first choice (protocols like https:// and www are automatically stripped)."
                  value={values.primaryDomain}
                  placeholder="e.g. yourbrand.in or yourbrand.com"
                  error={touched.primaryDomain ? errors.primaryDomain : undefined}
                  onChange={(v) => setField('primaryDomain', v)}
                  onBlur={() => handleBlur('primaryDomain')}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField
                    name="altDomain1"
                    label="Alternative Domain Choice 1"
                    tag="Recommended"
                    hint="Fallback if primary choice is unavailable or high-tier auction."
                    value={values.altDomain1}
                    placeholder="e.g. getyourbrand.in"
                    error={touched.altDomain1 ? errors.altDomain1 : undefined}
                    onChange={(v) => setField('altDomain1', v)}
                    onBlur={() => handleBlur('altDomain1')}
                  />
                  <TextField
                    name="altDomain2"
                    label="Alternative Domain Choice 2"
                    tag="Optional"
                    hint="Second backup option."
                    value={values.altDomain2}
                    placeholder="e.g. yourbrandstudio.com"
                    error={touched.altDomain2 ? errors.altDomain2 : undefined}
                    onChange={(v) => setField('altDomain2', v)}
                    onBlur={() => handleBlur('altDomain2')}
                  />
                </div>

                <ChoiceField
                  name="tld"
                  label="Preferred Extension / Scope"
                  required
                  value={values.tld}
                  options={TLD_OPTIONS}
                  error={errors.tld}
                  onChange={(v) => setField('tld', v)}
                  columns={2}
                />
              </section>

              {/* SECTION C */}
              <section className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#121622]/80 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    C
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      Website & Hosting Status
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      How your site is built and where your domain DNS records should point.
                    </p>
                  </div>
                </div>

                <ChoiceField
                  name="platform"
                  label="Current Website Platform"
                  required
                  value={values.platform}
                  options={PLATFORM_OPTIONS}
                  error={errors.platform}
                  onChange={(v) => setField('platform', v)}
                  columns={3}
                />

                {values.platform === 'other' && (
                  <TextField
                    name="platformOther"
                    label="Specify Your Platform"
                    required
                    value={values.platformOther}
                    placeholder="e.g. Webflow, Squarespace, Ghost, Static HTML"
                    error={errors.platformOther}
                    onChange={(v) => setField('platformOther', v)}
                    onBlur={() => handleBlur('platformOther')}
                  />
                )}

                <ChoiceField
                  name="hosting"
                  label="Hosting Provider Status"
                  required
                  value={values.hosting}
                  options={HOSTING_OPTIONS}
                  error={errors.hosting}
                  onChange={(v) => setField('hosting', v)}
                  columns={3}
                />

                <TextField
                  name="hostingDetails"
                  label="Host/Server Details or Nameservers"
                  tag="Optional"
                  multiline
                  rows={3}
                  hint="If you already have server IPs (e.g. 76.76.21.21) or custom nameservers (e.g. ns1.vercel-dns.com), paste them here."
                  value={values.hostingDetails}
                  placeholder="e.g. Server IP: 185.199.108.153 or Cloudflare nameservers"
                  onChange={(v) => setField('hostingDetails', v)}
                />
              </section>

              {/* SECTION D */}
              <section className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#121622]/80 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    D
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      Search Presence & SEO Foundations
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Keywords and business description used for meta titles, descriptions, and Google Search Console.
                    </p>
                  </div>
                </div>

                <TextField
                  name="description"
                  label="Core Business Description"
                  required
                  multiline
                  rows={3}
                  maxLength={LIMITS.descriptionMax}
                  showCount
                  hint="2–3 sentences describing your core offering. This will be used to author your primary search meta descriptions."
                  value={values.description}
                  placeholder="e.g. We provide artisanal architectural woodwork and custom interior cabinetry for modern residential homes across Kolkata."
                  error={touched.description ? errors.description : undefined}
                  onChange={(v) => setField('description', v)}
                  onBlur={() => handleBlur('description')}
                />

                <KeywordField
                  value={values.keywords}
                  error={errors.keywords}
                  hint="Type a search query and press Enter or comma (3 to 5 target search phrases)."
                  onChange={(kw) => setField('keywords', kw)}
                  onBlur={() => handleBlur('keywords')}
                />

                <ChoiceField
                  name="geography"
                  label="Target Geography"
                  required
                  value={values.geography}
                  options={GEO_OPTIONS}
                  error={errors.geography}
                  onChange={(v) => setField('geography', v)}
                  columns={3}
                />

                {values.geography === 'local' && (
                  <SelectField
                    name="radiusKm"
                    label="Local City Radius"
                    value={values.radiusKm}
                    options={RADIUS_OPTIONS}
                    placeholder="Select customer radius around your city"
                    onChange={(r) => setField('radiusKm', r)}
                  />
                )}

                <TextField
                  name="competitors"
                  label="Top Competitor URLs"
                  tag="Optional"
                  multiline
                  rows={2}
                  hint="Competitor websites for search benchmarking and keyword gap analysis (separated by spaces or lines)."
                  value={values.competitors}
                  placeholder="e.g. competitor-brand.in, competitorstudio.com"
                  error={errors.competitors}
                  onChange={(v) => setField('competitors', v)}
                  onBlur={() => handleBlur('competitors')}
                />
              </section>

              {/* Confirmation Checkbox */}
              <div id="group-confirm" className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={values.confirm}
                    onChange={(e) => setField('confirm', e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    I confirm that the provided contact and domain details are accurate, and I authorize registration strictly under these business owner credentials.
                  </span>
                </label>
                {errors.confirm && (
                  <p role="alert" className="mt-2 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.confirm}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-base sm:text-lg transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Client Intake & Launch Mail Client</span>
                </button>
                <p className="mt-2.5 text-center text-xs text-slate-500 dark:text-slate-400">
                  Submitting formats a structured record and triggers your verified email client directly. Zero third-party spam.
                </p>
              </div>
            </form>
          </div>
        )}
      </main>
    </SpotlightGrid>
  );
};

export default ClientIntake;
