import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import dotenv from 'dotenv';
import createMollieClient from '../..';

/**
 * Overwrite the default XMLHttpRequestAdapter
 */
axios.defaults.adapter = httpAdapter;

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = createMollieClient({ apiKey: process.env.API_KEY });

describe('chargebacks', () => {
  it('should integrate', done =>
    mollieClient.chargebacks
      .all()
      .then(chargebacks => {
        expect(chargebacks).toBeDefined();
        done();
      })
      .catch(err => {
        expect(err).toBeDefined();
        done();
      }));
});
