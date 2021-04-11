module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/presentation/errors/**',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['index.ts'],
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
  },
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/tests'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  watchPathIgnorePatterns: ['globalConfig'],
};
