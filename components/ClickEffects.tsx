'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Translations } from '@/lib/i18n';

interface ClickEffectsProps {
  translations: Translations;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  type: 'click' | 'love';
}

interface LovePopup {
  id: number;
  x: number;
  y: number;
}

export default function ClickEffects({ translations }: ClickEffectsProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lovePopups, setLovePopups] = useState<LovePopup[]>([]);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const particleId = useRef(0);

  const createClickParticles = useCallback((x: number, y: number) => {
    const id = particleId.current++;
    setParticles((prev) => [...prev, { id, x, y, type: 'click' }]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1000);
  }, []);

  const showLovePopup = useCallback((x: number, y: number) => {
    const id = particleId.current++;
    setLovePopups((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setLovePopups((prev) => prev.filter((p) => p.id !== id));
    }, 2000);
  }, []);

  useEffect(() => {
    // Click particles
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, select, textarea, video')) return;
      createClickParticles(e.clientX, e.clientY);
    };

    // Right-click → love popup (desktop)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showLovePopup(e.clientX, e.clientY);
    };

    // Long press → love popup (mobile)
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      longPressTimer.current = setTimeout(() => {
        showLovePopup(touch.clientX, touch.clientY);
      }, 600);
    };

    const handleTouchEnd = () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    };

    const handleTouchMove = () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [createClickParticles, showLovePopup]);

  const particleShapes = ['✦', '☪', '◇', '⬥', '✧'];
  const heartShapes = ['🤍', '✨', '💫', '⭐'];

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9500 }}>
      {/* Click particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <div key={p.id}>
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (360 / 6) * i;
              const distance = 30 + Math.random() * 40;
              const tx = Math.cos((angle * Math.PI) / 180) * distance;
              const ty = Math.sin((angle * Math.PI) / 180) * distance;

              return (
                <motion.span
                  key={i}
                  initial={{
                    position: 'fixed',
                    left: p.x,
                    top: p.y,
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    x: tx,
                    y: ty - 20,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--color-primary)',
                    pointerEvents: 'none',
                  }}
                >
                  {particleShapes[i % particleShapes.length]}
                </motion.span>
              );
            })}
          </div>
        ))}
      </AnimatePresence>

      {/* Love popups */}
      <AnimatePresence>
        {lovePopups.map((p) => (
          <div key={p.id}>
            {/* Toast message */}
            <motion.div
              initial={{
                position: 'fixed',
                left: p.x,
                top: p.y,
                opacity: 0,
                y: 0,
                x: '-50%',
                scale: 0.5,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: -60,
                scale: 1,
              }}
              transition={{ duration: 2, times: [0, 0.1, 0.7, 1] }}
              className="glass"
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-full)',
                whiteSpace: 'nowrap',
                fontSize: '0.85rem',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-text)',
                boxShadow: 'var(--shadow-md)',
                pointerEvents: 'none',
              }}
            >
              {translations.sendLove}
            </motion.div>

            {/* Heart particles */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (360 / 8) * i;
              const distance = 40 + Math.random() * 50;
              const tx = Math.cos((angle * Math.PI) / 180) * distance;
              const ty = Math.sin((angle * Math.PI) / 180) * distance;

              return (
                <motion.span
                  key={i}
                  initial={{
                    position: 'fixed',
                    left: p.x,
                    top: p.y,
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    x: tx,
                    y: ty - 30,
                    opacity: 0,
                    scale: 0.3,
                  }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  style={{
                    fontSize: '1rem',
                    pointerEvents: 'none',
                  }}
                >
                  {heartShapes[i % heartShapes.length]}
                </motion.span>
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
