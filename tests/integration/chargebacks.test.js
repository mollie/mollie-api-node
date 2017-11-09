import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import dotenv from 'dotenv';

import mollie from '../../dist/mollie';

console.log = function(msg) {
  process.stdout.write(`${msg}\n`);
};

/**
 * Overwrite the default XMLHttpRequestAdapter
 */
axios.defaults.adapter = httpAdapter;

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = mollie({ apiKey: process.env.API_KEY });

console.log('process.env', process.env);
console.log('mollieClient', mollieClient);

describe('chargebacks', () => {
  it('should integrate', done =>
    mollieClient.chargebacks.all()
      .then((chargebacks) => {
        expect(chargebacks).toBeDefined();
        done();
      })
      .catch((err) => {
        expect(err).toBeNull();
        done();
      }),
  );
});
