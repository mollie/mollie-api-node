import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Issuers from 'resources/issuers';
import Issuer from 'models/issuer';

import response from '../__stubs__/issuers.json';

const mock = new MockAdapter(axios);

describe('issuers', () => {
  let issuers;
  beforeEach(() => {
    issuers = new Issuers(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(Issuers.resource).toBe('issuers');
    expect(Issuers.model).toBe(Issuer);
  });

  describe('.get()', () => {
    const issuerId = 'ideal_ABNANL2A';
    const error = { error: { message: 'The issuer id is invalid' } };

    mock.onGet(`/issuers/${issuerId}`).reply(200, response.data[0]);
    mock.onGet('/issuers/foo').reply(500, error);

    it('should return a issuer instance', () =>
      issuers.get(issuerId).then((result) => {
        expect(result).toBeInstanceOf(Issuer);
      }));

    it('should work with a callback', (done) => {
      issuers.get(issuerId, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Issuer);
        done();
      });
    });

    it('should return an error for non-existing IDs', () =>
      issuers
        .get('foo')
        .then(() => {
          throw new Error('Should reject');
        })
        .catch((err) => {
          expect(err).toBe(error);
        })
    );

    it('should return an error with a callback for non-existing IDs', (done) => {
      issuers.get('foo', (err, result) => {
        expect(err).toBe(error);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('.all()', () => {
    mock.onGet('/issuers').reply(200, response);

    it('should return a list of all issuers', () =>
      issuers.all().then((result) => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('totalCount');
        expect(result).toHaveProperty('offset');
        expect(result).toHaveProperty('links');
        expect(result).toHaveLength(10);
      }));

    it('should work with a callback', (done) => {
      issuers.all((err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('totalCount');
        expect(result).toHaveProperty('offset');
        expect(result).toHaveProperty('links');
        expect(result).toHaveLength(10);
        done();
      });
    });
  });
});
