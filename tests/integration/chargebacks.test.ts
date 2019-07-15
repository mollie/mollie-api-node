import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import dotenv from 'dotenv';

let mollie;
if (process.env.RUN_THE_ACTUAL_BUILD === 'true' || process.env.RUN_THE_ACTUAL_BUILD === 'cjs') {
  mollie = require('../../dist/mollie.cjs');
} else {
  mollie = require('../../src/mollie').default;
}

/**
 * Overwrite the default XMLHttpRequestAdapter
 */
axios.defaults.adapter = httpAdapter;

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = mollie({ apiKey: process.env.API_KEY });

describe('chargebacks', () => {
  it('should integrate', done =>
    mollieClient.chargebacks
      .all()
      .then(chargebacks => {
        expect(chargebacks).toBeDefined();
        done();
      })
      .catch(err => {
        expect(err).toBeUndefined();
        done();
      }));
});
