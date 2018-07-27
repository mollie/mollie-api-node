import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Methods from 'resources/methods';
import Method from 'models/method';

import response from '../__stubs__/methods.json';

const mock = new MockAdapter(axios);

describe('methods', () => {
  let methods;
  beforeEach(() => {
    methods = new Methods(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(Methods.resource).toBe('methods');
    expect(Methods.model).toBe(Method);
  });

  describe('.get()', () => {
    const methodId = 'ideal';
    const error = { error: { message: 'The method id is invalid' } };

    mock.onGet(`/methods/${methodId}`).reply(200, response._embedded.methods[0]);
    mock.onGet('/methods/foo').reply(500, error);

    it('should return a method instance', () =>
      methods.get(methodId).then((result) => {
        expect(result).toBeInstanceOf(Method);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', (done) => {
      methods.get(methodId, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Method);
        expect(result).toMatchSnapshot();
        done();
      });
    });

    it('should return an error for non-existing IDs', () =>
      methods
        .get('foo')
        .then(() => {
          throw new Error('Should reject');
        })
        .catch((err) => {
          expect(err).toBe(error);
        }));

    it('should return an error with a callback for non-existing IDs', (done) => {
      methods.get('foo', (err, result) => {
        expect(err).toBe(error);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('.all()', () => {
    mock.onGet('/methods').reply(200, response);

    it('should return a list of all methods', () =>
      methods.all().then((result) => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', (done) => {
      methods.all((err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });
});
