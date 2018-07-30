import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Customers from 'resources/customers';
import Customer from 'models/customer';

import response from '../__stubs__/customers.json';

const mock = new MockAdapter(axios);

const props = {
  id: 'cst_kEn1PlbGa',
  name: 'Customer A',
  email: 'customer@example.org',
};

describe('customers', () => {
  let customers;
  beforeEach(() => {
    customers = new Customers(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(Customers.resource).toBe('customers');
    expect(Customers.model).toBe(Customer);
  });

  describe('.create()', () => {
    mock.onPost('/customers').reply(200, response._embedded.customers[0]);

    it('should return a customer instance', () =>
      customers.create(props).then(result => {
        expect(result).toBeInstanceOf(Customer);
        expect(result.name).toBe(props.name);
        expect(result.email).toBe(props.email);
      }));

    it('should work with a callback', done => {
      customers.create(props, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Customer);
        expect(result.name).toBe(props.name);
        expect(result.email).toBe(props.email);
        done();
      });
    });
  });

  describe('.get()', () => {
    const error = { error: { message: 'The customer id is invalid' } };

    mock
      .onGet(`/customers/${props.id}`)
      .reply(200, response._embedded.customers[0]);
    mock.onGet('/customers/foo').reply(500, error);

    it('should return a customer instance', () =>
      customers.get(props.id).then(result => {
        expect(result).toBeInstanceOf(Customer);
        expect(result.id).toBe(props.id);
      }));

    it('should work with a callback', done => {
      customers.get(props.id, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Customer);
        expect(result.id).toBe(props.id);
        done();
      });
    });

    it('should return an error for non-existing IDs', () =>
      customers
        .get('foo')
        .then(() => {
          throw new Error('Should reject');
        })
        .catch(err => {
          expect(err).toBe(error);
        }));

    it('should return an error with a callback for non-existing IDs', done => {
      customers.get('foo', (err, result) => {
        expect(err).toBe(error);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('.update()', () => {
    const error = { error: { message: 'The customer id is invalid' } };

    mock
      .onPost(`/customers/${props.id}`)
      .reply(200, response._embedded.customers[0]);
    mock.onPost('/customers/foo').reply(500, error);

    it('should return a customer instance', () =>
      customers.update(props.id, props).then(result => {
        expect(result).toBeInstanceOf(Customer);
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      customers.update(props.id, props, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Customer);
        expect(result).toMatchSnapshot();
        done();
      });
    });

    it('should return an error for non-existing IDs', () =>
      customers
        .update('foo')
        .then(() => {
          throw new Error('Should reject');
        })
        .catch(err => {
          expect(err).toBe(error);
        }));

    it('should return an error with a callback for non-existing IDs', done => {
      customers.update('foo', (err, result) => {
        expect(err).toBe(error);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('.all()', () => {
    mock.onGet('/customers').reply(200, response);

    it('should return a list of all customers', () =>
      customers.all().then(result => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      }));

    it('should work with a callback', done => {
      customers.all((err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });
});
