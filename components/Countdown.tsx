'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { Translations } from '@/lib/i18n';

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
        className="glass"
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
        {/* Gold accent line at top */}
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
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 300,
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simple intersection observer for fade-in
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (countdown.isComplete) {
    return (
      <section
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
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div className="islamic-pattern" />

      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
          color: 'var(--color-text)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-xl)',
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
    </section>
  );
}
