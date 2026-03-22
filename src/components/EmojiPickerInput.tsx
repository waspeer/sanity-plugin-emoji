import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {FaceHappyIcon, TrashIcon} from '@sanity/icons'
import {Button, Flex, Popover, Stack, Text, useClickOutsideEvent} from '@sanity/ui'
import {getEmojiDataFromNative, init} from 'emoji-mart'
import React, {useCallback, useEffect, useState} from 'react'
import {set, unset} from 'sanity'

import type {EmojiData, EmojiMartProps} from '../types/emoji-mart-types'

// Pick only the relevant options we want to expose, excluding theme and other props we don't want to expose
export type EmojiPickerOptions = Pick<
  EmojiMartProps,
  | 'set'
  | 'perLine'
  | 'emojiSize'
  | 'emojiButtonSize'
  | 'previewPosition'
  | 'skinTonePosition'
  | 'searchPosition'
  | 'navPosition'
  | 'categories'
  | 'maxFrequentRows'
  | 'enableSkinTones'
  | 'enableSearch'
  | 'searchPlaceholder'
  | 'locale'
  | 'noCountryFlags'
  | 'exceptEmojis'
  | 'autoFocus'
>

interface EmojiPickerInputProps {
  value?: string
  onChange: (patch: unknown) => void
  pickerOptions?: EmojiPickerOptions
  schemaType?: {
    options?: {
      pickerOptions?: EmojiPickerOptions
    }
  }
}

/**
 * Emoji picker input component for Sanity Studio
 * @public
 */
export const EmojiPickerInput: React.FC<EmojiPickerInputProps> = ({
  value,
  onChange,
  pickerOptions = {},
  schemaType,
}) => {
  // Merge options from both props and schema type
  const options = {
    ...pickerOptions,
    ...schemaType?.options?.pickerOptions,
  }
  const [isOpen, setIsOpen] = useState(false)
  const [emojiName, setEmojiName] = useState<string | null>(null)

  // Initialize emoji-mart only in browser context (avoids crashes during schema extract/typegen)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      init({data})
    }
  }, [])

  // Fetch emoji name when value changes (guarded for non-browser contexts)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (value) {
      getEmojiDataFromNative(value).then(
        (emojiData) => {
          setEmojiName(emojiData.name)
        },
        (error) => {
          console.error('Failed to get emoji name:', error)
          setEmojiName(null)
        },
      )
    } else {
      setEmojiName(null)
    }
  }, [value])

  const handleEmojiSelect = useCallback(
    (emoji: EmojiData) => {
      onChange(set(emoji.native))
      setIsOpen(false)
    },
    [onChange],
  )

  const handleClear = useCallback(() => {
    onChange(unset())
  }, [onChange])

  const togglePicker = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const [pickerContainer, setPickerContainer] = useState<HTMLDivElement | null>(null)

  useClickOutsideEvent(
    () => setIsOpen(false),
    () => [pickerContainer],
  )

  return (
    <Stack space={3}>
      <Flex gap={4} align="center">
        <Popover
          ref={setPickerContainer}
          open={isOpen}
          placement="bottom-start"
          content={
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              // Apply user-provided options, with sensible defaults
              set={options.set}
              perLine={options.perLine}
              emojiSize={options.emojiSize}
              emojiButtonSize={options.emojiButtonSize}
              previewPosition={options.previewPosition ?? 'none'}
              skinTonePosition={options.skinTonePosition ?? 'search'}
              searchPosition={options.searchPosition}
              navPosition={options.navPosition}
              categories={options.categories}
              maxFrequentRows={options.maxFrequentRows ?? 0}
              enableSkinTones={options.enableSkinTones}
              enableSearch={options.enableSearch}
              searchPlaceholder={options.searchPlaceholder}
              locale={options.locale}
              noCountryFlags={options.noCountryFlags}
              exceptEmojis={options.exceptEmojis}
              autoFocus={options.autoFocus}
              // Disable frequent emojis by default for cleaner UI
              maxFrequentEmojis={0}
            />
          }
        >
          <Button mode="ghost" text="Select emoji" icon={FaceHappyIcon} onClick={togglePicker} />
        </Popover>

        {value && (
          <Flex flex={1} gap={2} align="center">
            <Text size={4} data-testid="emoji-value">{value}</Text>
            {emojiName && (
              <Text muted size={1}>
                - {emojiName}
              </Text>
            )}
          </Flex>
        )}

        {value && <Button aria-label="Clear emoji" mode="ghost" onClick={handleClear} icon={TrashIcon} />}
      </Flex>
    </Stack>
  )
}
