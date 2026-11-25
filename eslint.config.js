import path from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'coverage', 'vite.config.ts', 'eslint.config.js']),

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...compat.extends('airbnb-base'),
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier, // ⚠️ DEVE SER O ÚLTIMO — desativa regras que conflitam com Prettier
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      // ----- Desativa conflitos com TypeScript -----
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-shadow': 'off',
      'no-use-before-define': 'off',
      'no-undef': 'off', // TS já cobre

      // ----- Desativa regras incompatíveis com Vite/React/SPA -----
      'import/prefer-default-export': 'off', // usamos named exports
      'import/extensions': 'off', // Vite resolve
      'import/no-extraneous-dependencies': 'off', // devDeps no build
      'import/no-unresolved': 'off', // TS resolve
      'import/no-cycle': 'off', // lento e com falsos positivos
      'import/order': 'off', // refatoração separada (commit 12)

      // ----- Regras do airbnb que divergem da stack moderna -----
      'no-plusplus': 'off', // comum em carrosséis
      'no-await-in-loop': 'off',
      'no-restricted-syntax': 'off', // permite for...of
      'prefer-destructuring': 'off', // 20+ violações hoje; alvo de refactor futuro
      'no-underscore-dangle': ['error', { allow: ['_id'] }], // exceção _id (TripleTen)
      'no-param-reassign': ['error', { props: false }], // permite mutar estado local

      // ----- Qualidade -----
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',

      // ----- React Refresh -----
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  // Exceção: logger.ts é o único que pode usar console.*
  {
    files: ['src/utils/logger.ts'],
    rules: {
      'no-console': 'off',
    },
  },
]);
