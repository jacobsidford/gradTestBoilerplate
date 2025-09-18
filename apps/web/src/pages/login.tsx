import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../providers/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/shadcn/card';
import { Input } from '../ui/shadcn/input';
import { Button } from '../ui/shadcn/button';
import { Label } from '../ui/shadcn/label';

export function LoginPage() {
  const { signInDev } = useAuth();
  const [email, setEmail] = useState('user1@lawcyborg.com');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation() as { state?: { from?: Location } };
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInDev(email);
      const redirectTo = (location.state?.from as any)?.pathname || '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Auth Template</CardTitle>
          <CardDescription>Dev login to simulate SSO</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-3">
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user1@lawcyborg.com"
                autoComplete="email"
              />
            </div>
            {error && <div className="text-sm text-destructive">{error}</div>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Signing in…' : 'Dev Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
