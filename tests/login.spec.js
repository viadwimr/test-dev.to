import { test, expect } from '@playwright/test';

test('Fill Email', async ({ page }) => {
  await page.goto('https://dev.to/enter');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('wrong@test.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByText('Unable to login. If you haven')).toBeVisible();
});

test('Continue with', async ({ page }) => {
  // Apple
  await page.goto('https://dev.to/enter');
  await page.getByRole('button', { name: 'Continue with Apple' }).click();
  // Tunggu redirect
  await page.waitForURL(/https:\/\/appleid\.apple\.com\/auth\/authorize.*/);
  // Validasi URL redirect
  await expect(page).toHaveURL(/https:\/\/appleid\.apple\.com\/auth\/authorize.*/);

  // Facebook
  await page.goto('https://dev.to/enter');
  await page.getByRole('button', { name: 'Continue with Facebook' }).click();
  // Tunggu redirect
  await page.waitForURL(/https:\/\/www\.facebook\.com\/login\.php.*/);

  // Validasi URL redirect
  await expect(page).toHaveURL(/https:\/\/www\.facebook\.com\/login\.php.*/);

    // Forem
  await page.goto('https://dev.to/enter');
  await page.getByRole('button', { name: 'Continue with Forem' }).click();
  // Tunggu redirect
  await page.waitForURL('https://account.forem.com/users/sign_in');
  // Validasi URL redirect
  await expect(page).toHaveURL('https://account.forem.com/users/sign_in');

    // Github
  await page.goto('https://dev.to/enter');
  await page.getByRole('button', { name: 'Continue with Github' }).click();
  // Tunggu redirect
  await page.waitForURL(/https:\/\/github\.com\/login.*/);
  // Validasi URL redirect
  await expect(page).toHaveURL(/https:\/\/github\.com\/login.*/);

    // Google
  await page.goto('https://dev.to/enter');
  await page.getByRole('button', { name: 'Continue with Google' }).click();
  // Tunggu redirect
  await page.waitForURL(/https:\/\/accounts\.google\.com\/v3\/signin\/identifier.*/);
  // Validasi URL redirect
  await expect(page).toHaveURL(/https:\/\/accounts\.google\.com\/v3\/signin\/identifier.*/);

    // Twitter
  await page.goto('https://dev.to/enter');
  await page.getByRole('button', { name: 'Continue with Twitter' }).click();
  // Tunggu redirect
  await page.waitForURL(/https:\/\/api\.x\.com\/oauth\/authenticate.*/);
  // Validasi URL redirect
  await expect(page).toHaveURL(/https:\/\/api\.x\.com\/oauth\/authenticate.*/);
  
});