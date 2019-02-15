import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Chargebacks from '../../../src/resources/chargebacks';

import response from '../__stubs__/chargebacks.json';
import Chargeback from '../../../src/models/Chargeback';
import List from '../../../src/models/List';

const mock = new MockAdapter(axios);

describe('chargebacks', () => {
  let chargebacks: Chargebacks;

  beforeEach(() => {
    chargebacks = new Chargebacks(axios.create());
  });

  describe('.list()', () => {
    mock.onGet('/chargebacks').reply(200, response);

    it('should return a list of all chargebacks', done => {
      chargebacks
        .list()
        .then(result => {
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveProperty('links');
          expect(result).toMatchSnapshot();
          done();
        })
        .catch(error => {
          expect(error).toBeUndefined();
        });
    });

    it('should work with a callback', done => {
      chargebacks.list(null, (err: any, chargebacks: List<Chargeback>) => {
        expect(err).toBeNull();
        expect(chargebacks).toBeInstanceOf(Array);
        expect(chargebacks).toHaveProperty('links');
        expect(chargebacks).toMatchSnapshot();
        done();
      });
    });
  });
});
