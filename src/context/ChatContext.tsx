import React, { createContext, useContext, useState } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  isPinned: boolean;
  createdAt: Date;
}

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
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addChat = () => {
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
  };

  const clearChats = () => {
    setChats([]);
    setActiveChat(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
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
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext; 