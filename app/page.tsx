'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import BarakallahDua from '@/components/BarakallahDua';
import Countdown from '@/components/Countdown';
import Locations from '@/components/Locations';
import MediaSection from '@/components/MediaSection';
import Footer from '@/components/Footer';
import FloatingMenu from '@/components/FloatingMenu';
import CustomCursor from '@/components/CustomCursor';
import ClickEffects from '@/components/ClickEffects';
import IslamicDivider from '@/components/IslamicDivider';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { useAudio } from '@/hooks/useAudio';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, translations, isTransitioning } = useLanguage();
  const { isPlaying, toggle: toggleMusic, volume, setVolume } = useAudio();

  useEffect(() => {
    setMounted(true);

    // Initialize GSAP ScrollTrigger
    const initGSAP = async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default || gsapModule.gsap;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);
      
      // Configure ScrollTrigger for smooth performance
      ScrollTrigger.config({
        ignoreMobileResize: true,
      });
      
      // Refresh after all content is loaded
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    initGSAP();

    // Cleanup ScrollTrigger on unmount
    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      });
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CustomCursor />
      <ClickEffects translations={translations} />

      <div
        className={isTransitioning ? 'lang-transitioning' : 'lang-visible'}
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
        </main>

        <Footer translations={translations} />
      </div>

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
    </>
  );
}
