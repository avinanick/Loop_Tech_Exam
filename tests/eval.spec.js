const { test, expect } = require('@playwright/test');

const testCases = [
  {
    "id": 1,
    "name": "Test Case 1",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Draft project brief",
  },
  {
    "id": 2,
    "name": "Test Case 2",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Schedule kickoff meeting",
  },
  {
    "id": 3,
    "name": "Test Case 3",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Share timeline with teammates",
  },
  {
    "id": 4,
    "name": "Test Case 4",
    "leftNav": "Work Requests",
    "column": "New Requests",
    "card_title": "[Example] Laptop setup for new hire",
  },
  {
    "id": 5,
    "name": "Test Case 5",
    "leftNav": "Work Requests",
    "column": "In Progress",
    "card_title": "[Example] Password not working",
  },
  {
    "id": 6,
    "name": "Test Case 6",
    "leftNav": "Work Requests",
    "column": "Completed",
    "card_title": "[Example] New keycard for Daniela V",
  }
];

test.describe('Asana Data-Driven Tests', () => {
  testCases.forEach((data) => {
    test(`${data.name}`, async ({ page }) => {
      await test.step('Login to Asana', async () => {
        // Login to Asana
        await page.goto('https://app.asana.com/-/login');
        await page.locator('.TextInput').fill('ben+pose@workwithloop.com');
        await page.locator('.LoginButton').click();
        await page.locator('[type="password"]').fill('Password123');
        await page.locator('.LoginButton').click();
      });

      await test.step('Navigate to the project page', async () => {
        // Navigate to the project page
        await page.locator('.SidebarProjectsSectionProjectList-projects :text("' + data.leftNav + '")').click();
      });

      await test.step('Verify the card is within the right column', async () => {
        // Verify the card is within the right column
        await expect(page.locator('.BoardBody-columnDraggableItemWrapper:has-text("' + data.column +'")')
            .locator('.SortableList-sortableItemContainer:has-text("' + data.card_title +'")')).toBeVisible();
      });
      
    });
  });
});
