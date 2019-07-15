import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import ChargebacksResource from '../../../src/resources/chargebacks';
import Chargeback from '../../../src/models/Chargeback';
import List from '../../../src/models/List';
import response from '../__stubs__/chargebacks.json';

const mock = new MockAdapter(axios);

describe('chargebacks', () => {
  let chargebacks: ChargebacksResource;

  beforeEach(() => {
    chargebacks = new ChargebacksResource(axios.create());
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
        .catch(err => expect(err).toBeUndefined());
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
