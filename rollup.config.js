import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import includePaths from 'rollup-plugin-includepaths';
import url from 'rollup-plugin-url';

export default {
  input: 'src/mollie.js',
  output: {
    format: 'cjs',
    file: 'dist/mollie.js',
  },
  plugins: [
    json(),
    babel({ exclude: 'node_modules/**', plugins: ['@babel/external-helpers'] }),
    includePaths({ paths: ['src'] }),
    url({ limit: 0, include: ['**/*.pem'] }),
  ],
};
