import {defineConfig} from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  tsconfig: 'tsconfig.dist.json',
  // Externalize all dependencies — we're a library, not an app
  deps: {
    neverBundle: [/^react/, /^sanity/, /^@sanity/, /^emoji-mart/, /^@emoji-mart/, /^styled-components/],
  },
  // Suppress MIXED_EXPORTS warning: our entry uses both named and default exports intentionally
  outputOptions: {
    exports: 'named',
  },
})
