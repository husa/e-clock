module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:flowtype/recommended',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    chrome: false,
    ENV: false,
    WEATHER_API_KEY: false,
  },
  plugins: ['react', 'flowtype', 'jest', 'import'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'arrow-body-style': [1, 'as-needed'],
    'newline-after-var': 0,
    curly: [2, 'multi-line', 'consistent'],
    indent: [2, 2, { SwitchCase: 1 }],
    'one-var': 0,
    'no-magic-numbers': 0,
    'prefer-const': 0,
    'no-extra-parens': 0,
    'guard-for-in': 0,

    // react specific
    'react/prop-types': 0,
    // jsx
    'react/jsx-closing-bracket-location': [
      1,
      {
        selfClosing: 'after-props',
        nonEmpty: 'after-props',
      },
    ],
    'react/jsx-curly-spacing': [2, 'never'],
    'react/jsx-equals-spacing': [2, 'never'],
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-key': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-pascal-case': 2,
  },
};
