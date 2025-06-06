import React from 'react';
import styled from 'styled-components';

interface MessageProps {
  text: string;
  isUser: boolean;
  timestamp?: string;
}

const MessageContainer = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  max-width: 100%;
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  background-color: ${props => props.$isUser ? '#2196f3' : '#f5f5f5'};
  color: ${props => props.$isUser ? '#ffffff' : '#333333'};
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  max-width: 80%;
  font-size: var(--font-size-base);
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;

  code {
    font-family: var(--font-family-code);
    font-size: var(--font-size-sm);
    background-color: ${props => props.$isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    padding: 0.2em 0.4em;
    border-radius: 0.3em;
  }
`;

const Avatar = styled.div<{ $isUser: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${props => props.$isUser ? '#1976d2' : '#10a37f'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Timestamp = styled.span`
  font-size: var(--font-size-xs);
  color: #666;
  margin-top: 0.25rem;
`;

const Message: React.FC<MessageProps> = ({ text, isUser, timestamp }) => {
  return (
    <MessageContainer $isUser={isUser}>
      <Avatar $isUser={isUser}>
        {isUser ? 'U' : 'A'}
      </Avatar>
      <MessageBubble $isUser={isUser}>
        {text}
      </MessageBubble>
      {timestamp && <Timestamp>{timestamp}</Timestamp>}
    </MessageContainer>
  );
};

export default Message; 