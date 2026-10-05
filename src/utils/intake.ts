/**
 * Client intake (Domain Procurement, DNS Setup & SEO Foundations)
 * Pure helpers: types, option lists, normalisation, validation and summary building.
 * No React in here so the rules are easy to test and reuse.
 */

export type Tld = 'in' | 'com' | 'sednium-subdomain' | 'other' | 'open';
export type Platform = 'custom' | 'wordpress' | 'wix' | 'shopify' | 'in-development' | 'other';
export type Hosting = 'have-hosting' | 'need-dns' | 'need-recommendation';
export type Geography = 'local' | 'pan-india' | 'international';

export interface IntakeValues {
  fullName: string;
  brandName: string;
  email: string;
  phone: string;
  cityState: string;
  primaryDomain: string;
  altDomain1: string;
  altDomain2: string;
  tld: Tld;
  existingWebsite: string;
  platform: Platform | '';
  platformOther: string;
  hosting: Hosting | '';
  hostingDetails: string;
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
  fullName: '',
  brandName: '',
  email: '',
  phone: '',
  cityState: '',
  primaryDomain: '',
  altDomain1: '',
  altDomain2: '',
  tld: 'open',
  existingWebsite: '',
  platform: '',
  platformOther: '',
  hosting: '',
  hostingDetails: '',
  description: '',
  keywords: [],
  geography: '',
  radiusKm: '',
  competitors: '',
  confirm: false,
  honeypot: '',
};

export const LIMITS = {
  keywordsMin: 3,
  keywordsMax: 5,
  keywordMaxLength: 60,
  competitorsMax: 5,
  descriptionMin: 40,
  descriptionMax: 400,
};

export interface Option<T extends string> {
  value: T;
  label: string;
  hint?: string;
}

export const TLD_OPTIONS: Option<Tld>[] = [
  { value: 'in', label: '.in', hint: 'India-exclusive registry' },
  { value: 'com', label: '.com', hint: 'Global reach & international audience' },
  { value: 'sednium-subdomain', label: 'Subdomain on sednium.com', hint: 'e.g. yourbrand.sednium.com (included managed subdomain)' },
  { value: 'other', label: 'Other TLD', hint: '.org, .co, .io, .net, .store, etc.' },
  { value: 'open', label: 'Open to recommendation', hint: 'We will suggest the best TLD for your budget & market' },
];

export const PLATFORM_OPTIONS: Option<Platform>[] = [
  { value: 'custom', label: 'Custom code' },
  { value: 'wordpress', label: 'WordPress' },
  { value: 'wix', label: 'Wix' },
  { value: 'shopify', label: 'Shopify' },
  { value: 'in-development', label: 'Still in development' },
  { value: 'other', label: 'Other' },
];

export const HOSTING_OPTIONS: Option<Hosting>[] = [
  { value: 'have-hosting', label: 'I already have hosting', hint: 'I have an account with a hosting company' },
  { value: 'need-dns', label: 'Point my domain to my site', hint: 'My site is already online; the domain just needs connecting (DNS / nameservers)' },
  { value: 'need-recommendation', label: 'Recommend hosting for me', hint: 'I need a suggestion that fits my website' },
];

export const GEO_OPTIONS: Option<Geography>[] = [
  { value: 'local', label: 'Local', hint: 'Customers in and around my city' },
  { value: 'pan-india', label: 'Pan-India', hint: 'Customers across the country' },
  { value: 'international', label: 'International', hint: 'Customers in other countries' },
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
  if (/\s/.test(c)) return 'Domain names can’t contain spaces.';
  if (!isValidDomain(c)) return 'Use letters, numbers and hyphens only, like brandname.in';
  return null;
};

export function validate(v: IntakeValues): Errors {
  const e: Errors = {};

  if (collapse(v.fullName).length < 2) e.fullName = 'Please enter your full name.';
  if (collapse(v.brandName).length < 2) e.brandName = 'Please enter your business or brand name.';

  if (!v.email.trim()) e.email = 'Please enter your official email.';
  else if (!isValidEmail(v.email)) e.email = 'This email doesn’t look right. Check for typos, e.g. name@company.com';

  if (!v.phone.trim()) e.phone = 'Please enter your phone or WhatsApp number.';
  else if (!normalizePhone(v.phone)) e.phone = 'Enter a 10-digit mobile number, e.g. 98765 43210';

  if (collapse(v.cityState).length < 3) e.cityState = 'Please enter your city and state, e.g. Durgapur, West Bengal';

  const primary = cleanDomain(v.primaryDomain);
  if (!v.primaryDomain.trim()) e.primaryDomain = 'Please enter the domain you would like, e.g. brandname.in';
  else e.primaryDomain = domainProblem(v.primaryDomain) ?? undefined;
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

  if (!v.platform) e.platform = 'Please choose one option.';
  else if (v.platform === 'other' && collapse(v.platformOther).length < 2) e.platformOther = 'Tell us which platform you use.';
  if (!v.hosting) e.hosting = 'Please choose one option.';

  const desc = collapse(v.description);
  if (desc.length < LIMITS.descriptionMin) e.description = 'Please add a little more detail: 2–3 sentences about what you offer.';
  else if (desc.length > LIMITS.descriptionMax) e.description = `Please keep this under ${LIMITS.descriptionMax} characters.`;

  if (v.keywords.length < LIMITS.keywordsMin) {
    e.keywords = `Add at least ${LIMITS.keywordsMin} search phrases (${v.keywords.length} so far).`;
  } else if (v.keywords.length > LIMITS.keywordsMax) {
    e.keywords = `Please keep it to ${LIMITS.keywordsMax} phrases.`;
  }

  if (!v.geography) e.geography = 'Please choose one option.';

  if (v.competitors.trim()) {
    const { items, invalid } = parseCompetitors(v.competitors);
    if (invalid.length) e.competitors = `We couldn’t read: ${invalid.slice(0, 2).join(', ')}. Use addresses like example.com`;
    else if (items.length > LIMITS.competitorsMax) e.competitors = `Please list up to ${LIMITS.competitorsMax} websites.`;
  }

  if (!v.confirm) e.confirm = 'Please confirm to continue.';

  return e;
}

