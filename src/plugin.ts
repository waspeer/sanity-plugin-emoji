import {definePlugin} from 'sanity'

import {EmojiPickerInput, type EmojiPickerOptions} from './components/EmojiPickerInput'

/**
 * Configuration options for the emoji plugin
 * @public
 */
export type EmojiPluginOptions = Partial<EmojiPickerOptions>

/**
 * Emoji Picker Plugin for Sanity Studio
 * @public
 *
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {emojiPlugin} from 'sanity-plugin-emoji'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [
 *     emojiPlugin({
 *       set: 'apple',
 *       perLine: 8,
 *       categories: ['people', 'nature', 'foods', 'activity'],
 *       enableSkinTones: false,
 *     })
 *   ],
 * })
 * ```
 *
 * Then use in your schema:
 * ```ts
 * {
 *   name: 'emoji',
 *   title: 'Emoji',
 *   type: 'emoji', // Use the custom emoji type
 * }
 * ```
 *
 * Or use the component directly in custom input components:
 * ```ts
 * {
 *   name: 'emoji',
 *   title: 'Emoji',
 *   type: 'string',
 *   components: {
 *     input: EmojiPickerInput
 *   }
 * }
 * ```
 */
export const emojiPlugin = definePlugin<EmojiPluginOptions | void>((options = {}) => {
  return {
    name: 'sanity-plugin-emoji',
    schema: {
      types: [
        {
          name: 'emoji',
          title: 'Emoji',
          type: 'string',
          components: {
            input: EmojiPickerInput,
          },
          options: {
            pickerOptions: options,
          },
        },
      ],
    },
  }
})

// Export the input component for direct use in schemas
export {EmojiPickerInput}
