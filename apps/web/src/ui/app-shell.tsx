import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { useAuth } from '../providers/auth-context';
import { Button } from './shadcn/button';
import { Separator } from './shadcn/separator';

export function AppShell() {
  const { authState, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="h-14 flex items-center justify-between px-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded bg-primary" />
          <Link to="/" className="font-semibold text-lg">
            Auth Template
          </Link>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">
            {authState.user?.name} ({authState.user?.role})
          </span>
          <Button variant="outline" size="sm" onClick={signOut}>Sign out</Button>
        </div>
      </header>
      <main className="p-6 bg-muted/30">
        <Outlet />
      </main>
    </div>
  );
}

