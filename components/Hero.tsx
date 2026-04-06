'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { WEDDING } from '@/lib/constants';
import { Translations } from '@/lib/i18n';

interface HeroProps {
  translations: Translations;
}

export default function Hero({ translations }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll('.hero-reveal'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    };

    initGSAP();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section section-fullscreen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div className="islamic-pattern" />

      {/* Wedding of label */}
      <motion.p
        className="hero-reveal"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
          color: 'var(--color-text-secondary)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '2rem',
        }}
      >
        {translations.weddingOf}
      </motion.p>

      {/* Groom name */}
      <motion.h1
        className="hero-reveal text-shimmer"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: '0.5rem',
        }}
      >
        {WEDDING.groom}
      </motion.h1>

      {/* Ornate divider */}
      <motion.div
        className="hero-reveal"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          margin: '1.5rem 0',
          color: 'var(--color-primary)',
        }}
      >
        <div style={{
          width: '80px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-primary))',
        }} />
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M20 2L25 15L38 20L25 25L20 38L15 25L2 20L15 15Z" />
          <circle cx="20" cy="20" r="4" fill="currentColor" stroke="none" opacity="0.5" />
        </svg>
        <div style={{
          width: '80px',
          height: '1px',
          background: 'linear-gradient(270deg, transparent, var(--color-primary))',
        }} />
      </motion.div>

      {/* Bride name */}
      <motion.h1
        className="hero-reveal text-shimmer"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: '2rem',
        }}
      >
        {WEDDING.bride}
      </motion.h1>

      {/* Date */}
      <motion.div
        className="hero-reveal"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div style={{
          padding: '0.6rem 2rem',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-full)',
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
          color: 'var(--color-text-secondary)',
          letterSpacing: '0.15em',
          background: 'var(--color-surface)',
        }}>
          {translations.dateTime}
        </div>
      </motion.div>

      {/* Nikah Ceremony label */}
      <motion.p
        className="hero-reveal"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
          color: 'var(--color-primary)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginTop: '1.5rem',
        }}
      >
        {translations.nikahCeremony}
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--color-text-secondary)',
          opacity: 0.5,
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="1" width="18" height="28" rx="9" />
          <motion.circle
            cx="10"
            cy="10"
            r="2.5"
            fill="currentColor"
            animate={{ cy: [8, 18, 8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </section>
  );
}
