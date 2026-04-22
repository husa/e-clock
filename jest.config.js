import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: 'node',

  // define globals, mocks, etc.
  setupFiles: ['./test/setup', './test/localStorageMock', './test/chromeMock'],

  // setup test framework
  // eg. change test framework configurations, add custom matchers, etc.
  setupFilesAfterEnv: ['./test/setupFramework'],
  transform: {
    ...tsJestTransformCfg,
  },
};
