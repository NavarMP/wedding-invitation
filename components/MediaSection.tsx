'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Translations } from '@/lib/i18n';

interface MediaSectionProps {
  translations: Translations;
}

export default function MediaSection({ translations }: MediaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'flyer' | 'reel'>('flyer');
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

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      video.muted = false;
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="media"
      className="section"
      style={{
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div className="islamic-pattern" />

      {/* Tab switcher */}
      <div
        style={{
          display: 'inline-flex',
          gap: '0.25rem',
          marginBottom: 'var(--space-xl)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-full)',
          padding: '4px',
        }}
      >
        {(['flyer', 'reel'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.6rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: activeTab === tab ? 'var(--color-primary)' : 'transparent',
              color: activeTab === tab ? '#FFFFFF' : 'var(--color-text)',
              fontFamily: 'var(--font-text)',
              fontSize: '0.85rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              minHeight: '44px',
              minWidth: '44px',
            }}
            aria-label={`Show ${tab}`}
          >
            {tab === 'flyer' ? translations.flyer : translations.reel}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>
        {/* Flyer */}
        {activeTab === 'flyer' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--color-border)',
                transform: 'rotate(-1deg)',
                transition: 'transform var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'rotate(0deg) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'rotate(-1deg) scale(1)';
              }}
            >
              {/* Decorative frame border */}
              <div style={{
                position: 'absolute',
                inset: '8px',
                border: '1px solid var(--color-primary)',
                borderRadius: 'calc(var(--radius-lg) - 4px)',
                opacity: 0.3,
                zIndex: 2,
                pointerEvents: 'none',
              }} />

              <Image
                src="/assets/flyer.jpg"
                alt="Wedding invitation flyer"
                width={600}
                height={800}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
                priority={false}
              />
            </div>

            <a
              href="/assets/flyer.jpg"
              download="wedding-flyer.jpg"
              className="btn btn-secondary"
              style={{ marginTop: 'var(--space-lg)' }}
              aria-label="Download wedding flyer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {translations.download}
            </a>
          </motion.div>
        )}

        {/* Reel */}
        {activeTab === 'reel' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--color-border)',
                background: '#000',
                aspectRatio: '9/16',
                maxHeight: '500px',
                margin: '0 auto',
                cursor: 'pointer',
              }}
              onClick={toggleVideo}
            >
              <video
                ref={videoRef}
                src="/assets/reel.mp4"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                muted
                playsInline
                loop
                preload="metadata"
                aria-label="Wedding reel video"
              />

              {/* Play/Pause overlay */}
              {!isVideoPlaying && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.4)',
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(184, 133, 46, 0.5)',
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <polygon points="8,5 19,12 8,19" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/assets/reel.mp4"
              download="wedding-reel.mp4"
              className="btn btn-secondary"
              style={{ marginTop: 'var(--space-lg)' }}
              aria-label="Download wedding reel"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {translations.download}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
