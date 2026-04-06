'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Translations } from '@/lib/i18n';
import { downloadICS, getGoogleCalendarUrl } from '@/lib/calendar';
import { WEDDING } from '@/lib/constants';

interface ActionsProps {
  translations: Translations;
}

export default function Actions({ translations }: ActionsProps) {
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [reminderStatus, setReminderStatus] = useState<'idle' | 'set' | 'denied'>('idle');
  const [showToast, setShowToast] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('wedding-reminder-set')) {
      setReminderStatus('set');
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
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

  return (
    <section
      ref={sectionRef}
      id="actions"
      className="section"
      style={{
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div className="islamic-pattern" />

      <div style={{
        display: 'flex',
        gap: 'var(--space-lg)',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '600px',
        width: '100%',
      }}>
        {/* Add to Calendar */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCalendarDropdown(!showCalendarDropdown)}
            aria-label="Add to Calendar"
            aria-expanded={showCalendarDropdown}
            style={{ padding: '1rem 2rem', fontSize: '1rem' }}
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
                  minWidth: '220px',
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
        <div>
          <motion.button
            className="btn btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSetReminder}
            disabled={reminderStatus === 'set'}
            aria-label="Set Reminder"
            style={{
              padding: '1rem 2rem',
              fontSize: '1rem',
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
