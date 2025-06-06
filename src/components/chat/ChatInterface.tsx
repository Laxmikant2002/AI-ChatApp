import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useChat } from '../../context/ChatContext';
import StartScreen from './StartScreen';
import Message from './Message';
import ChatInput from './ChatInput';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  padding-bottom: 80px;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  scroll-behavior: smooth;
  min-height: 60vh;
  display: flex;
  flex-direction: column;

  &:empty {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-base);
    color: #666;
    &::after {
      content: 'No messages yet';
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const MessageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 1rem;

  > * + * {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -1rem;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(0,0,0,0.05), transparent);
    }
  }
`;

const InputWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 0));
  padding: 1.5rem;
  z-index: 10;
  border-top: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 -4px 12px rgba(0,0,0,0.05);
`;

const ScrollButton = styled.button<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2196f3;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: ${props => props.$isVisible ? 1 : 0};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.25);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.35);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    bottom: 80px;
    right: 16px;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: var(--font-size-sm);
  padding: 0.5rem;
  
  &::after {
    content: '';
    width: 12px;
    height: 12px;
    border: 2px solid #666;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ChatInterface: React.FC = () => {
  const { activeChat, chats, addMessage } = useChat();
  const messageListRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (messageListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat]);

  useEffect(() => {
    const currentChat = chats.find(chat => chat.id === activeChat);
    if (currentChat?.messages.length) {
      scrollToBottom();
    }
  }, [chats, activeChat]);

  const handleSendMessage = (text: string) => {
    if (activeChat) {
      setIsLoading(true);
      addMessage(activeChat, {
        text,
        isUser: true,
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file);
    // Handle file upload logic here
  };

  const formatTimestamp = (timestamp: Date): string => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  if (!activeChat) {
    return <StartScreen />;
  }

  const currentChat = chats.find(chat => chat.id === activeChat);

  return (
    <ChatContainer>
      <MessageList ref={messageListRef} onScroll={handleScroll}>
        <MessageWrapper>
          {currentChat?.messages.map(message => (
            <Message 
              key={message.id}
              text={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp ? formatTimestamp(message.timestamp) : undefined}
            />
          ))}
          {isLoading && <LoadingIndicator>ChatGPT is thinking...</LoadingIndicator>}
        </MessageWrapper>
      </MessageList>
      <ScrollButton 
        $isVisible={showScrollButton}
        onClick={scrollToBottom}
        title="Scroll to bottom"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </ScrollButton>
      <InputWrapper>
        <ChatInput 
          onSend={handleSendMessage}
          onFileUpload={handleFileUpload}
        />
      </InputWrapper>
    </ChatContainer>
  );
};

export default ChatInterface; 