import React from 'react';
import styled from 'styled-components';
import { useChat } from '../../context/ChatContext';

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.border.primary};
  height: 60px;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text.primary};
  font-weight: 600;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
    color: ${({ theme }) => theme.button.primary};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Navigation: React.FC = () => {
  const { activeChat, chats, clearChats } = useChat();

  const currentChat = chats.find(chat => chat.id === activeChat);

  return (
    <NavContainer>
      <Title>
        {currentChat?.title || 'New Chat'}
      </Title>
      <Actions>
        <ActionButton
          onClick={clearChats}
          title="Clear conversations"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </ActionButton>
      </Actions>
    </NavContainer>
  );
};

export default Navigation; 