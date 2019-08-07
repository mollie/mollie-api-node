import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy-glob';

export default {
  input: 'src/mollie.ts',
  external: [
    // These Node.js interenals are external to our bundles…
    ...['fs', 'https', 'path', 'url'],
    // …as are the dependencies listed in our package.json.
    ...Object.keys(require('./package.json').dependencies)
  ],
  output: [
    { file: 'dist/mollie.cjs.js', format: 'cjs' },
    { file: 'dist/mollie.esm.js', format: 'es' }
  ],
  plugins: [
    json(),
    resolve({
      extensions: ['.ts'],
      customResolveOptions: {
        moduleDirectory: 'src',
      },
      preferBuiltins: true
    }),
    babel({
      extensions: ['.ts']
    }),
    copy([{ files: 'src/cacert.pem', dest: 'dist' }]),
  ],
};