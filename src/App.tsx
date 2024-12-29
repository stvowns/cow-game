import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Cow } from './components/Cow'
import { FarmAnimations } from './components/FarmAnimations'
import { Market } from './components/Market'
import { MenuBar } from './components/MenuBar'
import { Popup } from './components/Popup'

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
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.05),
    inset 0 0 10px rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 6px 8px rgba(0, 0, 0, 0.1),
      inset 0 0 10px rgba(255, 255, 255, 0.5);
  }

  h3 {
    color: #1976d2;
    margin-bottom: 10px;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    gap: 8px;

    &::before {
      font-size: 1.2em;
    }
  }

  &:nth-child(1) h3::before {
    content: '🥛';
  }

  &:nth-child(2) h3::before {
    content: '🌾';
  }

  p {
    font-size: 1.5em;
    font-weight: 600;
    color: #2196F3;
  }

  small {
    display: block;
    margin-top: 5px;
    color: #666;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.85);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    inset 0 0 20px rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    z-index: -1;
  }
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
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
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

type FeedType = 'standard' | 'premium' | 'super';

interface FeedState {
  standard: number;
  premium: number;
  super: number;
}

interface FeedValues {
  energy: number;
  milk: number;
}

interface FeedValuesMap {
  standard: FeedValues;
  premium: FeedValues;
  super: FeedValues;
}

