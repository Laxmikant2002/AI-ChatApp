import React from 'react';
import styled from 'styled-components';
import { useChat } from '../../context/ChatContext';
import { Chat } from '../../types';

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  width: 260px;
  height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #e5e5e5;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
    box-shadow: ${props => props.$isOpen ? '2px 0 8px rgba(0, 0, 0, 0.1)' : 'none'};
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
`;

const NewChatButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem;
  padding: 0.75rem 1rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  width: calc(100% - 2rem);
  transition: all 0.2s ease;

  &:hover {
    background-color: #1976d2;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  letter-spacing: 0.5px;
`;

const ChatItem = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: ${props => props.$isActive ? '#f0f0f0' : 'transparent'};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  text-align: left;
  color: #353740;
  font-size: 0.875rem;
  width: 100%;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #f5f5f5;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    height: 0;
    width: 3px;
    background-color: #2196f3;
    transition: height 0.2s ease;
    transform: translateY(-50%);
  }

  ${props => props.$isActive && `
    &::before {
      height: 70%;
    }
  `}

  svg {
    width: 16px;
    height: 16px;
    color: #6e6e80;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #e5e5e5;
  margin: 0.5rem 0;
`;

const SettingsButton = styled(ChatItem)`
  color: #6e6e80;
`;

const MobileOverlay = styled.div<{ $isVisible: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: ${props => props.$isVisible ? 1 : 0};
    visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 99;
  }
`;

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { 
    chats, 
    activeChat, 
    setActiveChat, 
    addChat, 
    clearChats,
    isDarkMode,
    toggleDarkMode 
  } = useChat();

  const handleChatClick = (chatId: string) => {
    setActiveChat(chatId);
    onClose();
  };

  return (
    <>
      <MobileOverlay 
        $isVisible={isOpen} 
        onClick={onClose}
      />
      <SidebarContainer $isOpen={isOpen}>
        <NewChatButton onClick={addChat}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New chat
        </NewChatButton>

        <Section>
          <SectionTitle>Pinned Chats</SectionTitle>
          {chats.filter((chat: Chat) => chat.isPinned).map((chat: Chat) => (
            <ChatItem
              key={chat.id}
              $isActive={activeChat === chat.id}
              onClick={() => handleChatClick(chat.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {chat.title}
            </ChatItem>
          ))}
        </Section>

        <Section>
          <SectionTitle>Recent Chats</SectionTitle>
          {chats.filter((chat: Chat) => !chat.isPinned).map((chat: Chat) => (
            <ChatItem
              key={chat.id}
              $isActive={activeChat === chat.id}
              onClick={() => handleChatClick(chat.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {chat.title}
            </ChatItem>
          ))}
        </Section>

        <div style={{ flex: 1 }} />

        <Divider />

        <Section>
          <SettingsButton onClick={clearChats}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear conversations
          </SettingsButton>
          <SettingsButton onClick={toggleDarkMode}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42" />
            </svg>
            {isDarkMode ? 'Light mode' : 'Dark mode'}
          </SettingsButton>
          <SettingsButton as="a" href="/faq" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4m0-4h.01" />
            </svg>
            Updates & FAQ
          </SettingsButton>
        </Section>
      </SidebarContainer>
    </>
  );
};

export default Sidebar; 