import React, { createContext, useContext, useMemo, useState } from 'react';

type Toast = { id: number; message: string };
type ToasterCtx = { push: (message: string) => void };

const Ctx = createContext<ToasterCtx | undefined>(undefined);

export function ToasterProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function push(message: string) {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }

  const value = useMemo(() => ({ push }), []);

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="rounded-md border bg-card text-card-foreground shadow p-3 text-sm"
          >
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToaster() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToaster must be used within ToasterProvider');
  return ctx;
}

export function Toaster() {
  // Alias to keep API from main.tsx; nothing to render directly here
  return null;
}
