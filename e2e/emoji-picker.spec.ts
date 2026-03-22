import {expect, type Locator, type Page, test} from '@playwright/test'

// Navigate to a fresh test document and wait for the Studio form to be ready
async function gotoDocument(page: Page) {
  await page.goto('/intent/create/template=emojiPluginTest;type=emojiPluginTest/')
  await page.getByTestId('document-panel-scroller').waitFor({timeout: 15_000})
}

// Open the picker, search, wait for the result, and click it
async function selectEmoji(field: Locator, query: string, emojiButton: string) {
  await field.getByRole('button', {name: 'Select emoji'}).click()
  await field.page().getByRole('searchbox').fill(query)
  // Wait for emoji-mart to finish filtering before clicking
  await expect(field.page().getByRole('button', {name: emojiButton})).toBeVisible()
  await field.page().getByRole('button', {name: emojiButton}).click()
}

test.describe('emoji field', () => {
  let field: Locator

  test.beforeEach(async ({page}) => {
    await gotoDocument(page)
    // Scope all interactions to the plugin-type emoji field
    field = page.getByTestId('field-emoji')
  })

  test('shows "Select emoji" button on load', async () => {
    await expect(field.getByRole('button', {name: 'Select emoji'})).toBeVisible()
  })

  test('opens picker popover when clicking the button', async ({page}) => {
    await field.getByRole('button', {name: 'Select emoji'}).click()
    // emoji-mart renders a search input in the picker
    await expect(page.getByRole('searchbox')).toBeVisible()
  })

  test('closes picker when clicking outside', async ({page}) => {
    await field.getByRole('button', {name: 'Select emoji'}).click()
    await expect(page.getByRole('searchbox')).toBeVisible()

    // Click a sibling field outside the popover
    await page.getByLabel('Title').click()
    await expect(page.getByRole('searchbox')).not.toBeVisible()
  })

  test('selects an emoji and displays it', async ({page}) => {
    await selectEmoji(field, 'grinning', '😀')

    // Picker should close and the correct emoji value should be displayed
    await expect(page.getByRole('searchbox')).not.toBeVisible()
    await expect(field.getByTestId('emoji-value')).toHaveText('😀')
  })

  test('shows clear button after selecting an emoji', async () => {
    await selectEmoji(field, 'grinning', '😀')

    await expect(field.getByRole('button', {name: 'Clear emoji'})).toBeVisible()
  })

  test('clears emoji when clicking the trash button', async () => {
    await selectEmoji(field, 'grinning', '😀')

    // Verify it was selected
    await expect(field.getByTestId('emoji-value')).toHaveText('😀')

    await field.getByRole('button', {name: 'Clear emoji'}).click()

    // Value display and clear button should be gone
    await expect(field.getByTestId('emoji-value')).not.toBeVisible()
    await expect(field.getByRole('button', {name: 'Clear emoji'})).not.toBeVisible()
  })
})
