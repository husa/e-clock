module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:storybook/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    chrome: false,
    ENV: false,
    __YAHOO_APP_ID__: false,
    __YAHOO_CONSUMER_KEY__: false,
    __YAHOO_CONSUMER_SECRET__: false,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/prop-types': 'warn',
  },
};
