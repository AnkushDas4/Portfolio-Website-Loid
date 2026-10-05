import { useEffect, useState } from 'react';

/** Same storage key and behaviour as the theme logic in App.tsx, for standalone pages. */
export function useTheme(): [boolean, () => void] {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return [dark, () => setDark((d) => !d)];
}
