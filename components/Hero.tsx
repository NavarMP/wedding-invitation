'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@/components/icons';
import { WEDDING } from '@/lib/constants';
import { Translations } from '@/lib/i18n';

interface HeroProps {
  translations: Translations;
}

export default function Hero({ translations }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // GSAP entrance animation for Hero section
    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default || gsapModule.gsap;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      const elements = section.querySelectorAll('.hero-animate');

      // Initial entrance animation
      gsap.fromTo(elements, 
        { 
          y: 40, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      // Subtle parallax on scroll for scroll indicator
      const scrollIndicator = section.querySelector('.scroll-indicator');
      if (scrollIndicator) {
        gsap.to(scrollIndicator, {
          y: 15,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    };

    initGSAP();

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      });
    };
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

      {/* Bismillah at top */}
      <motion.div
        className="hero-animate bismillah-banner"
        initial={{ opacity: 0, y: -20 }}
        style={{
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
          marginBottom: 'var(--space-lg)',
          direction: 'rtl',
        }}
      >
        {translations.bismillahFull}
      </motion.div>

      {/* Decorative top ornament */}
      <motion.div
        className="hero-animate"
        style={{
          color: 'var(--color-primary)',
          marginBottom: '1rem',
        }}
      >
        <StarIcon width="26" height="26" />
      </motion.div>

      {/* Groom name */}
      <motion.h1
        className="hero-animate script-title"
        style={{
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          lineHeight: 1.2,
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, var(--color-primary) 0%, #E8C76A 50%, var(--color-primary) 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {WEDDING.groom}
      </motion.h1>

      {/* Weds label */}
      <motion.p
        className="hero-animate"
        style={{
          fontFamily: 'var(--font-text)',
          fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
          color: 'var(--color-text-secondary)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          margin: '1.5rem 0',
        }}
      >
        {translations.weds}
      </motion.p>

      {/* Bride name */}
      <motion.h1
        className="hero-animate script-title"
        style={{
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          lineHeight: 1.2,
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, var(--color-primary) 0%, #E8C76A 50%, var(--color-primary) 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {WEDDING.bride}
      </motion.h1>

      {/* Decorative line */}
      <motion.div
        className="hero-animate"
        style={{
          width: '120px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, var(--color-primary), transparent)`,
          margin: '0 auto 2rem',
        }}
      />

      {/* Date */}
      <motion.div
        className="hero-animate"
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
          fontFamily: 'var(--font-casta)',
          fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
          color: 'var(--color-text-secondary)',
          letterSpacing: '0.15em',
          background: 'var(--color-surface)',
        }}>
          {translations.dateTime}
        </div>
      </motion.div>

      {/* Wedding Ceremony label */}
      <motion.p
        className="hero-animate"
        style={{
          fontFamily: 'var(--font-text)',
          fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
          color: 'var(--color-primary)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginTop: '1.5rem',
        }}
      >
        {translations.weddingCeremony}
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        className="hero-animate scroll-indicator"
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
