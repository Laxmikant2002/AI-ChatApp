interface Config {
  API_URL: string;
  NODE_ENV: string;
  APP_VERSION: string;
  ENABLE_LOGS: boolean;
  SENTRY_DSN?: string;
}

const config: Config = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  ENABLE_LOGS: process.env.REACT_APP_ENABLE_LOGS === 'true',
  SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN,
};

export default config; 