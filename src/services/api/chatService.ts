import api from './config';
import { Chat, Message } from '../../types';

export interface CreateChatResponse {
  chat: Chat;
}

export interface SendMessageResponse {
  message: Message;
}

class ChatService {
  // Get all chats
  async getChats(): Promise<Chat[]> {
    const response = await api.get<Chat[]>('/chats');
    return response.data;
  }

  // Get a single chat by ID
  async getChat(chatId: string): Promise<Chat> {
    const response = await api.get<Chat>(`/chats/${chatId}`);
    return response.data;
  }

  // Create a new chat
  async createChat(): Promise<CreateChatResponse> {
    const response = await api.post<CreateChatResponse>('/chats');
    return response.data;
  }

  // Send a message in a chat
  async sendMessage(chatId: string, text: string): Promise<SendMessageResponse> {
    const response = await api.post<SendMessageResponse>(`/chats/${chatId}/messages`, {
      text,
      isUser: true,
    });
    return response.data;
  }

  // Get chat messages
  async getMessages(chatId: string): Promise<Message[]> {
    const response = await api.get<Message[]>(`/chats/${chatId}/messages`);
    return response.data;
  }

  // Delete a chat
  async deleteChat(chatId: string): Promise<void> {
    await api.delete(`/chats/${chatId}`);
  }

  // Pin/unpin a chat
  async togglePinChat(chatId: string, isPinned: boolean): Promise<Chat> {
    const response = await api.patch<Chat>(`/chats/${chatId}`, {
      isPinned,
    });
    return response.data;
  }
}

export const chatService = new ChatService();
export default chatService; 