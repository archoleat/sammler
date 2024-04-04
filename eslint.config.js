import { defineFlatConfig } from 'eslint-define-config';
import { extend } from '@archoleat/eslint-flat-compatibility';

import globals from 'globals';
import typescriptParser from '@typescript-eslint/parser';
import unicorn from 'eslint-plugin-unicorn';

export default defineFlatConfig([
  ...extend('airbnb-base', 'plugin:import/recommended'),
  unicorn.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: typescriptParser,
    },
    rules: {
      'import/exports-last': 'error',
      'import/extensions': ['error', { js: 'always' }],
      'import/group-exports': 'error',
      'import/no-commonjs': 'error',
      'import/no-namespace': 'error',
      'import/no-unassigned-import': 'error',
      'unicorn/no-unused-properties': 'error',
      'unicorn/string-content': 'error',
    },
  },
]);
