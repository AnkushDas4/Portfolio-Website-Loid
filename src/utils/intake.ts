/**
 * Sednium Launchpad: Domain & Turnkey Website Creator
 * Pure helpers: types, worktree options, normalisation, validation and summary building.
 * Zero-spam client-side dispatch via mailto / clipboard / WhatsApp / Telegram.
 */

export type WorktreeBranch = 'launchpad-full' | 'domain-only' | 'redesign-existing';

export type Tld = 'in' | 'com' | 'sednium-subdomain' | 'other' | 'open';
export type Platform = 'custom' | 'wordpress' | 'wix' | 'shopify' | 'in-development' | 'other';
export type Hosting = 'have-hosting' | 'need-dns' | 'need-recommendation';
export type Geography = 'local' | 'pan-india' | 'international';

export type SiteType = 
  | 'business-services'
  | 'clinic-doctor'
  | 'ecommerce-catalog'
  | 'portfolio-creator'
  | 'consulting-agency'
  | 'other';

export type VisualVibe = 
  | 'dark-modern'
  | 'clean-minimal'
  | 'bold-vibrant'
  | 'corporate-trust';

export type DnsAccess = 
  | 'yes-full'
  | 'yes-credentials'
  | 'need-guidance';

export interface IntakeValues {
  worktreeBranch: WorktreeBranch;
  fullName: string;
  brandName: string;
  email: string;
  phone: string;
  cityState: string;

  // Domain branch
  primaryDomain: string;
  altDomain1: string;
  altDomain2: string;
  tld: Tld;

  // Website creator branch
  siteType: SiteType | '';
  siteTypeOther: string;
  sectionsNeeded: string[];
  visualVibe: VisualVibe | '';

  // Existing assets branch
  existingWebsite: string;
  registrar: string;
  hasDnsAccess: DnsAccess | '';
  platform: Platform | '';
  platformOther: string;
  hosting: Hosting | '';
  hostingDetails: string;

  // Search presence & audience
  description: string;
  keywords: string[];
  geography: Geography | '';
  radiusKm: string;
  competitors: string;

  confirm: boolean;
  /** Honeypot: real people never see or fill this. */
  honeypot: string;
}

export type FieldKey = Exclude<keyof IntakeValues, 'honeypot'>;
export type Errors = Partial<Record<FieldKey, string>>;

export const EMPTY_VALUES: IntakeValues = {
  worktreeBranch: 'launchpad-full',
  fullName: '',
  brandName: '',
  email: '',
  phone: '',
  cityState: '',

  primaryDomain: '',
  altDomain1: '',
  altDomain2: '',
  tld: 'in',

  siteType: 'business-services',
  siteTypeOther: '',
  sectionsNeeded: ['hero', 'services', 'about', 'contact-whatsapp'],
  visualVibe: 'dark-modern',

  existingWebsite: '',
  registrar: '',
  hasDnsAccess: 'yes-full',
  platform: '',
  platformOther: '',
  hosting: 'have-hosting',
  hostingDetails: '',

  description: '',
  keywords: [],
  geography: 'local',
  radiusKm: '25',
  competitors: '',
  confirm: false,
  honeypot: '',
};

export const LIMITS = {
  keywordsMin: 3,
  keywordsMax: 5,
  keywordMaxLength: 60,
  competitorsMax: 5,
  descriptionMin: 35,
  descriptionMax: 400,
};

export interface Option<T extends string> {
  value: T;
  label: string;
  hint?: string;
  badge?: string;
  price?: string;
}

export const WORKTREE_BRANCH_OPTIONS: Option<WorktreeBranch>[] = [
  {
    value: 'launchpad-full',
    label: 'Complete Website + Domain Launch',
    hint: 'Turnkey 1-page high-conversion site, custom domain (.in / .com), edge hosting, WhatsApp CTA & SEO.',
    badge: 'Most Popular',
    price: '₹4,499 – ₹6,499',
  },
  {
    value: 'domain-only',
    label: 'Domain Procurement & DNS Setup',
    hint: 'Procure your official brand domain or subdomain, configure Anycast DNS, SSL & Google indexing.',
    badge: 'Quick Setup',
    price: '₹1,499',
  },
  {
    value: 'redesign-existing',
    label: 'Website Build for Existing Domain',
    hint: 'You already own a domain or existing site; we build a modern, high-speed website and connect DNS.',
    badge: 'Site Upgrade',
    price: '₹3,999 – ₹5,999',
  },
];

