import globals from 'globals';

import { defineFlatConfig } from 'eslint-define-config';
import { FlatCompat } from '@eslint/eslintrc';
import { resolve } from 'node:path';

import typescriptParser from '@typescript-eslint/parser';
import unicorn from 'eslint-plugin-unicorn';

const compat = new FlatCompat({
  baseDirectory: resolve(),
  resolvePluginsRelativeTo: resolve(),
});

export default [
  ...compat.extends('airbnb-base', 'plugin:import/recommended'),
  unicorn.configs['flat/recommended'],
  {
    languageOptions: {
      parser: typescriptParser,
      globals: {
        ...globals.browser,
      },
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
];
