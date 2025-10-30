import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import securityPlugin from 'eslint-plugin-security';

export default defineConfig([
  globalIgnores([
    'dist',
    'postcss.config.js',
    'tailwind.config.js',
    'vite.config.js',
  ]),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    // map plugin name -> module so flat config can use legacy plugins
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      security: securityPlugin,
    },
    extends: [
      js.configs.recommended,
      securityPlugin?.configs?.recommended || 'plugin:security/recommended',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'security/detect-object-injection': 'off',
    },
  },
]);
