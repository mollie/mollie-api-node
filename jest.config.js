const nockfulTests = ['communication', 'iteration', 'paymentLinks', 'profiles', 'settlements'];

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
  projects.push(createProject('nockful tests', `/tests/(?:${nockfulTests.join('|')}).*/.+\\.test\\.[jt]s$`));
}

module.exports = {
  projects,
  transform: {
    '\\.[jt]s$': 'babel-jest'
  }
};