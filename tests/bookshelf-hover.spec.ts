import { test, expect } from '@playwright/test';

test('bookshelf hover interaction test', async ({ page }) => {
  // Navigate to the bookshelf page
  await page.goto('/bookshelf');

  // Wait for the page to load completely
  await page.waitForLoadState('networkidle');

  // Click on the "Bookshelf View" button to switch to 2D bookshelf view
  await page.click('button:has-text("Bookshelf View")');

  // Wait for the bookshelf view to render
  await page.waitForSelector('.bg-gradient-to-b.from-amber-50.to-amber-100', { timeout: 10000 });

  // Find all book spines in the first shelf (they have the class "relative group cursor-pointer")
  const bookSpines = page.locator('.relative.group.cursor-pointer');
  
  // Wait for at least one book to be visible
  await expect(bookSpines.first()).toBeVisible();

  // Get the count of books and choose the second or third one
  const bookCount = await bookSpines.count();
  const bookIndex = Math.min(2, bookCount - 1); // Use index 2 (third book) or the last book if less than 3 books

  // Get the specific book spine we want to hover over
  const targetBookSpine = bookSpines.nth(bookIndex);

  // Ensure the target book is visible
  await expect(targetBookSpine).toBeVisible();

  // Hover over the selected book spine
  await targetBookSpine.hover();

  // Wait for the hover card to appear
  await page.waitForSelector('.absolute.top-0.left-1\\/2.transform.-translate-x-1\\/2.-translate-y-2.z-20', { timeout: 5000 });

  // Verify the hover card is visible
  const hoverCard = page.locator('.absolute.top-0.left-1\\/2.transform.-translate-x-1\\/2.-translate-y-2.z-20');
  await expect(hoverCard).toBeVisible();

  // Take a screenshot with the hover card visible
  await page.screenshot({ 
    path: 'bookshelf-hover-test.png',
    fullPage: true
  });

  // Optionally, verify some content in the hover card
  await expect(hoverCard.locator('h4')).toBeVisible(); // Book title
  await expect(hoverCard.locator('img')).toBeVisible(); // Book cover
  await expect(hoverCard.locator('text=Click to read full review')).toBeVisible(); // Click hint
});