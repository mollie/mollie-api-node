import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript';
import url from 'rollup-plugin-url';

const base = {
  input: 'src/mollie.ts',
  external: ['fs', 'https', 'path', 'axios', 'qs', 'lodash/omit', 'lodash/toPlainObject'],
  plugins: [
    json(),
    typescript(),
    url({ limit: 0, include: ['**/*.pem'] }),
  ],
};

const cjs = Object.assign({}, base, { output: { file: 'dist/cjs/mollie.js', format: 'cjs' } });
const esm = Object.assign({}, base, { output: { file: 'dist/esm/mollie.js', format: 'es' } });

export default [cjs, esm];
