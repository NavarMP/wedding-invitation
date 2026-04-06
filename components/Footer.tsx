'use client';

import { Translations } from '@/lib/i18n';

interface FooterProps {
  translations: Translations;
}

export default function Footer({ translations }: FooterProps) {
  return (
    <footer
      id="footer"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: 'var(--space-xl) var(--space-lg)',
        textAlign: 'center',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Decorative top element */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 'var(--space-lg)',
      }}>
        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="var(--color-primary)" strokeWidth="1" opacity="0.4">
          <path d="M0 10 Q10 0 20 10 Q30 20 40 10" />
        </svg>
      </div>

      <p style={{
        fontFamily: 'var(--font-text)',
        fontSize: '0.9rem',
        color: 'var(--color-text-secondary)',
        letterSpacing: '0.1em',
      }}>
        {translations.madeWith}
      </p>
    </footer>
  );
}
