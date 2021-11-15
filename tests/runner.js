class Runner extends require('jest-runner') {
  constructor(...passingArguments) {
    super(...passingArguments);
    // this.isSerial = true;
  }
}

module.exports = Runner;