import { useCallback } from 'react';

export const useSound = (soundUrl: string, volume: number = 0.5) => {
  const play = useCallback(() => {
    if (typeof Audio === 'undefined') return;
    try {
      const audio = new Audio(soundUrl);
      audio.volume = volume;
      audio.play().catch(error => {
        // Autoplay was prevented by the browser.
        console.warn("Sound autoplay was prevented:", error);
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }, [soundUrl, volume]);

  return play;
};