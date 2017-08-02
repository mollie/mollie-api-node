import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import includePaths from 'rollup-plugin-includepaths';
import url from 'rollup-plugin-url';

export default {
  entry: 'src/mollie.js',
  format: 'cjs',
  dest: 'dist/mollie.js',
  plugins: [
    json(),
    babel({ exclude: 'node_modules/**' }),
    includePaths({ paths: ['src'] }),
    url({ limit: 0, include: ['**/*.pem'] }),
  ],
};
