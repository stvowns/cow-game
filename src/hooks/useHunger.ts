import { useEffect } from 'react';

interface HungerProps {
  health: number;
  hasEverFed: boolean;
  setHunger: (value: number | ((prev: number) => number)) => void;
}

export function useHunger({ health, hasEverFed, setHunger }: HungerProps) {
  useEffect(() => {
    const hungerInterval = setInterval(() => {
      if (health > 0 && hasEverFed) {
        setHunger(prevHunger => {
          const decrease = 100 / (240 * 60); // 240 dakika * 60 saniye = 14400 saniye
          const newHunger = Math.max(0, prevHunger - decrease);
          return Number(newHunger.toFixed(2));
        });
      }
    }, 1000);

    return () => clearInterval(hungerInterval);
  }, [health, hasEverFed, setHunger]);
} 