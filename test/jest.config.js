/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

process.env.TZ = 'UTC';

module.exports = {
  rootDir: '../',
  setupFiles: ['<rootDir>/test/setupTests.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.jest.ts'],
  roots: ['<rootDir>'],
  testMatch: ['**/*.test.js', '**/*.test.jsx', '**/*.test.ts', '**/*.test.tsx'],
  clearMocks: true,
  modulePathIgnorePatterns: ['<rootDir>/offline-module-cache/'],
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/', '/__utils__/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/test/',
    '<rootDir>/public/requests/',
    '/__utils__/',
  ],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { diagnostics: false }],
    'node_modules/(langchain|langsmith)/.+\\.js$': ['ts-jest', { diagnostics: false }],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!langchain|langsmith)'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/test/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\@algolia/autocomplete-theme-classic$': '<rootDir>/test/__mocks__/styleMock.js',
    '^!!raw-loader!.*': 'jest-raw-loader',
  },
  testEnvironment: 'jsdom',
};
