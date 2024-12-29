import styled from 'styled-components';

interface CowProps {
  health: number;
  hunger: number | string;
}

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
  align-items: center;
`;

const ProgressBar = styled.div<{ value: number; isHealth?: boolean }>`
  width: 300px;
  height: 24px;
  background: #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #ccc;

  &::after {
    content: '';
    display: block;
    width: ${props => props.value}%;
    height: 100%;
    background: ${props => props.isHealth ? '#4CAF50' : '#2196F3'};
    transition: width 0.3s ease;
  }
`;

const StatusLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  font-weight: 500;
`;

const CowImage = styled.img`
  width: 300px;
  height: 300px;
  margin: 20px 0;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  animation: float 6s ease-in-out infinite;
  transform-origin: center center;

  @keyframes float {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    25% {
      transform: translateY(-5px) rotate(1deg);
    }
    50% {
      transform: translateY(0px) rotate(0deg);
    }
    75% {
      transform: translateY(-5px) rotate(-1deg);
    }
    100% {
      transform: translateY(0px) rotate(0deg);
    }
  }
`;

const CowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: linear-gradient(transparent, rgba(144, 238, 144, 0.2));
    border-radius: 0 0 15px 15px;
  }
`;

export function Cow({ health, hunger }: CowProps) {
  const hungerValue = typeof hunger === 'string' ? parseFloat(hunger) : hunger;
  
  return (
    <CowContainer>
      <CowImage src="/happy-cow.png" alt="Mutlu İnek" />
      <StatusContainer>
        <div>
          <StatusLabel>
            <span>Sağlık:</span>
            <span>{health}%</span>
          </StatusLabel>
          <ProgressBar value={health} isHealth />
        </div>
        <div>
          <StatusLabel>
            <span>Açlık:</span>
            <span>{hunger}%</span>
          </StatusLabel>
          <ProgressBar value={hungerValue} />
        </div>
      </StatusContainer>
    </CowContainer>
  );
} 