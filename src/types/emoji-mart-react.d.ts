import type React from 'react'

declare module '@emoji-mart/react' {
  import type {EmojiMartProps} from '@emoji-mart/types'
  declare const Picker: React.FunctionComponent<EmojiMartProps>
  export default Picker
}
