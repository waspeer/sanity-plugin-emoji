import type {
  BaseSchemaDefinition,
  ConditionalPropertyCallbackContext,
  InitialValueProperty,
  StringRule,
  ValidationBuilder,
} from 'sanity'

import type {EmojiPickerOptions} from './components/EmojiPickerInput'

export type {EmojiPickerOptions}

export interface EmojiOptions {
  pickerOptions?: EmojiPickerOptions
}

export type EmojiConditionalPropertyCallbackContext = Omit<
  ConditionalPropertyCallbackContext,
  'value'
> & {
  value: string | undefined
}

export type EmojiConditionalProperty =
  | boolean
  | ((context: EmojiConditionalPropertyCallbackContext) => boolean)
  | undefined

export interface EmojiDefinition extends Omit<BaseSchemaDefinition, 'hidden' | 'readOnly'> {
  type: 'emoji'
  options?: EmojiOptions
  hidden?: EmojiConditionalProperty
  readOnly?: EmojiConditionalProperty
  validation?: ValidationBuilder<StringRule, string>
  initialValue?: InitialValueProperty<any, string>
}

// Extend the Sanity schema types to include our custom emoji type
declare module 'sanity' {
  export interface IntrinsicDefinitions {
    emoji: EmojiDefinition
  }
}
