import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Chargebacks from '../../../src/resources/chargebacks';

import response from '../__stubs__/chargebacks.json';

const mock = new MockAdapter(axios);

describe('chargebacks', () => {
  let chargebacks: Chargebacks;

  beforeEach(() => {
    chargebacks = new Chargebacks(axios.create());
  });

  describe('.all()', () => {
    mock.onGet('/chargebacks').reply(200, response);

    it('should return a list of all chargebacks', () =>
      chargebacks.all().then(result => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      chargebacks.all((err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });
});
