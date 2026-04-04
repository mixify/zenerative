import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:5173';

test.describe('Landing page', () => {
  test('shows Sprites and Sound cards', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('h1')).toHaveText('Zenerative');
    await expect(page.locator('.mode-card')).toHaveCount(2);
    await expect(page.locator('[data-mode="sprites"]')).toBeVisible();
    await expect(page.locator('[data-mode="sound"]')).toBeVisible();
  });
});

test.describe('Sprites pipeline', () => {
  test('navigates to sprite sketch list', async ({ page }) => {
    await page.goto(BASE);
    await page.click('[data-mode="sprites"]');
    await expect(page.locator('h1')).toHaveText('Sprite Sketches');
    await expect(page.locator('[data-sketch="basic-tiles"]')).toBeVisible();
  });

  test('opens basic-tiles sketch viewer', async ({ page }) => {
    await page.goto(`${BASE}/?mode=sprites&sketch=basic-tiles`);
    await expect(page.locator('h2')).toContainText('Basic Tiles');
    // Should have a canvas or export button
    await expect(page.locator('button')).not.toHaveCount(0);
  });
});

test.describe('Sound pipeline', () => {
  test('navigates to sound sketch list', async ({ page }) => {
    await page.goto(BASE);
    await page.click('[data-mode="sound"]');
    await expect(page.locator('h1')).toHaveText('Sound Sketches');
    await expect(page.locator('[data-sketch="basic-melody"]')).toBeVisible();
  });

  test('opens basic-melody with StrudelMirror editors', async ({ page }) => {
    await page.goto(`${BASE}/?mode=sound&sketch=basic-melody`);
    await expect(page.locator('h2')).toContainText('Basic Melody');

    // Should have stack blocks with names
    await expect(page.locator('.stack-name')).toHaveCount(2);
    const names = await page.locator('.stack-name').allTextContents();
    expect(names.map(n => n.toLowerCase())).toEqual(['melody', 'drums']);

    // Each stack should have a CodeMirror editor
    await expect(page.locator('.cm-editor')).toHaveCount(2);
  });

  test('CodeMirror editors contain Strudel code', async ({ page }) => {
    await page.goto(`${BASE}/?mode=sound&sketch=basic-melody`);
    await page.waitForSelector('.cm-editor');

    // First editor should contain note() pattern
    const editor1 = page.locator('.cm-editor').nth(0);
    await expect(editor1).toContainText('note');
    await expect(editor1).toContainText('piano');

    // Second editor should contain drum pattern
    const editor2 = page.locator('.cm-editor').nth(1);
    await expect(editor2).toContainText('bd');
    await expect(editor2).toContainText('hh');
  });

  test('has transport controls', async ({ page }) => {
    await page.goto(`${BASE}/?mode=sound&sketch=basic-melody`);
    await expect(page.locator('#play-all')).toBeVisible();
    await expect(page.locator('#stop-all')).toBeVisible();
    await expect(page.locator('#export-wav')).toBeVisible();
    await expect(page.locator('#export-ogg')).toBeVisible();
  });

  test('Play All starts audio, samples load, Stop All stops', async ({ page }) => {
    test.setTimeout(20000);
    await page.goto(`${BASE}/?mode=sound&sketch=basic-melody`);
    await page.waitForSelector('.cm-editor');

    // Collect console messages
    const logs = [];
    page.on('console', msg => logs.push(`[${msg.type()}] ${msg.text()}`));

    // Click Play All
    await page.click('#play-all');

    // Wait for scheduler to start
    await page.waitForTimeout(5000);

    // Verify samples loaded (piano + drums)
    const sampleLogs = logs.filter(l => l.includes('done! loaded'));
    expect(sampleLogs.length).toBeGreaterThanOrEqual(2);

    // Verify no eval errors
    const evalErrors = logs.filter(l => l.includes('[eval] error'));
    expect(evalErrors).toEqual([]);

    // Click Stop All
    await page.click('#stop-all');
    expect(await page.locator('#status').textContent()).toBe('Stopped.');
  });
});

test.describe('Navigation', () => {
  test('back button returns to sketch list', async ({ page }) => {
    await page.goto(`${BASE}/?mode=sound&sketch=basic-melody`);
    await page.click('#back');
    await expect(page.locator('h1')).toHaveText('Sound Sketches');
  });

  test('back from sketch list returns to landing', async ({ page }) => {
    await page.goto(`${BASE}/?mode=sound`);
    await page.click('[data-nav="home"]');
    await expect(page.locator('h1')).toHaveText('Zenerative');
  });
});
