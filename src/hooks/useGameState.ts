import { useState } from 'react';
import { FEEDS } from '../App';

export interface FeedState {
  [key: string]: number;
}

export function useGameState() {
  const [health, setHealth] = useState<number>(100);
  const [hunger, setHunger] = useState<number>(0);
  const [milk, setMilk] = useState<number>(0);
  const [points, setPoints] = useState(450);
  const [hasEverFed, setHasEverFed] = useState<boolean>(false);
  const [milkProductionRate, setMilkProductionRate] = useState<number>(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [feed, setFeed] = useState<FeedState>(
    FEEDS.reduce((acc, feed) => ({ ...acc, [feed.name]: 0 }), {})
  );

  return {
    health, setHealth,
    hunger, setHunger,
    milk, setMilk,
    points, setPoints,
    hasEverFed, setHasEverFed,
    milkProductionRate, setMilkProductionRate,
    level, setLevel,
    xp, setXp,
    feed, setFeed
  };
} 