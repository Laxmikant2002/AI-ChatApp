export interface Message {
  id?: string;
  text: string;
  isUser: boolean;
  timestamp?: Date;
  type?: 'message' | 'error' | 'system';
}

export interface WebSocketMessage {
  type: 'message' | 'error' | 'system';
  data: Message;
}
