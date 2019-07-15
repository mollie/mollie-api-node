import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy-glob';

export default {
  input: 'src/mollie.ts',
  external: ['fs', 'https', 'path', 'axios', 'qs', 'lodash/omit', 'lodash/toPlainObject'],
  output: [{ file: 'dist/mollie.cjs.js', format: 'cjs' }, { file: 'dist/mollie.esm.js', format: 'es' }],
  plugins: [
    json(),
    typescript({
      typescript: require('typescript'),
    }),
    copy([{ files: 'src/cacert.pem', dest: 'dist' }]),
  ],
};
