import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './app/providers/AuthProvider.tsx';
import ErrorBoundary from './components/ui/ErrorBoundary.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);