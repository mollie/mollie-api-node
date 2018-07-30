import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import CustomersMandates from 'resources/customers/mandates';
import Mandate from 'models/mandate';

import response from '../../__stubs__/customers_mandates.json';

const mock = new MockAdapter(axios);

const props = {
  amount: {
    currency: 'EUR',
    value: '10.00',
  },
  id: 'mdt_AcQl5fdL4h',
  status: 'valid',
  method: 'directdebit',
  customerId: 'cst_R6JLAuqEgm',
  details: {
    consumerName: 'Hr E G H K\u00fcppers en/of MW M.J. K\u00fcppers-Veeneman',
    consumerAccount: 'NL53INGB0618365937',
    consumerBic: 'INGBNL2A',
  },
};

describe('customers_mandates', () => {
  let customersMandates;
  beforeEach(() => {
    customersMandates = new CustomersMandates(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(CustomersMandates.resource).toBe('customers_mandates');
    expect(CustomersMandates.model).toBe(Mandate);
  });

  describe('.create()', () => {
    mock
      .onPost(`/customers/${props.customerId}/mandates`)
      .reply(200, response._embedded.mandates[0]);

    it('should return a mandate instance', () =>
      customersMandates.create(props).then(result => {
        expect(result).toBeInstanceOf(Mandate);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      customersMandates.create(props, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Mandate);
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });

  describe('.get()', () => {
    const error = { error: { message: 'The customers_mandate id is invalid' } };

    mock
      .onGet(`/customers/${props.customerId}/mandates/${props.id}`)
      .reply(200, response._embedded.mandates[0]);
    mock.onGet(`/customers/${props.customerId}/mandates/foo`).reply(500, error);

    it('should return a mandate instance', () =>
      customersMandates
        .get(props.id, { customerId: props.customerId })
        .then(result => {
          expect(result).toBeInstanceOf(Mandate);
          expect(result.id).toBe(props.id);
        }));

    it('should work with a callback', done => {
      customersMandates.get(
        props.id,
        { customerId: props.customerId },
        (err, result) => {
          expect(err).toBeNull();
          expect(result).toBeInstanceOf(Mandate);
          expect(result.id).toBe(props.id);
          done();
        },
      );
    });

    it('should return an error for non-existing IDs', () =>
      customersMandates
        .get('foo', { customerId: props.customerId })
        .then(() => {
          throw new Error('Should reject');
        })
        .catch(err => {
          expect(err).toBe(error);
        }));

    it('should return an error with a callback for non-existing IDs', done => {
      customersMandates.get(
        'foo',
        { customerId: props.customerId },
        (err, result) => {
          expect(err).toBe(error);
          expect(result).toBeUndefined();
          done();
        },
      );
    });
  });

  describe('.all()', () => {
    mock.onGet(`/customers/${props.customerId}/mandates`).reply(200, response);

    it('should return a list of all customer mandates', () =>
      customersMandates.all({ customerId: props.customerId }).then(result => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      customersMandates.all({ customerId: props.customerId }, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });

  describe('.revoke()', () => {
    mock
      .onDelete(`/customers/${props.customerId}/mandates/${props.id}`)
      .reply(200, response._embedded.mandates[0]);

    it('should return a mandate instance', () =>
      customersMandates
        .revoke(props.id, { customerId: props.customerId })
        .then(result => {
          expect(result).toBeInstanceOf(Mandate);
          expect(result).toMatchSnapshot();
        }));

    it('should work with cancel alias and a callback', done => {
      customersMandates
        .withParent({
          resource: 'customer',
          id: props.customerId,
        })
        .cancel(props.id, (err, result) => {
          expect(err).toBeNull();
          expect(result).toBeInstanceOf(Mandate);
          expect(result).toMatchSnapshot();
          done();
        });
    });
  });
});
