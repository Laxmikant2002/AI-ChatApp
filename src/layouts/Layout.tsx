import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #ffffff;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <MainSection>
        <MainContent toggleMobileMenu={toggleMobileMenu} />
      </MainSection>
    </LayoutContainer>
  );
};

export default Layout; 