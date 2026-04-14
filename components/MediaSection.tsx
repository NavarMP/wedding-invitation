'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DownloadIcon,
  ExpandIcon,
  ImageIcon,
  PauseIcon,
  PlayIcon,
  VideoIcon,
  Volume2Icon,
  VolumeXIcon,
  XIcon,
} from '@/components/icons';
import { Translations } from '@/lib/i18n';

interface MediaSectionProps {
  translations: Translations;
}

export default function MediaSection({ translations }: MediaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<'flyer' | 'reel'>('flyer');
  const [isVisible, setIsVisible] = useState(false);
  const [activePreview, setActivePreview] = useState<'flyer' | 'reel' | null>(null);

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
      video.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {});
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoMute = () => {
    const nextMuted = !isVideoMuted;
    setIsVideoMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  const openPreview = (type: 'flyer' | 'reel') => {
    setActivePreview(type);

    if (type === 'reel' && videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const closePreview = () => {
    setActivePreview(null);
  };

  const requestVideoFullscreen = async () => {
    const video = modalVideoRef.current ?? videoRef.current;
    if (!video) return;

    const fullscreenVideo = video as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      webkitRequestFullscreen?: () => Promise<void>;
    };

    if (fullscreenVideo.requestFullscreen) {
      await fullscreenVideo.requestFullscreen().catch(() => {});
      return;
    }

    if (fullscreenVideo.webkitRequestFullscreen) {
      await fullscreenVideo.webkitRequestFullscreen().catch(() => {});
      return;
    }

    fullscreenVideo.webkitEnterFullscreen?.();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isVideoMuted;
  }, [isVideoMuted]);

  useEffect(() => {
    if (!activePreview) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePreview();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePreview]);

  useEffect(() => {
    if (activePreview !== 'reel') return;

    const timer = window.setTimeout(() => {
      modalVideoRef.current?.play().catch(() => {});
    }, 80);

    return () => window.clearTimeout(timer);
  }, [activePreview]);

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
                cursor: 'zoom-in',
              }}
              onClick={() => openPreview('flyer')}
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

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openPreview('flyer');
                }}
                className="btn btn-icon"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 3,
                }}
                aria-label={translations.openPreview}
              >
                <ExpandIcon width="18" height="18" />
              </button>

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

            <div
              style={{
                marginTop: 'var(--space-lg)',
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => openPreview('flyer')}
                aria-label={translations.openPreview}
              >
                <ExpandIcon width="16" height="16" />
                {translations.openPreview}
              </button>

              <a
                href="/assets/flyer.jpg"
                download="wedding-flyer.jpg"
                className="btn btn-secondary"
                aria-label="Download wedding flyer"
              >
                <DownloadIcon width="16" height="16" />
                {translations.download}
              </a>
            </div>
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
                cursor: 'zoom-in',
              }}
              onClick={() => openPreview('reel')}
            >
              <video
                ref={videoRef}
                src="/assets/reel.mp4"
                poster="/assets/flyer.jpg"
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
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
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
                    <PlayIcon width="24" height="24" color="#fff" />
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openPreview('reel');
                }}
                className="btn btn-icon"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  zIndex: 3,
                }}
                aria-label={translations.openPreview}
              >
                <ExpandIcon width="18" height="18" />
              </button>
            </div>

            <div
              style={{
                marginTop: 'var(--space-lg)',
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={toggleVideo}
                aria-label={isVideoPlaying ? translations.pause : translations.play}
              >
                {isVideoPlaying ? <PauseIcon width="16" height="16" /> : <PlayIcon width="16" height="16" />}
                {isVideoPlaying ? translations.pause : translations.play}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={toggleVideoMute}
                aria-label={isVideoMuted ? translations.unmute : translations.mute}
              >
                {isVideoMuted ? <VolumeXIcon width="16" height="16" /> : <Volume2Icon width="16" height="16" />}
                {isVideoMuted ? translations.unmute : translations.mute}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => openPreview('reel')}
                aria-label={translations.openPreview}
              >
                <ExpandIcon width="16" height="16" />
                {translations.openPreview}
              </button>

              <a
                href="/assets/reel.mp4"
                download="wedding-reel.mp4"
                className="btn btn-secondary"
                aria-label="Download wedding reel"
              >
                <DownloadIcon width="16" height="16" />
                {translations.download}
              </a>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {activePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePreview}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 8800,
              background: 'rgba(15, 10, 5, 0.88)',
              backdropFilter: 'blur(18px)',
              padding: 'clamp(1rem, 4vw, 2rem)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="glass"
              onClick={(event) => event.stopPropagation()}
              style={{
                width: 'min(94vw, 1100px)',
                maxHeight: '92vh',
                padding: 'clamp(1rem, 2vw, 1.5rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                  }}
                >
                  {activePreview === 'flyer' ? (
                    <ImageIcon width="20" height="20" />
                  ) : (
                    <VideoIcon width="20" height="20" />
                  )}
                  {activePreview === 'flyer' ? translations.flyer : translations.reel}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {activePreview === 'reel' ? (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={requestVideoFullscreen}
                      aria-label={translations.fullscreen}
                    >
                      <ExpandIcon width="16" height="16" />
                      {translations.fullscreen}
                    </button>
                  ) : null}

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closePreview}
                    aria-label={translations.closePreview}
                  >
                    <XIcon width="16" height="16" />
                    {translations.closePreview}
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '0',
                }}
              >
                {activePreview === 'flyer' ? (
                  <Image
                    src="/assets/flyer.jpg"
                    alt="Wedding invitation flyer"
                    width={1200}
                    height={1600}
                    priority={false}
                    style={{
                      width: 'auto',
                      maxWidth: '100%',
                      maxHeight: '74vh',
                      height: 'auto',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                    }}
                  />
                ) : (
                  <video
                    ref={modalVideoRef}
                    src="/assets/reel.mp4"
                    poster="/assets/flyer.jpg"
                    controls
                    playsInline
                    preload="metadata"
                    style={{
                      width: '100%',
                      maxWidth: '420px',
                      maxHeight: '74vh',
                      borderRadius: 'var(--radius-lg)',
                      background: '#000',
                    }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
