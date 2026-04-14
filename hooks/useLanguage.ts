'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language } from '@/lib/constants';
import { getTranslations, Translations } from '@/lib/i18n';

function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const saved = localStorage.getItem('wedding-lang');
  return saved === 'ar' || saved === 'ml' || saved === 'en' ? saved : 'en';
}

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);
  const [translations, setTranslations] = useState<Translations>(() => getTranslations(getStoredLanguage()));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const applyLanguage = useCallback((lang: Language) => {
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    root.setAttribute('data-lang', lang);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setLanguageState(lang);
      setTranslations(getTranslations(lang));
      localStorage.setItem('wedding-lang', lang);
      applyLanguage(lang);

      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, [applyLanguage]);

  useEffect(() => {
    applyLanguage(language);
  }, [applyLanguage, language]);

  return { language, setLanguage, translations, isTransitioning };
}
