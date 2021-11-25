import { join } from 'path';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: join('src', 'createMollieClient.ts'),
  external: [
    // These Node.js interenals are external to our bundles…
    'https', 'querystring', 'url', 'util',
    // …as are the dependencies listed in our package.json.
    ...Object.keys(require('./package.json').dependencies),
  ],
  output: [{ file: join('dist', 'mollie.cjs.js'), format: 'cjs' }, { file: join('dist', 'mollie.esm.js'), format: 'es' }],
  plugins: [
    json(),
    resolve({
      extensions: ['.ts'],
      customResolveOptions: {
        moduleDirectory: 'src',
      },
      preferBuiltins: true,
    }),
    babel({
      extensions: ['.ts'],
    }),
    {
      name: 'cert',
      transform(code, id) {
        if (id.endsWith('.pem') == false) {
          return null;
        }
        return {
          code: `export default ${JSON.stringify(code)}`,
          map: { mappings: '' }
        };
      }
    }
  ],
};
