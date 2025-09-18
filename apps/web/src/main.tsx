import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import './index.css';
import { DashboardPage } from './pages/dashboard';
import { LoginPage } from './pages/login';
import { AuthProvider, useAuth } from './providers/auth-context';
import { AppShell } from './ui/app-shell';
import { AppErrorBoundary } from './ui/error-boundary';
import { Toaster, ToasterProvider } from './ui/toaster';

const queryClient = new QueryClient();

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { authState } = useAuth();
  const location = useLocation();
  if (!authState.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route index element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToasterProvider>
          <AuthProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
            <Toaster />
          </AuthProvider>
        </ToasterProvider>
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
