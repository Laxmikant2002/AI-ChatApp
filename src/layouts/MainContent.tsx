import React from 'react';
import styled from 'styled-components';
import ChatInterface from '../pages/chat/ChatInterface';

const MainContentContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
`;

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 101;
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #6e6e80;
  transition: color 0.2s ease;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: #2196f3;
  }
`;

interface MainContentProps {
  toggleMobileMenu: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ toggleMobileMenu }) => {
  return (
    <MainContentContainer>
      <MobileMenuButton onClick={toggleMobileMenu} aria-label="Toggle menu">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </MobileMenuButton>
      <ChatInterface />
    </MainContentContainer>
  );
};

export default MainContent; 