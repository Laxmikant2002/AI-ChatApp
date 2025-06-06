import WebSocket from 'ws';
import { handleMessage } from '../services/chatService';
import { logger } from '../utils/logger';

export const setupWebSocketHandlers = (wss: WebSocket.Server) => {
  wss.on('connection', (ws: WebSocket) => {
    logger.info('New client connected');

    ws.on('message', async (data: WebSocket.Data) => {
      try {
        const message = JSON.parse(data.toString());
        const response = await handleMessage(message);
        ws.send(JSON.stringify(response));
      } catch (error) {
        logger.error('Error processing message:', error);
        ws.send(JSON.stringify({ 
          type: 'error', 
          message: 'Error processing message' 
        }));
      }
    });

    ws.on('close', () => {
      logger.info('Client disconnected');
    });

    ws.on('error', (error) => {
      logger.error('WebSocket error:', error);
    });
  });
};
