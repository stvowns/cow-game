import styled from 'styled-components';

interface CowProps {
  health: number;
  hunger: number;
  timeLeft: number;
  hasEverFed: boolean;
  milkProductionRate: number;
}

interface StyledProps {
  $health: number;
  $milkProductionRate: number;
  $hasEverFed: boolean;
  $hunger: number;
}

const CowContainer = styled.div<StyledProps>`
  text-align: center;
  margin: 20px 0;
  opacity: ${props => props.$health > 0 ? 1 : 0.5};
  transition: opacity 0.3s ease;
`;

const CowImage = styled.img<StyledProps & { $hasEverFed: boolean }>`
  width: 300px;
  height: 300px;
  object-fit: contain;
  border-radius: 10px;
  filter: ${props => props.$health <= 0 ? 'grayscale(100%)' : 'none'};
  animation: ${props => {
    if (!props.$hasEverFed || props.$health <= 0) return 'none';
    if (props.$hunger <= 0) return 'none';
    return 'breathe 4s ease-in-out infinite';
  }};
  transition: filter 0.3s ease;

  @keyframes breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
`;

export function Cow({ health, hunger, timeLeft, hasEverFed, milkProductionRate }: CowProps) {
  return (
    <CowContainer $health={health} $milkProductionRate={milkProductionRate} $hasEverFed={hasEverFed} $hunger={hunger}>
      <CowImage 
        src="/happy-cow.png" 
        alt="İnek" 
        $health={health} 
        $milkProductionRate={milkProductionRate}
        $hasEverFed={hasEverFed}
        $hunger={hunger}
      />
      
      {/* Sadece başlangıç uyarısı */}
      {!hasEverFed && health > 0 && milkProductionRate === 0 && (
        <div style={{ 
          color: '#ff6b6b', 
          background: 'rgba(255, 107, 107, 0.1)', 
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px',
          textAlign: 'center'
        }}>
          ⚠️ Yem kullanarak süt üretimini başlatın!
        </div>
      )}
    </CowContainer>
  );
} 