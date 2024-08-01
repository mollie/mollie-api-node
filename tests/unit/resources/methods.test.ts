import MethodsBinder from '../../../src/binders/methods/MethodsBinder';
import NetworkClient from '../../../src/communication/NetworkClient';
import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

import ApiError from '../../../src/errors/ApiError';
import response from '../__stubs__/methods.json';

describe('methods', () => {
  let methods: MethodsBinder;
  beforeEach(() => {
    methods = new MethodsBinder(new NetworkClient({ apiKey: 'mock-api-key', nodeVersion: process.version, libraryVersion: 'mock' }));
  });

  describe('.get()', () => {
    const methodId = 'ideal';
    const error = { detail: 'The method id is invalid' };

    it('should return a method instance', () => {
      return new NetworkMocker(getApiKeyClientProvider()).use(async ([, networkMocker]) => {
        networkMocker.intercept('GET', `/methods/${methodId}`, 200, response._embedded.methods[0]);
        const result = await methods.get(methodId);
        expect(result).toMatchSnapshot();
      });
    });

    it('should work with a callback', done => {
      new NetworkMocker(getApiKeyClientProvider()).use(async ([, networkMocker]) => {
        networkMocker.intercept('GET', `/methods/${methodId}`, 200, response._embedded.methods[0]);
        methods.get(methodId, {}, (err, result) => {
          expect(err).toBeNull();
          expect(result).toMatchSnapshot();
          done();
        });
      });
    });

    it('should throw an error for non-existent IDs', () => {
      return new NetworkMocker(getApiKeyClientProvider()).use(async ([, networkMocker]) => {
        networkMocker.intercept('GET', '/methods/foo', 500, error);
        await methods
          .get('foo')
          .then(() => {
            throw new Error('Promise should throw');
          })
          .catch(err => {
            expect(err).toBeInstanceOf(ApiError);
            expect(err.getMessage()).toEqual(error.detail);
          });
      });
    });

    it('should return an error with a callback for non-existent IDs', done => {
      new NetworkMocker(getApiKeyClientProvider()).use(async ([, networkMocker]) => {
        networkMocker.intercept('GET', '/methods/foo', 500, error);
        methods.get('foo', {}, (err: any, result) => {
          expect(err).toBeInstanceOf(ApiError);
          expect(err.getMessage()).toEqual(error.detail);
          expect(result).toBeUndefined();
          done();
        });
      });
    });
  });

  describe('.list()', () => {
    it('should return a list of all methods', () => {
      return new NetworkMocker(getApiKeyClientProvider()).use(async ([, networkMocker]) => {
        networkMocker.intercept('GET', '/methods', 200, response);
        const result = await methods.list();
        expect(result).toMatchSnapshot();
      });
    });

    it('should work with a callback', done => {
      new NetworkMocker(getApiKeyClientProvider()).use(async ([, networkMocker]) => {
        networkMocker.intercept('GET', '/methods', 200, response);
        methods.list({}, (err, result) => {
          expect(err).toBeNull();
          expect(result).toMatchSnapshot();
          done();
        });
      });
    });
  });
});
