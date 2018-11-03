import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';
import url from 'rollup-plugin-url';

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
    url({ limit: 0, include: ['**/*.pem'] }),
  ],
};