/** Order the fields appear on the page: used to focus the first problem on submit. */
export const FIELD_ORDER: FieldKey[] = [
  'fullName', 'brandName', 'email', 'phone', 'cityState',
  'primaryDomain', 'altDomain1', 'altDomain2', 'tld',
  'existingWebsite', 'platform', 'platformOther', 'hosting', 'hostingDetails',
  'description', 'keywords', 'geography', 'radiusKm', 'competitors', 'confirm',
];

export const SECTIONS = [
  { id: 'a', letter: 'A', title: 'You & your business', keys: ['fullName', 'brandName', 'email', 'phone', 'cityState'] as FieldKey[] },
  { id: 'b', letter: 'B', title: 'Your domain', keys: ['primaryDomain', 'altDomain1', 'altDomain2'] as FieldKey[] },
  { id: 'c', letter: 'C', title: 'Website & hosting', keys: ['existingWebsite', 'platform', 'platformOther', 'hosting'] as FieldKey[] },
  { id: 'd', letter: 'D', title: 'Search presence', keys: ['description', 'keywords', 'geography', 'competitors'] as FieldKey[] },
];

/* ------------------------------------------------------------------ */
/* Final data + summary                                                 */
/* ------------------------------------------------------------------ */

/** Cleans every value so what we send (and show back) is tidy. Call only after validate() passes. */
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
    existingWebsite: v.existingWebsite.trim(),
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
  return [
    {
      title: 'Owner & business',
      rows: rows([
        ['Full name', v.fullName],
        ['Business / brand', v.brandName],
        ['Official email', v.email],
        ['Phone / WhatsApp', v.phone],
        ['City & state', v.cityState],
      ]),
    },
    {
      title: 'Domain',
      rows: rows([
        ['Preferred domain', v.primaryDomain],
        ['Alternative 1', v.altDomain1],
        ['Alternative 2', v.altDomain2],
        ['Extension', labelOf(TLD_OPTIONS, v.tld)],
      ]),
    },
    {
      title: 'Website & hosting',
      rows: rows([
        ['Existing website URL / name', v.existingWebsite],
        ['Website built with', v.platform === 'other' && v.platformOther ? `Other: ${v.platformOther}` : labelOf(PLATFORM_OPTIONS, v.platform)],
        ['Hosting status', labelOf(HOSTING_OPTIONS, v.hosting)],
        ['IP / CNAME / Nameserver details', v.hostingDetails],
      ]),
    },
    {
      title: 'Search presence',
      rows: rows([
        ['What the business offers', v.description],
        ['Search phrases', v.keywords.join(', ')],
        ['Customers', labelOf(GEO_OPTIONS, v.geography) + (radius ? ` (${radius})` : '')],
        ['Competitors', v.competitors.split('\n').filter(Boolean).join(', ')],
      ]),
    },
  ];
}

export function buildSummaryText(groups: SummaryGroup[], refId: string): string {
  const body = groups
    .map((g) => `${g.title}\n${g.rows.map((r) => `- ${r.label}: ${r.value}`).join('\n')}`)
    .join('\n\n');
  return `Domain & SEO Foundations: client intake\nReference: ${refId}\n\n${body}`;
}

export function generateRefId(): string {
  const time = Date.now().toString(36).slice(-5).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `SED-${time}${rand}`;
}

/** Clipboard with a fallback for older browsers / non-secure contexts. */
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

export function buildMailtoUrl(refId: string, brandName: string, summaryText: string): string {
  const to = 'loid@sednium.com';
  const subject = `[Domain Intake Ref: ${refId}] - ${brandName || 'New Client'}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summaryText)}`;
}

export function buildTelegramUrl(refId: string, brandName: string, primaryDomain: string): string {
  const text = `Hey Ankush! I submitted the Domain Onboarding Intake form for ${brandName} (Domain: ${primaryDomain}). Reference ID: ${refId}`;
  return `https://t.me/ankushdas4?text=${encodeURIComponent(text)}`;
}

