# Pull Request

## Title

```
fix: defer emoji-mart init for non-browser typegen safety + ESLint flat config + build fixes
```

## Description

### Summary

Fixes plugin failures when used in non-browser contexts (e.g. Sanity schema extraction / typegen), migrates ESLint to flat config, and resolves build tooling issues.

### Changes

#### 1. Emoji picker non-browser safety (`EmojiPickerInput.tsx`)

- **Problem:** `emoji-mart` initialized at module load time (`init({data})`), causing crashes when the plugin was imported during `sanity schema extract` / typegen (no `HTMLCanvasElement`, etc.).
- **Fix:**
  - Moved `init({data})` into a `useEffect` that only runs when `typeof window !== 'undefined'`
  - Guarded `getEmojiDataFromNative` with the same window check

Studio emoji picker behavior is unchanged; typegen and schema extraction no longer fail due to import-time side effects.

#### 2. ESLint flat config migration

- Replaced `.eslintrc` with `eslint.config.js` using `FlatCompat` to reuse legacy Sanity configs
- Removed `.eslintignore`; ignores moved into flat config
- Added `@eslint/eslintrc` and `@eslint/js` as devDependencies
- Updated lint script: `ESLINT_USE_FLAT_CONFIG=true eslint .`

#### 3. Build fixes

- Bumped `@sanity/plugin-kit` from `^4.0.19` to `^4.0.20` to fix Node 20/22 ESM loader crashes (`getStatus` / `module not in cache` errors)
- Standard build script restored; no `npx` workaround or `sanityPlugin.verifyPackage` overrides needed
- `plugin-kit verify-package` and `eslintImports` checks both pass

### Validation

- `pnpm run build` succeeds
- `pnpm run lint` succeeds
- No content model changes (`flag` remains `type: 'emoji'`)

---

## Commit Message

```
fix: defer emoji-mart init for non-browser typegen safety + ESLint flat config + build fixes

- Move init({data}) into useEffect with window guard (EmojiPickerInput)
- Guard getEmojiDataFromNative behind typeof window check
- Migrate ESLint to flat config (eslint.config.js + FlatCompat)
- Update @sanity/plugin-kit to ^4.0.20 (fixes Node ESM loader crashes)
- Add @eslint/eslintrc, @eslint/js; remove .eslintrc, .eslintignore

Studio emoji picker behavior unchanged. Typegen/schema extract no longer
crashes. Build and lint pass with plugin-kit verify-package.
```
