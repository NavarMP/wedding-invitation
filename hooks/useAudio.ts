'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);

  useEffect(() => {
    const audio = new Audio('/assets/nasheed.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'auto';
    audioRef.current = audio;

    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Fade in
    audio.volume = 0;
    audio.play().then(() => {
      let vol = 0;
      const fadeIn = setInterval(() => {
        vol += 0.05;
        if (vol >= volume) {
          audio.volume = volume;
          clearInterval(fadeIn);
        } else {
          audio.volume = vol;
        }
      }, 50);
    }).catch(() => {});
  }, [volume]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Fade out
    let vol = audio.volume;
    const fadeOut = setInterval(() => {
      vol -= 0.05;
      if (vol <= 0) {
        audio.volume = 0;
        audio.pause();
        clearInterval(fadeOut);
      } else {
        audio.volume = vol;
      }
    }, 50);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  }, []);

  return { isPlaying, toggle, play, pause, volume, setVolume };
}
