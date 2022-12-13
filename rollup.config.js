const { join } = require('path');
const json = require('rollup-plugin-json');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

module.exports = {
  input: join('src', 'createMollieClient.ts'),
  external: [
    // These Node.js internals are external to our bundles…
    'crypto', 'https', 'querystring', 'url', 'util',
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
