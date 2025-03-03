import js from '@eslint/js';
import globals from 'globals';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: '.',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
      react,
    },
    settings: {
      react: {
        version: '19.0',
        fragment: 'Fragment',
      },
      linkComponents: [{ name: 'Link', linkAttribute: 'to' }],
    },
    rules: {
      // Use recommended React rules
      ...react.configs.recommended.rules,
      // Use recommended JSX runtime rules
      ...react.configs['jsx-runtime'].rules,
      // Use recommended React Hooks rules
      ...reactHooks.configs.recommended.rules,
      // Warn if only exporting components
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Enforce react-compiler rules
      'react-compiler/react-compiler': 'error',
      // Prevent variables used in JSX from being marked as unused
      'react/jsx-uses-vars': 'error',
      // Enforce consistent use of curly braces in JSX
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      // Enforce self-closing tags for components without children
      'react/self-closing-comp': ['error', { component: true, html: true }],
      // Prevent unnecessary fragments in JSX
      'react/jsx-no-useless-fragment': 'error',
      // Prevent rendering of potentially unsafe JSX
      'react/jsx-no-leaked-render': 'error',
      // Warn about unstable nested components
      'react/no-unstable-nested-components': 'warn',
      // Disable PropTypes requirement when using TypeScript
      'react/prop-types': 'off',
    },
  },
);
