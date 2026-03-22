import {defineConfig, defineField, defineType} from 'sanity'
import {structureTool} from 'sanity/structure'
import {EmojiPickerInput, emojiPlugin} from 'sanity-plugin-emoji'

const emojiPluginTest = defineType({
  name: 'emojiPluginTest',
  title: 'Test Document',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji (via plugin type)',
      type: 'emoji',
    }),
    defineField({
      name: 'emojiDirect',
      title: 'Emoji (via component)',
      type: 'string',
      components: {input: EmojiPickerInput},
    }),
  ],
})

export default defineConfig({
  name: 'emoji-plugin-dev',
  title: 'Emoji Plugin Dev Studio',

  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,

  plugins: [structureTool(), emojiPlugin()],

  schema: {
    types: [emojiPluginTest],
  },
})
