# Sanity Plugin Emoji

A Sanity Studio plugin that provides an emoji picker input component using [emoji-mart](https://github.com/missive/emoji-mart) for React.

- 🎯 Modern emoji picker with search functionality
- 🎨 Light/dark theme support
- 🔍 Emoji search and categorization
- 📱 Responsive design
- 🚀 Built with the latest emoji-mart v1.1.1

## Installation

```bash
npm install sanity-plugin-emoji
# or
yarn add sanity-plugin-emoji
# or
pnpm add sanity-plugin-emoji
```

## Usage

### 1. Add the plugin to your Sanity config

```ts
// sanity.config.ts
import {defineConfig} from 'sanity'
import {emojiPlugin} from 'sanity-plugin-emoji'

export default defineConfig({
  // ... your config
  plugins: [
    // Basic usage
    emojiPlugin(),
    
    // Or with custom configuration
    emojiPlugin({
      set: 'apple',
      perLine: 8,
      categories: ['people', 'nature', 'foods', 'activity'],
    })
  ],
})
```

### 2. Use in your schema (Recommended)

The plugin automatically registers a custom `emoji` type that you can use directly:

```ts
// schemas/post.ts
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'emoji',
      title: 'Emoji',
      type: 'emoji', // Use the custom emoji type
      description: 'Choose an emoji to represent this post',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
    },
  ],
}
```

### 3. Alternative: Direct component usage

You can also use the component directly in custom input components:

```tsx
import {EmojiPickerInput} from 'sanity-plugin-emoji'

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      components: {
        input: EmojiPickerInput, // Use the component directly
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
    },
  ],
}
```

## Features

The emoji picker includes:

- **Search**: Find emojis by name or keywords
- **Categories**: Browse emojis by category (smileys, nature, food, etc.)
- **Skin tones**: Support for different skin tone variations
- **Recent**: Quick access to recently used emojis
- **Native emojis**: Uses native emoji rendering for best performance

## Configuration

The plugin can be configured with various options to customize the emoji picker behavior:

```ts
// sanity.config.ts
import {defineConfig} from 'sanity'
import {emojiPlugin} from 'sanity-plugin-emoji'

export default defineConfig({
  // ... your config
  plugins: [
    emojiPlugin({
      // Emoji set to use ('native' for best performance)
      set: 'apple', // 'native' | 'apple' | 'facebook' | 'google' | 'twitter'
      
      // Layout options
      perLine: 8, // Number of emojis per line (default: 9)
      emojiSize: 20, // Size of emojis in pixels (default: 24)
      emojiButtonSize: 32, // Size of emoji buttons in pixels (default: 36)
      
      // UI positioning
      previewPosition: 'bottom', // 'none' | 'top' | 'bottom' (default: 'none')
      skinTonePosition: 'preview', // 'preview' | 'search' | 'none' (default: 'search')
      searchPosition: 'sticky', // 'sticky' | 'static' | 'none' (default: 'sticky')
      navPosition: 'bottom', // 'top' | 'bottom' | 'none' (default: 'top')
      
      // Category filtering (order is respected)
      categories: ['people', 'nature', 'foods', 'activity'],
      
      // Feature toggles
      enableSkinTones: true, // Enable skin tone variations (default: true)
      enableSearch: true, // Enable search functionality (default: true)
      maxFrequentRows: 2, // Rows of frequently used emojis (default: 4, 0 to disable)
      
      // Localization
      locale: 'en', // Language code (default: 'en')
      searchPlaceholder: 'Find an emoji...', // Search input placeholder
      
      // Advanced options
      autoFocus: true, // Auto-focus search on picker open (default: false)
      noCountryFlags: false, // Hide country flag emojis (default: false)
      exceptEmojis: ['1f4a9'], // Exclude specific emoji IDs
    })
  ],
})
```

### Default Configuration

The emoji picker uses these defaults when no options are provided:

- **Emoji set**: `native` (best performance, uses system emojis)
- **Theme**: Auto-adjusts based on Sanity Studio theme
- **Preview**: Disabled (`none`) to save space
- **Skin tone selector**: Positioned in search area
- **Frequent emojis**: Disabled for cleaner UI
- **Grid**: 9 emojis per line
- **All categories**: Enabled by default

## Development

```bash
# Install dependencies
pnpm install

# Build the plugin
pnpm run build

# Watch for changes
pnpm run watch
```


## Dependencies

- `@emoji-mart/react`: Modern emoji picker component
- `@emoji-mart/data`: Emoji data and search index
- `@sanity/ui`: Sanity Studio UI components

## License

MIT
