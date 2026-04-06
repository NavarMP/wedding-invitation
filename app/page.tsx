'use client';

import { useState, useEffect } from 'react';
import BismillahIntro from '@/components/BismillahIntro';
import Hero from '@/components/Hero';
import BarakallahDua from '@/components/BarakallahDua';
import Countdown from '@/components/Countdown';
import Locations from '@/components/Locations';
import MediaSection from '@/components/MediaSection';
import Actions from '@/components/Actions';
import Footer from '@/components/Footer';
import FloatingMenu from '@/components/FloatingMenu';
import CustomCursor from '@/components/CustomCursor';
import ClickEffects from '@/components/ClickEffects';
import IslamicDivider from '@/components/IslamicDivider';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { useLenis } from '@/hooks/useLenis';
import { useAudio } from '@/hooks/useAudio';

export default function HomePage() {
  const [entered, setEntered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, translations, isTransitioning } = useLanguage();
  const { isPlaying, toggle: toggleMusic, volume, setVolume } = useAudio();

  useLenis();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize GSAP + ScrollTrigger
  useEffect(() => {
    if (!entered) return;

    const initGSAP = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Refresh ScrollTrigger after all content is loaded
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    };

    initGSAP();
  }, [entered]);

  // Card tilt effect
  useEffect(() => {
    if (!entered) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -8;
          const rotateY = ((x - centerX) / centerX) * 8;

          (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        }
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.card')) {
        const card = target.closest('.card') as HTMLElement;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [entered]);

  if (!mounted) return null;

  return (
    <>
      <CustomCursor />
      <ClickEffects translations={translations} />

      <BismillahIntro
        translations={translations}
        onEnter={() => setEntered(true)}
      />

      <div
        className={isTransitioning ? 'lang-transitioning' : 'lang-visible'}
        style={{
          opacity: entered ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <main>
          <Hero translations={translations} />
          <IslamicDivider />
          <BarakallahDua />
          <IslamicDivider />
          <Countdown translations={translations} />
          <IslamicDivider />
          <Locations translations={translations} />
          <IslamicDivider />
          <MediaSection translations={translations} />
          <IslamicDivider />
          <Actions translations={translations} />
        </main>

        <Footer translations={translations} />
      </div>

      {entered && (
        <FloatingMenu
          translations={translations}
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          isPlaying={isPlaying}
          toggleMusic={toggleMusic}
          volume={volume}
          setVolume={setVolume}
        />
      )}
    </>
  );
}
