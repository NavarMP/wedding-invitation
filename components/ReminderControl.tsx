'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReminder } from '@/hooks/useReminder';
import type { Translations } from '@/lib/i18n';
import {
  AlertCircleIcon,
  BellIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
} from '@/components/icons';

interface ReminderControlProps {
  translations: Translations;
  buttonStyle?: CSSProperties;
  dropdownMinWidth?: number;
}

export default function ReminderControl({
  translations,
  buttonStyle,
  dropdownMinWidth = 240,
}: ReminderControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { activeReminder, reminderOptions, setReminder, toast, statusNote, clearToast } = useReminder(translations);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLabel =
    activeReminder &&
    reminderOptions.find((option) => option.id === activeReminder.optionId)?.label;

  return (
    <>
      <div ref={menuRef} style={{ position: 'relative' }}>
        <motion.button
          className="btn btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen((open) => !open)}
          aria-label={translations.setReminder}
          aria-expanded={isOpen}
          style={buttonStyle}
        >
          <BellIcon width="18" height="18" />
          {translations.setReminder}
          <ChevronDownIcon
            width="16"
            height="16"
            style={{
              transition: 'transform var(--transition-fast)',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="glass"
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '0.5rem',
                padding: '0.5rem',
                minWidth: `${dropdownMinWidth}px`,
                zIndex: 120,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
              }}
            >
              {reminderOptions.map((option) => {
                const isActive = activeReminder?.optionId === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={async () => {
                      await setReminder(option.id);
                      setIsOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--color-text)',
                      fontFamily: 'var(--font-text)',
                      fontSize: '0.92rem',
                      background: isActive ? 'var(--color-primary-glow)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background var(--transition-fast), color var(--transition-fast)',
                      width: '100%',
                      minHeight: '44px',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(event) => {
                      if (!isActive) {
                        event.currentTarget.style.background = 'var(--color-primary-glow)';
                      }
                    }}
                    onMouseLeave={(event) => {
                      if (!isActive) {
                        event.currentTarget.style.background = 'transparent';
                      }
                    }}
                    aria-label={`${translations.setReminder} ${option.label}`}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                      <BellIcon width="16" height="16" />
                      {option.label}
                    </span>
                    {isActive ? <CheckCircleIcon width="16" height="16" /> : null}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {(activeLabel || statusNote) && (
        <p
          style={{
            marginTop: 'var(--space-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            color: 'var(--color-text-secondary)',
            fontSize: '0.85rem',
            maxWidth: '430px',
            textAlign: 'center',
          }}
        >
          {activeReminder?.delivery === 'browser' ? (
            <BellIcon width="16" height="16" />
          ) : activeReminder?.delivery === 'calendar' ? (
            <CalendarIcon width="16" height="16" />
          ) : (
            <AlertCircleIcon width="16" height="16" />
          )}
          {statusNote || activeLabel}
        </p>
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass"
            onClick={clearToast}
            style={{
              position: 'fixed',
              bottom: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '1rem 1.5rem',
              zIndex: 8000,
              color: 'var(--color-text)',
              fontFamily: 'var(--font-text)',
              fontSize: '0.9rem',
              boxShadow: 'var(--shadow-lg)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              maxWidth: 'min(92vw, 460px)',
            }}
          >
            {toast.delivery === 'browser' ? (
              <BellIcon width="18" height="18" />
            ) : (
              <CalendarIcon width="18" height="18" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
