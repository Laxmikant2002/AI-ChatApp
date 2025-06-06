import React from 'react';
import { RouteObject } from 'react-router-dom';
import IndexPage from '../pages';
import ChatPage from '../pages/chat/ChatInterface';
import ErrorBoundary from '../components/error/ErrorBoundary';
import Layout from '../layouts/Layout';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'chat/:id',
        element: <ChatPage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorBoundary />,
  },
]; 