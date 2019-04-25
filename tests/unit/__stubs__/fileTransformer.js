module.exports = {
  process(src, filename) {
    return 'module.exports = "' + filename + '";';
  },
};
