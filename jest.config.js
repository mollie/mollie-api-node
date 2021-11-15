module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ],
  transform: {
    '\\.[jt]s$': 'babel-jest'
  },
  setupFilesAfterEnv: [
    'jest-bluster'
  ]
};