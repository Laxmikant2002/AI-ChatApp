import express from 'express';
import { createServer } from 'http';
import WebSocket from 'ws';
import dotenv from 'dotenv';
import { setupWebSocketHandlers } from './handlers/websocket';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Create HTTP server
const server = createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Setup WebSocket handlers
setupWebSocketHandlers(wss);

// Start server
server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
