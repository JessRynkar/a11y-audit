import { test, expect, Page } from '@playwright/test'
import { login } from '../helpers/login'
import { seedTestUser, cleanupTestUser, testUser } from '../helpers/seedUser'

test.describe('Admin Panel', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    await seedTestUser()

    const context = await browser.newContext()
    page = await context.newPage()

    await login({ page, user: testUser })
  })

  test.afterAll(async () => {
    await cleanupTestUser()
  })

  test('can navigate to dashboard', async () => {
    await page.goto('http://localhost:3000/admin')
    await expect(page).toHaveURL('http://localhost:3000/admin')
    const dashboardArtifact = page
      .getByRole('navigation', { name: 'Breadcrumb' })
      .getByRole('button', { name: 'Dashboard', exact: true })
    await expect(dashboardArtifact).toBeVisible()
  })

  test('can navigate to list view', async () => {
    await page.goto('http://localhost:3000/admin/collections/users')
    await expect(page).toHaveURL('http://localhost:3000/admin/collections/users')
    const listViewArtifact = page.locator('h1', { hasText: 'Users' }).first()
    await expect(listViewArtifact).toBeVisible()
  })

  test('can navigate to edit view', async () => {
    await page.goto('http://localhost:3000/admin/collections/users/create')
    await expect(page).toHaveURL(/\/admin\/collections\/users\/[a-zA-Z0-9-_]+/)
    const editViewArtifact = page.locator('input[name="email"]')
    await expect(editViewArtifact).toBeVisible()
  })

  test('explains required fields beside document controls', async () => {
    for (const route of ['/admin/collections/pages/create', '/admin/globals/test-global']) {
      await page.goto(`http://localhost:3000${route}`)
      const controls = page.locator('.doc-controls')
      const help = controls.getByRole('button', {
        name: 'Fields marked with * are required.',
        exact: true,
      })
      await expect(help).toBeVisible()
      await help.focus()
      await expect(help).toHaveAttribute('aria-expanded', 'true')
      const explanation = page
        .locator('[popover]')
        .filter({ hasText: 'Fields marked with * are required.' })
      await expect(explanation).toBeVisible()
      await expect(explanation).toHaveText('Fields marked with * are required.')
      await page.keyboard.press('Escape')
      await expect(explanation).toBeHidden()
      await expect(help).toBeFocused()
      await help.click()
      await expect(explanation).toBeVisible()
      await page.keyboard.press('Escape')
    }
  })

  test('keeps required-fields help usable on narrow screens', async ({}, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('http://localhost:3000/admin/collections/versioned-articles/create')
    const help = page.locator('.doc-controls').getByRole('button', {
      name: 'Fields marked with * are required.',
      exact: true,
    })
    await expect(help).toBeVisible()
    await help.focus()
    const explanation = page
      .locator('[popover]')
      .filter({ hasText: 'Fields marked with * are required.' })
    await expect(explanation).toBeVisible()
    await expect
      .poll(async () => {
        const bounds = await explanation.boundingBox()
        return Boolean(
          bounds &&
          bounds.x >= 0 &&
          bounds.x + bounds.width <= 390 &&
          bounds.y >= 0 &&
          bounds.y + bounds.height <= 844,
        )
      })
      .toBe(true)
    await page.screenshot({ path: testInfo.outputPath('required-fields-help-mobile.png') })
    await page.keyboard.press('Escape')
    await expect(explanation).toBeHidden()
    await page.setViewportSize({ width: 1280, height: 720 })
  })
})
