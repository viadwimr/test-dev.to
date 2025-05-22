import { test, expect } from '@playwright/test';

// const { test, expect } = require('@playwright/test');

test.describe('Login form tests on https://dev.to/enter', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://dev.to/enter');
  });

  test('TC01: Login with valid credentials', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('viadwimr@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('password');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL('https://dev.to/');
  });

  test('TC02: Login with invalid email format', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('invalidemail');
    await page.getByRole('textbox', { name: 'Password' }).fill('any_password');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL('https://dev.to/enter');
  });

  test('TC04: Login with correct email, wrong password', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('viadwimr@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrong_password');
    await page.getByRole('button', { name: 'Log in' }).click();
     await expect(page.getByText('Unable to login. If you haven')).toBeVisible();
  });

  test('TC05: Login with empty email and password', async ({ page }) => {
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Unable to login. If you haven')).toBeVisible();
  });

  test('TC06: Login with special characters in email', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).fill('!#$%^&*()@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('any_password');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL('https://dev.to/enter');
  });

  test('Continue with', async ({ page }) => {
    // Apple
    await page.goto('https://dev.to/enter');
    await page.getByRole('button', { name: 'Continue with Apple' }).click();
    // Wait redirect
    await page.waitForURL(/https:\/\/appleid\.apple\.com\/auth\/authorize.*/);
    // URL redirect Validation
    await expect(page).toHaveURL(/https:\/\/appleid\.apple\.com\/auth\/authorize.*/);

    // Facebook
    await page.goto('https://dev.to/enter');
    await page.getByRole('button', { name: 'Continue with Facebook' }).click();
    // Wait redirect
    await page.waitForURL(/https:\/\/www\.facebook\.com\/login\.php.*/);

    // URL redirect Validation
    await expect(page).toHaveURL(/https:\/\/www\.facebook\.com\/login\.php.*/);

    // Forem
    await page.goto('https://dev.to/enter');
    await page.getByRole('button', { name: 'Continue with Forem' }).click();
    // Wait redirect
    await page.waitForURL('https://account.forem.com/users/sign_in');
    // URL redirect Validation
    await expect(page).toHaveURL('https://account.forem.com/users/sign_in');

    // Github
    await page.goto('https://dev.to/enter');
    await page.getByRole('button', { name: 'Continue with Github' }).click();
    // Wait redirect
    await page.waitForURL(/https:\/\/github\.com\/login.*/);
    // URL redirect Validation
    await expect(page).toHaveURL(/https:\/\/github\.com\/login.*/);

    // Google
    await page.goto('https://dev.to/enter');
    await page.getByRole('button', { name: 'Continue with Google' }).click();
    // Wait redirect
    await page.waitForURL(/https:\/\/accounts\.google\.com\/v3\/signin\/identifier.*/);
    // URL redirect Validation
    await expect(page).toHaveURL(/https:\/\/accounts\.google\.com\/v3\/signin\/identifier.*/);

    // Twitter
    await page.goto('https://dev.to/enter');
    await page.getByRole('button', { name: 'Continue with Twitter' }).click();
    // Wait redirect
    await page.waitForURL(/https:\/\/api\.x\.com\/oauth\/authenticate.*/);
    // URL redirect Validation
    await expect(page).toHaveURL(/https:\/\/api\.x\.com\/oauth\/authenticate.*/);
    
  });

});