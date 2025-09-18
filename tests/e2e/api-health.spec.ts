import { test, expect } from '@playwright/test';

test('api health returns ok', async ({ request }) => {
  const res = await request.get('http://localhost:3001/health');
  expect(res.status()).toBe(200);
  const json = await res.json();
  expect(json).toEqual({ status: 'ok' });
});
