import { test, expect } from '@playwright/test';

import * as testids from './test-ids';

const BASE_URL = 'http://localhost:3000';

test('create a user', async ({ page }) => {
	// navigate to the users page
	await page.goto(`${BASE_URL}/users`);

	// open the add user form
	await page.locator(`button[data-testid='${testids.USER_FORM_TRIGGER}']`).click();

	// select the gender control
	await page.locator(`[data-testid='${testids.USER_FORM_FORM_CONTROL_GENDER}']`).click();
	// select the male option
	await page
		.locator(`[data-testid='${testids.USER_FORM_FORM_CONTROL_GENDER_OPTION_MALE}']`)
		.click();

	// fill in the first name
	const firstName = `John+${Date.now()}`;
	await page
		.locator(`input[data-testid='${testids.USER_FORM_FORM_CONTROL_FIRST_NAME}']`)
		.fill(firstName);

	// fill in the last name
	await page
		.locator(`input[data-testid='${testids.USER_FORM_FORM_CONTROL_LAST_NAME}']`)
		.fill('Smith');

	// fill in the age
	await page.locator(`input[data-testid='${testids.USER_FORM_FORM_CONTROL_AGE}']`).fill('25');

	// submit the form
	await page.locator(`button[data-testid='${testids.USER_FORM_ACTION_SUBMIT}']`).click();

	// check that the user is in the list
	const row = page
		.locator(`table[data-testid='${testids.USERS_TABLE}'] td`)
		.filter({ hasText: firstName });
	await row.scrollIntoViewIfNeeded();
	expect(row).toBeVisible();
	expect(await row.textContent()).toEqual(firstName);
});
