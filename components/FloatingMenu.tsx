'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeMode, Language } from '@/lib/constants';
import { Translations } from '@/lib/i18n';

interface FloatingMenuProps {
  translations: Translations;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  isPlaying: boolean;
  toggleMusic: () => void;
  volume: number;
  setVolume: (v: number) => void;
}

export default function FloatingMenu({
  translations,
  theme,
  setTheme,
  language,
  setLanguage,
  isPlaying,
  toggleMusic,
  volume,
  setVolume,
}: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setIsVisible(false);
      setIsOpen(false);
    } else {
      setIsVisible(true);
    }
    lastScrollY.current = currentScrollY;

    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, [handleScroll]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes: ThemeMode[] = ['system', 'light', 'dark'];
  const themeLabels: Record<ThemeMode, string> = {
    system: translations.system,
    light: translations.light,
    dark: translations.dark,
  };
  const themeIcons: Record<ThemeMode, string> = {
    system: '💻',
    light: '☀️',
    dark: '🌙',
  };

  const languages: Language[] = ['en', 'ar', 'ml'];
  const langLabels: Record<Language, string> = {
    en: 'EN',
    ar: 'عربي',
    ml: 'മല',
  };

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 8500,
        transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
        transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="glass"
            style={{
              position: 'absolute',
              bottom: '70px',
              right: 0,
              padding: '1.25rem',
              minWidth: '240px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Language */}
            <div>
              <label style={{
                fontSize: '0.7rem',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
                display: 'block',
                fontFamily: 'var(--font-text)',
              }}>
                🌐 {translations.language}
              </label>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      background: language === l ? 'var(--color-primary)' : 'transparent',
                      color: language === l ? '#fff' : 'var(--color-text)',
                      fontFamily: l === 'ar' ? "'Cairo', sans-serif" : l === 'ml' ? "'Manjari', sans-serif" : 'var(--font-text)',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                      minHeight: '36px',
                    }}
                    aria-label={`Switch to ${l === 'en' ? 'English' : l === 'ar' ? 'Arabic' : 'Malayalam'}`}
                  >
                    {langLabels[l]}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <label style={{
                fontSize: '0.7rem',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
                display: 'block',
                fontFamily: 'var(--font-text)',
              }}>
                🌙 {translations.theme}
              </label>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {themes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      background: theme === t ? 'var(--color-primary)' : 'transparent',
                      color: theme === t ? '#fff' : 'var(--color-text)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-text)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                      minHeight: '36px',
                    }}
                    aria-label={`Switch to ${t} theme`}
                  >
                    {themeIcons[t]}
                  </button>
                ))}
              </div>
            </div>

            {/* Music */}
            <div>
              <label style={{
                fontSize: '0.7rem',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
                display: 'block',
                fontFamily: 'var(--font-text)',
              }}>
                🎵 {translations.music}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={toggleMusic}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    background: isPlaying ? 'var(--color-primary)' : 'var(--color-surface)',
                    color: isPlaying ? '#fff' : 'var(--color-text)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all var(--transition-fast)',
                    flexShrink: 0,
                    position: 'relative',
                  }}
                  aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                  {isPlaying ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="8,5 19,12 8,19" />
                    </svg>
                  )}
                  {/* Waveform visualizer */}
                  {isPlaying && (
                    <div style={{
                      position: 'absolute',
                      inset: '-4px',
                      borderRadius: '50%',
                      border: '2px solid var(--color-primary)',
                      animation: 'pulse 1.5s ease-in-out infinite',
                      opacity: 0.4,
                    }} />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  style={{
                    flex: 1,
                    height: '4px',
                    accentColor: 'var(--color-primary)',
                    cursor: 'pointer',
                  }}
                  aria-label="Volume"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: 'none',
          background: 'linear-gradient(135deg, var(--color-primary) 0%, #B8852E 100%)',
          color: '#FFFFFF',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-md), 0 0 30px var(--color-primary-glow)',
          transition: 'transform var(--transition-fast)',
        }}
        aria-label={isOpen ? 'Close settings menu' : 'Open settings menu'}
        aria-expanded={isOpen}
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Islamic star / settings icon */}
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
        </motion.svg>
      </motion.button>
    </div>
  );
}
