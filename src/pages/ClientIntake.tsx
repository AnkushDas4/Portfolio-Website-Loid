import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  AlertCircle,
  Zap,
  Rocket,
  RefreshCw,
  Palette,
  Layout,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { SpotlightGrid } from '../components/SpotlightGrid';
import { IntakeSuccess } from '../components/intake/IntakeSuccess';
import { DomainPreviewCard } from '../components/intake/DomainPreviewCard';
import { GoogleSerpPreviewCard } from '../components/intake/GoogleSerpPreviewCard';
import { 
  TextField, 
  ChoiceField, 
  SelectField, 
  KeywordField,
  CheckboxGroupField
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
  WORKTREE_BRANCH_OPTIONS,
  TLD_OPTIONS, 
  SITE_TYPE_OPTIONS,
  AVAILABLE_SECTIONS,
  VISUAL_VIBE_OPTIONS,
  DNS_ACCESS_OPTIONS,
  PLATFORM_OPTIONS, 
  HOSTING_OPTIONS, 
  GEO_OPTIONS, 
  RADIUS_OPTIONS, 
  LIMITS,
  FIELD_ORDER,
  SummaryGroup,
  WorktreeBranch
} from '../utils/intake';

export const ClientIntake: React.FC = () => {
  const [dark, toggleTheme] = useTheme();
  const [values, setValues] = useState<IntakeValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [draftRestored, setDraftRestored] = useState<boolean>(false);
  
  // Submission state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [refId, setRefId] = useState<string>('');
  const [summaryGroups, setSummaryGroups] = useState<SummaryGroup[]>([]);
  const [summaryText, setSummaryText] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  // Dynamic SEO meta tags and Schema injection for search engine visibility & social sharing
  React.useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Sednium Launchpad | Turnkey Website Creator & Custom Domain Setup';

    const updateOrCreateMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        const [k, v] = selector.replace(/[\[\]"]/g, '').split('=');
        el.setAttribute(k, v);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    updateOrCreateMeta('meta[name="description"]', 'content', 'Launch your custom domain (.in / .com) and high-conversion 1-page website in 24–48 hours. Anycast DNS, SSL, WhatsApp CTA, Google SEO foundations & 100% direct client ownership with zero monthly subscription fees.');
    updateOrCreateMeta('meta[name="keywords"]', 'content', 'turnkey website creator, 1-page website development, domain setup India, Anycast DNS, doctor clinic website, local business website, WhatsApp ordering, no subscription website, Sednium');
    updateOrCreateMeta('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1');
    updateOrCreateMeta('meta[property="og:title"]', 'content', 'Sednium Launchpad | Turnkey Website Creator & Custom Domain Setup');
    updateOrCreateMeta('meta[property="og:description"]', 'content', 'Launch your custom domain (.in / .com) and high-conversion 1-page website in 24–48 hours with Anycast DNS, SSL, and instant WhatsApp CTA.');
    updateOrCreateMeta('meta[property="og:url"]', 'content', 'https://loid.sednium.com/launchpad');

    // JSON-LD Structured Data Schema for LocalBusiness / ProfessionalService
    let schemaScript = document.getElementById('launchpad-jsonld-schema') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'launchpad-jsonld-schema';
      schemaScript.type = 'application/ld+json';
      schemaScript.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': 'Sednium Launchpad: Turnkey Website & Domain Creator',
        'serviceType': 'Web Development & Domain Procurement',
        'provider': {
          '@type': 'Person',
          'name': 'Ankush Das (Loid)',
          'jobTitle': 'Chief Technology Officer',
          'worksFor': {
            '@type': 'Organization',
            'name': 'Sednium Technologies',
            'url': 'https://www.sednium.com'
          }
        },
        'offers': [
          {
            '@type': 'Offer',
            'name': 'Domain Procurement & Anycast DNS Setup',
            'price': '1499',
            'priceCurrency': 'INR',
            'description': 'Procure brand domain, setup Anycast DNS, SSL & Google indexing.'
          },
          {
            '@type': 'Offer',
            'name': 'Turnkey Website + Domain Launch',
            'price': '4499',
            'priceCurrency': 'INR',
            'description': 'Turnkey 1-page high-conversion site, custom domain (.in / .com), edge hosting, WhatsApp CTA & SEO.'
          }
        ],
        'areaServed': [
          { '@type': 'Country', 'name': 'India' },
          { '@type': 'AdministrativeArea', 'name': 'West Bengal' }
        ],
        'description': 'Turnkey 1-page high-conversion website development and custom domain procurement with edge hosting, SSL, and instant WhatsApp booking.'
      });
      document.head.appendChild(schemaScript);
    }

    return () => {
      document.title = originalTitle;
      const existingSchema = document.getElementById('launchpad-jsonld-schema');
      if (existingSchema) existingSchema.remove();
    };
  }, []);

  // Restore draft from localStorage on mount (supports new launchpad key or legacy domain intake key)
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('sednium_launchpad_draft') || localStorage.getItem('sednium_domain_intake_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          const hasContent = Object.entries(parsed).some(([k, v]) => 
            k !== 'worktreeBranch' && k !== 'tld' && k !== 'confirm' && (Array.isArray(v) ? v.length > 0 : Boolean(v))
          );
          if (hasContent) {
            setValues((prev) => ({ ...prev, ...parsed }));
            setDraftRestored(true);
          }
        }
      }
    } catch {}
  }, []);

  // Autosave draft on input changes
  React.useEffect(() => {
    if (!isSubmitted) {
      try {
        localStorage.setItem('sednium_launchpad_draft', JSON.stringify(values));
      } catch {}
    }
  }, [values, isSubmitted]);

  const clearDraft = () => {
    try {
      localStorage.removeItem('sednium_launchpad_draft');
      localStorage.removeItem('sednium_domain_intake_draft');
    } catch {}
    setValues(EMPTY_VALUES);
    setErrors({});
    setTouched({});
    setDraftRestored(false);
  };

  // Field change handler with real-time protocol strip
  const setField = <K extends keyof IntakeValues>(key: K, val: IntakeValues[K]) => {
    let sanitizedVal = val;
    if (key === 'primaryDomain' || key === 'altDomain1' || key === 'altDomain2' || key === 'existingWebsite') {
      if (typeof val === 'string') {
        sanitizedVal = val.replace(/^[a-z]+:\/\//i, '').replace(/^\/\//, '').replace(/\/.*$/, '').trim() as IntakeValues[K];
      }
    }

    setValues((prev) => {
      const next = { ...prev, [key]: sanitizedVal };
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

    // Clear saved draft from localStorage
    try {
      localStorage.removeItem('sednium_launchpad_draft');
      localStorage.removeItem('sednium_domain_intake_draft');
    } catch {}

    setRefId(newRefId);
    setSummaryGroups(groups);
    setSummaryText(summary);
    setIsSubmitted(true);

    // Launch mail client via mailto
    const mailto = buildMailtoUrl(newRefId, clean.brandName, summary, clean.worktreeBranch);
    window.location.href = mailto;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isFormReady = Boolean(
    values.fullName.trim() &&
    values.brandName.trim() &&
    values.email.trim() &&
    values.phone.trim() &&
    values.cityState.trim() &&
    ((values.worktreeBranch === 'redesign-existing' && values.existingWebsite.trim()) ||
     (values.worktreeBranch !== 'redesign-existing' && values.primaryDomain.trim())) &&
    values.confirm
  );

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

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-900/60 bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
              <Rocket className="w-3.5 h-3.5 text-blue-500" />
              <span>Sednium Launchpad</span>
            </div>

            <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
              <Zap className="w-3 h-3 text-emerald-500" />
              <span>24–48h Turnkey Delivery</span>
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
            primaryDomain={values.worktreeBranch === 'redesign-existing' ? values.existingWebsite : values.primaryDomain}
            groups={summaryGroups}
            summaryText={summaryText}
            branch={values.worktreeBranch}
          />
        ) : (
          <div className="space-y-8 sm:space-y-10">
            {/* Draft Restored Banner */}
            {draftRestored && (
              <div className="p-3 px-4 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 flex items-center justify-between text-xs text-blue-900 dark:text-blue-200">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Your launchpad draft was automatically restored from your last session.</span>
                </span>
                <button
                  type="button"
                  onClick={clearDraft}
                  className="font-semibold underline hover:no-underline text-blue-600 dark:text-blue-400 cursor-pointer ml-3 shrink-0"
                >
                  Clear Draft
                </button>
              </div>
            )}

            {/* Page Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/80 mb-3">
                <Rocket className="w-3.5 h-3.5 text-blue-500" />
                <span>Turnkey Web & Domain Launchpad</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Launch Your Website & Brand Domain
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                Choose your primary launch goal below. Our decision worktree dynamically adapts to your exact technical needs—from high-conversion 1-page websites with instant WhatsApp CTA, to standalone domain procurement and DNS routing.
              </p>
            </div>

            {/* WHOIS & Ownership Guarantee Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-transparent border border-blue-200/80 dark:border-blue-800/50 flex items-start gap-3.5"
            >
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 flex-wrap">
                  <span>100% Direct Client Ownership Guarantee</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold">Zero Lock-In</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-700 dark:text-blue-300 font-semibold">No Monthly Fees</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Your domain and website are registered directly under your verified business email and phone. You retain full ICANN registry control, source code access, and EPP transfer keys. Escape recurring ₹2,000–₹4,000/month platform fees—you own your web property forever.
                </p>
              </div>
            </motion.div>

            {/* Launchpad Form with Worktree Branches */}
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-8">
              
              {/* WORKTREE ROOT: STEP 1 - CHOOSE YOUR GOAL */}
              <section id="group-worktreeBranch" className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#121622]/90 border border-blue-200/90 dark:border-blue-900/60 shadow-lg space-y-4">
                <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </span>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        Choose Your Launch Goal (Worktree Root)
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Pick your package. The questionnaire below dynamically updates based on your choice.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-900">
                    Step 1 of 4
                  </span>
                </div>

                <div 
                  role="radiogroup" 
                  aria-label="Launchpad package options"
                  className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2"
                >
                  {WORKTREE_BRANCH_OPTIONS.map((opt) => {
                    const isSelected = values.worktreeBranch === opt.value;
                    return (
                      <div
                        key={opt.value}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onClick={() => setField('worktreeBranch', opt.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setField('worktreeBranch', opt.value);
                          }
                        }}
                        className={`relative p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 shadow-md ring-2 ring-blue-500/20'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}>
                              {opt.badge}
                            </span>
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                              {opt.price}
                            </span>
                          </div>

                          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                            {opt.value === 'launchpad-full' && <Rocket className="w-4 h-4 text-blue-500 shrink-0" />}
                            {opt.value === 'domain-only' && <Globe className="w-4 h-4 text-emerald-500 shrink-0" />}
                            {opt.value === 'redesign-existing' && <RefreshCw className="w-4 h-4 text-purple-500 shrink-0" />}
                            <span>{opt.label}</span>
                          </h3>

                          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                            {opt.hint}
                          </p>
                        </div>

                        <div className="pt-4 mt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold">
                          <span className={isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}>
                            {isSelected ? '✓ Selected Path' : 'Click to select'}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            {opt.value === 'domain-only' ? '2–6h SLA' : '24–48h SLA'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* WORKTREE NODE 2: IDENTITY & OWNER DETAILS (COMMON TO ALL) */}
              <section className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#121622]/80 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      Business & Registrant Identity
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Official registry contact info required for ICANN ownership verification and project coordination.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField
                    name="fullName"
                    label="Full Legal Name"
                    required
                    value={values.fullName}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    error={touched.fullName ? errors.fullName : undefined}
                    onChange={(v) => setField('fullName', v)}
                    onBlur={() => handleBlur('fullName')}
                  />
                  <TextField
                    name="brandName"
                    label="Business / Brand / Clinic Name"
                    required
                    value={values.brandName}
                    placeholder="e.g. Apex Multispeciality Clinic"
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
                    hint="Primary owner email for domain registration verification & live previews."
                    value={values.email}
                    placeholder="e.g. info@apexclinic.com"
                    error={touched.email ? errors.email : undefined}
                    onChange={(v) => setField('email', v)}
                    onBlur={() => handleBlur('email')}
                  />
                  <TextField
                    name="phone"
                    label="WhatsApp / Mobile Number"
                    required
                    type="tel"
                    hint="Used for project updates, live mock links, and WHOIS OTPs."
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
                  hint="Used for WHOIS geographic contact records and Google Local SEO citation."
                  value={values.cityState}
                  placeholder="e.g. Durgapur, West Bengal"
                  error={touched.cityState ? errors.cityState : undefined}
                  onChange={(v) => setField('cityState', v)}
                  onBlur={() => handleBlur('cityState')}
                />
              </section>

              {/* WORKTREE NODE 3: DOMAIN SPECIFICATIONS (BRANCH A & B) OR EXISTING ASSETS (BRANCH C) */}
              {values.worktreeBranch !== 'redesign-existing' ? (
                /* Branch A & B: Domain Procurement */
                <section className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#121622]/80 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </span>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        Domain Selection & Scope
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Choose your desired address. We handle registry verification and Anycast DNS setup.
                      </p>
                    </div>
                  </div>

                  <TextField
                    name="primaryDomain"
                    label="Preferred Domain Name"
                    required
                    hint="Type your first choice (protocols like https:// and www are automatically stripped)."
                    value={values.primaryDomain}
                    placeholder="e.g. apexclinic.in or apexclinic.com"
                    error={touched.primaryDomain ? errors.primaryDomain : undefined}
                    onChange={(v) => setField('primaryDomain', v)}
                    onBlur={() => handleBlur('primaryDomain')}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField
                      name="altDomain1"
                      label="Alternative Domain Choice 1"
                      tag="Recommended"
                      hint="Fallback in case primary choice is already taken or high-tier auction."
                      value={values.altDomain1}
                      placeholder="e.g. getapexclinic.in"
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
                      placeholder="e.g. apexhealthcare.com"
                      error={touched.altDomain2 ? errors.altDomain2 : undefined}
                      onChange={(v) => setField('altDomain2', v)}
                      onBlur={() => handleBlur('altDomain2')}
                    />
                  </div>

                  <ChoiceField
                    name="tld"
                    label="Extension Preference"
                    required
                    value={values.tld}
                    options={TLD_OPTIONS}
                    error={errors.tld}
                    onChange={(v) => setField('tld', v)}
                    columns={2}
                  />

                  {/* Dynamic Domain & DNS Live Preview Simulation */}
                  <div className="pt-2">
                    <DomainPreviewCard
                      primaryDomain={values.primaryDomain}
                      tld={values.tld}
                      brandName={values.brandName}
                      branch={values.worktreeBranch}
                      visualVibe={values.visualVibe}
                      sectionsCount={values.sectionsNeeded.length}
                    />
                  </div>
                </section>
              ) : (
                /* Branch C: Existing Domain & DNS Access */
                <section className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#121622]/80 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </span>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        Existing Domain & DNS Access
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Tell us about your current web address so we can point it to the new high-performance build.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField
                      name="existingWebsite"
                      label="Current Domain / Website Address"
                      required
                      hint="Your existing web address that you want to upgrade or point."
                      value={values.existingWebsite}
                      placeholder="e.g. drsharma.com or oldclinic.in"
                      error={touched.existingWebsite ? errors.existingWebsite : undefined}
                      onChange={(v) => setField('existingWebsite', v)}
                      onBlur={() => handleBlur('existingWebsite')}
                    />
                    <TextField
                      name="registrar"
                      label="Domain Registrar (Where was it bought?)"
                      tag="Optional"
                      hint="e.g. GoDaddy, Hostinger, Spaceship, Namecheap, Google Domains"
                      value={values.registrar}
                      placeholder="e.g. GoDaddy"
                      onChange={(v) => setField('registrar', v)}
                    />
                  </div>

                  <ChoiceField
                    name="hasDnsAccess"
                    label="DNS & Dashboard Access Status"
                    required
                    value={values.hasDnsAccess}
                    options={DNS_ACCESS_OPTIONS}
                    error={errors.hasDnsAccess}
                    onChange={(v) => setField('hasDnsAccess', v)}
                    columns={3}
                  />

                  <div className="space-y-1.5">
                    <TextField
                      name="hostingDetails"
                      label="Existing IP / CNAME / Nameservers (if known)"
                      tag="Optional"
                      multiline
                      rows={2}
                      hint="Paste existing DNS records or server IP if you have them. Otherwise, leave blank and we will provide DNS target records."
                      value={values.hostingDetails}
                      placeholder="e.g. Current Nameservers: ns1.godaddy.com, ns2.godaddy.com"
                      onChange={(v) => setField('hostingDetails', v)}
                    />
                  </div>

                  {/* Dynamic Domain & DNS Live Preview Simulation */}
                  <div className="pt-2">
                    <DomainPreviewCard
                      primaryDomain={values.primaryDomain}
                      existingWebsite={values.existingWebsite}
                      tld={values.tld}
                      brandName={values.brandName}
                      branch={values.worktreeBranch}
                      visualVibe={values.visualVibe}
                      sectionsCount={values.sectionsNeeded.length}
                    />
                  </div>
                </section>
              )}

              {/* WORKTREE NODE 4: WEBSITE CREATOR ARCHITECTURE (BRANCH A & C) OR HOSTING CONNECTION (BRANCH B) */}
              {values.worktreeBranch !== 'domain-only' ? (
                /* Branch A & C: Turnkey Website Creator */
                <section className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#121622]/80 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      4
                    </span>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        Website Structure & Visual Design
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Tailor your website layout, included sections, and aesthetic style for maximum conversion.
                      </p>
                    </div>
                  </div>

                  <ChoiceField
                    name="siteType"
                    label="Primary Website Category"
                    required
                    value={values.siteType}
                    options={SITE_TYPE_OPTIONS}
                    error={errors.siteType}
                    onChange={(v) => setField('siteType', v)}
                    columns={3}
                  />

                  {values.siteType === 'other' && (
                    <TextField
                      name="siteTypeOther"
                      label="Describe Your Website Goal"
                      required
                      value={values.siteTypeOther}
                      placeholder="e.g. Non-profit NGO donation portal, Real estate property booking"
                      error={errors.siteTypeOther}
                      onChange={(v) => setField('siteTypeOther', v)}
                      onBlur={() => handleBlur('siteTypeOther')}
                    />
                  )}

                  <CheckboxGroupField
                    name="sectionsNeeded"
                    label="Included Website Sections & Components"
                    required
                    hint="Select which sections to include on your high-conversion 1-page layout (minimum 2)."
                    values={values.sectionsNeeded}
                    options={AVAILABLE_SECTIONS}
                    error={errors.sectionsNeeded}
                    onChange={(v) => setField('sectionsNeeded', v)}
                  />

                  <ChoiceField
                    name="visualVibe"
                    label="Visual Theme & Aesthetic Vibe"
                    required
                    value={values.visualVibe}
                    options={VISUAL_VIBE_OPTIONS}
                    error={errors.visualVibe}
                    onChange={(v) => setField('visualVibe', v)}
                    columns={2}
                  />
                </section>
              ) : (
                /* Branch B: Domain Only Hosting & Connection Status */
                <section className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#121622]/80 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      4
                    </span>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        Hosting & Site Connection
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        How your existing site is hosted and where your domain DNS records should point.
                      </p>
                    </div>
                  </div>

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

                  <ChoiceField
                    name="platform"
                    label="Website Platform (if already building)"
                    value={values.platform}
                    options={PLATFORM_OPTIONS}
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

                  <div className="space-y-1.5">
                    <TextField
                      name="hostingDetails"
                      label="Server IP (A Record), CNAME, or Nameservers"
                      tag="Optional"
                      multiline
                      rows={2}
                      hint="If you have an IP address, CNAME target, or hosting nameservers, type or paste them here for DNS record pointing."
                      value={values.hostingDetails}
                      placeholder="e.g. Server IP: 76.76.21.21, CNAME: cname.vercel-dns.com, or Nameservers: ns1.hosting.com, ns2.hosting.com"
                      onChange={(v) => setField('hostingDetails', v)}
                    />

                    {/* Quick-insert tags for DNS records */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs text-slate-500 dark:text-slate-400">
                      <span className="text-[11px] font-medium mr-1">Quick insert:</span>
                      <button
                        type="button"
                        onClick={() => {
                          const current = values.hostingDetails;
                          const prefix = current ? (current.endsWith('\n') ? '' : '\n') : '';
                          setField('hostingDetails', `${current}${prefix}Server IP: `);
                        }}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
                      >
                        + Server IP (A)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const current = values.hostingDetails;
                          const prefix = current ? (current.endsWith('\n') ? '' : '\n') : '';
                          setField('hostingDetails', `${current}${prefix}CNAME: `);
                        }}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
                      >
                        + CNAME Target
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const current = values.hostingDetails;
                          const prefix = current ? (current.endsWith('\n') ? '' : '\n') : '';
                          setField('hostingDetails', `${current}${prefix}Nameservers: ns1., ns2.`);
                        }}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
                      >
                        + Nameservers (NS)
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* WORKTREE NODE 5: SEARCH PRESENCE & SEO FOUNDATIONS (COMMON TO ALL) */}
              <section className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#121622]/80 border border-slate-200 dark:border-slate-800/90 shadow-sm space-y-5">
                <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    5
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      Search Presence & SEO Foundations
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Keywords and business description used for meta titles, descriptions, and Google Search Console indexing.
                    </p>
                  </div>
                </div>

                <TextField
                  name="description"
                  label="Core Business Description & Specialty"
                  required
                  multiline
                  rows={3}
                  maxLength={LIMITS.descriptionMax}
                  showCount
                  hint="2–3 sentences describing your core offering. Used to author high-CTR Google search snippets."
                  value={values.description}
                  placeholder="e.g. We provide comprehensive cardiology consultations, non-invasive cardiac testing, and preventative heart care in Durgapur."
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
                  label="Primary Customer Market"
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
                  label="Competitor or Reference Websites"
                  tag="Optional"
                  multiline
                  rows={2}
                  hint="Websites you like or competitors for search benchmarking (separated by spaces or lines)."
                  value={values.competitors}
                  placeholder="e.g. competitorclinic.com, inspirationbrand.in"
                  error={errors.competitors}
                  onChange={(v) => setField('competitors', v)}
                  onBlur={() => handleBlur('competitors')}
                />

                {/* Dynamic Google Search SERP Preview */}
                <div className="pt-2">
                  <GoogleSerpPreviewCard
                    brandName={values.brandName}
                    cityState={values.cityState}
                    description={values.description}
                    primaryDomain={values.primaryDomain}
                    existingWebsite={values.existingWebsite}
                    branch={values.worktreeBranch}
                    tld={values.tld}
                    keywords={values.keywords}
                  />
                </div>
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
                    I confirm that the provided contact and project details are accurate, and I authorize registration strictly under these business owner credentials. No upfront payment required until preview approval.
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
                  className={`w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-base sm:text-lg transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer ${
                    isFormReady
                      ? 'shadow-blue-500/40 ring-2 ring-blue-400/50 hover:shadow-blue-500/50 animate-pulse'
                      : 'shadow-blue-500/20 hover:shadow-blue-500/30'
                  }`}
                >
                  <Rocket className="w-5 h-5" />
                  <span>Generate Launchpad Spec & Open Email</span>
                </button>
                <p className="mt-2.5 text-center text-xs text-slate-500 dark:text-slate-400">
                  Submitting generates a structured spec and launches your verified email client directly. Zero third-party spam.
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
