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

describe('methods', () => {
  it('should integrate', done => {
    mollieClient.methods
      .all()
      .then(methods => {
        expect(methods).toBeDefined();

        mollieClient.methods
          .get(methods[0].id)
          .then(method => {
            expect(method).toBeDefined();
            done();
          })
          .catch(err => {
            expect(err).toBeDefined();
            done();
          });
      })
      .catch(err => {
        expect(err).toBeDefined();
        done();
      });
  });
});
