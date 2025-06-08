import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useChat } from '../../context/ChatContext';
import websocketService from '../../services/websocket';
import { Message } from '../../types';

const InputContainer = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.background.primary};
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border.primary};
  z-index: 10;
  margin-top: auto;

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(
      to top,
      ${({ theme }) => theme.background.primary},
      ${({ theme }) => `${theme.background.primary}00`}
    );
    pointer-events: none;
  }

  @media (min-width: 768px) {
    padding: 1.5rem 2rem 2rem;
  }
`;

const InputWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
`;

const TextareaWrapper = styled.div`
  flex: 1;
  position: relative;
  background-color: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.primary};
  border-radius: var(--radius-xl);
  transition: all ${({ theme }) => theme.animations.transition.base};
  box-shadow: ${({ theme }) => theme.shadow.light};

  &:focus-within {
    border-color: ${({ theme }) => theme.text.accent};
    box-shadow: ${({ theme }) => theme.shadow.medium};
    transform: ${({ theme }) => theme.animations.scale.hover};
  }

  @keyframes expand {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &.expanded {
    animation: expand ${({ theme }) => theme.animations.transition.base};
  }
`;

const MessageInput = styled.textarea`
  width: 100%;
  padding: 1rem 3rem;
  border: none;
  border-radius: var(--radius-xl);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  resize: none;
  min-height: 56px;
  max-height: 200px;
  background: transparent;
  color: ${({ theme }) => theme.text.primary};
  font-family: inherit;
  overflow-y: auto;
  transition: min-height ${({ theme }) => theme.animations.transition.base};

  &.expanded {
    min-height: 100px;
  }

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.tertiary};
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background.secondary};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.border.primary};
    border-radius: 3px;
    &:hover {
      background-color: ${({ theme }) => theme.border.secondary};
    }
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text.secondary};
  transition: all ${({ theme }) => theme.animations.transition.base};
  border-radius: var(--radius-base);

  &:hover {
    color: ${({ theme }) => theme.text.accent};
    background-color: ${({ theme }) => theme.background.accent};
    transform: ${({ theme }) => theme.animations.scale.hover};
  }

  &:active {
    transform: ${({ theme }) => theme.animations.scale.tap};
  }

  &:disabled {
    color: ${({ theme }) => theme.text.tertiary};
    cursor: not-allowed;
    background: none;
    transform: none;
  }

  svg {
    width: 20px;
    height: 20px;
    transition: transform ${({ theme }) => theme.animations.transition.base};
  }

  &:hover svg {
    transform: ${({ theme }) => theme.animations.scale.hover};
  }
`;

const UploadButton = styled(ActionButton)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
`;

const SendButton = styled(ActionButton)`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  
  &:not(:disabled) {
    color: ${({ theme }) => theme.text.accent};
  }
`;

const FileInput = styled.input`
  display: none;
`;

const HintText = styled.div<{ $visible: boolean }>`
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: var(--font-size-xs);
  color: ${({ theme }) => theme.text.secondary};
  background-color: ${({ theme }) => theme.background.primary + 'E6'};
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-base);
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transition: all ${({ theme }) => theme.animations.transition.base};
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.shadow.light};
  pointer-events: none;
  backdrop-filter: blur(8px);
`;

const CharacterCount = styled.div<{ $nearLimit: boolean }>`
  position: absolute;
  right: 3.5rem;
  bottom: 0.5rem;
  font-size: var(--font-size-xs);
  color: ${props => props.$nearLimit ? '#dc3545' : props.theme.text.tertiary};
  opacity: 0.8;
  transition: all ${({ theme }) => theme.animations.transition.base};

  &:hover {
    opacity: 1;
  }
`;

interface ChatInputProps {
  onSend: (message: string) => void;
  onFileUpload?: (file: File) => void;
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
}

const DEFAULT_MAX_LENGTH = 1000;

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  onFileUpload,
  disabled,
  maxLength = DEFAULT_MAX_LENGTH,
  placeholder = "Type your message..."
}) => {
  const [inputText, setInputText] = useState('');
  const [rows, setRows] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { activeChat, addMessage } = useChat();

  const characterCount = inputText.length;
  const isNearLimit = characterCount > maxLength * 0.9;

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
      setRows(Math.ceil(newHeight / 24));
      setIsExpanded(newHeight > 56);
    }
  }, [inputText]);

  const handleSend = () => {
    if (inputText.trim() && activeChat) {
      const messageData: Omit<Message, 'id' | 'timestamp'> = {
        text: inputText.trim(),
        isUser: true,
        type: 'message'
      };

      // Add message to local state
      addMessage(activeChat, messageData);
      
      // Send message through WebSocket
      websocketService.send(messageData);
      
      // Clear input
      setInputText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '56px';
      }
      setRows(1);
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 2000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <InputContainer>
      <InputWrapper>
        <TextareaWrapper className={isExpanded ? 'expanded' : ''}>
          <HintText $visible={showHint}>
            Press Enter to send, Shift + Enter for new line
          </HintText>
          {onFileUpload && (
            <UploadButton 
              onClick={handleUploadClick}
              title="Upload file"
              type="button"
              disabled={disabled}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </UploadButton>
          )}
          <MessageInput
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            disabled={disabled}
            className={isExpanded ? 'expanded' : ''}
          />
          {characterCount > 0 && (
            <CharacterCount $nearLimit={isNearLimit}>
              {characterCount}/{maxLength}
            </CharacterCount>
          )}
          <SendButton
            onClick={handleSend}
            disabled={!inputText.trim() || disabled}
            title="Send message"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </SendButton>
        </TextareaWrapper>
        <FileInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf,.doc,.docx,.txt,image/*"
          disabled={disabled}
        />
      </InputWrapper>
    </InputContainer>
  );
};

export default ChatInput;