'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { Translations } from '@/lib/i18n';
import { downloadICS, getGoogleCalendarUrl } from '@/lib/calendar';

interface CountdownProps {
  translations: Translations;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const displayValue = String(value).padStart(2, '0');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem',
    }}>
      <div
        className="glass countdown-unit"
        style={{
          width: 'clamp(70px, 18vw, 110px)',
          height: 'clamp(80px, 20vw, 120px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md), 0 0 20px var(--color-primary-glow)',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: '20%',
          right: '20%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
        }} />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-casta)',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 400,
              color: 'var(--color-primary)',
              lineHeight: 1,
            }}
          >
            {displayValue}
          </motion.span>
        </AnimatePresence>
      </div>

      <span style={{
        fontFamily: 'var(--font-text)',
        fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
        color: 'var(--color-text)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        fontWeight: 500,
      }}>
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ translations }: CountdownProps) {
  const countdown = useCountdown();
  const sectionRef = useRef<HTMLElement>(null);
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [reminderStatus, setReminderStatus] = useState<'idle' | 'set' | 'denied'>('idle');
  const [showToast, setShowToast] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default || gsapModule.gsap;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      // Animate section title
      const title = section.querySelector('.countdown-title');
      if (title) {
        gsap.fromTo(title,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate countdown units with stagger
      const units = section.querySelectorAll('.countdown-unit');
      if (units.length) {
        gsap.fromTo(units,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate buttons
      const buttons = section.querySelector('.countdown-buttons');
      if (buttons) {
        gsap.fromTo(buttons,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: buttons,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    };

    initGSAP();

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      });
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('wedding-reminder-set')) {
      setReminderStatus('set');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCalendarDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSetReminder = async () => {
    if (!('Notification' in window)) {
      setReminderStatus('denied');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      localStorage.setItem('wedding-reminder-set', 'true');
      setReminderStatus('set');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } else {
      setReminderStatus('denied');
    }
  };

  if (countdown.isComplete) {
    return (
      <section
        ref={sectionRef}
        id="countdown"
        className="section"
        style={{ textAlign: 'center' }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-shimmer"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            }}
          >
            {translations.eventArrived}
          </h2>
          <div style={{ fontSize: '3rem', marginTop: '1rem' }}>🎉</div>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="countdown"
      className="section"
      style={{
        textAlign: 'center',
      }}
    >
      <div className="islamic-pattern" />

      <div
        className="countdown-date"
        style={{
          fontFamily: 'var(--font-casta)',
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          color: 'var(--color-primary)',
          marginBottom: 'var(--space-xs)',
          fontWeight: 300,
        }}
      >
        {translations.dateTime}
      </div>

      <h2
        className="countdown-title"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
          color: 'var(--color-text)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-lg)',
          fontWeight: 500,
        }}
      >
        {translations.saveTheDate}
      </h2>

      <div
        style={{
          display: 'flex',
          gap: 'clamp(0.75rem, 3vw, 1.5rem)',
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <CountdownUnit value={countdown.days} label={translations.days} />
        <span style={{
          color: 'var(--color-primary)',
          fontSize: '1.8rem',
          fontWeight: 300,
          opacity: 0.6,
          paddingBottom: '2rem',
        }}>:</span>
        <CountdownUnit value={countdown.hours} label={translations.hours} />
        <span style={{
          color: 'var(--color-primary)',
          fontSize: '1.8rem',
          fontWeight: 300,
          opacity: 0.6,
          paddingBottom: '2rem',
        }}>:</span>
        <CountdownUnit value={countdown.minutes} label={translations.minutes} />
        <span style={{
          color: 'var(--color-primary)',
          fontSize: '1.8rem',
          fontWeight: 300,
          opacity: 0.6,
          paddingBottom: '2rem',
        }}>:</span>
        <CountdownUnit value={countdown.seconds} label={translations.seconds} />
      </div>

      {/* Calendar and Reminder Buttons */}
      <div
        className="countdown-buttons"
        style={{
          display: 'flex',
          gap: 'var(--space-md)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 'var(--space-xl)',
        }}
      >
        {/* Add to Calendar */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCalendarDropdown(!showCalendarDropdown)}
            aria-label="Add to Calendar"
            aria-expanded={showCalendarDropdown}
            style={{ padding: '0.875rem 1.75rem', fontSize: '0.9rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {translations.addToCalendar}
          </motion.button>

          <AnimatePresence>
            {showCalendarDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="glass"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '0.5rem',
                  padding: '0.5rem',
                  minWidth: '200px',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowCalendarDropdown(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-text)',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    transition: 'background var(--transition-fast)',
                    minHeight: '44px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-primary-glow)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  aria-label="Add to Google Calendar"
                >
                  <span>📅</span>
                  {translations.googleCalendar}
                </a>
                <button
                  onClick={() => { downloadICS(); setShowCalendarDropdown(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-text)',
                    fontSize: '0.9rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)',
                    width: '100%',
                    textAlign: 'left',
                    minHeight: '44px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-primary-glow)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  aria-label="Download ICS for Apple Calendar"
                >
                  <span>🍎</span>
                  {translations.appleCalendar}
                </button>
                <button
                  onClick={() => { downloadICS(); setShowCalendarDropdown(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-text)',
                    fontSize: '0.9rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)',
                    width: '100%',
                    textAlign: 'left',
                    minHeight: '44px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-primary-glow)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  aria-label="Download ICS for Outlook"
                >
                  <span>📧</span>
                  {translations.outlook}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Set Reminder */}
        <motion.button
          className="btn btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSetReminder}
          disabled={reminderStatus === 'set'}
          aria-label="Set Reminder"
          style={{
            padding: '0.875rem 1.75rem',
            fontSize: '0.9rem',
            opacity: reminderStatus === 'set' ? 0.7 : 1,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {reminderStatus === 'set' ? '✓ Reminder Set' : translations.setReminder}
        </motion.button>
      </div>

      {/* Denied message */}
      {reminderStatus === 'denied' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: 'var(--space-md)',
            color: 'var(--color-text-secondary)',
            fontSize: '0.85rem',
            maxWidth: '400px',
          }}
        >
          {translations.reminderDenied}
        </motion.p>
      )}

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass"
            style={{
              position: 'fixed',
              bottom: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '1rem 2rem',
              zIndex: 8000,
              color: 'var(--color-text)',
              fontFamily: 'var(--font-text)',
              fontSize: '0.9rem',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            🔔 {translations.reminderSet}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
