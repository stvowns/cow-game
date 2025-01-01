import styled from 'styled-components';

interface CowProps {
  health: number;
  hunger: string;
  timeLeft: number;
  hasFeed: boolean;
  milkProductionRate: number;
}

const CowContainer = styled.div<{ isAlive: boolean; isProducing: boolean }>`
  text-align: center;
  margin: 20px 0;
  animation: ${props => props.isProducing ? 'breathe 3s infinite ease-in-out' : 'none'};
  filter: ${props => !props.isAlive ? 'grayscale(100%)' : 'none'};
  transform-origin: center center;

  @keyframes breathe {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;

const CowImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
`;

const ProgressBar = styled.div<{ value: number; color: string }>`
  width: 80%;
  height: 20px;
  background: var(--bg-primary);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin: 20px auto 40px auto;

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

const ProgressLabel = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  font-size: 0.9em;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

export function Cow({ health, hunger, timeLeft, hasFeed, milkProductionRate }: CowProps) {
  const isAlive = health > 0;
  const isProducing = health > 0 && Number(hunger) > 0 && milkProductionRate > 0;
  const hungerValue = Number(hunger);
  
  return (
    <div>
      <CowContainer isAlive={isAlive} isProducing={isProducing}>
        <CowImage src="/happy-cow.png" alt="İnek" />
      </CowContainer>
      <ProgressBar value={hungerValue} color="#2196F3">
        <ProgressLabel>Açlık: %{hungerValue.toFixed(1)}</ProgressLabel>
      </ProgressBar>
      {health > 0 && hungerValue > 0 && milkProductionRate === 0 && (
        <div style={{ 
          color: '#ff6b6b', 
          textAlign: 'center', 
          marginTop: '10px',
          padding: '8px',
          background: 'rgba(255, 107, 107, 0.1)',
          borderRadius: '8px',
          fontSize: '0.9em'
        }}>
          ⚠️ Yem kullanarak süt üretimini başlatın!
        </div>
      )}
    </div>
  );
} 