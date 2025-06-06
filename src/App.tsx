import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import { GlobalStyle } from './styles/GlobalStyles';
import { routes } from './config/routes';

const router = createBrowserRouter(routes);

function App() {
  return (
    <ChatProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ChatProvider>
  );
}

export default App;
