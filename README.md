# AI Chat Application

A modern React TypeScript chat application with AI capabilities, built with best practices and modern tooling.

## Features

- 🤖 AI-powered chat interface
- 📱 Responsive design for all devices
- 🌙 Dark mode support
- 📄 File upload capabilities
- 🚀 Modern React patterns and practices

## Tech Stack

- React 18
- TypeScript
- React Router v6
- Styled Components
- Axios
- Sentry for error tracking

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-chat-app.git
cd ai-chat-app
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=your_api_url
REACT_APP_SENTRY_DSN=your_sentry_dsn
```

4. Start the development server:
```bash
yarn start
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── chat/         # Chat interface components
│   ├── common/       # Common UI components
│   └── error/        # Error handling components
├── config/           # Configuration files
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── pages/           # Page components
├── services/        # API services
├── styles/          # Global styles
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Available Scripts

- `yarn start` - Start development server
- `yarn build` - Build production bundle
- `yarn eject` - Eject from Create React App
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier

## Error Handling

- Global error boundary for React errors
- Sentry integration for error tracking
- Proper API error handling
- User-friendly error messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Create React App
- React Router
- Styled Components
- And all other open-source libraries used in this project
