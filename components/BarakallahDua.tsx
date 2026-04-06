'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Translations } from '@/lib/i18n';

interface BarakallahDuaProps {
  translations?: Translations;
}

export default function BarakallahDua({ translations }: BarakallahDuaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="barakallah"
      className="section"
      style={{
        textAlign: 'center',
        position: 'relative',
        padding: 'var(--space-2xl) var(--space-lg)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div className="islamic-pattern" />

      {/* Geometric border frame */}
      <div
        style={{
          position: 'relative',
          maxWidth: '700px',
          width: '100%',
          margin: '0 auto',
          padding: 'var(--space-xl)',
        }}
      >
        {/* Corner ornaments */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
          <div
            key={pos}
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderColor: 'var(--color-primary)',
              opacity: 0.5,
              ...(pos.includes('top') ? { top: 0 } : { bottom: 0 }),
              ...(pos.includes('left') ? { left: 0 } : { right: 0 }),
              ...(pos.includes('top') && pos.includes('left')
                ? { borderTop: '2px solid', borderLeft: '2px solid' }
                : {}),
              ...(pos.includes('top') && pos.includes('right')
                ? { borderTop: '2px solid', borderRight: '2px solid' }
                : {}),
              ...(pos.includes('bottom') && pos.includes('left')
                ? { borderBottom: '2px solid', borderLeft: '2px solid' }
                : {}),
              ...(pos.includes('bottom') && pos.includes('right')
                ? { borderBottom: '2px solid', borderRight: '2px solid' }
                : {}),
            }}
          />
        ))}

        {/* Arabic Dua Text — using web font */}
        <div style={{ direction: 'rtl', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: "'Amiri', serif",
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              fontWeight: 700,
              color: '#8B6914',
              lineHeight: 1.6,
              marginBottom: 'var(--space-sm)',
              textShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            بَارَكَ اللَّهُ لَكُمَا
          </p>
          <p
            style={{
              fontFamily: "'Amiri', serif",
              fontSize: 'clamp(1.5rem, 4.5vw, 2.6rem)',
              fontWeight: 400,
              color: '#9A7520',
              lineHeight: 1.6,
            }}
          >
            وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>
        </div>

        {/* Decorative line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            margin: 'var(--space-lg) 0',
          }}
        >
          <div style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--color-primary))',
          }} />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--color-primary)" opacity="0.6">
            <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6Z" />
          </svg>
          <div style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(270deg, transparent, var(--color-primary))',
          }} />
        </div>

        {/* English translation */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            color: '#3D3220',
            fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
            letterSpacing: '0.04em',
            lineHeight: 1.9,
          }}
        >
          &ldquo;May Allah bless you both, shower His blessings upon you,
          <br />
          and unite you both in goodness.&rdquo;
        </p>

        {/* Transliteration */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            color: '#6B5B3E',
            fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
            letterSpacing: '0.08em',
            marginTop: 'var(--space-md)',
          }}
        >
          Barakallahu lakuma wa baraka alaikuma wa jama&apos;a bainakuma fi khair
        </p>
      </div>
    </section>
  );
}
