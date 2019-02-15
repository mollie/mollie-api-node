import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy-glob';

export default {
  input: 'src/mollie.ts',
  external: ['fs', 'https', 'path', 'axios', 'qs', 'lodash/omit', 'lodash/toPlainObject'],
  output: [
    { file: 'dist/cjs/mollie.js', format: 'cjs' },
    { file: 'dist/esm/mollie.js', format: 'es' },
  ],
  plugins: [
    json(),
    typescript(),
    copy([
      { files: 'src/cacert.pem', dest: 'dist/cjs' },
      { files: 'src/cacert.pem', dest: 'dist/esm' },
    ]),
  ],
};
