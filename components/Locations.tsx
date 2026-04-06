'use client';

import { useRef, useEffect, useState } from 'react';
import { WEDDING } from '@/lib/constants';
import { Translations } from '@/lib/i18n';

interface LocationsProps {
  translations: Translations;
}

function LocationCard({
  venue,
  label,
  lat,
  lng,
  mapUrl,
  translations,
}: {
  venue: string;
  label: string;
  lat: number;
  lng: number;
  mapUrl: string;
  translations: Translations;
}) {
  return (
    <div
      className="card location-card"
      style={{
        flex: '1 1 400px',
        maxWidth: '550px',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {/* Map embed */}
      <div style={{
        width: '100%',
        height: '250px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-bg)',
      }}>
        <iframe
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map to ${venue}`}
          aria-label={`Google Maps showing ${venue} location`}
        />
      </div>

      {/* Card content */}
      <div style={{ padding: 'var(--space-lg)' }}>
        <p style={{
          fontFamily: 'var(--font-text)',
          fontSize: '0.75rem',
          color: 'var(--color-primary)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
          fontWeight: 600,
        }}>
          {label}
        </p>

        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
          color: 'var(--color-text)',
          marginBottom: 'var(--space-md)',
        }}>
          {venue}
        </h3>

        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ width: '100%', textAlign: 'center' }}
          aria-label={`Open ${venue} in Google Maps`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {translations.openInMaps}
        </a>
      </div>
    </div>
  );
}

export default function Locations({ translations }: LocationsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="locations"
      className="section"
      style={{
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div className="islamic-pattern" />

      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
        color: 'var(--color-text)',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        marginBottom: 'var(--space-xl)',
        fontWeight: 500,
      }}>
        {translations.location}
      </h2>

      <div style={{
        display: 'flex',
        gap: 'var(--space-lg)',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '1200px',
        width: '100%',
      }}>
        <LocationCard
          venue={WEDDING.groomVenue.name}
          label={translations.groomVenue}
          lat={WEDDING.groomVenue.lat}
          lng={WEDDING.groomVenue.lng}
          mapUrl={WEDDING.groomVenue.mapUrl}
          translations={translations}
        />

        {/* Decorative divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          color: 'var(--color-primary)',
          opacity: 0.5,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
          </svg>
        </div>

        <LocationCard
          venue={WEDDING.brideVenue.name}
          label={translations.brideVenue}
          lat={WEDDING.brideVenue.lat}
          lng={WEDDING.brideVenue.lng}
          mapUrl={WEDDING.brideVenue.mapUrl}
          translations={translations}
        />
      </div>
    </section>
  );
}
