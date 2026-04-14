'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon } from '@/components/icons';
import { Translations } from '@/lib/i18n';

interface BismillahIntroProps {
  translations: Translations;
  onEnter: () => void;
}

export default function BismillahIntro({ translations, onEnter }: BismillahIntroProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const particles = Array.from({ length: 30 }, (_, index) => ({
    width: 1 + (index % 4),
    height: 1 + ((index + 2) % 4),
    left: `${(index * 17) % 100}%`,
    top: `${(index * 11) % 100}%`,
    opacity: 0.12 + (index % 5) * 0.08,
    duration: 3 + (index % 6) * 0.45,
    delay: (index % 7) * 0.25,
  }));

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onEnter();
    }, 1000);
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className="bismillah-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-bg)',
            overflow: 'hidden',
          }}
        >
          {/* Islamic geometric pattern background */}
          <div className="islamic-pattern" />

          {/* Particle field */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {particles.map((p, index) => (
              <motion.div
                key={index}
                style={{
                  position: 'absolute',
                  width: p.width,
                  height: p.height,
                  background: 'var(--color-primary)',
                  borderRadius: '50%',
                  left: p.left,
                  top: p.top,
                  opacity: p.opacity,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.1, 0.5, 0.1],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Bismillah text */}
          <motion.div
            style={{
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
            }}
            animate={isExiting ? { scale: 1.1, opacity: 0, filter: 'blur(10px)' } : {}}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Decorative top ornament */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                color: 'var(--color-primary)',
                marginBottom: '1.5rem',
              }}
            >
              <StarIcon width="32" height="32" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: 'var(--font-arabic-display)',
                fontSize: 'clamp(2rem, 8vw, 5rem)',
                color: 'var(--color-primary)',
                lineHeight: 1.4,
                direction: 'rtl',
                textShadow: '0 0 60px var(--color-primary-glow)',
                letterSpacing: '0.02em',
              }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                color: 'var(--color-text-secondary)',
                marginTop: '1rem',
                fontStyle: 'italic',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              In the name of Allah, the Most Gracious, the Most Merciful
            </motion.p>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
              style={{
                width: '120px',
                height: '1px',
                background: `linear-gradient(90deg, transparent, var(--color-primary), transparent)`,
                margin: '2rem auto',
              }}
            />

            {/* Enter button */}
            <motion.button
              className="btn btn-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnter}
              aria-label="Enter the wedding invitation"
              style={{
                fontSize: '1.1rem',
                padding: '1rem 3rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              {translations.enter}
            </motion.button>

            {/* Bottom ornament */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              style={{
                color: 'var(--color-primary)',
                marginTop: '2rem',
              }}
            >
              <StarIcon width="32" height="32" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
