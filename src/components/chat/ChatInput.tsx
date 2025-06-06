import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid #e5e5e5;
  z-index: 10;
  margin-top: auto;

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
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
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  &:focus-within {
    border-color: #2196f3;
    box-shadow: 0 2px 12px rgba(33, 150, 243, 0.15);
  }

  @keyframes expand {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  &.expanded {
    animation: expand 0.2s ease-out;
  }
`;

const MessageInput = styled.textarea`
  width: 100%;
  padding: 1rem 3rem;
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  resize: none;
  min-height: 56px;
  max-height: 200px;
  background: transparent;
  font-family: inherit;
  overflow-y: auto;
  transition: min-height 0.2s ease;

  &.expanded {
    min-height: 100px;
  }

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #6e6e80;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
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
  color: #6e6e80;
  transition: all 0.2s ease;
  border-radius: 0.5rem;

  &:hover {
    color: #2196f3;
    background-color: rgba(33, 150, 243, 0.1);
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
    background: none;
  }

  svg {
    width: 20px;
    height: 20px;
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
    color: #2196f3;
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
  font-size: 0.75rem;
  color: #6e6e80;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  pointer-events: none;
`;

const CharacterCount = styled.div<{ $nearLimit: boolean }>`
  position: absolute;
  right: 3.5rem;
  bottom: 0.5rem;
  font-size: 0.75rem;
  color: ${props => props.$nearLimit ? '#dc3545' : '#6e6e80'};
  opacity: 0.8;
`;

interface ChatInputProps {
  onSend: (text: string) => void;
  onFileUpload?: (file: File) => void;
  maxLength?: number;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  onFileUpload,
  maxLength = 4000 
}) => {
  const [inputText, setInputText] = useState('');
  const [rows, setRows] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (inputText.trim()) {
      onSend(inputText.trim());
      setInputText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '56px';
      }
      setRows(1);
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === 'Enter' && e.shiftKey) {
      setShowHint(false);
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

  const characterCount = inputText.length;
  const isNearLimit = characterCount > maxLength * 0.9;

  return (
    <InputContainer>
      <InputWrapper>
        <TextareaWrapper className={isExpanded ? 'expanded' : ''}>
          <HintText $visible={showHint}>
            Press Enter to send, Shift + Enter for new line
          </HintText>
          <UploadButton 
            onClick={handleUploadClick}
            title="Upload file"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </UploadButton>
          <MessageInput
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={rows}
            maxLength={maxLength}
            className={isExpanded ? 'expanded' : ''}
          />
          {characterCount > 0 && (
            <CharacterCount $nearLimit={isNearLimit}>
              {characterCount}/{maxLength}
            </CharacterCount>
          )}
          <SendButton
            onClick={handleSend}
            disabled={!inputText.trim()}
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
        />
      </InputWrapper>
    </InputContainer>
  );
};

export default ChatInput; 