const nockfulTests = ['iteration'];

function createProject(displayName, testRegex, rest) {
  return Object.assign({}, rest, {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['jest-bluster'],
    displayName,
    testRegex
  });
}

module.exports = {
  projects: [
    createProject('nockless tests', `/tests/(?!${nockfulTests.join('|')}).*/.+\\.test\\.[jt]s$`),
    createProject('nockful tests', `/tests/(?:${nockfulTests.join('|')}).*/.+\\.test\\.[jt]s$`, {
      // Use this custom runner. It's a normal runner, but by specifying a custom runner, it won't be shared with the
      // other project.
      runner: './tests/runner.js',
    })
  ],
  transform: {
    '\\.[jt]s$': 'babel-jest'
  }
};