/* eslint-disable */

// const { pathsToModuleNameMapper } = require("ts-jest");
// const { compilerOptions } = require("./tsconfig");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ["<rootDir>"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/mocks/fileMock.js',
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      { tsconfig: "tsconfig.test.json" }
    ],
  },
};