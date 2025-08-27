import React from 'react'

export interface EmojiData {
  id: string
  name: string
  unified: string
  native: string
  shortcodes: string
  keywords: string[]
  aliases: string[]
  category: string
  subcategory: string
  order: number
  skinTones?: number[]
  emoji_version: string
  ios_version: string
  skin_tones?: boolean
  obsoleted_by?: string
  obsoletes?: string
}

export interface CustomEmoji {
  id: string
  name: string
  keywords: string[]
  skins: Array<{
    src: string
    unified?: string
  }>
  shortcodes?: string
}

export interface CustomCategory {
  id: string
  name: string
  emojis: CustomEmoji[]
}

export interface CustomCategoryIcons {
  [categoryName: string]: {
    svg?: string
    src?: string
  }
}

export interface I18n {
  search_no_results_1?: string
  search_no_results_2?: string
  picker_heading?: string
  categories?: {
    activity?: string
    custom?: string
    flags?: string
    foods?: string
    nature?: string
    objects?: string
    people?: string
    places?: string
    symbols?: string
    recent?: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface EmojiMartProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Data to use for the picker.
   * Default: `{}`
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any

  /**
   * Custom emoji categories to include in the picker.
   * Default: `[]`
   */
  custom?: CustomCategory[]

  /**
   * Localization data to use for the picker.
   * Default: `{}`
   */
  i18n?: I18n

  /**
   * Custom icons for categories.
   * Default: `{}`
   */
  customCategoryIcons?: CustomCategoryIcons

  /**
   * Color theme of the picker.
   * Default: `auto`.
   */
  theme?: 'auto' | 'light' | 'dark'

  /**
   * The set of emojis to use. `native` is most performant.
   * Choices: `native`, `apple`, `facebook`, `google`, `twitter`.
   * Default: `native`.
   */
  set?: 'native' | 'apple' | 'facebook' | 'google' | 'twitter'

  /**
   * Size of the emoji glyph inside the emoji button.
   * Default: `24`
   */
  emojiSize?: number

  /**
   * Size of the emoji buttons.
   * Default: `36`
   */
  emojiButtonSize?: number

  /**
   * Number of emojis per line.
   * Default: `9`
   */
  perLine?: number

  /**
   * Maximum number of frequent rows to show. `0` disables frequent.
   * Default: `4`
   */
  maxFrequentRows?: number

  maxFrequentEmojis?: number

  /**
   * Position of the preview. Choices: `none`, `top`, `bottom`.
   * Default: `bottom`.
   */
  previewPosition?: 'none' | 'top' | 'bottom'

  /**
   * Position of the skin tone selector. Choices: `preview`, `search`, `none`.
   * Default: `preview`.
   */
  skinTonePosition?: 'preview' | 'search' | 'none'

  /**
   * Position of the search input. Choices: `sticky`, `static`, `none`.
   * Default: `sticky`.
   */
  searchPosition?: 'sticky' | 'static' | 'none'

  /**
   * Position of the navigation bar. Choices: `top`, `bottom`, `none`.
   * Default: `top`.
   */
  navPosition?: 'top' | 'bottom' | 'none'

  /**
   * Categories to show in the picker. Order is respected.
   * Default: `[]`.
   * Choices: `frequent`, `people`, `nature`, `foods`, `activity`, `places`, `objects`, `symbols`, `flags`.
   */
  categories?: Array<
    | 'frequent'
    | 'people'
    | 'nature'
    | 'foods'
    | 'activity'
    | 'places'
    | 'objects'
    | 'symbols'
    | 'flags'
  >

  /**
   * Custom category icons mapping.
   * Default: `{}`
   */
  categoryIcons?: Record<string, string>

  /**
   * Default skin tone index for emojis. Choices: `1`-`6`.
   * Default: `1`.
   */
  skin?: number

  /**
   * Locale to use for the picker.
   * Default: `en`.
   */
  locale?:
    | 'en'
    | 'ar'
    | 'be'
    | 'cs'
    | 'de'
    | 'es'
    | 'fa'
    | 'fi'
    | 'fr'
    | 'hi'
    | 'it'
    | 'ja'
    | 'ko'
    | 'nl'
    | 'pl'
    | 'pt'
    | 'ru'
    | 'sa'
    | 'tr'
    | 'uk'
    | 'vi'
    | 'zh'

  /**
   * Whether the picker should autofocus the search input.
   * Default: `false`.
   */
  autoFocus?: boolean

  enableFrequentEmojis?: boolean
  enableSearch?: boolean
  enableSkinTones?: boolean
  enableCategoryIcons?: boolean
  enablePreview?: boolean
  enableRecent?: boolean
  enableCustom?: boolean

  onOpen?: () => void
  onClose?: () => void

  /**
   * A function that returns the URL of the spritesheet to use for the picker.
   * Should be compatible with the emoji data provided.
   * Default: `null`.
   */
  getSpritesheetURL?: () => string

  /**
   * Callback when an emoji is selected.
   * Default: `null`.
   */
  onEmojiSelect?: (emoji: EmojiData) => void

  onSkinToneChange?: (skinTone: number) => void
  onCategoryChange?: (category: string) => void
  onSearch?: (query: string) => void

  /**
   * Callback when a click outside of the picker happens.
   * Default: `null`.
   */
  onClickOutside?: () => void

  /**
   * Callback when the "Add custom emoji" button is clicked.
   * The button is shown only when this callback is provided (and when search has no results).
   * Default: `null`.
   */
  onAddCustomEmoji?: () => void

  searchPlaceholder?: string
  searchDisabled?: boolean
  searchMaxResults?: number

  /**
   * Whether the picker should calculate `perLine` dynamically based on width.
   * When enabled, `perLine` is ignored.
   * Default: `false`.
   */
  dynamicWidth?: boolean

  /**
   * An array of colors used for the emoji button hover background.
   * Example: `['#f00', 'pink', 'rgba(155,223,88,.7)']`.
   * Default: `[]`.
   */
  emojiButtonColors?: string[]

  /**
   * Radius of the emoji buttons (e.g. `6px`, `1em`, `100%`).
   * Default: `100%`.
   */
  emojiButtonRadius?: string

  /**
   * Version of emoji data to use. Latest supported: `14`.
   * Choices: `1`, `2`, `3`, `4`, `5`, `11`, `12`, `12.1`, `13`, `13.1`, `14`.
   * Default: `14`.
   */
  emojiVersion?: 1 | 2 | 3 | 4 | 5 | 11 | 12 | '12.1' | 13 | '13.1' | 14

  /**
   * List of emoji IDs to exclude from the picker.
   * Default: `[]`.
   */
  exceptEmojis?: string[]

  /**
   * Type of icons to use. Choices: `auto`, `outline`, `solid`.
   * Default: `auto` (uses `outline` for light theme and `solid` for dark).
   */
  icons?: 'auto' | 'outline' | 'solid'

  /**
   * Whether to show country flags.
   * On some platforms (e.g. Windows) country flags are not supported.
   * Default: `false` (handled automatically when not provided).
   */
  noCountryFlags?: boolean

  /**
   * Emoji id to use when there are no search results.
   * Default: `cry`.
   */
  noResultsEmoji?: string

  /**
   * Emoji id to use in the preview when not hovering any emoji.
   * Default: `point_up` (or `point_down` when preview is top).
   */
  previewEmoji?: string
}

export declare const Picker: React.FunctionComponent<EmojiMartProps>
