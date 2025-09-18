import { test, expect } from '@playwright/test';

test('dev login flow returns token and me', async ({ request }) => {
  const login = await request.post('http://localhost:3001/auth/dev-login', {
    data: { email: 'user1@lawcyborg.com' },
  });
  expect(login.ok()).toBeTruthy();
  const { accessToken } = await login.json();
  expect(accessToken).toBeTruthy();

  const me = await request.get('http://localhost:3001/users/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  expect(me.ok()).toBeTruthy();
  const json = await me.json();
  expect(json.email).toBe('user1@lawcyborg.com');
});
