import { defineFlatConfig } from 'eslint-define-config';
import { extend } from '@archoleat/eslint-flat-compatibility';

import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import typescriptParser from '@typescript-eslint/parser';

export default defineFlatConfig([
  ...extend('airbnb-base', 'plugin:import/recommended'),
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
      },
      parser: typescriptParser,
      sourceType: 'module',
    },
    rules: {
      'import/exports-last': 'error',
      'import/extensions': ['error', { js: 'always' }],
      'import/group-exports': 'error',
      'import/no-commonjs': 'error',
      'import/no-default-export': 'error',
      'import/no-namespace': 'error',
      'import/no-unassigned-import': 'error',
      'import/prefer-default-export': 'off',
      'unicorn/no-unused-properties': 'error',
      'unicorn/string-content': 'error',
    },
  },
  eslintConfigPrettier,
]);
