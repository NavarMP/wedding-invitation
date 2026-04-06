'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language } from '@/lib/constants';
import { getTranslations, Translations } from '@/lib/i18n';

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>(getTranslations('en'));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setLanguage = useCallback((lang: Language) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setLanguageState(lang);
      setTranslations(getTranslations(lang));
      localStorage.setItem('wedding-lang', lang);

      const root = document.documentElement;
      root.setAttribute('lang', lang);
      root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

      // Set font class
      root.setAttribute('data-lang', lang);

      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('wedding-lang') as Language | null;
    if (saved) {
      setLanguageState(saved);
      setTranslations(getTranslations(saved));
      const root = document.documentElement;
      root.setAttribute('lang', saved);
      root.setAttribute('dir', saved === 'ar' ? 'rtl' : 'ltr');
      root.setAttribute('data-lang', saved);
    }
  }, []);

  return { language, setLanguage, translations, isTransitioning };
}
