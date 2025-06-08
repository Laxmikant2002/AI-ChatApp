import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useChat } from '../../context/ChatContext';
import { Chat } from '../../types';

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  width: 260px;
  height: 100vh;
  background-color: ${({ theme }) => theme.background.primary};
  border-right: 1px solid ${({ theme }) => theme.border.primary};
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
    box-shadow: ${props => props.$isOpen ? `2px 0 8px ${props.theme.shadow.medium}` : 'none'};
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.border.primary};
    border-radius: 3px;
  }
`;

const NewChatButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.button.primary};
  color: ${({ theme }) => theme.text.primary};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  width: calc(100% - 2rem);
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.button.primaryHover};
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
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.background.secondary}08;
  border-radius: 0.5rem;
  margin: 0.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text.secondary};
  text-transform: uppercase;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.border.primary};
  }
`;

const ChatItem = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background-color: ${props => props.$isActive ? props.theme.background.secondary : 'transparent'};
  border: 1px solid ${props => props.$isActive ? props.theme.border.primary : 'transparent'};
  border-radius: 0.5rem;
  cursor: pointer;
  text-align: left;
  color: ${({ theme }) => theme.text.primary};
  font-size: 0.875rem;
  width: 100%;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
    border-color: ${({ theme }) => theme.border.primary};
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    height: ${props => props.$isActive ? '70%' : '0'};
    width: 3px;
    background-color: ${({ theme }) => theme.button.primary};
    transition: height 0.2s ease;
    transform: translateY(-50%);
  }

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.text.secondary};
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.1);
    color: ${({ theme }) => theme.text.primary};
  }

  .chat-title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chat-meta {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.text.tertiary};
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.border.primary};
  margin: 0.5rem 0;
`;

const SettingsButton = styled(ChatItem)`
  color: ${({ theme }) => theme.text.secondary};
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
    background-color: ${({ theme }) => `${theme.background.primary}80`};
    opacity: ${props => props.$isVisible ? 1 : 0};
    visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 99;
  }
`;

const SearchContainer = styled.div`
  padding: 0.5rem 1rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem;
  background-color: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.primary};
  border-radius: var(--radius-lg);
  color: ${({ theme }) => theme.text.primary};
  font-size: var(--font-size-sm);
  transition: all ${({ theme }) => theme.animations.transition.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.text.accent};
    box-shadow: ${({ theme }) => theme.shadow.medium};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.tertiary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const NoResults = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
  font-size: var(--font-size-sm);
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
    toggleDarkMode,
    searchChats 
  } = useChat();

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredChats = useMemo(() => {
    return searchChats(debouncedQuery);
  }, [searchChats, debouncedQuery]);

  const pinnedChats = useMemo(() => {
    return filteredChats.filter(chat => chat.isPinned);
  }, [filteredChats]);

  const recentChats = useMemo(() => {
    return filteredChats.filter(chat => !chat.isPinned);
  }, [filteredChats]);

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

        <SearchContainer>
          <SearchIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        {filteredChats.length === 0 ? (
          <NoResults>No chats found</NoResults>
        ) : (
          <>
            {pinnedChats.length > 0 && (
              <Section>
                <SectionTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <path d="M12 2L19 9V21H5V9L12 2Z" />
                  </svg>
                  Pinned Chats
                </SectionTitle>
                {pinnedChats.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    $isActive={activeChat === chat.id}
                    onClick={() => handleChatClick(chat.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="chat-title">{chat.title}</span>
                    <span className="chat-meta">
                      {new Date(chat.createdAt).toLocaleDateString()}
                    </span>
                  </ChatItem>
                ))}
              </Section>
            )}

            {recentChats.length > 0 && (
              <Section>
                <SectionTitle>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Recent Chats
                </SectionTitle>
                {recentChats.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    $isActive={activeChat === chat.id}
                    onClick={() => handleChatClick(chat.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="chat-title">{chat.title}</span>
                    <span className="chat-meta">
                      {new Date(chat.createdAt).toLocaleDateString()}
                    </span>
                  </ChatItem>
                ))}
              </Section>
            )}
          </>
        )}

        <div style={{ flex: 1 }} />

        <Divider />

        <Section>
          <SectionTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            Settings
          </SectionTitle>
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