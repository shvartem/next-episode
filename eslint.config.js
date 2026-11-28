import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'max-lines': ['error', 120],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'IfStatement > :not(BlockStatement).consequent',
          message: 'Use braces around the body of an if statement.',
        },
        {
          selector: 'IfStatement > :not(BlockStatement):not(IfStatement).alternate',
          message: 'Use braces around the body of an else statement.',
        },
      ],
      '@stylistic/jsx-newline': ['error', { prevent: true, allowMultilines: true }],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: '*', next: ['if', 'for', 'while', 'switch', 'try', 'return'] },
        { blankLine: 'always', prev: ['if', 'for', 'while', 'switch', 'try'], next: '*' },
        { blankLine: 'always', prev: 'multiline-expression', next: '*' },
        { blankLine: 'always', prev: '*', next: 'multiline-expression' },
      ],
    },
  },
])
