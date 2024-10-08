import { test, expect } from '@playwright/test';

import * as messages from '@/app/users/messages';

const BASE_URL = 'http://localhost:3000';

test('create user validates max age of male users', async ({ page }) => {
	await page.goto(`${BASE_URL}/users`);

	await page.click("button:has-text('+ Add User')");

	await page.click('label:has-text("Gender")');
	// See https://github.com/radix-ui/primitives/issues/2288
	await page.keyboard.press('ArrowDown'); // Assuming that male is the second option
	await page.keyboard.press('Enter');

	await page.fill('input[name="age"]', '150');

	await page.click('button[type="submit"]');

	await expect(page.getByText(messages.MAX_AGE_MALE)).toBeVisible();
});

test('create user validates max age of female users', async ({ page }) => {
	await page.goto(`${BASE_URL}/users`);

	await page.click("button:has-text('+ Add User')");

	await page.click('label:has-text("Gender")');
	// See https://github.com/radix-ui/primitives/issues/2288
	await page.keyboard.press('Enter'); // Assuming that female is the first option

	await page.fill('input[name="age"]', '150');

	await page.click('button[type="submit"]');

	await expect(page.getByText(messages.MAX_AGE_FEMALE)).toBeVisible();
});
