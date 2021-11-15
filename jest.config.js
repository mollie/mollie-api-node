const nockfulTests = ['iteration'];

function createProject(displayName, testRegex, rest) {
  return Object.assign({}, rest, {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['jest-bluster'],
    displayName,
    testRegex
  });
}

const projects = [
  createProject('nockless tests', `/tests/(?!${nockfulTests.join('|')}).*/.+\\.test\\.[jt]s$`)
];

// Only execute the Nockful tests on Node.js 8+.
if (parseInt(process.version.substring(1)) >= 8) {
  projects.push(createProject('nockful tests', `/tests/(?:${nockfulTests.join('|')}).*/.+\\.test\\.[jt]s$`, {
    // Use this custom runner. It's a normal runner, but by specifying a custom runner, it won't be shared with the
    // other project.
    runner: './tests/runner.js',
  }));
}

module.exports = {
  projects,
  transform: {
    '\\.[jt]s$': 'babel-jest'
  }
};