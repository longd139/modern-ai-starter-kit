import { test, expect } from '@playwright/test';

test.describe('Task Board E2E Flow (Session 4)', () => {
  test('should display app title and connect to backend', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Team Task Board');
    await expect(page.locator('.status-badge')).toBeVisible();
  });
});
