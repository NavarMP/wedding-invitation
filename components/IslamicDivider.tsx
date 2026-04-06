'use client';

export default function IslamicDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: 'var(--space-lg) 0',
        color: 'var(--color-primary)',
        opacity: 0.4,
      }}
    >
      <div style={{
        width: '80px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--color-primary))',
      }} />

      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="0.8">
        {/* Eight-pointed star (Rub el Hizb) */}
        <path d="M16 2L19.5 12.5L30 16L19.5 19.5L16 30L12.5 19.5L2 16L12.5 12.5Z" />
        <path d="M16 6L20 12L26 16L20 20L16 26L12 20L6 16L12 12Z" opacity="0.5" />
      </svg>

      <div style={{
        width: '80px',
        height: '1px',
        background: 'linear-gradient(270deg, transparent, var(--color-primary))',
      }} />
    </div>
  );
}
