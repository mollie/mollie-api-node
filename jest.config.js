module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-bluster'],
  testRegex: '/tests/.*/.+\\.test\\.[jt]s$',
  transform: {
    '\\.[jt]s$': 'babel-jest'
  }
};