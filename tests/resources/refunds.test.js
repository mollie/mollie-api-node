import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Refunds from 'resources/refunds';
import Refund from 'models/refund';

import response from '../__stubs__/refunds.json';

const mock = new MockAdapter(axios);

const props = {
  id: 're_4qqhO89gsT',
  amount: 5.95,
};

describe('refunds', () => {
  let refunds;
  beforeEach(() => {
    refunds = new Refunds(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(Refunds.resource).toBe('refunds');
    expect(Refunds.model).toBe(Refund);
  });

  describe('.create()', () => {
    mock.onPost(`/refunds`, props).reply(200, response.data[0]);

    it('should return a refund instance', () =>
      refunds.create(props).then((result) => {
        expect(result).toBeInstanceOf(Refund);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', (done) => {
      refunds.create(props, (err, result) => {
        expect(result).toBeInstanceOf(Refund);
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });

  describe('.get()', () => {
    const error = { error: { message: 'The payments_refund id is invalid' } };

    mock.onGet(`/refunds/${props.id}`).reply(200, response.data[0]);
    mock.onGet(`/refunds/foo`).reply(500, error);

    it('should return a refund instance', () =>
      refunds
        .get(props.id)
        .then((result) => {
          expect(result).toBeInstanceOf(Refund);
          expect(result).toMatchSnapshot();
        }));

    it('should return an error for non-existing IDs', () =>
      refunds
        .get('foo')
        .then(() => {
          throw new Error('Should reject');
        })
        .catch((err) => {
          expect(err).toBe(error);
        }));
  });

  describe('.all()', () => {
    mock.onGet(`/refunds`).reply(200, response);

    it('should return a list of all payment refunds', () =>
      refunds.all().then((result) => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('totalCount');
        expect(result).toHaveProperty('offset');
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', (done) => {
      refunds
        .withParent({
          resource: 'payment',
          id: props.paymentId,
        })
        .all((err, result) => {
          expect(err).toBeNull();
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveProperty('totalCount');
          expect(result).toHaveProperty('offset');
          expect(result).toHaveProperty('links');
          expect(result).toMatchSnapshot();
          done();
        });
    });
  });

  describe('.delete()', () => {
    mock.onDelete(`/refunds/${props.id}`).reply(200, response.data[0]);

    it('should return a refund instance', () =>
      refunds
        .delete(props.id)
        .then((result) => {
          expect(result).toBeInstanceOf(Refund);
          expect(result).toMatchSnapshot();
        }));

    it('should work with a callback and legacy delete', (done) => {
      refunds
        .withParent({
          resource: 'payment',
          id: props.paymentId,
        })
        .delete(props.id, (err, result) => {
          expect(err).toBeNull();
          expect(result).toBeInstanceOf(Refund);
          expect(result).toMatchSnapshot();
          done();
        });
    });
  });
});
