import React, { useState, useEffect, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { Cow } from './components/Cow'
import { FarmAnimations } from './components/FarmAnimations'
import { Market } from './components/Market'
import { MenuBar } from './components/MenuBar'
import { Popup } from './components/Popup'
import { LeaderBoard } from './components/LeaderBoard'
import { Profile } from './components/Profile'
import { GiMilkCarton, GiBowlOfRice, GiPartyPopper, GiStarsStack, GiWheat, GiPlantSeed, GiCorn, GiWatermelon, GiCarrot, GiPlantWatering, GiFruitTree, GiCherry, GiGrapes, GiCabbage, GiPear, GiPumpkin, GiChiliPepper, GiGrain } from 'react-icons/gi';
import { FaLeaf, FaHeart, FaShoppingCart, FaCoins, FaQuestionCircle, FaHistory, FaTrophy, FaUser, FaUserFriends, FaClock, FaHeartbeat } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { StatCard } from './components/StatCard';
import { ReferralSystem } from './components/ReferralSystem';
import { IconType } from 'react-icons';
import { useMilkProduction } from './hooks/useMilkProduction';

const LEVEL_THRESHOLDS: number[] = [
  0,          // Level 1
  2000,       // Level 2
  10000,      // Level 3
  80000,      // Level 4
  175000,     // Level 5
  420000,     // Level 6
  800000,     // Level 7
  2000000,    // Level 8
  5000000,    // Level 9
  10000000,   // Level 10
  15000000,   // Level 11
  20000000,   // Level 12
  25000000,   // Level 13
  30000000,   // Level 14
  45000000,   // Level 15
  80000000    // Level 16
];

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background: #4CAF50;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;

  &:hover {
    background: #45a049;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }

  &.confetti {
    animation: celebrate 0.5s ease-out;
  }

  @keyframes celebrate {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const NotificationText = styled.div<{ $type: 'points' | 'xp' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  animation: slideIn 0.5s ease-out;
  z-index: 1000;
  background: ${props => props.$type === 'points' ? '#4CAF50' : '#2196F3'};

  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;

const StatBox = styled.div`
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  min-width: 140px;
  background: #f8f9fa;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  h3 {
    color: #2196F3;
    margin-bottom: 8px;
  }

  p {
    font-size: 1.2em;
    font-weight: 500;
  }
`;

const DashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
`;

const ActionButton = styled(Button)`
  width: 100%;
  margin-bottom: 10px;
  text-align: left;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1em;

  &::before {
    content: '🎮';
  }

  &:nth-child(2)::before {
    content: '🏪';
  }

  &:nth-child(3)::before {
    content: '📊';
  }
`;

const GameContainer = styled.div`
  background: var(--card-bg);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 6px var(--shadow-color);
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  transition: all 0.3s ease;
`;

const Stats = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  &.bottom-stats {
    > div {
      flex: 1;
      min-width: 200px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 30px;
  justify-content: center;

  button {
    background: var(--accent-primary);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.1em;

    &:hover {
      background: var(--accent-secondary);
      transform: translateY(-2px);
    }

    &:disabled {
      background: var(--text-secondary);
      cursor: not-allowed;
      transform: none;
    }
  }
`;

const GameInfo = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #e3f2fd;
  border-radius: 8px;
  text-align: left;
  font-size: 0.9em;
  color: #1976d2;
`;

const GameSection = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ReviveButton = styled(Button)`
  background: linear-gradient(135deg, #ff4081 0%, #e91e63 100%);
  font-size: 1.2em;
  padding: 15px 30px;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(135deg, #e91e63 0%, #d81b60 100%);
  }
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

// Feed state interface güncelleme
interface FeedState {
  [key: string]: number;
}

// Yem türleri için interface güncelleme
interface FeedType {
  name: string;
  energy: number;
  yield: number;
  price: number;
  minLevel: number;
  icon: IconType;
}

// Yem türleri
export const FEEDS: FeedType[] = [
  { name: 'Çim', energy: 25, yield: 0.0417, price: 10, minLevel: 1, icon: GiGrain },
  { name: 'Yaprak', energy: 25, yield: 0.024, price: 12, minLevel: 2, icon: GiPlantSeed },
  { name: 'Buğday', energy: 25, yield: 0.028, price: 14, minLevel: 3, icon: GiWheat },
  { name: 'Ayçiçeği', energy: 25, yield: 0.031, price: 16, minLevel: 4, icon: GiPlantWatering },
  { name: 'Mısır', energy: 25, yield: 0.035, price: 18, minLevel: 5, icon: GiCorn },
  { name: 'Karpuz', energy: 25, yield: 0.038, price: 20, minLevel: 6, icon: GiWatermelon },
  { name: 'Havuç', energy: 25, yield: 0.042, price: 22, minLevel: 7, icon: GiCarrot },
  { name: 'Patlıcan', energy: 25, yield: 0.045, price: 24, minLevel: 8, icon: GiPlantWatering },
  { name: 'Elma', energy: 25, yield: 0.049, price: 26, minLevel: 9, icon: GiFruitTree },
  { name: 'Kiraz', energy: 25, yield: 0.052, price: 28, minLevel: 10, icon: GiCherry },
  { name: 'Üzüm', energy: 25, yield: 0.056, price: 30, minLevel: 11, icon: GiGrapes },
  { name: 'Lahana', energy: 25, yield: 0.059, price: 32, minLevel: 12, icon: GiCabbage },
  { name: 'Şeftali', energy: 25, yield: 0.063, price: 34, minLevel: 13, icon: GiPear },
  { name: 'Balkabağı', energy: 25, yield: 0.066, price: 36, minLevel: 14, icon: GiPumpkin },
  { name: 'Biber', energy: 25, yield: 0.069, price: 38, minLevel: 15, icon: GiChiliPepper },
  { name: 'Yonca', energy: 25, yield: 0.073, price: 40, minLevel: 16, icon: GiGrain }
];

interface FeedValues {
  energy: number;
  milk: number;
}

interface FeedValuesMap {
  standard: FeedValues;
  premium: FeedValues;
  super: FeedValues;
}

interface LogEntry {
  message: string;
  timestamp: Date;
  type: 'milk' | 'feed' | 'points';
}

interface MenuBarProps {
  points: number;
  sentPoints: number;
  level: number;
  onMarketClick: () => void;
  onSendPointsClick: () => void;
  onHelpClick: () => void;
  onLogsClick: () => void;
  onLeaderboardClick: () => void;
  onProfileClick: () => void;
  onReferralClick: () => void;
  onLevelClick: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  icons: {
    market: IconType;
    points: IconType;
    help: IconType;
    logs: IconType;
    leaderboard: IconType;
    profile: IconType;
    darkMode: IconType;
    referral: IconType;
  };
}

// XP ve seviye hesaplama için gerekli sabitler
export const LEVEL_XP_REQUIREMENTS = [
  0,        // Level 1
  11700,    // Level 2
  25200,    // Level 3
  45000,    // Level 4
  72000,    // Level 5
  108000,   // Level 6
  153000,   // Level 7
  207000,   // Level 8
  270000,   // Level 9
  342000,   // Level 10
  423000,   // Level 11
  513000,   // Level 12
  612000,   // Level 13
  720000,   // Level 14
  837000,   // Level 15
  963000    // Level 16
];

const ConfettiButton = styled(Button)`
  position: relative;
  overflow: visible;

  .confetti-left, .confetti-right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: all 0.3s ease;
  }

  .confetti-left {
    left: -25px;
    color: #FFD700;
  }

  .confetti-right {
    right: -25px;
    color: #FF6B6B;
  }

  &.celebrating .confetti-left {
    animation: confettiLeft 0.5s ease-out;
  }

    animation: confettiRight 0.5s ease-out;
  }

  @keyframes confettiLeft {
    0% { transform: translate(0, -50%) rotate(0deg); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translate(-20px, -50%) rotate(-45deg); opacity: 0; }
  }

  @keyframes confettiRight {
    0% { transform: translate(0, -50%) rotate(0deg); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translate(20px, -50%) rotate(45deg); opacity: 0; }
  }
`;

function App() {
  const [health, setHealth] = useState<number>(100);
  const [hunger, setHunger] = useState<number>(0);
  const [milk, setMilk] = useState<number>(0);
  const [points, setPoints] = useState(450);
  const [feed, setFeed] = useState<FeedState>(
    FEEDS.reduce((acc, feed) => ({ ...acc, [feed.name]: 0 }), {})
  );
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [showMarket, setShowMarket] = useState(false);
  const [showSendPoints, setShowSendPoints] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [sentPoints, setSentPoints] = useState(0);
  const [milkProductionRate, setMilkProductionRate] = useState<number>(0);
  const [level, setLevel] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [totalPrizePool, setTotalPrizePool] = useState(10000);
  const [players, setPlayers] = useState([
    { id: 1, username: "Oyuncu1", sentPoints: 5000, estimatedEarnings: 0, rank: 1 },
    { id: 2, username: "Oyuncu2", sentPoints: 3000, estimatedEarnings: 0, rank: 2 },
    { id: 3, username: "Oyuncu3", sentPoints: 2000, estimatedEarnings: 0, rank: 3 },
    { id: 4, username: "Oyuncu4", sentPoints: 1000, estimatedEarnings: 0, rank: 4 },
  ]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [timeLeft, setTimeLeft] = useState(240); // 240 dakika başlangıç süresi
  const [showProfile, setShowProfile] = useState(false);
  const [username, setUsername] = useState('Oyuncu1');
  const [email, setEmail] = useState('oyuncu1@example.com');
  const [joinDate] = useState('1 Ocak 2024');
  const [referralCode] = useState('ABC123'); // Backend'den gelecek
  const [referralCount, setReferralCount] = useState(0);
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [activeReferrals, setActiveReferrals] = useState<Array<{
    username: string;
    registrationDate: string;
    daysLeft: number;
    totalEarnings: number;
  }>>([]);
  const [showReferral, setShowReferral] = useState(false);
  const [xp, setXp] = useState(0);
  const [showLevelTable, setShowLevelTable] = useState(false);
  const [hasEverFed, setHasEverFed] = useState<boolean>(false); // Hiç yem kullanıldı mı?
  const [isNewMonth, setIsNewMonth] = useState(false); // Yeni ay mı?
  const [notification, setNotification] = useState<{text: string, type: 'points' | 'xp'} | null>(null);

  const addLog = (message: string, type: LogEntry['type']) => {
    // Sadece önemli işlemlerin loglarını tut
    const importantActions = [
      'süt satıldı',
      'yem kullanıldı',
      'puan gönderildi',
      'İnek öldü',
      'İnek canlandırıldı',
      'Level'
    ];

    // Mesajı kontrol et ve sadece önemli işlemleri logla
    if (importantActions.some(action => message.includes(action))) {
      setLogs(prev => [{
        message,
        timestamp: new Date(),
        type
      }, ...prev].slice(0, 50)); // Son 50 log tutulur
    }
  };

  // Memoize edilmiş değerler
  const currentLevelProgress = useMemo(() => {
    return {
      currentXp: xp,
      nextLevelXp: LEVEL_XP_REQUIREMENTS[level],
      progress: (xp / LEVEL_XP_REQUIREMENTS[level]) * 100
    };
  }, [xp, level]);

  const gameStats = useMemo(() => {
    return {
      health,
      hunger,
      milk,
      milkProductionRate,
      timeLeft
    };
  }, [health, hunger, milk, milkProductionRate, timeLeft]);

  // Callback fonksiyonları
  const handleFeedCow = useCallback((feedType: string) => {
    const selectedFeed = FEEDS.find(f => f.name === feedType);
    if (!selectedFeed) return;

    if (feed[feedType] > 0 && health > 0 && level >= selectedFeed.minLevel) {
      setHasEverFed(true);
      
      setHunger(prevHunger => {
        const newHunger = Math.min(100, prevHunger + 25);
        return Number(newHunger.toFixed(1));
      });
      
      setFeed(prev => ({ ...prev, [feedType]: prev[feedType] - 1 }));
      setMilkProductionRate(selectedFeed.yield);
      
      addLog(`${feedType} yem kullanıldı, süt üretim hızı: ${selectedFeed.yield.toFixed(3)}L/dk`, 'feed');
    }
  }, [feed, health, level, addLog]);

  const sellMilk = useCallback(() => {
    if (milk > 0 && health > 0) {
      const earnings = Math.floor(milk * 100);
      const xpGain = Math.floor(milk * 100);
      
      setPoints(prev => prev + earnings);
      setXp(prev => prev + xpGain);
      
      // Önce puan bildirimi
      setNotification({ text: `+${earnings} Puan kazandın!`, type: 'points' });
      
      // 1.5 saniye sonra puan bildirimi kaybolsun ve XP bildirimini gelsin
      setTimeout(() => {
        setNotification(null);
        // 100ms bekle ve XP bildirimini göster
        setTimeout(() => {
          setNotification({ text: `+${xpGain} XP kazandın!`, type: 'xp' });
          // 1.5 saniye sonra XP bildirimi kaybolsun
          setTimeout(() => setNotification(null), 1500);
        }, 100);
      }, 1500);
      
      const button = document.querySelector('.sell-milk-button');
      button?.classList.add('confetti');
      setTimeout(() => button?.classList.remove('confetti'), 500);
      
      setMilk(0);
      addLog(`${milk.toFixed(4)}L süt satıldı: +${earnings} puan, +${xpGain} XP`, 'milk');
    }
  }, [milk, health, addLog]);

  const handleBuyFeed = useCallback((feedType: string) => {
    const selectedFeed = FEEDS.find(f => f.name === feedType);
    if (!selectedFeed) return;

    if (points >= selectedFeed.price && level >= selectedFeed.minLevel) {
      setFeed(prev => ({ ...prev, [feedType]: prev[feedType] + 1 }));
      setPoints(prev => prev - selectedFeed.price);
      addLog(`${feedType} yem satın alındı (-${selectedFeed.price} puan)`, 'feed');
    }
  }, [points, level, addLog]);

  const resetGame = () => {
    setHealth(100);
    setHunger(0);
    setMilk(0);
    setMilkProductionRate(0);
    setSentPoints(0);
    setFeed(FEEDS.reduce((acc, feed) => ({ ...acc, [feed.name]: 0 }), {}));
    setPoints(450);
    setTotalEarnings(0);
    setHasEverFed(false);
    setIsNewMonth(true);
    addLog('İnek canlandırıldı! Oyun yeniden başladı.', 'points');
  };

  const sendPoints = (amount: number) => {
    if (amount >= 500 && amount <= points) {
      setPoints(prev => prev - amount);
      setSentPoints(prev => prev + amount);
      addLog(`${amount} puan gönderildi`, 'points');
      setNotification({ text: `${amount} puan başarıyla gönderildi!`, type: 'points' });
      setTimeout(() => setNotification(null), 2000);
    }
  };

  // Ay sonu hesaplaması
  const currentDate = new Date();
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysLeft = Math.ceil((lastDayOfMonth.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  const currentMonth = currentDate.toLocaleString('tr-TR', { month: 'long', year: 'numeric' });

  // Dark mod değişikliğini uygula
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Açlık azalması optimizasyonu
  useEffect(() => {
    if (!health || !hasEverFed) return;

    const hungerInterval = setInterval(() => {
      setHunger(prevHunger => {
        const decrease = 100 / (240 * 60);
        return Math.max(0, Number((prevHunger - decrease).toFixed(2)));
      });
    }, 1000);

    return () => clearInterval(hungerInterval);
  }, [health, hasEverFed]);

  // Sağlık azalması optimizasyonu
  useEffect(() => {
    if (hunger > 0 || health <= 0) return;

    const healthInterval = setInterval(() => {
      setHealth(prev => {
        const decrease = 100 / (5040 * 60);
        return Number(Math.max(0, prev - decrease).toFixed(1));
      });
    }, 1000);

    return () => clearInterval(healthInterval);
  }, [hunger, health]);

  // XP'ye göre seviye hesaplama optimizasyonu
  useEffect(() => {
    const newLevel = LEVEL_XP_REQUIREMENTS.findIndex(threshold => xp < threshold) || LEVEL_XP_REQUIREMENTS.length;
    
    if (newLevel !== level) {
      setLevel(newLevel);
      addLog(`Tebrikler! Level ${newLevel} oldunuz! 🎉`, 'points');
    }
  }, [xp, level]);

  // Kalan süre hesaplama optimizasyonu
  useEffect(() => {
    setTimeLeft(hunger > 0 ? Math.ceil((hunger / 100) * 240) : 0);
  }, [hunger]);

  // Süt üretimi hook'u
  useMilkProduction({
    health,
    hunger,
    milkProductionRate,
    hasEverFed,
    setMilk
  });

  const handleUpdateProfile = (updates: { username?: string; email?: string; password?: string }) => {
    if (updates.username) {
      setUsername(updates.username);
    }
    if (updates.email) {
      setEmail(updates.email);
    }
    if (updates.password) {
      // Şifre değişikliği işlemi
    }
    setShowProfile(false);
  };

  // Health effect'inde inek ölüm logu
  useEffect(() => {
    if (health <= 0) {
      addLog('İnek öldü! Tüm puanlar sıfırlandı.', 'points');
    }
  }, [health]);

  return (
    <AppContainer>
      <FarmAnimations />
      <MenuContainer>
        <MenuBar 
          points={points}
          sentPoints={sentPoints}
          level={level}
          onMarketClick={() => setShowMarket(true)}
          onSendPointsClick={() => setShowSendPoints(true)}
          onHelpClick={() => setShowHelp(true)}
          onLogsClick={() => setShowLogs(true)}
          onLeaderboardClick={() => setShowLeaderboard(true)}
          onProfileClick={() => setShowProfile(true)}
          onReferralClick={() => setShowReferral(true)}
          onLevelClick={() => setShowLevelTable(true)}
          isDarkMode={isDarkMode}
          onThemeToggle={() => setIsDarkMode(prev => !prev)}
          icons={{
            market: FaShoppingCart,
            points: FaCoins,
            help: FaQuestionCircle,
            logs: FaHistory,
            leaderboard: FaTrophy,
            profile: FaUser,
            darkMode: isDarkMode ? MdLightMode : MdDarkMode,
            referral: FaUserFriends
          }}
        />
      </MenuContainer>

      <MainContent>
        <GameContainer>
          <Cow
            health={health}
            hunger={hunger}
            timeLeft={timeLeft}
            hasEverFed={hasEverFed}
            milkProductionRate={milkProductionRate}
          />

          <Stats>
            <StatCard
              title="Açlık"
              value={hunger}
              unit="%"
              icon={GiBowlOfRice}
              color="#4CAF50"
              timeLeft={timeLeft}
              style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}
            />
          </Stats>

          <Stats className="bottom-stats">
            <StatCard
              title="Süt Üretimi"
              value={milk}
              unit="Lt"
              icon={GiMilkCarton}
              color="#ffffff"
            />
            <StatCard
              title="Üretim Hızı"
              value={milkProductionRate}
              unit="Lt/saat"
              icon={FaClock}
              color="#FF9800"
              health={health}
            />
            <StatCard
              title="Sağlık"
              value={health}
              unit="%"
              icon={FaHeartbeat}
              color="#E91E63"
              timeLeft={timeLeft}
            />
          </Stats>

          <ButtonGroup style={{ marginTop: '30px' }}>
            <Button
              onClick={sellMilk}
              disabled={milk === 0 || health <= 0}
              className="sell-milk-button"
              style={{ fontSize: '1.1em', padding: '15px 30px' }}
            >
              Sütü Sat ({milk.toFixed(4)} L)
            </Button>

            {/* Test için öldürme butonu */}
            <Button
              onClick={() => {
                setHealth(0);
                setHunger(0);
                setMilk(0);
              }}
              style={{ 
                background: '#ff4444',
                fontSize: '1em',
                padding: '10px 20px'
              }}
            >
              İneği Öldür (Test)
            </Button>
          </ButtonGroup>

          {health <= 0 && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'red', fontWeight: 'bold', marginTop: '20px' }}>
                ⚠️ İneğiniz öldü! Tüm puanlarınız sıfırlandı.
              </p>
              <ReviveButton onClick={resetGame}>
                🌟 İneği Canlandır
              </ReviveButton>
            </div>
          )}
        </GameContainer>

        <Popup 
          isOpen={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
          title="Puan Sıralaması"
        >
          <LeaderBoard 
            players={players}
            totalPrizePool={totalPrizePool}
            currentMonth={currentMonth}
            daysLeft={daysLeft}
            currentXp={xp}
            nextLevelXp={LEVEL_XP_REQUIREMENTS[level]}
            currentLevel={level}
          />
        </Popup>
      </MainContent>

      <Popup 
        isOpen={showMarket} 
        onClose={() => setShowMarket(false)}
        title="Market"
      >
        <Market 
          points={points}
          level={level}
          feed={feed}
          onBuy={handleBuyFeed}
          onFeedCow={handleFeedCow}
          hunger={Number(hunger)}
          health={health}
        />
      </Popup>

      <Popup 
        isOpen={showSendPoints} 
        onClose={() => setShowSendPoints(false)}
        title="Puan Gönder"
      >
        <div style={{ padding: '20px' }}>
          <div style={{ 
            background: 'var(--bg-primary)', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: 'var(--text-primary)' }}>Sistem Nasıl Çalışır?</h4>
            <p style={{ margin: '0', fontSize: '0.9em', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
              Hesabınızdaki puanları sisteme göndererek {currentMonth} tarihinde dağıtılacak reklam gelirlerinden pay alabilirsiniz.
              Minimum gönderim limiti 5.000 puandır.
            </p>
            <p style={{ margin: '10px 0 0 0', fontSize: '0.9em', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              En çok puan gönderen kişi paranın çoğunu alır.
            </p>
          </div>

          <div style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>
            <p>Mevcut Puanınız: {points}</p>
            <p>Gönderilen Puanlar: {sentPoints}</p>
            <p>Sıralamanız: {players.find(p => p.username === username)?.rank || '-'}. sıra</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>
              Son gönderim tarihi: {lastDayOfMonth.toLocaleDateString('tr-TR')} 23:59
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '10px',
            alignItems: 'center' 
          }}>
            <input 
              type="number" 
              placeholder="Göndermek istediğiniz puan miktarı"
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
              }}
              max={points}
              min={1}
            />
            <Button 
              onClick={() => {
                const amount = parseInt((document.querySelector('input[type="number"]') as HTMLInputElement).value);
                if (amount && amount > 0 && amount <= points) {
                  sendPoints(amount);
                  setShowSendPoints(false);
                }
              }}
              style={{ 
                padding: '10px 20px',
                whiteSpace: 'nowrap'
              }}
            >
              Gönder
            </Button>
          </div>
        </div>
      </Popup>

      <Popup 
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        title="Nasıl Oynanır?"
      >
        <div style={{ padding: '20px' }}>
          <h3>Oyun Kuralları</h3>
          <ul style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
            <li>Oyuna 1 inek ile başlarsınız ve her ayın son gününe kadar (23:59'a kadar) ineğinizi hayatta tutmalısınız.</li>
            <li>İneğinizin sağlığı başlangıçta %100'dür ve 5.040 dakika boyunca devam eder.</li>
            <li>İneğin açlığı %100'den başlar ve 240 dakika içinde %0'a düşer.</li>
            <li>Açlık %0'a düştüğünde, ineğin sağlığı her dakika azalmaya başlar.</li>
            <li>Sağlık azaldığında tekrar iyileştirilemez.</li>
            <li>İneğinizi açlığı bitmeden önce envanterdeki yemlerle beslemelisiniz.</li>
            <li>Her yem kullanımı açlığı %25 artırır. Toplam 4 yem ile açlık %100 olur.</li>
            <li>İnek tok olduğunda (açlık %100), her dakika süt üretimi yapar.</li>
            <li>Üretilen sütü satarak puan kazanabilirsiniz.</li>
          </ul>
          
          <h3 style={{ marginTop: '20px' }}>Yem Çeşitleri ve Özellikleri</h3>
          <ul style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
            {FEEDS.map(feed => (
              <li key={feed.name}>
                {feed.name.charAt(0).toUpperCase() + feed.name.slice(1)}: {feed.energy}% enerji, {feed.yield}L/dk süt verimi
              </li>
            ))}
          </ul>

          <h3 style={{ marginTop: '20px' }}>Puan Sistemi</h3>
          <ul style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
            <li>Süt satışından kazandığınız puanlarla yem satın alabilirsiniz.</li>
            <li>Puanlarınızı oyuna göndererek aylık reklam gelirinden pay alabilirsiniz.</li>
            <li>İnek öldüğünde tüm puanlar ve gönderilen puanlar sıfırlanır.</li>
            <li>İneği canlandırabilirsiniz ancak gönderilen puanlar geri gelmez.</li>
          </ul>
        </div>
      </Popup>

      <Popup 
        isOpen={showLogs}
        onClose={() => setShowLogs(false)}
        title="İşlem Kayıtları"
      >
        <div style={{ padding: '20px', maxHeight: '400px', overflowY: 'auto' }}>
          {logs.map((log, index) => (
            <div key={index} style={{ 
              padding: '10px', 
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{log.message}</span>
              <small style={{ color: '#666' }}>
                {log.timestamp.toLocaleTimeString()}
              </small>
            </div>
          ))}
          {logs.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666' }}>
              Henüz işlem kaydı bulunmuyor.
            </p>
          )}
        </div>
      </Popup>

      <Popup 
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        title="Profil"
      >
        <Profile 
          username={username}
          email={email}
          joinDate={joinDate}
          totalEarnings={totalEarnings}
          onUpdateProfile={handleUpdateProfile}
        />
      </Popup>

      <Popup 
        isOpen={showReferral}
        onClose={() => setShowReferral(false)}
        title="Referans Sistemi"
      >
        <ReferralSystem 
          referralCode={referralCode}
          referralCount={referralCount}
          totalEarnings={referralEarnings}
          activeReferrals={activeReferrals}
        />
      </Popup>

      <Popup
        isOpen={showLevelTable}
        onClose={() => setShowLevelTable(false)}
        title="Seviye Tablosu"
      >
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px', padding: '15px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Mevcut Durumunuz</h3>
            <p style={{ margin: '0' }}>Seviye: {level}</p>
            <p style={{ margin: '5px 0 0 0' }}>XP: {xp.toLocaleString('tr-TR')} / {LEVEL_XP_REQUIREMENTS[level].toLocaleString('tr-TR')}</p>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              background: 'var(--bg-primary)', 
              borderRadius: '4px',
              marginTop: '10px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${(xp / LEVEL_XP_REQUIREMENTS[level]) * 100}%`,
                height: '100%',
                background: 'var(--accent-primary)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Seviye</th>
                <th style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Gerekli XP</th>
                <th style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Açılan Yem</th>
                <th style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>Durum</th>
              </tr>
            </thead>
            <tbody>
              {LEVEL_XP_REQUIREMENTS.map((threshold, index) => {
                const levelStatus = level > index + 1 ? 'completed' : level === index + 1 ? 'current' : 'locked';
                const feed = FEEDS.find(f => f.minLevel === index + 1);
                
                return (
                  <tr key={index + 1} style={{ 
                    background: levelStatus === 'current' ? 'var(--accent-primary)' : 'transparent',
                    color: levelStatus === 'current' ? 'white' : 'inherit',
                    opacity: levelStatus === 'locked' ? 0.7 : 1
                  }}>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>Level {index + 1}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>{threshold.toLocaleString('tr-TR')} XP</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>
                      {feed ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {React.createElement(feed.icon, { size: 20 })}
                          <span>{feed.name}</span>
                        </div>
                      ) : '-'}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>
                      {levelStatus === 'current' ? '🎯 Mevcut Seviye' : 
                       levelStatus === 'completed' ? '✅ Açıldı' : '🔒 Kilitli'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Popup>

      {notification && (
        <NotificationText $type={notification.type}>
          {notification.text}
        </NotificationText>
      )}
    </AppContainer>
  );
}

export default App
