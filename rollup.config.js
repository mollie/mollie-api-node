const { join } = require('path');
const json = require('rollup-plugin-json');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

// Known safe circular dependencies that are intentional by design.
// These cycles exist because the Mollie API returns embedded resources bidirectionally:
// - Payment can embed Chargeback/Refund/Capture
// - Those resources can embed Payment back
// The transform functions mirror this structure, creating intentional cycles that are
// safe at runtime (all modules load before any transform executes).
const knownSafeCycles = [
  // Payment ↔ Chargeback: Payment embeds chargebacks, Chargeback embeds payment
  'src/data/payments/Payment.ts -> src/data/chargebacks/Chargeback.ts -> src/data/payments/Payment.ts',
  // Payment ↔ Refund: Payment embeds refunds, Refund embeds payment
  'src/data/payments/Payment.ts -> src/data/refunds/Refund.ts -> src/data/payments/Payment.ts',
  // Payment ↔ Capture: Payment embeds captures, Capture embeds payment
  'src/data/payments/Payment.ts -> src/data/payments/captures/Capture.ts -> src/data/payments/Payment.ts',
];

module.exports = {
  input: join('src', 'createMollieClient.ts'),
  external: [
    // These Node.js internals are external to our bundles…
    'crypto', 'https', 'querystring', 'url', 'util',
    // …as are the dependencies listed in our package.json.
    ...Object.keys(require('./package.json').dependencies),
  ],
  output: [{ file: join('dist', 'mollie.cjs.js'), format: 'cjs' }, { file: join('dist', 'mollie.esm.js'), format: 'es' }],
  onLog(level, log, defaultHandler) {
    // Suppress specific circular dependency warnings
    if (log.code === 'CIRCULAR_DEPENDENCY') {
      // Only suppress if this is a known, documented safe cycle
      if (knownSafeCycles.some(cycle => log.message && log.message.includes(cycle))) {
        return;
      }
    }

    // Suppress "mixing named and default exports" warning.
    // The library exports both a default export (createMollieClient) and named exports
    // (types, enums, etc.). This is intentional for a better developer experience.
    if (log.code === 'MIXED_EXPORTS') {
      return;
    }

    // Pass all other logs through
    defaultHandler(level, log);
  },
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
