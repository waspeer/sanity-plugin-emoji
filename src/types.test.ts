import {defineField} from 'sanity'
import {describe, expectTypeOf, it} from 'vitest'

// These are type-level tests: they fail at compile time if types are wrong,
// not at runtime.

describe('EmojiDefinition type safety', () => {
  it('types value as string in validation callbacks', () => {
    defineField({
      name: 'emoji',
      type: 'emoji',
      validation: (Rule) =>
        Rule.custom((value) => {
          expectTypeOf(value).toExtend<string | undefined>()
          return value ? true : 'Emoji is required'
        }),
    })
  })

  it('types value as string in hidden callbacks', () => {
    defineField({
      name: 'emoji',
      type: 'emoji',
      hidden: ({value, document}) => {
        expectTypeOf(value).toExtend<string | undefined>()
        return !value || document?._type === 'simple'
      },
    })
  })

  it('types value as string in readOnly callbacks', () => {
    defineField({
      name: 'emoji',
      type: 'emoji',
      readOnly: ({value, document}) => {
        expectTypeOf(value).toExtend<string | undefined>()
        return document?.published === true && !value
      },
    })
  })

  it('types initialValue as string', () => {
    defineField({
      name: 'emoji',
      type: 'emoji',
      initialValue: '😀',
    })
  })

  it('accepts all valid pickerOptions', () => {
    defineField({
      name: 'emoji',
      type: 'emoji',
      options: {
        pickerOptions: {
          set: 'apple',
          perLine: 8,
          emojiSize: 20,
          emojiButtonSize: 32,
          previewPosition: 'none',
          skinTonePosition: 'search',
          searchPosition: 'sticky',
          navPosition: 'top',
          categories: ['people', 'nature', 'foods', 'activity'],
          maxFrequentRows: 0,
          enableSkinTones: false,
          enableSearch: true,
          searchPlaceholder: 'Search…',
          locale: 'en',
          noCountryFlags: false,
          exceptEmojis: ['eggplant'],
          autoFocus: false,
        },
      },
    })
  })

  it('rejects invalid enum values for pickerOptions', () => {
    defineField({
      name: 'emoji',
      type: 'emoji',
      options: {
        pickerOptions: {
          // @ts-expect-error — 'invalid' is not a valid emoji set
          set: 'invalid',
        },
      },
    })
    defineField({
      name: 'emoji',
      type: 'emoji',
      options: {
        pickerOptions: {
          // @ts-expect-error — 'sideways' is not a valid previewPosition
          previewPosition: 'sideways',
        },
      },
    })
    defineField({
      name: 'emoji',
      type: 'emoji',
      options: {
        pickerOptions: {
          // @ts-expect-error — 'xx' is not a supported locale
          locale: 'xx',
        },
      },
    })
  })

  it('rejects unknown pickerOptions', () => {
    defineField({
      name: 'emoji',
      type: 'emoji',
      options: {
        pickerOptions: {
          // @ts-expect-error — unknown option
          unknownOption: true,
        },
      },
    })
  })

  it('rejects unknown top-level options', () => {
    defineField({
      name: 'emoji',
      type: 'emoji',
      options: {
        // @ts-expect-error — unknown option
        unknownOption: true,
      },
    })
  })
})
