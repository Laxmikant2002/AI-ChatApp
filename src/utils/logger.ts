import * as Sentry from '@sentry/react';
import config from '../config/env';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogData {
  [key: string]: any;
}

class Logger {
  private static instance: Logger;
  private isInitialized: boolean = false;

  private constructor() {
    if (config.SENTRY_DSN) {
      Sentry.init({
        dsn: config.SENTRY_DSN,
        environment: config.NODE_ENV,
        release: config.APP_VERSION,
        tracesSampleRate: 1.0,
      });
      this.isInitialized = true;
    }
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, data?: LogData): string {
    const timestamp = new Date().toISOString();
    const dataString = data ? ` ${JSON.stringify(data)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${dataString}`;
  }

  private log(level: LogLevel, message: string, data?: LogData) {
    if (!config.ENABLE_LOGS && config.NODE_ENV === 'production') {
      return;
    }

    const formattedMessage = this.formatMessage(level, message, data);

    switch (level) {
      case 'info':
        console.info(formattedMessage);
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      case 'error':
        console.error(formattedMessage);
        if (this.isInitialized) {
          Sentry.captureMessage(message, {
            level: 'error',
            extra: data,
          });
        }
        break;
      case 'debug':
        if (config.NODE_ENV !== 'production') {
          console.debug(formattedMessage);
        }
        break;
    }
  }

  info(message: string, data?: LogData) {
    this.log('info', message, data);
  }

  warn(message: string, data?: LogData) {
    this.log('warn', message, data);
  }

  error(message: string, error?: Error, data?: LogData) {
    const errorData = error ? {
      ...data,
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
    } : data;

    this.log('error', message, errorData);

    if (this.isInitialized && error) {
      Sentry.captureException(error, {
        extra: data,
      });
    }
  }

  debug(message: string, data?: LogData) {
    this.log('debug', message, data);
  }
}

export default Logger.getInstance(); 