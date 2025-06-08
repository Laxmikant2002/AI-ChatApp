import React, { useRef, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { useChat } from '../../context/ChatContext';
import websocketService from '../../services/websocket';
import Message from './Message';
import ChatInput from './ChatInput';
import AnimatedTransition from '../common/AnimatedTransition';
import { uploadFile, getFilePreview, FileUploadError } from '../../utils/fileUpload';

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
  min-height: 60vh;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background.secondary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.border.primary};
    border-radius: 4px;
    
    &:hover {
      background-color: ${({ theme }) => theme.border.secondary};
    }
  }
`;

const ErrorMessage = styled.div`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #dc3545;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadow.medium};
  z-index: 1000;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  padding: 0 0.25rem;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
`;

const WelcomeTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text.primary};
`;

const WelcomeText = styled.p`
  font-size: 1rem;
  max-width: 500px;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const WelcomeIcon = styled.div`
  margin-bottom: 2rem;
  svg {
    width: 64px;
    height: 64px;
    color: ${({ theme }) => theme.text.secondary};
  }
`;

const ChatInterface: React.FC = () => {
  const { chats, activeChat, addMessage } = useChat();
  const [isLoading, setIsLoading] = useState(false);
  const messageListRef = useRef<HTMLDivElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const activeMessages = useMemo(() => {
    return activeChat
      ? chats.find(chat => chat.id === activeChat)?.messages || []
      : [];
  }, [activeChat, chats]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [activeMessages]);

  useEffect(() => {
    // Connect to WebSocket when component mounts
    websocketService.connect();

    return () => {
      websocketService.disconnect();
    };
  }, []);

  const handleSend = async (text: string) => {
    if (!activeChat) return;

    try {
      setIsLoading(true);
      addMessage(activeChat, {
        text,
        isUser: true,
        type: 'message'
      });
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage(activeChat, {
        text: 'Error sending message. Please try again.',
        isUser: false,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!activeChat) return;

    try {
      setIsLoading(true);
      setUploadError(null);

      const uploadedFile = await uploadFile(file);
      const filePreview = await getFilePreview(file);

      addMessage(activeChat, {
        text: `Uploaded file: ${file.name}`,
        isUser: true,
        type: 'message'
      });

      // Send file info through WebSocket
      websocketService.send({
        type: 'file',
        data: {
          fileName: file.name,
          fileType: file.type,
          fileData: filePreview
        }
      });

    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError(
        error instanceof FileUploadError
          ? error.message
          : 'Error uploading file. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ChatContainer>
      <MessageList ref={messageListRef}>
        <AnimatedTransition>
          {!activeChat ? (
            <WelcomeContainer>
              <WelcomeIcon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
              </WelcomeIcon>
              <WelcomeTitle>Welcome to AI Chat</WelcomeTitle>
              <WelcomeText>
                Select a chat from the sidebar to start messaging or create a new chat to begin a conversation.
                You can ask questions, get assistance, or explore various topics with AI.
              </WelcomeText>
            </WelcomeContainer>
          ) : (
            activeMessages.map(message => (
              <Message
                key={message.id}
                message={message}
                isLoading={isLoading && message.isUser}
              />
            ))
          )}
          {isLoading && activeChat && (
            <Message
              key="loading"
              message={{
                text: '',
                isUser: false,
                timestamp: new Date(),
                type: 'message'
              }}
              isLoading
            />
          )}
        </AnimatedTransition>
      </MessageList>
      {uploadError && (
        <ErrorMessage>
          {uploadError}
          <CloseButton onClick={() => setUploadError(null)}>×</CloseButton>
        </ErrorMessage>
      )}
      <ChatInput
        onSend={handleSend}
        onFileUpload={handleFileUpload}
        disabled={isLoading || !activeChat}
        placeholder={activeChat ? "Type your message..." : "Select a chat to start messaging"}
      />
    </ChatContainer>
  );
};

export default ChatInterface;