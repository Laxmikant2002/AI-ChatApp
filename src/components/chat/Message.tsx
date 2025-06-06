import React from 'react';
import styled from 'styled-components';
import AnimatedTransition from '../common/AnimatedTransition';
import FilePreview from './FilePreview';
import { FileWithPreview } from '../../utils/fileUpload';

interface MessageProps {
  message: {
    text: string;
    isUser: boolean;
    timestamp?: Date;
    type?: 'message' | 'error' | 'system';
    file?: FileWithPreview;
  };
  isLoading?: boolean;
}

const MessageContainer = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  max-width: 100%;
  gap: 0.25rem;
`;

const MessageContent = styled.div<{ $isUser: boolean }>`
  background-color: ${props => props.$isUser ? props.theme.chat.userBubble : props.theme.chat.assistantBubble};
  color: ${props => props.$isUser ? props.theme.chat.userText : props.theme.chat.assistantText};
  padding: 1rem;
  border-radius: 1rem;
  max-width: 70%;
  word-wrap: break-word;
  box-shadow: ${({ theme }) => theme.shadow.light};

  code {
    background-color: ${props => props.$isUser ? 'rgba(255, 255, 255, 0.1)' : props.theme.background.secondary};
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-family: monospace;
  }
`;

const TimeStamp = styled.span<{ $isUser: boolean }>`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text.secondary};
  margin-top: 0.25rem;
`;

const Message: React.FC<MessageProps> = ({ message, isLoading }) => {
  return (
    <AnimatedTransition>
      <MessageContainer $isUser={message.isUser}>
        <MessageContent $isUser={message.isUser}>
          {message.text}
          {message.file && <FilePreview file={message.file} isUser={message.isUser} />}
        </MessageContent>
        {message.timestamp && (
          <TimeStamp $isUser={message.isUser}>
            {message.timestamp.toLocaleString()}
          </TimeStamp>
        )}
      </MessageContainer>
    </AnimatedTransition>
  );
};

export default Message;