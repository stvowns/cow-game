import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { IconType } from 'react-icons';
import { FaCog, FaSpinner } from 'react-icons/fa';
import { BiLoaderAlt } from 'react-icons/bi';
import { CgSpinner } from 'react-icons/cg';
import { ImSpinner2, ImSpinner9 } from 'react-icons/im';
import { VscLoading } from 'react-icons/vsc';

interface StatCardProps {
  title: string;
  value: number;
  unit: string;
  icon: IconType;
  color: string;
  timeLeft?: number;
  style?: React.CSSProperties;
  health?: number;
}

const Card = styled.div`
  background: var(--card-bg);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px var(--shadow-color);
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const Title = styled.div`
  font-size: 1.1em;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Value = styled.div`
  font-size: 1.8em;
  font-weight: bold;
  color: var(--text-primary);
  display: flex;
  align-items: baseline;
  gap: 5px;

  span {
    font-size: 0.6em;
    color: var(--text-secondary);
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressBar = styled.div<{ $color: string; $progress: number }>`
  width: ${props => props.$progress}%;
  height: 100%;
  background: ${props => props.$color};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9em;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
  }
`;

const TooltipTrigger = styled.div`
  position: relative;
  width: 100%;

  &:hover ${Tooltip} {
    opacity: 1;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const spinReverse = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const SpinningIcon = styled.div<{ $isActive: boolean }>`
  margin-left: 8px;
  opacity: 0.7;
  display: flex;
  align-items: center;
  ${props => props.$isActive && css`
    animation: ${spin} 4s linear infinite;
  `}
`;

// Farklı spinner stilleri
const spinnerStyles = [
  { icon: FaCog, reverse: false },
  { icon: FaSpinner, reverse: false },
  { icon: BiLoaderAlt, reverse: true },
  { icon: CgSpinner, reverse: false },
  { icon: ImSpinner2, reverse: true },
  { icon: ImSpinner9, reverse: false },
  { icon: VscLoading, reverse: true }
];

// Rastgele bir spinner seç
const randomSpinner = spinnerStyles[Math.floor(Math.random() * spinnerStyles.length)];

const ValueWithIcon = styled.div`
  display: flex;
  align-items: center;
`;

export const StatCard: React.FC<StatCardProps> = ({ title, value, unit, icon: Icon, color, timeLeft, style, health = 100 }) => {
  const getProgress = () => {
    if (title === 'Açlık' || title === 'Sağlık') {
      return value;
    }
    return 0;
  };

  const showProgressBar = title === 'Açlık' || title === 'Sağlık';
  
  const formatValue = (value: number, unit: string) => {
    if (title === 'Üretim Hızı') {
      const hourlyRate = value * 60;
      return `${hourlyRate.toFixed(1)} ${unit}`;
    }
    return `${value.toFixed(title === 'Süt Üretimi' ? 4 : 1)} ${unit}`;
  };

  const getTooltipText = () => {
    if (title === 'Sağlık' && timeLeft !== undefined) {
      return `${Math.ceil(value * 50.4)} dakika kaldı`;
    }
    if (title === 'Üretim Hızı') {
      return `Günlük Üretim: ${(value * 60 * 24).toFixed(1)} Litre`;
    }
    return '';
  };

  return (
    <Card style={style}>
      <Title>
        <Icon size={24} color={color} />
        {title}
      </Title>
      <TooltipTrigger>
        <Value>
          <ValueWithIcon>
            {formatValue(value, unit)}
            {title === 'Üretim Hızı' && (
              <SpinningIcon $isActive={value > 0.00001 && health > 0}>
                <ImSpinner9 size={20} color={color} />
              </SpinningIcon>
            )}
          </ValueWithIcon>
        </Value>
        {getTooltipText() && <Tooltip>{getTooltipText()}</Tooltip>}
      </TooltipTrigger>
      {showProgressBar && (
        <ProgressBarContainer>
          <ProgressBar 
            $color={title === 'Sağlık' ? '#E91E63' : '#4CAF50'} 
            $progress={getProgress()} 
          />
        </ProgressBarContainer>
      )}
    </Card>
  );
}; 