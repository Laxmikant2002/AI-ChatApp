import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useChat } from '../context/ChatContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f8f9fa;
`;

const Content = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1976d2;
    transform: translateY(-2px);
  }
`;

const IndexPage: React.FC = () => {
  const { addChat } = useChat();
  const navigate = useNavigate();

  const handleStartChat = () => {
    const chatId = addChat();
    navigate(`/chat/${chatId}`);
  };

  return (
    <Container>
      <Content>
        <Title>Welcome to AI Chat!</Title>
        <Subtitle>
          Start a new conversation and explore the power of AI assistance
        </Subtitle>
        <Button onClick={handleStartChat}>
          Start New Chat
        </Button>
      </Content>
    </Container>
  );
};

export default IndexPage; 