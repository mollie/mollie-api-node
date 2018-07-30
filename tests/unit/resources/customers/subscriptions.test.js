import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import CustomersSubscriptions from 'resources/customers/subscriptions';
import Subscription from 'models/subscription';

import response from '../../__stubs__/customers_subscriptions.json';

const mock = new MockAdapter(axios);

const props = {
  id: 'sub_rVKGtNd6s3',
  customerId: 'cst_stTC2WHAuS',
  amount: {
    currency: 'EUR',
    value: '25.00',
  },
  times: 4,
  interval: '3 months',
  description: 'Quarterly payment',
  method: 'creditcard',
  webhookUrl: 'https://example.org/payments/webhook',
};

describe('customers_subscriptions', () => {
  let customersSubscriptions;
  beforeEach(() => {
    customersSubscriptions = new CustomersSubscriptions(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(CustomersSubscriptions.resource).toBe('customers_subscriptions');
    expect(CustomersSubscriptions.model).toBe(Subscription);
  });

  describe('.create()', () => {
    mock
      .onPost(`/customers/${props.customerId}/subscriptions`)
      .reply(200, response._embedded.subscriptions[0]);

    it('should return a subscription instance', () =>
      customersSubscriptions.create(props).then(result => {
        expect(result).toBeInstanceOf(Subscription);
        expect(result).toMatchSnapshot();
      }));
  });

  describe('.get()', () => {
    const error = {
      error: { message: 'The customers_subscription id is invalid' },
    };

    mock
      .onGet(`/customers/${props.customerId}/subscriptions/${props.id}`)
      .reply(200, response._embedded.subscriptions[0]);
    mock
      .onGet(`/customers/${props.customerId}/subscriptions/foo`)
      .reply(500, error);

    it('should return a subscription instance', () =>
      customersSubscriptions
        .get(props.id, { customerId: props.customerId })
        .then(result => {
          expect(result).toBeInstanceOf(Subscription);
          expect(result).toMatchSnapshot();
        }));
  });

  describe('.all()', () => {
    mock
      .onGet(`/customers/${props.customerId}/subscriptions`)
      .reply(200, response);

    it('should return a list of all customer subscriptions', () =>
      customersSubscriptions
        .all({ customerId: props.customerId })
        .then(result => {
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveProperty('links');
          expect(result).toMatchSnapshot();
        }));

    it('should work with a callback', done => {
      customersSubscriptions
        .withParent({
          resource: 'customer',
          id: props.customerId,
        })
        .all((err, result) => {
          expect(err).toBeNull();
          expect(result).toBeInstanceOf(Array);
          expect(result).toHaveProperty('links');
          expect(result).toMatchSnapshot();
          done();
        });
    });
  });

  describe('.cancel()', () => {
    mock
      .onDelete(`/customers/${props.customerId}/subscriptions/${props.id}`)
      .reply(200, response._embedded.subscriptions[0]);

    it('should return a subscription instance', () =>
      customersSubscriptions
        .delete(props.id, { customerId: props.customerId })
        .then(result => {
          expect(result).toBeInstanceOf(Subscription);
          expect(result).toMatchSnapshot();
        }));

    it('should work with a callback', done => {
      customersSubscriptions
        .withParent({
          resource: 'customer',
          id: props.customerId,
        })
        .cancel(props.id, (err, result) => {
          expect(err).toBeNull();
          expect(result).toBeInstanceOf(Subscription);
          expect(result).toMatchSnapshot();
          done();
        });
    });
  });
});
