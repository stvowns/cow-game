import styled, { keyframes } from 'styled-components';

const fly = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(20px, -20px) rotate(10deg) scale(1.1);
  }
  50% {
    transform: translate(40px, 0) rotate(0deg) scale(1);
  }
  75% {
    transform: translate(20px, 20px) rotate(-10deg) scale(0.9);
  }
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-30px) scale(1.1);
  }
`;

const shine = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
`;

const Bee = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  animation: ${fly} 8s infinite ease-in-out;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));

  &::before {
    content: '🐝';
    position: absolute;
    font-size: 30px;
    transform: translate(-50%, -50%);
  }
`;

const Cloud = styled.div`
  position: absolute;
  width: 120px;
  height: 60px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.8)
  );
  border-radius: 30px;
  animation: ${float} 15s infinite ease-in-out;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  opacity: 0.9;
  background-size: 200% 100%;
  animation: ${float} 15s infinite ease-in-out, ${shine} 10s infinite linear;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: inherit;
    border-radius: 50%;
  }

  &::before {
    width: 70px;
    height: 70px;
    top: -30px;
    left: 20px;
  }

  &::after {
    width: 50px;
    height: 50px;
    top: -20px;
    right: 20px;
  }
`;

const Butterfly = styled.div`
  position: absolute;
  animation: ${fly} 12s infinite ease-in-out;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  z-index: 3;

  &::before {
    content: '🦋';
    font-size: 35px;
  }
`;

const Flower = styled.div`
  position: absolute;
  bottom: -10px;
  animation: ${float} 5s infinite ease-in-out;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));

  &::before {
    content: '🌸';
    font-size: 25px;
  }
`;

export function FarmAnimations() {
  return (
    <Container>
      <Bee style={{ top: '15%', left: '10%', animationDelay: '0s' }} />
      <Bee style={{ top: '25%', right: '15%', animationDelay: '-2s' }} />
      <Bee style={{ top: '60%', left: '20%', animationDelay: '-4s' }} />
      
      <Cloud style={{ top: '10%', left: '5%', animationDelay: '0s' }} />
      <Cloud style={{ top: '20%', right: '10%', animationDelay: '-7s' }} />
      <Cloud style={{ top: '15%', left: '40%', animationDelay: '-4s' }} />
      
      <Butterfly style={{ top: '30%', right: '25%', animationDelay: '-2s' }} />
      <Butterfly style={{ top: '50%', left: '15%', animationDelay: '-6s' }} />
      <Butterfly style={{ top: '40%', right: '40%', animationDelay: '-4s' }} />
      
      <Flower style={{ left: '5%', animationDelay: '0s' }} />
      <Flower style={{ left: '15%', animationDelay: '-2s' }} />
      <Flower style={{ right: '10%', animationDelay: '-1s' }} />
      <Flower style={{ right: '20%', animationDelay: '-3s' }} />
      <Flower style={{ left: '40%', animationDelay: '-2s' }} />
      <Flower style={{ right: '35%', animationDelay: '-4s' }} />
    </Container>
  );
} 