import React from 'react';
import styled, { keyframes } from 'styled-components';

type AnimationType = 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleIn';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  type?: AnimationType;
  duration?: number;
  delay?: number;
}

const getAnimation = (type: AnimationType) => {
  switch (type) {
    case 'fadeIn':
      return keyframes`
        from { opacity: 0; }
        to { opacity: 1; }
      `;
    case 'slideUp':
      return keyframes`
        from { transform: translateY(10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      `;
    case 'slideDown':
      return keyframes`
        from { transform: translateY(-10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      `;
    case 'scaleIn':
      return keyframes`
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      `;
    default:
      return keyframes`
        from { opacity: 0; }
        to { opacity: 1; }
      `;
  }
};

const AnimatedContainer = styled.div<{
  $type: AnimationType;
  $duration: number;
  $delay: number;
}>`
  animation: ${props => getAnimation(props.$type)} ${props => props.$duration}s ease-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.$delay}s;
`;

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  type = 'fadeIn',
  duration = 0.3,
  delay = 0
}) => {
  return (
    <AnimatedContainer
      $type={type}
      $duration={duration}
      $delay={delay}
    >
      {children}
    </AnimatedContainer>
  );
};

export default AnimatedTransition; 