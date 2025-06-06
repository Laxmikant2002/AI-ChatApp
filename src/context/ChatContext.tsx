import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';
import websocketService from '../services/websocket';
import { Message, Chat } from '../types';

interface ChatContextType {
  chats: Chat[];
  activeChat: string | null;
  isDarkMode: boolean;
  setActiveChat: (chatId: string) => void;
  addChat: () => string;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearChats: () => void;
  toggleDarkMode: () => void;
  togglePinChat: (chatId: string) => void;
  searchChats: (query: string) => Chat[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>(() => {
    // Load chats from localStorage on initial render
    const savedChats = localStorage.getItem('chats');
    return savedChats ? JSON.parse(savedChats) : [];
  });
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Connect to WebSocket when the component mounts
  useEffect(() => {
    websocketService.connect();
    const unsubscribe = websocketService.subscribe((message) => {
      if (activeChat) {
        addMessage(activeChat, message);
      }
    });

    return () => {
      unsubscribe();
      websocketService.disconnect();
    };
  }, [activeChat]);

  // Persist chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  // Persist theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const addChat = (): string => {
    const newChat: Chat = {
      id: Math.random().toString(36).substring(7),
      title: 'New Chat',
      messages: [],
      isPinned: false,
      createdAt: new Date(),
    };

    setChats(prevChats => [newChat, ...prevChats]);
    setActiveChat(newChat.id);
    return newChat.id;
  };

  const addMessage = (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
    };

    setChats(prevChats => {
      const chatIndex = prevChats.findIndex(chat => chat.id === chatId);
      if (chatIndex === -1) return prevChats;

      const updatedChat = {
        ...prevChats[chatIndex],
        messages: [...prevChats[chatIndex].messages, newMessage],
        title: prevChats[chatIndex].messages.length === 0 ? message.text.slice(0, 30) + '...' : prevChats[chatIndex].title,
      };

      const newChats = [...prevChats];
      newChats[chatIndex] = updatedChat;
      return newChats;
    });

    // Send message through WebSocket if it's a user message
    if (message.isUser) {
      websocketService.send(message);
    }
  };

  const clearChats = () => {
    setChats([]);
    setActiveChat(null);
    localStorage.removeItem('chats');
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  const togglePinChat = (chatId: string) => {
    setChats(prevChats => {
      const chatIndex = prevChats.findIndex(chat => chat.id === chatId);
      if (chatIndex === -1) return prevChats;

      const updatedChat = {
        ...prevChats[chatIndex],
        isPinned: !prevChats[chatIndex].isPinned,
      };

      const newChats = [...prevChats];
      newChats[chatIndex] = updatedChat;
      return newChats;
    });
  };

  const searchChats = (query: string) => {
    if (!query) return chats;

    const searchTerm = query.toLowerCase();
    return chats.filter(chat => 
      chat.title.toLowerCase().includes(searchTerm) ||
      chat.messages.some(msg => msg.text.toLowerCase().includes(searchTerm))
    );
  };

  const value = {
    chats,
    activeChat,
    isDarkMode,
    setActiveChat,
    addChat,
    addMessage,
    clearChats,
    toggleDarkMode,
    togglePinChat,
    searchChats,
  };

  return (
    <ChatContext.Provider value={value}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ChatContext.Provider>
  );
};

export default ChatContext;