function App() {
  const [health, setHealth] = useState(100);
  const [hunger, setHunger] = useState(100);
  const [milk, setMilk] = useState(0);
  const [points, setPoints] = useState(0);
  const [feed, setFeed] = useState<FeedState>({ standard: 5, premium: 0, super: 0 });
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [showMarket, setShowMarket] = useState(false);
  const [showSendPoints, setShowSendPoints] = useState(false);
  const [sentPoints, setSentPoints] = useState(0);
  const [milkProductionRate, setMilkProductionRate] = useState(0);
  const [level, setLevel] = useState(1);

  // Açlık azalması (1 dakikada 0'a düşecek şekilde)
  useEffect(() => {
    const hungerInterval = setInterval(() => {
      setHunger(prev => {
        // 1 dakika = 60 saniye, her saniye 100/60 azalma
        const decrease = 100 / 60;
        return Math.max(0, prev - decrease);
      });
    }, 1000);

    return () => clearInterval(hungerInterval);
  }, []);

  // Sağlık azalması (açlık 0 iken 5 dakikada ölüm)
  useEffect(() => {
    const healthInterval = setInterval(() => {
      if (hunger <= 0) {
        setHealth(prev => {
          // 5 dakika = 300 saniye, her saniye 100/300 azalma
          const decrease = 100 / 300;
          return Math.max(0, prev - decrease);
        });
      }
    }, 1000);

    return () => clearInterval(healthInterval);
  }, [hunger]);

  // Süt üretimi (saatlik hesaplama)
  useEffect(() => {
    const milkInterval = setInterval(() => {
      if (hunger === 100 && health > 0) {
        // Başlangıç üretim hızı: 10 L/saat
        const baseProduction = 10;
        
        // Her dakika üretim hızını %20 artır
        setMilkProductionRate(prev => prev + (baseProduction * 0.2));
        
        // Saniye başına üretim
        const secondlyProduction = milkProductionRate / 3600;
        setMilk(prev => prev + secondlyProduction);
      } else {
        // Açlık 100 değilse üretim hızını sıfırla
        setMilkProductionRate(0);
      }
    }, 1000);

    return () => clearInterval(milkInterval);
  }, [hunger, health, milkProductionRate]);

  const feedCow = (feedType: FeedType = 'standard') => {
    const feedValues: FeedValuesMap = {
      standard: { energy: 25, milk: 0.15 },
      premium: { energy: 35, milk: 0.25 },
      super: { energy: 50, milk: 0.4 }
    };

    if (feed[feedType] > 0 && hunger < 100 && health > 0) {
      setHunger(prev => Math.min(100, prev + feedValues[feedType].energy));
      setFeed(prev => ({ ...prev, [feedType]: prev[feedType] - 1 }));
    }
  };

  const sellMilk = () => {
    if (milk > 0) {
      const earnings = Math.floor(milk * 10);
      setPoints(prev => prev + earnings);
      setTotalEarnings(prev => prev + earnings);
      setMilk(0);
      
      // Satış bildirimi ekle
      const notification = document.createElement('div');
      notification.textContent = `+${earnings} puan kazandınız!`;
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

  const buyFeed = (feedType: FeedType) => {
    const prices: Record<FeedType, number> = {
      standard: 50,
      premium: 100,
      super: 200
    };

    if (points >= prices[feedType]) {
      setFeed(prev => ({ ...prev, [feedType]: prev[feedType] + 1 }));
      setPoints(prev => prev - prices[feedType]);
    }
  };

  const sendPoints = (amount: number) => {
    if (amount > 0 && amount <= points) {
      setPoints(prev => prev - amount);
      setSentPoints(prev => prev + amount);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}s ${minutes}d ${secs}s`;
  };

  return (
    <AppContainer>
      <FarmAnimations />
      <MenuBar 
        points={points}
        sentPoints={sentPoints}
        level={level}
        onMarketClick={() => setShowMarket(true)}
        onSendPointsClick={() => setShowSendPoints(true)}
      />

      <MainContent>
        <GameContainer>
          <Cow health={health} hunger={hunger.toFixed(1)} />
          
          <StatsGrid>
            <StatCard>
              <h3>Süt Üretimi</h3>
              <p>{milk.toFixed(1)} L</p>
              <small>Üretim Hızı: {milkProductionRate.toFixed(1)} L/saat</small>
            </StatCard>
            <StatCard>
              <h3>Yem Stoku</h3>
              <p>
                Standart: {feed.standard}<br />
                Premium: {feed.premium}<br />
                Süper: {feed.super}
              </p>
            </StatCard>
          </StatsGrid>

          <ButtonGroup>
            <Button 
              onClick={() => feedCow('standard')} 
              disabled={feed.standard === 0 || hunger >= 100 || health <= 0}
            >
              Standart Yem ({feed.standard})
            </Button>
            <Button 
              onClick={() => feedCow('premium')} 
              disabled={feed.premium === 0 || hunger >= 100 || health <= 0}
            >
              Premium Yem ({feed.premium})
            </Button>
            <Button 
              onClick={() => feedCow('super')} 
              disabled={feed.super === 0 || hunger >= 100 || health <= 0}
            >
              Süper Yem ({feed.super})
            </Button>
            <Button 
              onClick={sellMilk} 
              disabled={milk === 0 || health <= 0}
            >
              Sütü Sat ({milk.toFixed(1)} L)
            </Button>
          </ButtonGroup>

          {health <= 0 && (
            <p style={{ color: 'red', fontWeight: 'bold', marginTop: '20px' }}>
              ⚠️ İneğiniz öldü! Tüm puanlarınız sıfırlandı.
            </p>
          )}
          {hunger <= 20 && health > 0 && (
            <p style={{ color: 'orange', marginTop: '20px' }}>
              ⚠️ İneğiniz aç! Lütfen yemlemeyi unutmayın.
            </p>
          )}
        </GameContainer>
      </MainContent>

      <Popup 
        isOpen={showMarket} 
        onClose={() => setShowMarket(false)}
        title="Market"
      >
        <Market 
          points={points}
          onBuyFeed={buyFeed}
          onSendPoints={sendPoints}
        />
      </Popup>

      <Popup 
        isOpen={showSendPoints} 
        onClose={() => setShowSendPoints(false)}
        title="Puan Gönder"
      >
        <div style={{ padding: '20px' }}>
          <h3>Gönderilecek puanlar, sadece bu ay için geçerli olur.</h3>
          <p>Mevcut Puanınız: {points}</p>
          <p>Gönderilen Puanlar: {sentPoints}</p>
          <div style={{ marginTop: '20px' }}>
            <input 
              type="number" 
              placeholder="Göndermek istediğiniz puan miktarı"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                marginBottom: '10px'
              }}
              max={points}
              min={1}
            />
            <Button 
              onClick={() => {
                // Puan gönderme işlemi
              }}
              style={{ width: '100%' }}
            >
              Puanları Gönder
            </Button>
          </div>
        </div>
      </Popup>
    </AppContainer>
  );
}

export default App
