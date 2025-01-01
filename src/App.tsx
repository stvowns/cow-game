import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Cow } from './components/Cow'
import { FarmAnimations } from './components/FarmAnimations'
import { Market } from './components/Market'
import { MenuBar } from './components/MenuBar'
import { Popup } from './components/Popup'
import { LeaderBoard } from './components/LeaderBoard'
import { Profile } from './components/Profile'
import { GiMilkCarton } from 'react-icons/gi';
import { FaLeaf, FaHeart, FaShoppingCart, FaCoins, FaQuestionCircle, FaHistory, FaTrophy, FaUser, FaUserFriends } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { ReferralSystem } from './components/ReferralSystem';
import { IconType } from 'react-icons';

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
  gap: 20px;
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

const StatCard = styled.div`
  background: var(--bg-secondary);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px var(--shadow-color);
  transition: all 0.3s ease;
  animation: fadeInUp 0.5s ease-out;
  border: 1px solid var(--border-color);

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px var(--shadow-color);
  }

  h3 {
    color: var(--text-primary);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p {
    color: var(--text-secondary);
    font-size: 1.2em;
    margin: 10px 0;
  }
`;

const MiniProgressBar = styled.div<{ value: number; color: string }>`
  width: 100%;
  height: 6px;
  background: var(--bg-primary);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  margin-top: 10px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.value}%;
    background: ${props => props.color};
    transition: width 0.3s ease;
  }
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
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: center;

  button {
    background: var(--accent-primary);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: var(--accent-secondary);
    }

    &:disabled {
      background: var(--text-secondary);
      cursor: not-allowed;
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

// Yem türleri için interface
export interface FeedType {
  name: string;
  energy: number;
  yield: number;
  price: number;
  minLevel: number;
}

// Yem türleri
export const FEEDS: FeedType[] = [
  { name: 'Çim', energy: 25, yield: 0.15, price: 450, minLevel: 1 },
  { name: 'Yaprak', energy: 25, yield: 0.18, price: 540, minLevel: 2 },
  { name: 'Buğday', energy: 25, yield: 0.21, price: 630, minLevel: 3 },
  { name: 'Ayçiçeği', energy: 25, yield: 0.24, price: 720, minLevel: 4 },
  { name: 'Mısır', energy: 25, yield: 0.27, price: 810, minLevel: 5 },
  { name: 'Karpuz', energy: 25, yield: 0.30, price: 900, minLevel: 6 },
  { name: 'Havuç', energy: 25, yield: 0.33, price: 990, minLevel: 7 },
  { name: 'Patlıcan', energy: 25, yield: 0.36, price: 1080, minLevel: 8 },
  { name: 'Elma', energy: 25, yield: 0.39, price: 1170, minLevel: 9 },
  { name: 'Kiraz', energy: 25, yield: 0.43, price: 1290, minLevel: 10 },
  { name: 'Üzüm', energy: 25, yield: 0.47, price: 1410, minLevel: 11 },
  { name: 'Lahana', energy: 25, yield: 0.50, price: 1500, minLevel: 12 },
  { name: 'Şeftali', energy: 25, yield: 0.53, price: 1590, minLevel: 13 },
  { name: 'Balkabağı', energy: 25, yield: 0.56, price: 1680, minLevel: 14 },
  { name: 'Biber', energy: 25, yield: 0.59, price: 1770, minLevel: 15 },
  { name: 'Limon', energy: 25, yield: 0.62, price: 1860, minLevel: 16 }
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
const LEVEL_XP_REQUIREMENTS = [
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

function App() {
  const [health, setHealth] = useState(100);
  const [hunger, setHunger] = useState(100);
  const [milk, setMilk] = useState(0);
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
  const [milkProductionRate, setMilkProductionRate] = useState(0);
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
  const [hasEverFed, setHasEverFed] = useState(false); // Hiç yem kullanıldı mı?
  const [isNewMonth, setIsNewMonth] = useState(false); // Yeni ay mı?

  const addLog = (message: string, type: LogEntry['type']) => {
    setLogs(prev => [{
      message,
      timestamp: new Date(),
      type
    }, ...prev].slice(0, 100)); // Son 100 log tutulur
  };

  // Açlık azalması (240 dakikada 0'a düşecek şekilde)
  useEffect(() => {
    const hungerInterval = setInterval(() => {
      if (hasEverFed) { // Sadece yem kullanıldıysa açlık azalsın
        if (hunger > 0) {
          setHunger(prev => {
            const decrease = 100 / (240 * 60); // 240 dakika * 60 saniye
            const newHunger = Math.max(0, prev - decrease);
            
            // Kalan süreyi hesapla
            const remainingTime = Math.ceil((newHunger / 100) * 240);
            setTimeLeft(remainingTime);
            
            return Number(newHunger.toFixed(1)); // Bir ondalık haneye yuvarla
          });
        }
      }
    }, 1000);

    return () => clearInterval(hungerInterval);
  }, [hunger, hasEverFed]);

  // Sağlık azalması (5040 dakikada ölüm)
  useEffect(() => {
    const healthInterval = setInterval(() => {
      if (hunger <= 0 && !hasEverFed) { // Açlık 0 ve hiç yem kullanılmadıysa sağlık azalsın
        setHealth(prev => {
          const decrease = 100 / (5040 * 60); // 5040 dakika * 60 saniye
          return Number(Math.max(0, prev - decrease).toFixed(1));
        });
      }
    }, 1000);

    return () => clearInterval(healthInterval);
  }, [hunger, hasEverFed]);

  // Süt üretimi (sabit hız)
  useEffect(() => {
    const milkInterval = setInterval(() => {
      if (health > 0 && hunger > 0) {  // İnek sağlıklı VE tok olmalı
        setMilk(prev => {
          const production = milkProductionRate; // Kullanılan yemin verim oranı
          return Number((prev + production).toFixed(1));
        });
      }
    }, 1000 * 60); // Her dakika güncelle

    return () => clearInterval(milkInterval);
  }, [health, hunger, milkProductionRate]);

  const handleFeedCow = (feedType: string) => {
    const selectedFeed = FEEDS.find(f => f.name === feedType);
    if (!selectedFeed) return;

    if (feed[feedType] > 0 && health > 0 && level >= selectedFeed.minLevel) {
      setHunger(prev => Number(Math.min(100, prev + selectedFeed.energy).toFixed(1)));
      setFeed(prev => ({ ...prev, [feedType]: prev[feedType] - 1 }));
      setMilkProductionRate(selectedFeed.yield);
      setHasEverFed(true); // İlk yem kullanıldığında işaretle
      addLog(`${feedType} yem kullanıldı, enerji +${selectedFeed.energy}%`, 'feed');
    }
  };

  // Dark mod değişikliğini uygula
  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const sellMilk = () => {
    if (milk > 0) {
      const earnings = Math.floor(milk * 10);
      const earnedXp = Math.floor(milk * 100);
      
      setPoints(prev => prev + earnings);
      setTotalEarnings(prev => prev + earnings);
      setXp(prev => prev + earnedXp);
      addLog(`${milk.toFixed(1)} litre süt satıldı, +${earnings} puan ve +${earnedXp} XP kazanıldı`, 'milk');
      setMilk(0);
      
      // Referans bonusu
      const referralBonus = Math.floor(earnings * 0.03);
      if (referralBonus > 0) {
        setReferralEarnings(prev => prev + referralBonus);
        addLog(`Referans bonusu: +${referralBonus} puan`, 'points');
      }
      
      // Konfeti efekti
      const button = document.querySelector('.sell-milk-button') as HTMLElement;
      if (button) {
        const buttonRect = button.getBoundingClientRect();
        const centerX = buttonRect.left + buttonRect.width / 2;
        const centerY = buttonRect.top + buttonRect.height / 2;

        // Konfeti parçacıkları
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div');
          const color = ['#ff718d', '#fdff6a', '#71ff7e', '#71a4ff', '#ff71e9'][Math.floor(Math.random() * 5)];
          
          particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 10px;
            height: 10px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
          `;
          
          const angle = Math.random() * Math.PI * 2;
          const velocity = 8 + Math.random() * 8;
          const vx = Math.cos(angle) * velocity;
          const vy = Math.sin(angle) * velocity;
          
          document.body.appendChild(particle);
          
          let posX = centerX;
          let posY = centerY;
          let opacity = 1;
          let scale = 1;
          
          const animate = () => {
            if (opacity <= 0) {
              particle.remove();
              return;
            }
            
            posX += vx;
            posY += vy + 2; // Yerçekimi efekti
            opacity -= 0.02;
            scale -= 0.02;
            
            particle.style.transform = `translate(${posX - centerX}px, ${posY - centerY}px) scale(${scale})`;
            particle.style.opacity = opacity.toString();
            
            requestAnimationFrame(animate);
          };
          
          requestAnimationFrame(animate);
        }
      }
      
      // Satış bildirimi
      const notification = document.createElement('div');
      notification.textContent = `+${earnings} puan, +${earnedXp} XP kazandınız!`;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
      `;
      
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, 2000);
    }
  };

  const handleBuyFeed = (feedType: string) => {
    const selectedFeed = FEEDS.find(f => f.name === feedType);
    if (!selectedFeed) return;

    if (points >= selectedFeed.price && level >= selectedFeed.minLevel) {
      setFeed(prev => ({ ...prev, [feedType]: prev[feedType] + 1 }));
      setPoints(prev => prev - selectedFeed.price);
      addLog(`${feedType} yem satın alındı (-${selectedFeed.price} puan)`, 'feed');
    }
  };

  const sendPoints = (amount: number) => {
    if (amount >= 5000 && amount <= points) {  // Minimum 5000 puan kontrolü
      setPoints(prev => prev - amount);
      setSentPoints(prev => prev + amount);
      addLog(`${amount} puan gönderildi`, 'points');
      
      // Bildirim göster
      const notification = document.createElement('div');
      notification.textContent = `${amount} puan başarıyla gönderildi!`;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
      `;
      
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, 2000);
    } else {
      // Hata bildirimi göster
      const notification = document.createElement('div');
      notification.textContent = amount < 5000 ? 
        'Minimum 5.000 puan gönderebilirsiniz!' : 
        'Yeterli puanınız bulunmuyor!';
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
      `;
      
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, 2000);
    }
  };

  const resetGame = () => {
    setHealth(100);
    setHunger(100);
    setMilk(0);
    setMilkProductionRate(0);
    setSentPoints(0);
    setFeed(FEEDS.reduce((acc, feed) => ({ ...acc, [feed.name]: 0 }), {}));
    setPoints(450);
    setTotalEarnings(0);
    setHasEverFed(false); // Oyun sıfırlandığında yem kullanımını sıfırla
    setIsNewMonth(true); // Yeni ay olduğunu işaretle
    addLog('İnek canlandırıldı! Oyun yeniden başladı.', 'points');
  };

  // Her ay başında oyunu sıfırla
  useEffect(() => {
    const checkMonthlyReset = () => {
      const now = new Date();
      if (now.getDate() === 1 && now.getHours() === 0 && now.getMinutes() === 0) {
        resetGame();
        addLog('Yeni ay başladı! Oyun sıfırlandı.', 'points');
      }
    };

    const resetInterval = setInterval(checkMonthlyReset, 60000); // Her dakika kontrol et
    return () => clearInterval(resetInterval);
  }, []);

  // XP'ye göre seviye hesaplama
  useEffect(() => {
    const calculateLevel = () => {
      let newLevel = 1;
      for (let i = 0; i < LEVEL_XP_REQUIREMENTS.length; i++) {
        if (xp >= LEVEL_XP_REQUIREMENTS[i]) {
          newLevel = i + 1;
        } else {
          break;
        }
      }
      if (newLevel !== level) {
        setLevel(newLevel);
        addLog(`Tebrikler! Level ${newLevel} oldunuz! 🎉`, 'points');
        
        // Yeni seviye bildirimi
        const notification = document.createElement('div');
        notification.textContent = `🎉 Tebrikler! Level ${newLevel} oldunuz!`;
        notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #9C27B0;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          animation: slideIn 0.3s ease-out;
          z-index: 1000;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => {
          notification.style.animation = 'fadeOut 0.3s ease-out';
          setTimeout(() => notification.remove(), 300);
        }, 3000);
      }
    };

    calculateLevel();
  }, [xp, level]);

  // Ay sonu hesaplaması
  const currentDate = new Date();
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysLeft = Math.ceil((lastDayOfMonth.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  const currentMonth = currentDate.toLocaleString('tr-TR', { month: 'long', year: 'numeric' });

  // Dark mode styles
  useEffect(() => {
    document.documentElement.style.setProperty('--bg-primary', isDarkMode ? '#1a1a1a' : '#f0f2f5');
    document.documentElement.style.setProperty('--bg-secondary', isDarkMode ? '#2d2d2d' : '#ffffff');
    document.documentElement.style.setProperty('--text-primary', isDarkMode ? '#ffffff' : '#000000');
    document.documentElement.style.setProperty('--text-secondary', isDarkMode ? '#b3b3b3' : '#666666');
    document.documentElement.style.setProperty('--border-color', isDarkMode ? '#404040' : '#e0e0e0');
    document.documentElement.style.setProperty('--shadow-color', isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)');
    document.documentElement.style.setProperty('--accent-primary', isDarkMode ? '#4f6ef2' : '#2196F3');
    document.documentElement.style.setProperty('--accent-secondary', isDarkMode ? '#3f5ad9' : '#1976D2');
    document.documentElement.style.setProperty('--card-bg', isDarkMode ? '#2d2d2d' : '#ffffff');
  }, [isDarkMode]);

  const handleUpdateProfile = (updates: { username?: string; email?: string; password?: string }) => {
    if (updates.username) {
      setUsername(updates.username);
      addLog('Kullanıcı adı güncellendi', 'points');
    }
    if (updates.email) {
      setEmail(updates.email);
      addLog('E-posta adresi güncellendi', 'points');
    }
    if (updates.password) {
      addLog('Şifre başarıyla değiştirildi', 'points');
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
            hunger={hunger.toString()} 
            timeLeft={timeLeft} 
            hasFeed={Object.values(feed).some(count => count > 0)}
            milkProductionRate={milkProductionRate}
          />
          
          {!hasEverFed && health > 0 && (
            <p style={{ color: 'orange', marginTop: '10px', textAlign: 'center' }}>
              ⚠️ Yem kullanarak süt üretimini başlatın!
            </p>
          )}

          <StatsGrid>
            <StatCard>
              <h3>
                <GiMilkCarton style={{ color: '#2196F3', fontSize: '1.4em' }} />
                Süt Üretimi
              </h3>
              <p>
                {milk.toFixed(1)} Lt
                <small style={{ display: 'block', fontSize: '0.8em', opacity: 0.8, marginTop: '5px' }}>
                  Üretim Hızı: {health > 0 && hunger > 0 && milkProductionRate > 0 ? 
                    `${(milkProductionRate * 60).toFixed(2)} Lt/saat` : 
                    <span style={{ color: '#ff6b6b' }}>Üretim Yapılmıyor!</span>}
                </small>
              </p>
              <MiniProgressBar value={milk} color="rgba(255, 255, 255, 0.8)" />
            </StatCard>
            <StatCard>
              <h3>
                <FaHeart style={{ color: '#E91E63', fontSize: '1.4em' }} />
                Toplam Sağlık Süresi
              </h3>
              <p>{Math.ceil(health * 50.4)} dakika</p>
              <MiniProgressBar value={health} color="#4CAF50" />
            </StatCard>
          </StatsGrid>

          <ButtonGroup>
            <Button
              onClick={sellMilk}
              disabled={milk === 0 || health <= 0}
              className="sell-milk-button"
            >
              Sütü Sat ({milk.toFixed(1)} L)
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
          {hunger === 0 && health > 0 && (
            <p style={{ color: 'orange', marginTop: '20px' }}>
              ⚠️ İneğiniz aç! Lütfen yemlemeyi unutmayın.
            </p>
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
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', borderBottom: '1px solid var(--border-color)' }}>Seviye</th>
                <th style={{ padding: '10px', borderBottom: '1px solid var(--border-color)' }}>Gerekli XP</th>
                <th style={{ padding: '10px', borderBottom: '1px solid var(--border-color)' }}>Durum</th>
              </tr>
            </thead>
            <tbody>
              {LEVEL_THRESHOLDS.map((threshold, index) => (
                <tr key={index + 1} style={{ 
                  background: level === index + 1 ? 'var(--accent-primary)' : 'transparent',
                  color: level === index + 1 ? 'white' : 'inherit'
                }}>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-color)' }}>Level {index + 1}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-color)' }}>{threshold.toLocaleString('tr-TR')} XP</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-color)' }}>
                    {level === index + 1 ? '🎯 Mevcut Seviye' : level > index + 1 ? '✅ Tamamlandı' : '🔒 Kilitli'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Popup>
    </AppContainer>
  );
}

export default App
