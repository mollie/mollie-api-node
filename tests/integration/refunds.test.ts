import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import dotenv from 'dotenv';

import mollie from '../../src/mollie';

/**
 * Overwrite the default XMLHttpRequestAdapter
 */
axios.defaults.adapter = httpAdapter;

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = mollie({ apiKey: process.env.API_KEY });

describe('refunds', () => {
  it('should integrate', () =>
    mollieClient.refunds
      .all()
      .then(refunds => expect(refunds).toBeDefined())
      .catch(err => expect(err).toBeNull()));
});
