import styled from 'styled-components';
import { IconType } from 'react-icons';

export interface MenuBarProps {
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

const MenuContainer = styled.div`
  background: var(--card-bg);
  padding: 15px 20px;
  border-radius: 15px;
  box-shadow: 0 2px 4px var(--shadow-color);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 1200px;
`;

const MenuContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const MenuItems = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  padding: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-secondary);
  transition: all 0.3s;
  min-width: 80px;
  gap: 8px;

  svg {
    font-size: 2em;
  }

  &:hover {
    color: var(--accent-primary);
    transform: translateY(-2px);
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 15px 0 0;
  border-top: 1px solid var(--border-color);
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  font-weight: 500;
  padding: 5px 15px;
  border-radius: 20px;
  background: var(--bg-secondary);
  box-shadow: 0 2px 4px var(--shadow-color);

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

export function MenuBar({ 
  points, 
  sentPoints, 
  level, 
  onMarketClick, 
  onSendPointsClick,
  onHelpClick,
  onLogsClick,
  onLeaderboardClick,
  onProfileClick,
  onReferralClick,
  onLevelClick,
  isDarkMode,
  onThemeToggle,
  icons
}: MenuBarProps) {
  return (
    <MenuContainer>
      <MenuItems>
        <MenuItem onClick={onMarketClick}>
          <icons.market size={32} /> Market
        </MenuItem>
        <MenuItem onClick={onSendPointsClick}>
          <icons.points size={32} /> Puan Gönder
        </MenuItem>
        <MenuItem onClick={onHelpClick}>
          <icons.help size={32} /> Nasıl Oynanır?
        </MenuItem>
        <MenuItem onClick={onLogsClick}>
          <icons.logs size={32} /> İşlem Kayıtları
        </MenuItem>
        <MenuItem onClick={onLeaderboardClick}>
          <icons.leaderboard size={32} /> Sıralama
        </MenuItem>
        <MenuItem onClick={onProfileClick}>
          <icons.profile size={32} /> Profil
        </MenuItem>
        <MenuItem onClick={onReferralClick}>
          <icons.referral size={32} /> Referanslar
        </MenuItem>
        <MenuItem onClick={onThemeToggle}>
          <icons.darkMode size={32} /> {isDarkMode ? 'Açık Mod' : 'Koyu Mod'}
        </MenuItem>
      </MenuItems>
      <Stats>
        <StatItem>Puanlar: {points}</StatItem>
        <StatItem>Gönderilen: {sentPoints}</StatItem>
        <StatItem onClick={onLevelClick} style={{ cursor: 'pointer' }}>Seviye: {level}</StatItem>
      </Stats>
    </MenuContainer>
  );
} 