export const TLD_OPTIONS: Option<Tld>[] = [
  { value: 'in', label: '.in', hint: 'India-exclusive registry (fastest local trust)' },
  { value: 'com', label: '.com', hint: 'Global reach & international audience' },
  { value: 'sednium-subdomain', label: 'Subdomain on sednium.com', hint: 'e.g. yourbrand.sednium.com (included managed subdomain)' },
  { value: 'other', label: 'Other TLD', hint: '.org, .co, .io, .net, .store, etc.' },
  { value: 'open', label: 'Open to recommendation', hint: 'We will suggest the best TLD for your budget & market' },
];

export const SITE_TYPE_OPTIONS: Option<SiteType>[] = [
  { value: 'business-services', label: 'Business & Local Services', hint: 'Contractors, repair, logistics, agencies, catering' },
  { value: 'clinic-doctor', label: 'Doctor & Healthcare Clinic', hint: 'OPD timings, specialties, doctor profile, booking' },
  { value: 'ecommerce-catalog', label: 'Product Catalog & Store', hint: 'Menu or product showcase with WhatsApp checkout' },
  { value: 'portfolio-creator', label: 'Portfolio & Personal Brand', hint: 'Photographers, creators, consultants, developers' },
  { value: 'consulting-agency', label: 'Consulting, Legal & Finance', hint: 'Law firms, CA/tax consultants, corporate advisors' },
  { value: 'other', label: 'Other / Custom Goal', hint: 'Describe your custom web project requirements' },
];

export interface SectionItem {
  id: string;
  name: string;
  description: string;
}

export const AVAILABLE_SECTIONS: SectionItem[] = [
  { id: 'hero', name: 'Hero Hook & CTA', description: 'Headline, subhead, primary WhatsApp or call button' },
  { id: 'services', name: 'Services / Offerings', description: 'Interactive cards detailing core services or products' },
  { id: 'about', name: 'About Us / Doctor Bio', description: 'Founder background, credentials, and experience' },
  { id: 'pricing', name: 'Pricing / Packages', description: 'Transparent fee structures or service tiers' },
  { id: 'testimonials', name: 'Social Proof & Reviews', description: 'Verified customer feedback, ratings, and stats' },
  { id: 'contact-whatsapp', name: 'Instant Contact Widget', description: 'One-click WhatsApp chat and quick inquiry form' },
  { id: 'location-map', name: 'Storefront / Clinic Map', description: 'Google Maps embed, clinic address, and directions' },
];

export const VISUAL_VIBE_OPTIONS: Option<VisualVibe>[] = [
  { value: 'dark-modern', label: 'Dark Cyber & Modern Tech', hint: 'Deep slate backgrounds, neon/electric blue accents' },
  { value: 'clean-minimal', label: 'Clean Minimalist & Airy', hint: 'Crisp light mode, spacious typography, high clarity' },
  { value: 'bold-vibrant', label: 'Bold & Vibrant Energy', hint: 'High-contrast accents, striking buttons, punchy layout' },
  { value: 'corporate-trust', label: 'Corporate & Deep Trust', hint: 'Navy blues, refined serif headings, professional elegance' },
];

export const DNS_ACCESS_OPTIONS: Option<DnsAccess>[] = [
  { value: 'yes-full', label: 'I have full Registrar / DNS access', hint: 'Can log in to GoDaddy, Hostinger, Spaceship, Namecheap, etc.' },
  { value: 'yes-credentials', label: 'I have Nameserver / IP / CNAME values', hint: 'My hosting or DNS provider gave me DNS target records' },
  { value: 'need-guidance', label: 'Need step-by-step guidance', hint: 'We will share a 1-minute walkthrough or assist directly' },
];

