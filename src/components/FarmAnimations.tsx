import styled, { keyframes } from 'styled-components';

const AnimationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
`;

const floatCloud = keyframes`
  0% {
    transform: translate(-100px, 0);
  }
  50% {
    transform: translate(calc(50vw - 50px), -20px);
  }
  100% {
    transform: translate(calc(100vw + 100px), 0);
  }
`;

const floatCloudAlt = keyframes`
  0% {
    transform: translate(-100px, 0);
  }
  50% {
    transform: translate(calc(50vw - 50px), 20px);
  }
  100% {
    transform: translate(calc(100vw + 100px), 0);
  }
`;

const Bee = styled.div`
  position: absolute;
  font-size: 24px;
  animation: float 10s infinite ease-in-out;
  z-index: -1;

  @keyframes float {
    0%, 100% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(20px, -20px);
    }
  }

  &::after {
    content: '🐝';
  }
`;

const Butterfly = styled.div`
  position: absolute;
  font-size: 24px;
  animation: flutter 15s infinite ease-in-out;
  z-index: -1;

  @keyframes flutter {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(30px, -20px) rotate(10deg);
    }
    75% {
      transform: translate(-30px, 20px) rotate(-10deg);
    }
  }

  &::after {
    content: '🦋';
  }
`;

const Cloud = styled.div<{ duration: number; isAlt?: boolean }>`
  position: absolute;
  font-size: 40px;
  animation: ${props => props.isAlt ? floatCloudAlt : floatCloud} ${props => props.duration}s linear infinite;
  opacity: 0.6;
  z-index: -1;

  &::after {
    content: '☁️';
  }
`;

export function FarmAnimations() {
  return (
    <AnimationContainer>
      <Bee style={{ top: '15%', left: '10%' }} />
      <Bee style={{ top: '25%', right: '15%' }} />
      <Butterfly style={{ top: '20%', left: '30%' }} />
      <Butterfly style={{ top: '30%', right: '25%' }} />
      
      {/* Yavaş hareket eden bulutlar */}
      <Cloud duration={60} style={{ top: '5%', animationDelay: '0s' }} />
      <Cloud duration={75} isAlt style={{ top: '25%', animationDelay: '-15s' }} />
      <Cloud duration={90} style={{ top: '45%', animationDelay: '-30s' }} />
      <Cloud duration={70} isAlt style={{ top: '65%', animationDelay: '-45s' }} />
      <Cloud duration={80} style={{ top: '85%', animationDelay: '-60s' }} />
    </AnimationContainer>
  );
} 