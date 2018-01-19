module.exports = {

  // define globals, mocks, etc.
  setupFiles: [
    './test/setup',
    './test/fetchMock',
    './test/localStorageMock',
    './test/chromeMock'
  ],

  // setup test framework
  // eg. change test framework configurations, add custom matchers, etc.
  setupTestFrameworkScriptFile: './test/setupFramework',

  // define globals
  globals: {
    ENV: 'development'
  },

  reporters: ['default'],

  testMatch: [
    '**/__tests__/**/?(*.)(spec|test).js' // match all *.test.js files in __tests__ folders
  ],

  transform: {
    '\\.(js|jsx)$': 'babel-jest'
  },

  moduleNameMapper: {
    '\\.(s?css|sass|less|styl)$': 'identity-obj-proxy'
  }
};
