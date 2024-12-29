import styled from 'styled-components';

interface MenuBarProps {
  points: number;
  sentPoints: number;
  level: number;
  onMarketClick: () => void;
  onSendPointsClick: () => void;
}

const MenuContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 10px 20px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuItems = styled.div`
  display: flex;
  gap: 15px;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
  transition: all 0.3s;

  &:hover {
    color: #2196F3;
    transform: translateY(-2px);
  }

  span {
    font-size: 0.8em;
    margin-top: 4px;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #1976d2;
  font-weight: 500;

  &::before {
    font-size: 1.2em;
  }

  &:nth-child(1)::before {
    content: '💰';
  }

  &:nth-child(2)::before {
    content: '⭐';
  }

  &:nth-child(3)::before {
    content: '📈';
  }
`;

export function MenuBar({ points, sentPoints, level, onMarketClick, onSendPointsClick }: MenuBarProps) {
  return (
    <MenuContainer>
      <MenuItems>
        <MenuItem onClick={() => {}}>
          <span>👨‍🌾</span>
          <span>Profil</span>
        </MenuItem>
        <MenuItem onClick={onMarketClick}>
          <span>🏪</span>
          <span>Market</span>
        </MenuItem>
        <MenuItem onClick={onSendPointsClick}>
          <span>📤</span>
          <span>Puan Gönder</span>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <span>⚙️</span>
          <span>Ayarlar</span>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <span>❓</span>
          <span>Yardım</span>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <span>🔔</span>
          <span>Bildirimler</span>
        </MenuItem>
      </MenuItems>

      <Stats>
        <StatItem>{points} Puan</StatItem>
        <StatItem>Seviye {level}</StatItem>
        <StatItem>{sentPoints} Gönderilen</StatItem>
      </Stats>
    </MenuContainer>
  );
} 