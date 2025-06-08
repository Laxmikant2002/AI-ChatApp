import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useChat } from '../../context/ChatContext';
import Message from '../../components/chat/Message';
import ChatInput from '../../components/chat/ChatInput';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.background.primary};
  position: relative;
  overflow: hidden;
  padding-bottom: 80px;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  scroll-behavior: smooth;

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

const MessageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, ${({ theme }) => theme.background.primary} 50%, ${({ theme }) => theme.background.primary}00);
  padding: 1rem;
  z-index: 10;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const ChatInterface: React.FC = () => {
  const { activeChat, chats, addMessage } = useChat();
  const messageListRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat, chats]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      if (activeChat) {
        addMessage(activeChat, {
          text,
          isUser: true,
        });
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (activeChat) {
        addMessage(activeChat, {
          text: `File uploaded: ${file.name}`,
          isUser: true,
        });
      }
    } catch (err) {
      setError('Failed to upload file. Please try again.');
      console.error('Error uploading file:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const currentChat = chats.find(chat => chat.id === activeChat) || {
    messages: []
  };

  return (
    <ChatContainer>
      <MessageList ref={messageListRef}>
        <MessageWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {currentChat.messages.map(message => (
            <Message 
              key={message.id}
              message={{
                text: message.text,
                isUser: message.isUser,
                timestamp: message.timestamp ? new Date(message.timestamp) : undefined
              }}
            />
          ))}
        </MessageWrapper>
      </MessageList>
      <InputWrapper>
        <ChatInput 
          onSend={handleSendMessage}
          onFileUpload={handleFileUpload}
          disabled={isLoading}
          placeholder={activeChat ? "Type your message..." : "Select a chat to start messaging"}
        />
      </InputWrapper>
    </ChatContainer>
  );
};

export default ChatInterface;