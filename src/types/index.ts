import { FileWithPreview } from '../utils/fileUpload';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  file?: FileWithPreview;
  type?: 'message' | 'error' | 'system';
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  isPinned: boolean;
  createdAt: Date;
}

export interface PDFFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface WebSocketMessage {
  type: 'message' | 'error' | 'system';
  data: any;
}