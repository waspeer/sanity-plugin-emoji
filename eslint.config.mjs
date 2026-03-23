import eslint from '@eslint/js'
import reactX from '@eslint-react/eslint-plugin'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist/**', 'tsdown.config.ts', 'v2-incompatible.cjs'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  reactX.configs['recommended-typescript'],
  reactHooks.configs.flat.recommended,
  prettierRecommended,
  {
    // Scripts that intentionally use console for output
    files: ['playwright/**'],
    rules: {
      'no-console': 'off',
    },
  },
)
