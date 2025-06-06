import React from 'react';
import styled from 'styled-components';
import { useChat } from '../../context/ChatContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  padding: 2rem 1rem;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: var(--font-size-xl);
  color: #333;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: var(--font-size-base);
  color: #666;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size-lg);
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    width: 24px;
    height: 24px;
    color: #2196f3;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Card = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  height: 100%;

  &:hover {
    border-color: #2196f3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 24px;
    height: 24px;
    color: #2196f3;
    margin-bottom: 1rem;
  }
`;

const CardTitle = styled.h3`
  font-size: var(--font-size-lg);
  color: #333;
  margin-bottom: 0.5rem;
  width: 100%;
  font-weight: 600;
`;

const CardDescription = styled.p`
  font-size: var(--font-size-base);
  color: #666;
  width: 100%;
  line-height: 1.5;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ListItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f7f7f8;
  border-radius: 0.75rem;
  
  svg {
    width: 20px;
    height: 20px;
    color: #2196f3;
    flex-shrink: 0;
    margin-top: 0.25rem;
  }
`;

const ListItemText = styled.div`
  font-size: var(--font-size-base);
  color: #333;
  line-height: 1.5;
`;

interface Example {
  title: string;
  description: string;
  icon: React.ReactElement;
  prompt: string;
}

const examples: Example[] = [
  {
    title: "Explain a code snippet",
    description: "Upload or paste code and get a detailed explanation of how it works, including best practices and potential improvements.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    prompt: "Explain how this code works:"
  },
  {
    title: "Debug an issue",
    description: "Describe the problem you're facing and get step-by-step debugging help, error explanations, and solutions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 16v.01" />
        <path d="M12 8v4" />
      </svg>
    ),
    prompt: "I'm getting this error:"
  },
  {
    title: "Generate code",
    description: "Describe what you want to build and get working code examples with explanations and implementation details.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    prompt: "Create a"
  },
  {
    title: "Optimize code",
    description: "Share your code and get suggestions for improving performance, readability, and maintainability.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
      </svg>
    ),
    prompt: "How can I optimize this code:"
  },
  {
    title: "Learn concepts",
    description: "Ask about programming concepts, design patterns, or best practices to deepen your understanding.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    prompt: "Explain"
  },
  {
    title: "Review code",
    description: "Get a comprehensive code review with feedback on structure, security, and potential improvements.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
    prompt: "Review this code:"
  }
];

const capabilities = [
  {
    text: "Natural language understanding of code across multiple programming languages",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    )
  },
  {
    text: "Step-by-step explanations with code examples and documentation links",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    )
  },
  {
    text: "Code generation with best practices and modern patterns",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    )
  },
  {
    text: "Real-time debugging assistance and error resolution",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
    )
  }
];

const limitations = [
  {
    text: "May not have knowledge of the latest framework versions or recent updates",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    )
  },
  {
    text: "Cannot execute code or access external services directly",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>
    )
  },
  {
    text: "Limited context window for large codebases or long conversations",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
      </svg>
    )
  },
  {
    text: "May occasionally provide incorrect solutions that need verification",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  }
];

const StartScreen: React.FC = () => {
  const { addChat, addMessage } = useChat();

  const handleExampleClick = (example: Example) => {
    // Create a new chat and get its ID
    const chatId = addChat();
    
    if (chatId) {
      // Add the example prompt as the first message
      addMessage(chatId, {
        text: example.prompt,
        isUser: true,
      });

      // Add a placeholder response to guide the user
      addMessage(chatId, {
        text: `I'll help you ${example.title.toLowerCase()}. Please provide the details you'd like me to work with.`,
        isUser: false,
      });
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Title>How can I help you code today?</Title>
          <Subtitle>Choose an example or start typing in the box below</Subtitle>
        </Header>

        <Section>
          <SectionTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
              <line x1="16" y1="8" x2="2" y2="22" />
              <line x1="17.5" y1="15" x2="9" y2="15" />
            </svg>
            Examples
          </SectionTitle>
          <Grid>
            {examples.map((example, index) => (
              <Card 
                key={index} 
                onClick={() => handleExampleClick(example)}
                title={`Start a new chat: ${example.title}`}
              >
                {example.icon}
                <CardTitle>{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section>
          <SectionTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Capabilities
          </SectionTitle>
          <List>
            {capabilities.map((capability, index) => (
              <ListItem key={index}>
                {capability.icon}
                <ListItemText>{capability.text}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Section>

        <Section>
          <SectionTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Limitations
          </SectionTitle>
          <List>
            {limitations.map((limitation, index) => (
              <ListItem key={index}>
                {limitation.icon}
                <ListItemText>{limitation.text}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Section>
      </ContentWrapper>
    </Container>
  );
};

export default StartScreen; 