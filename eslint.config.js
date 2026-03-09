const {FlatCompat} = require('@eslint/eslintrc')
const js = require('@eslint/js')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

module.exports = [
  {
    ignores: [
      'dist/**',
      '.eslintrc.js',
      'commitlint.config.js',
      'eslint.config.js',
      'lint-staged.config.js',
      'package.config.ts',
      'v2-incompatible.js',
    ],
  },
  ...compat.extends(
    'sanity',
    'sanity/react',
    'sanity/typescript',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
  ),
]
