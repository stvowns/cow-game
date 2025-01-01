import styled from 'styled-components';
import { useEffect } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 860px;
  height: 796px;
  background: var(--bg-secondary);
  border-radius: 15px;
  box-shadow: 0 4px 20px var(--shadow-color);
  z-index: 1000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const PopupContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 40px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--bg-primary);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #666;
  transition: color 0.3s;

  &:hover {
    color: #ff4444;
  }
`;

const Title = styled.h2`
  margin: 0;
  color: var(--text-primary);
  padding: 30px 40px 0;
  font-size: 1.5em;
`;

export function Popup({ isOpen, onClose, title, children }: PopupProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <PopupContainer onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{title}</Title>
        <PopupContent>
          {children}
        </PopupContent>
      </PopupContainer>
    </Overlay>
  );
} 