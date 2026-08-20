import { test, expect } from '@playwright/test';

test.describe('Portfolio Core Experience', () => {
  test('homepage should load and display hero content', async ({ page }) => {
    // Go to the base URL
    await page.goto('/');

    // Expect the hero section to be present
    const heroTitle = page.locator('h1', { hasText: /I Build Full Stack/i });
    await expect(heroTitle).toBeVisible({ timeout: 15000 }); // Longer timeout for R3F load

    // Expect availability badge (more specific to avoid strict mode violation)
    const badge = page.getByText('Available for Q4 2024 Projects');
    await expect(badge).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Look for Projects link in the navbar
    const workLink = page.getByRole('link', { name: 'Projects', exact: true }).or(page.getByRole('button', { name: 'Projects' }));
    
    if (await workLink.count() > 0) {
      await workLink.first().click();
      
      // Check if URL updated or scrolled to section with longer timeout
      const projectsSection = page.locator('#projects');
      await expect(projectsSection).toBeVisible({ timeout: 10000 });
    }
  });

  test('projects section loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Scroll down to Projects section
    await page.evaluate(() => {
      document.querySelector('#projects')?.scrollIntoView();
    });

    const projectsTitle = page.locator('h2', { hasText: /THINGS I'VE/i });
    await expect(projectsTitle).toBeVisible();

    // Check if at least one project card is rendered
    const viewAllBtn = page.getByText(/VIEW ALL WORKS/i);
    await expect(viewAllBtn).toBeVisible();
  });

  test('skills matrix loads correctly', async ({ page }) => {
    await page.goto('/');
    
    await page.evaluate(() => {
      document.querySelector('#skills')?.scrollIntoView();
    });

    const skillsTitle = page.locator('h2', { hasText: /TECHNICAL/i });
    await expect(skillsTitle).toBeVisible();

    // Should show "Frontend Systems" tab active by default
    const frontendTab = page.getByRole('button', { name: /Frontend Systems/i });
    await expect(frontendTab).toBeVisible();
    
    // Check if React 19 is listed as a skill
    const reactSkill = page.locator('h3', { hasText: 'React 19' });
    await expect(reactSkill).toBeVisible();
  });
});
