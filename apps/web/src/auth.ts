export type AuthState = {
  accessToken: string | null;
  user: { email: string; name: string; role: string } | null;
};

export async function devLogin(email: string): Promise<string> {
  const res = await fetch('http://localhost:3001/auth/dev-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('Login failed');
  const json = await res.json();
  return json.accessToken as string;
}

export async function getMe(token: string) {
  const res = await fetch('http://localhost:3001/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return (await res.json()) as { email: string; name: string; role: string };
}