export const PLATFORM_OPTIONS: Option<Platform>[] = [
  { value: 'custom', label: 'Custom code (React, HTML/JS)' },
  { value: 'wordpress', label: 'WordPress' },
  { value: 'wix', label: 'Wix' },
  { value: 'shopify', label: 'Shopify' },
  { value: 'in-development', label: 'Still in development' },
  { value: 'other', label: 'Other' },
];

export const HOSTING_OPTIONS: Option<Hosting>[] = [
  { value: 'have-hosting', label: 'I already have hosting', hint: 'I have an active server or web hosting plan' },
  { value: 'need-dns', label: 'Point my domain to my site', hint: 'My site is already online; the domain just needs connecting (DNS)' },
  { value: 'need-recommendation', label: 'Recommend edge hosting for me', hint: 'Ultra-fast global edge hosting (Cloudflare/Vercel/Firebase)' },
];

export const GEO_OPTIONS: Option<Geography>[] = [
  { value: 'local', label: 'Local City / District', hint: 'Customers in and around your city' },
  { value: 'pan-india', label: 'Pan-India', hint: 'Customers across all of India' },
  { value: 'international', label: 'International / Global', hint: 'Global audience in other countries' },
];

export const RADIUS_OPTIONS: Option<string>[] = [
  { value: '10', label: 'Within 10 km' },
  { value: '25', label: 'Within 25 km' },
  { value: '50', label: 'Within 50 km' },
  { value: '100', label: 'Within 100 km' },
];

export const labelOf = <T extends string>(options: Option<T>[], value: string): string =>
  options.find((o) => o.value === value)?.label ?? value;

/* ------------------------------------------------------------------ */
/* Normalisers                                                          */
/* ------------------------------------------------------------------ */

export const collapse = (s: string): string => s.replace(/\s+/g, ' ').trim();

