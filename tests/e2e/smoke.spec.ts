import { test, expect } from '@playwright/test';

test('app shell renders', async ({ page }) => {
  await page.goto('/');
  // redirected to login when unauthenticated
  await expect(page.getByRole('heading', { name: 'Auth Template' })).toBeVisible();
  await expect(page.getByText('Dev login to simulate SSO')).toBeVisible();
});
