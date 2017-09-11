import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import dotenv from 'dotenv';

import mollie from '../../dist/mollie';

/**
 * Overwrite the default XMLHttpRequestAdapter
 */
axios.defaults.adapter = httpAdapter;

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = mollie({ apiKey: process.env.API_KEY });

describe('issuers', () => {
  it('should integrate', (done) => {
    mollieClient.issuers.all()
      .then((issuers) => {
        expect(issuers).toBeDefined();

        mollieClient.issuers.get(issuers[0].id)
          .then((issuer) => {
            expect(issuer).toBeDefined();
            done();
          })
          .catch((err) => {
            expect(err).toBeNull();
            done();
          });
      })
      .catch((err) => {
        expect(err).toBeNull();
        done();
      });
  });
});