/** "https://www.Brand.in/about?x=1" -> "brand.in". Keeps inner spaces so validation can flag them. */
export const cleanDomain = (raw: string): string =>
  raw
    .trim()
    .toLowerCase()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//, '')
    .replace(/^\/\//, '')
    .replace(/^www\./, '')
    .split(/[/?#]/)[0]
    .replace(/:\d+$/, '')
    .replace(/\.+$/, '');

const LABEL = '[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?';
const DOMAIN_RE = new RegExp(`^${LABEL}(?:\\.${LABEL})*$`);

export const isValidDomain = (d: string): boolean =>
  d.length > 0 && d.length <= 253 && DOMAIN_RE.test(d) && (!d.includes('.') || /\.[a-z]{2,}$/.test(d));

export const isValidEmail = (e: string): boolean => {
  const v = e.trim();
  return v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
};

/** Returns the 10 digit mobile number or null. Accepts +91 / 0 prefixes and spaces/dashes. */
export const normalizePhone = (raw: string): string | null => {
  let d = raw.replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
};

export const formatPhone = (digits: string): string => `${digits.slice(0, 5)} ${digits.slice(5)}`;

/** Splits typed/pasted text into clean, unique search phrases. */
export const splitKeywords = (raw: string): string[] => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of raw.split(/[,\n;]+/)) {
    const k = collapse(part).slice(0, LIMITS.keywordMaxLength);
    if (k.length >= 2 && !seen.has(k.toLowerCase())) {
      seen.add(k.toLowerCase());
      out.push(k);
    }
  }
  return out;
};

export const parseCompetitors = (raw: string): { items: string[]; invalid: string[] } => {
  const items: string[] = [];
  const invalid: string[] = [];
  for (const token of raw.split(/[\s,;]+/).filter(Boolean)) {
    const noProto = token.replace(/^[a-z][a-z0-9+.-]*:\/\//i, '').replace(/^\/\//, '');
    const slash = noProto.indexOf('/');
    const host = (slash === -1 ? noProto : noProto.slice(0, slash)).toLowerCase().replace(/^www\./, '').replace(/:\d+$/, '');
    const rest = slash === -1 ? '' : noProto.slice(slash).replace(/\/+$/, '');
    if (isValidDomain(host) && host.includes('.')) {
      const clean = host + rest;
      if (!items.includes(clean)) items.push(clean);
    } else {
      invalid.push(token);
    }
  }
  return { items, invalid };
};

/* ------------------------------------------------------------------ */
/* Validation                                                           */
/* ------------------------------------------------------------------ */

const domainProblem = (raw: string): string | null => {
  const c = cleanDomain(raw);
  if (/\s/.test(c)) return 'Domain names cannot contain spaces.';
  if (!isValidDomain(c)) return 'Use letters, numbers and hyphens only, like brandname.in';
  return null;
};

export function validate(v: IntakeValues): Errors {
  const e: Errors = {};

  // Common: Identity
  if (collapse(v.fullName).length < 2) e.fullName = 'Please enter your full name.';
  if (collapse(v.brandName).length < 2) e.brandName = 'Please enter your business or brand name.';

  if (!v.email.trim()) e.email = 'Please enter your official email.';
  else if (!isValidEmail(v.email)) e.email = 'This email does not look right. Check for typos, e.g. name@company.com';

  if (!v.phone.trim()) e.phone = 'Please enter your phone or WhatsApp number.';
  else if (!normalizePhone(v.phone)) e.phone = 'Enter a 10-digit mobile number, e.g. 98765 43210';

  if (collapse(v.cityState).length < 3) e.cityState = 'Please enter your city and state, e.g. Durgapur, West Bengal';

  // Branch A: Turnkey Website + Domain OR Branch B: Domain Only
  if (v.worktreeBranch === 'launchpad-full' || v.worktreeBranch === 'domain-only') {
    const primary = cleanDomain(v.primaryDomain);
    if (!v.primaryDomain.trim()) {
      e.primaryDomain = 'Please enter your desired domain name, e.g. brandname.in';
    } else {
      e.primaryDomain = domainProblem(v.primaryDomain) ?? undefined;
    }
    if (!e.primaryDomain) delete e.primaryDomain;

    const alt1 = cleanDomain(v.altDomain1);
    const alt2 = cleanDomain(v.altDomain2);
    if (v.altDomain1.trim()) {
      const p = domainProblem(v.altDomain1);
      if (p) e.altDomain1 = p;
      else if (alt1 === primary) e.altDomain1 = 'This is the same as your first choice. Try a different name.';
    }
    if (v.altDomain2.trim()) {
      const p = domainProblem(v.altDomain2);
      if (p) e.altDomain2 = p;
      else if (alt2 === primary || alt2 === alt1) e.altDomain2 = 'This matches another choice above. Try a different name.';
    }
  }

  // Branch C: Existing Domain
  if (v.worktreeBranch === 'redesign-existing') {
    if (!v.existingWebsite.trim()) {
      e.existingWebsite = 'Please enter your current domain or website address, e.g. drsharma.com';
    } else {
      const p = domainProblem(v.existingWebsite);
      if (p) e.existingWebsite = p;
    }
    if (!v.hasDnsAccess) {
      e.hasDnsAccess = 'Please specify your DNS or domain dashboard status.';
    }
  }

  // Website creator branches (Branch A & Branch C)
  if (v.worktreeBranch === 'launchpad-full' || v.worktreeBranch === 'redesign-existing') {
    if (!v.siteType) e.siteType = 'Please select the type of website.';
    else if (v.siteType === 'other' && collapse(v.siteTypeOther).length < 3) {
      e.siteTypeOther = 'Please describe your website purpose.';
    }

    if (v.sectionsNeeded.length < 2) {
      e.sectionsNeeded = 'Please select at least 2 key sections for your website.';
    }

    if (!v.visualVibe) e.visualVibe = 'Please choose a visual style / theme.';
  }

  // Branch B: Domain Only hosting questions
  if (v.worktreeBranch === 'domain-only') {
    if (!v.hosting) e.hosting = 'Please choose one hosting option.';
    if (v.platform === 'other' && collapse(v.platformOther).length < 2) {
      e.platformOther = 'Tell us which platform you use.';
    }
  }

  // Common: Search presence
  const desc = collapse(v.description);
  if (desc.length < LIMITS.descriptionMin) {
    e.description = 'Please add 2–3 sentences describing your business offerings & specialty.';
  } else if (desc.length > LIMITS.descriptionMax) {
    e.description = `Please keep this under ${LIMITS.descriptionMax} characters.`;
  }

  if (v.keywords.length < LIMITS.keywordsMin) {
    e.keywords = `Add at least ${LIMITS.keywordsMin} search phrases (${v.keywords.length} added so far).`;
  } else if (v.keywords.length > LIMITS.keywordsMax) {
    e.keywords = `Please keep it to ${LIMITS.keywordsMax} phrases.`;
  }

  if (!v.geography) e.geography = 'Please choose your primary customer market.';

  if (v.competitors.trim()) {
    const { items, invalid } = parseCompetitors(v.competitors);
    if (invalid.length) e.competitors = `We could not read: ${invalid.slice(0, 2).join(', ')}. Use addresses like example.com`;
    else if (items.length > LIMITS.competitorsMax) e.competitors = `Please list up to ${LIMITS.competitorsMax} websites.`;
  }

  if (!v.confirm) e.confirm = 'Please confirm to submit your launchpad spec.';

  return e;
}

export const FIELD_ORDER: FieldKey[] = [
  'worktreeBranch',
  'fullName', 'brandName', 'email', 'phone', 'cityState',
  'primaryDomain', 'altDomain1', 'altDomain2', 'tld',
  'existingWebsite', 'registrar', 'hasDnsAccess',
  'siteType', 'siteTypeOther', 'sectionsNeeded', 'visualVibe',
  'platform', 'platformOther', 'hosting', 'hostingDetails',
  'description', 'keywords', 'geography', 'radiusKm', 'competitors', 'confirm',
];

/* ------------------------------------------------------------------ */
/* Final data + summary                                                 */
/* ------------------------------------------------------------------ */

export function normalizeValues(v: IntakeValues): IntakeValues {
  const phone = normalizePhone(v.phone);
  return {
    ...v,
    fullName: collapse(v.fullName),
    brandName: collapse(v.brandName),
    email: v.email.trim().toLowerCase(),
    phone: phone ? `+91 ${formatPhone(phone)}` : v.phone.trim(),
    cityState: collapse(v.cityState),
    primaryDomain: cleanDomain(v.primaryDomain),
    altDomain1: cleanDomain(v.altDomain1),
    altDomain2: cleanDomain(v.altDomain2),
    existingWebsite: cleanDomain(v.existingWebsite),
    registrar: collapse(v.registrar),
    siteTypeOther: v.siteType === 'other' ? collapse(v.siteTypeOther) : '',
    platformOther: v.platform === 'other' ? collapse(v.platformOther) : '',
    hostingDetails: v.hostingDetails.trim(),
    description: collapse(v.description),
    radiusKm: v.geography === 'local' ? v.radiusKm : '',
    competitors: parseCompetitors(v.competitors).items.join('\n'),
    honeypot: '',
  };
}

export interface SummaryGroup {
  title: string;
  rows: { label: string; value: string }[];
}

export function buildSummaryGroups(v: IntakeValues): SummaryGroup[] {
  const rows = (list: [string, string][]) => list.filter(([, val]) => val).map(([label, value]) => ({ label, value }));
  const radius = v.radiusKm ? labelOf(RADIUS_OPTIONS, v.radiusKm) : '';
  const branchOption = WORKTREE_BRANCH_OPTIONS.find((b) => b.value === v.worktreeBranch);

  const groups: SummaryGroup[] = [
    {
      title: 'Selected Launchpad Package',
      rows: rows([
        ['Package Goal', branchOption?.label || v.worktreeBranch],
        ['Estimated Pricing', branchOption?.price || 'Custom Quote'],
        ['Estimated Delivery', v.worktreeBranch === 'domain-only' ? '2–6 hours' : '24–48 hours'],
      ]),
    },
    {
      title: 'Owner & Business Identity',
      rows: rows([
        ['Full Name', v.fullName],
        ['Business / Brand', v.brandName],
        ['Official Email', v.email],
        ['Phone / WhatsApp', v.phone],
        ['City & State', v.cityState],
      ]),
    },
  ];

  if (v.worktreeBranch === 'launchpad-full' || v.worktreeBranch === 'domain-only') {
    groups.push({
      title: 'Domain Configuration',
      rows: rows([
        ['Preferred Domain', v.primaryDomain],
        ['Extension Choice', labelOf(TLD_OPTIONS, v.tld)],
        ['Backup Option 1', v.altDomain1],
        ['Backup Option 2', v.altDomain2],
      ]),
    });
  }

  if (v.worktreeBranch === 'redesign-existing') {
    groups.push({
      title: 'Existing Domain & Access',
      rows: rows([
        ['Current Domain / Site', v.existingWebsite],
        ['Registrar (if known)', v.registrar],
        ['DNS / Dashboard Access', labelOf(DNS_ACCESS_OPTIONS, v.hasDnsAccess)],
        ['IP / CNAME / Server Notes', v.hostingDetails],
      ]),
    });
  }

  if (v.worktreeBranch === 'launchpad-full' || v.worktreeBranch === 'redesign-existing') {
    const sectionNames = v.sectionsNeeded
      .map((secId) => AVAILABLE_SECTIONS.find((s) => s.id === secId)?.name || secId)
      .join(', ');

    groups.push({
      title: 'Website Architecture & Design',
      rows: rows([
        ['Website Category', v.siteType === 'other' && v.siteTypeOther ? `Other: ${v.siteTypeOther}` : labelOf(SITE_TYPE_OPTIONS, v.siteType)],
        ['Included Sections', sectionNames],
        ['Visual Style / Vibe', labelOf(VISUAL_VIBE_OPTIONS, v.visualVibe)],
      ]),
    });
  }

  if (v.worktreeBranch === 'domain-only') {
    groups.push({
      title: 'Hosting & DNS Integration',
      rows: rows([
        ['Existing Website URL / Name', v.existingWebsite],
        ['Built with', v.platform === 'other' && v.platformOther ? `Other: ${v.platformOther}` : labelOf(PLATFORM_OPTIONS, v.platform)],
        ['Hosting Status', labelOf(HOSTING_OPTIONS, v.hosting)],
        ['IP / CNAME / Nameservers', v.hostingDetails],
      ]),
    });
  }

  groups.push({
    title: 'Search Presence & Customer Reach',
    rows: rows([
      ['What the business offers', v.description],
      ['Search Keywords', v.keywords.join(', ')],
      ['Target Audience', labelOf(GEO_OPTIONS, v.geography) + (radius ? ` (${radius})` : '')],
      ['Competitors Mentioned', v.competitors.split('\n').filter(Boolean).join(', ')],
    ]),
  });

  return groups;
}

export function buildSummaryText(groups: SummaryGroup[], refId: string): string {
  const body = groups
    .map((g) => `## ${g.title}\n${g.rows.map((r) => `* **${r.label}**: ${r.value}`).join('\n')}`)
    .join('\n\n');
  return `# Sednium Launchpad: Domain & Turnkey Website Creator\n**Reference Code:** ${refId}\n\n${body}\n\n---\n*Sent via Sednium Launchpad (https://loid.sednium.com/launchpad)*`;
}

export function generateRefId(): string {
  const time = Date.now().toString(36).slice(-5).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `SED-${time}${rand}`;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function buildMailtoUrl(refId: string, brandName: string, summaryText: string, branch: WorktreeBranch): string {
  const to = 'loid@sednium.com';
  const branchTag = branch === 'launchpad-full' ? 'Full Website + Domain' : branch === 'redesign-existing' ? 'Website Redesign' : 'Domain Only';
  const subject = `[Launchpad Intake Ref: ${refId}] ${brandName || 'New Client'} (${branchTag})`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summaryText)}`;
}

export function buildTelegramUrl(refId: string, brandName: string, primaryTarget: string, branch: WorktreeBranch): string {
  const text = `Hey Ankush! I submitted the Sednium Launchpad intake form for ${brandName || 'my business'}.\nTarget: ${primaryTarget || 'Website Launch'}\nBranch: ${branch}\nReference ID: ${refId}`;
  return `https://t.me/ankushdas4?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppUrl(refId: string, brandName: string, primaryTarget: string, branch: WorktreeBranch): string {
  const text = `Hey Ankush! I submitted the Sednium Launchpad intake form for ${brandName || 'my business'}.\nTarget: ${primaryTarget || 'Website Launch'}\nBranch: ${branch}\nReference ID: ${refId}`;
  return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
}
