import React from 'react';
import { useRouteError } from 'react-router-dom';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  text-align: center;
  background-color: #f8f9fa;
`;

const ErrorTitle = styled.h1`
  font-size: 2rem;
  color: #dc3545;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.125rem;
  color: #6c757d;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: #0d6efd;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0b5ed7;
  }
`;

const ErrorBoundary: React.FC = () => {
  const error = useRouteError() as Error;

  const handleRetry = () => {
    window.location.href = '/';
  };

  return (
    <ErrorContainer>
      <ErrorTitle>Oops! Something went wrong</ErrorTitle>
      <ErrorMessage>
        {error?.message || 'An unexpected error occurred. Please try again.'}
      </ErrorMessage>
      <RetryButton onClick={handleRetry}>
        Return to Home
      </RetryButton>
    </ErrorContainer>
  );
};

export default ErrorBoundary; 