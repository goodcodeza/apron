import { test, expect } from '@playwright/test';

import { messages } from '@/app/users/copy/messages';
import * as testids from './test-ids';

const BASE_URL = 'http://localhost:3000';

test('create user validates max age of male users', async ({ page }) => {
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

	// fill in an invalid age
	await page.locator(`input[data-testid='${testids.USER_FORM_FORM_CONTROL_AGE}']`).fill('150');

	// submit the form
	await page.locator(`button[data-testid='${testids.USER_FORM_ACTION_SUBMIT}']`).click();

	// check that the error message is visible
	const errorMessage = page.locator(`[data-testid='${testids.USER_FORM_FORM_CONTROL_AGE_ERROR}']`);
	expect(errorMessage).toBeVisible();
	expect(await errorMessage.textContent()).toBe(messages['user.age.validation__max__male']);
});

test('create user validates max age of female users', async ({ page }) => {
	// navigate to the users page
	await page.goto(`${BASE_URL}/users`);

	// open the add user form
	await page.locator(`button[data-testid='${testids.USER_FORM_TRIGGER}']`).click();

	// select the gender control
	await page.locator(`[data-testid='${testids.USER_FORM_FORM_CONTROL_GENDER}']`).click();
	// select the female option
	await page
		.locator(`[data-testid='${testids.USER_FORM_FORM_CONTROL_GENDER_OPTION_FEMALE}']`)
		.click();

	// fill in an invalid age
	await page.locator(`input[data-testid='${testids.USER_FORM_FORM_CONTROL_AGE}']`).fill('150');

	// submit the form
	await page.locator(`button[data-testid='${testids.USER_FORM_ACTION_SUBMIT}']`).click();

	// check that the error message is visible
	const errorMessage = page.locator(`[data-testid='${testids.USER_FORM_FORM_CONTROL_AGE_ERROR}']`);
	expect(errorMessage).toBeVisible();
	expect(await errorMessage.textContent()).toBe(messages['user.age.validation__max__female']);
});
