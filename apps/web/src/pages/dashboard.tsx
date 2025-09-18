import React from 'react';

import { useAuth } from '../providers/auth-context';

export function DashboardPage() {
  const { authState } = useAuth();
  return (
    <div>
      <h2 className="text-xl font-semibold">Welcome</h2>
      <p className="mt-2 text-muted-foreground">
        You are signed in as {authState.user?.name} ({authState.user?.email}).
      </p>
    </div>
  );
}
