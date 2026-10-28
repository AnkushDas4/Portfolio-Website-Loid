import React, { useState } from 'react';
import { AlertCircle, Check, X } from 'lucide-react';
import { LIMITS, Option, splitKeywords } from '../../utils/intake';

const inputBase =
  'w-full py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border text-base sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 min-h-[48px]';
const inputOk = 'border-slate-200 dark:border-slate-800 focus:ring-blue-500/25 focus:border-blue-500';
const inputBad = 'border-rose-400 dark:border-rose-500/70 focus:ring-rose-500/25 focus:border-rose-500';

const describedBy = (name: string, hint?: React.ReactNode, error?: string) =>
  [hint ? `hint-${name}` : '', error ? `error-${name}` : ''].filter(Boolean).join(' ') || undefined;

interface ShellProps {
  name: string;
  label: string;
  required?: boolean;
  tag?: string;
  hint?: React.ReactNode;
  error?: string;
  /** Use a <label> bound to the control (true) or a plain caption for grouped controls (false). */
  bindLabel?: boolean;
  aside?: React.ReactNode;
  children: React.ReactNode;
}

const FieldShell: React.FC<ShellProps> = ({ name, label, required, tag, hint, error, bindLabel = true, aside, children }) => {
  const labelClass = 'text-xs font-semibold text-slate-700 dark:text-slate-300';
  return (
    <div id={`group-${name}`} className="scroll-mt-28">
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        {bindLabel ? (
          <label id={`label-${name}`} htmlFor={`field-${name}`} className={labelClass}>
            {label}
            {required && <span aria-hidden="true" className="text-rose-500"> *</span>}
          </label>
        ) : (
          <span id={`label-${name}`} className={labelClass}>
            {label}
            {required && <span aria-hidden="true" className="text-rose-500"> *</span>}
          </span>
        )}
        {tag && <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 shrink-0">{tag}</span>}
      </div>
      {hint && (
        <p id={`hint-${name}`} className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 mb-2">
          {hint}
        </p>
      )}
      {children}
      {aside}
      {error && (
        <p id={`error-${name}`} role="alert" className="mt-1.5 flex items-start gap-1.5 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="w-3.5 h-3.5 mt-px shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */

interface TextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  hint?: React.ReactNode;
  required?: boolean;
  tag?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel';
  inputMode?: React.HTMLAttributes<HTMLElement>['inputMode'];
  autoComplete?: string;
  prefix?: string;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  showCount?: boolean;
  disabled?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  name, label, value, onChange, onBlur, error, hint, required, tag, placeholder,
  type = 'text', inputMode, autoComplete, prefix, maxLength, multiline, rows = 4, showCount, disabled,
}) => {
  const common = {
    id: `field-${name}`,
    name,
    value,
    placeholder,
    disabled,
    maxLength,
    autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-required': required || undefined,
    'aria-describedby': describedBy(name, hint, error),
    onBlur,
    className: `${inputBase} ${error ? inputBad : inputOk} ${prefix ? 'pl-12 pr-4' : 'px-3.5 sm:px-4'}`,
  };

  return (
    <FieldShell
      name={name}
      label={label}
      required={required}
      tag={tag}
      hint={hint}
      error={error}
      aside={
        showCount && maxLength ? (
          <p className="mt-1.5 text-right text-[11px] tabular-nums text-slate-400 dark:text-slate-500" aria-hidden="true">
            {value.length}/{maxLength}
          </p>
        ) : null
      }
    >
      {multiline ? (
        <textarea
          {...common}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          className={`${common.className} resize-none`}
        />
      ) : (
        <div className="relative">
          {prefix && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 select-none" aria-hidden="true">
              {prefix}
            </span>
          )}
          <input {...common} type={type} inputMode={inputMode} onChange={(e) => onChange(e.target.value)} />
        </div>
      )}
    </FieldShell>
  );
};

/* ------------------------------------------------------------------ */

interface ChoiceFieldProps<T extends string> {
  name: string;
  label: string;
  value: T | '';
  options: Option<T>[];
  onChange: (v: T) => void;
  error?: string;
  hint?: React.ReactNode;
  required?: boolean;
  columns?: 2 | 3;
}

export function ChoiceField<T extends string>({
  name, label, value, options, onChange, error, hint, required, columns = 3,
}: ChoiceFieldProps<T>) {
  const grid = columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3';
  return (
    <FieldShell name={name} label={label} required={required} hint={hint} error={error} bindLabel={false}>
      <div
        id={`field-${name}`}
        role="radiogroup"
        aria-labelledby={`label-${name}`}
        aria-describedby={describedBy(name, hint, error)}
        aria-invalid={error ? true : undefined}
        className={`grid grid-cols-1 ${grid} gap-2.5`}
      >
        {options.map((o) => {
          const selected = value === o.value;
          return (
            <label
              key={o.value}
              className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer select-none min-h-[48px] transition-colors focus-within:ring-2 focus-within:ring-blue-500/40 ${
                selected
                  ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-500/10'
                  : error
                  ? 'border-rose-300 dark:border-rose-500/50 bg-slate-50 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={selected}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`mt-0.5 w-4 h-4 shrink-0 rounded-full border flex items-center justify-center transition-colors ${
                  selected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 dark:border-slate-600'
                }`}
              >
                {selected && <Check className="w-2.5 h-2.5" strokeWidth={3.5} />}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">{o.label}</span>
                {o.hint && <span className="block text-xs leading-snug text-slate-500 dark:text-slate-400 mt-0.5">{o.hint}</span>}
              </span>
            </label>
          );
        })}
      </div>
    </FieldShell>
  );
}

/* ------------------------------------------------------------------ */

interface CheckboxGroupFieldProps {
  name: string;
  label: string;
  values: string[];
  options: { id: string; name: string; description?: string }[];
  onChange: (next: string[]) => void;
  error?: string;
  hint?: React.ReactNode;
  required?: boolean;
}

export const CheckboxGroupField: React.FC<CheckboxGroupFieldProps> = ({
  name,
  label,
  values,
  options,
  onChange,
  error,
  hint,
  required,
}) => {
  const toggle = (id: string) => {
    if (values.includes(id)) {
      onChange(values.filter((v) => v !== id));
    } else {
      onChange([...values, id]);
    }
  };

  return (
    <FieldShell name={name} label={label} required={required} hint={hint} error={error} bindLabel={false}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {options.map((opt) => {
          const checked = values.includes(opt.id);
          return (
            <label
              key={opt.id}
              className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer select-none min-h-[48px] transition-all focus-within:ring-2 focus-within:ring-blue-500/40 ${
                checked
                  ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-500/10'
                  : error
                  ? 'border-rose-300 dark:border-rose-500/50 bg-slate-50 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <input
                type="checkbox"
                name={`${name}[]`}
                value={opt.id}
                checked={checked}
                onChange={() => toggle(opt.id)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-colors ${
                  checked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 dark:border-slate-600'
                }`}
              >
                {checked && <Check className="w-2.5 h-2.5" strokeWidth={3.5} />}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">{opt.name}</span>
                {opt.description && (
                  <span className="block text-xs leading-snug text-slate-500 dark:text-slate-400 mt-0.5">
                    {opt.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </FieldShell>
  );
};

/* ------------------------------------------------------------------ */

interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  options: Option<string>[];
  placeholder: string;
  onChange: (v: string) => void;
  tag?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({ name, label, value, options, placeholder, onChange, tag }) => (
  <FieldShell name={name} label={label} tag={tag}>
    <select
      id={`field-${name}`}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputBase} ${inputOk} px-3.5 sm:px-4`}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </FieldShell>
);

/* ------------------------------------------------------------------ */

interface KeywordFieldProps {
  value: string[];
  onChange: (v: string[]) => void;
  onBlur?: () => void;
  error?: string;
  hint?: React.ReactNode;
}

export const KeywordField: React.FC<KeywordFieldProps> = ({ value, onChange, onBlur, error, hint }) => {
  const [draft, setDraft] = useState('');
  const full = value.length >= LIMITS.keywordsMax;

  const commit = (text: string) => {
    const incoming = splitKeywords(text);
    if (!incoming.length) return;
    const have = new Set(value.map((k) => k.toLowerCase()));
    const next = [...value];
    for (const k of incoming) {
      if (next.length >= LIMITS.keywordsMax) break;
      if (!have.has(k.toLowerCase())) next.push(k);
    }
    onChange(next);
  };

  const flush = () => {
    if (draft.trim()) commit(draft);
    setDraft('');
  };

  return (
    <FieldShell
      name="keywords"
      label="Search phrases"
      required
      hint={hint}
      error={error}
      aside={
        <p className="mt-1.5 text-right text-[11px] tabular-nums text-slate-400 dark:text-slate-500" aria-live="polite">
          {value.length} of {LIMITS.keywordsMax} added
        </p>
      }
    >
      <div
        className={`flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border transition-all focus-within:ring-2 min-h-[48px] ${
          error ? 'border-rose-400 dark:border-rose-500/70 focus-within:ring-rose-500/25 focus-within:border-rose-500' : 'border-slate-200 dark:border-slate-800 focus-within:ring-blue-500/25 focus-within:border-blue-500'
        }`}
      >
        {value.map((k) => (
          <span
            key={k}
            className="inline-flex items-center gap-1 pl-3 pr-1 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100"
          >
            {k}
            <button
              type="button"
              onClick={() => onChange(value.filter((x) => x !== k))}
              aria-label={`Remove ${k}`}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" aria-hidden="true" />
            </button>
          </span>
        ))}
        <input
          id="field-keywords"
          type="text"
          value={draft}
          disabled={full}
          maxLength={LIMITS.keywordMaxLength}
          placeholder={full ? 'Maximum reached' : value.length ? 'Add another…' : 'e.g. wedding photographer in Kolkata'}
          aria-invalid={error ? true : undefined}
          aria-required
          aria-describedby={describedBy('keywords', hint, error)}
          onChange={(e) => {
            const t = e.target.value;
            if (t.includes(',') || t.includes('\n')) {
              commit(t);
              setDraft('');
            } else {
              setDraft(t);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              flush();
            } else if (e.key === 'Backspace' && !draft && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
          onPaste={(e) => {
            const text = e.clipboardData.getData('text');
            if (/[,\n;]/.test(text)) {
              e.preventDefault();
              commit(text);
            }
          }}
          onBlur={() => {
            flush();
            onBlur?.();
          }}
          className="flex-1 min-w-[10rem] bg-transparent px-1.5 py-1.5 text-base sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none disabled:opacity-60"
        />
      </div>
    </FieldShell>
  );
};
