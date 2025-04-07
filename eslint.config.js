export default {
    root: true,
    env: {
      node: true,
      es2021: true,
    },
    // Extend recommended ESLint rules and TypeScript rules
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
      // Add or override rules here
    },
  };
  