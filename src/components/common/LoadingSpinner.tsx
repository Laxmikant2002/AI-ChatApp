import React from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { Theme } from '../../styles/theme';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const SpinnerContainer = styled.div<{
  $size: number;
  $color: string;
  $thickness: number;
}>`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  position: relative;
  display: inline-block;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::before {
    border: ${props => props.$thickness}px solid ${props => props.$color}20;
  }

  &::after {
    border: ${props => props.$thickness}px solid transparent;
    border-top-color: ${props => props.$color};
    animation: ${spin} 0.8s ease infinite;
  }
`;

const ShimmerContainer = styled.div<{ $size: number }>`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.background.secondary} 25%,
    ${({ theme }) => theme.background.tertiary} 50%,
    ${({ theme }) => theme.background.secondary} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  color,
  thickness = 2
}) => {
  const theme = useTheme() as Theme;
  const spinnerColor = color || theme.text.accent;

  return (
    <SpinnerContainer
      $size={size}
      $color={spinnerColor}
      $thickness={thickness}
    >
      <ShimmerContainer $size={size} />
    </SpinnerContainer>
  );
};

export default LoadingSpinner; 