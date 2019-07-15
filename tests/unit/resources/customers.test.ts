import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import CustomersResource from '../../../src/resources/customers';
import Customer from '../../../src/models/Customer';
import ApiError from '../../../src/errors/ApiError';
import response from '../__stubs__/customers.json';
import List from '../../../src/models/List';

const mock = new MockAdapter(axios);

const props = {
  id: 'cst_kEn1PlbGa',
  name: 'Customer A',
  email: 'customer@example.org',
};

describe('customers', () => {
  let customers: CustomersResource;
  beforeEach(() => {
    customers = new CustomersResource(axios.create());
  });

  it('should have a resource name and model', () => {
    expect(CustomersResource.resource).toBe('customers');
    expect(CustomersResource.model).toBe(Customer);
  });

  describe('.create()', () => {
    mock.onPost('/customers').reply(200, response._embedded.customers[0]);

    it('should return a customer instance', done => {
      customers
        .create(props)
        .then(result => {
          expect(result).toBeInstanceOf(Customer);
          expect(result.name).toBe(props.name);
          expect(result.email).toBe(props.email);
          done();
        })
        .catch(err => expect(err).toBeUndefined());
    });

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
    const error = { detail: 'The customer id is invalid' };

    mock.onGet(`/customers/${props.id}`).reply(200, response._embedded.customers[0]);
    mock.onGet('/customers/foo').reply(500, error);

    it('should return a customer instance', done => {
      customers
        .get(props.id)
        .then(result => {
          expect(result).toBeInstanceOf(Customer);
          expect(result.id).toBe(props.id);
          done();
        })
        .catch(err => expect(err).toBeUndefined());
    });

    it('should work with a callback', done => {
      customers.get(props.id, (err, customer) => {
        expect(err).toBeNull();
        expect(customer).toBeInstanceOf(Customer);
        expect(customer.id).toBe(props.id);
        done();
      });
    });

    it('should return an error for non-existing IDs', done => {
      customers
        .get('foo')
        .then(result => expect(result).toBeUndefined())
        .catch(err => {
          expect(err).toBeInstanceOf(ApiError);
          expect(err.getMessage()).toEqual(error.detail);
          done();
        });
    });

    it('should return an error with a callback for non-existing IDs', done => {
      customers.get('foo', (err, result) => {
        expect(err).toBeInstanceOf(ApiError);
        expect(err.getMessage()).toEqual(error.detail);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('.update()', () => {
    const error = { detail: 'The customer id is invalid' };

    mock.onPost(`/customers/${props.id}`).reply(200, response._embedded.customers[0]);
    mock.onPost('/customers/foo').reply(500, error);

    it('should return a customer instance', done => {
      customers
        .update(props.id, props)
        .then(result => {
          expect(result).toBeInstanceOf(Customer);
          expect(result).toMatchSnapshot();
          done();
        })
        .catch(err => expect(err).toBeUndefined());
    });

    it('should work with a callback', done => {
      customers.update(props.id, props, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(Customer);
        expect(result).toMatchSnapshot();
        done();
      });
    });

    it('should return an error for non-existing IDs', done => {
      customers
        .update('foo', null)
        .then(result => expect(result).toBeUndefined())
        .catch(err => {
          expect(err).toBeInstanceOf(ApiError);
          expect(err.getMessage()).toEqual(error.detail);
          done();
        });
    });

    it('should return an error with a callback for non-existing IDs', done => {
      customers.update('foo', (err, result) => {
        expect(err).toBeInstanceOf(ApiError);
        expect(err.getMessage()).toEqual(error.detail);
        expect(result).toBeUndefined();
        done();
      });
    });
  });

  describe('.list()', () => {
    mock.onGet('/customers').reply(200, response);

    it('should return a list of all customers', () => {
      customers.list().then(result => {
        expect(result).toBeInstanceOf(List);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
      });
    });

    it('should work with a callback', done => {
      customers.list((err, result) => {
        expect(err).toBeNull();
        expect(result).toBeInstanceOf(List);
        expect(result).toHaveProperty('links');
        expect(result).toMatchSnapshot();
        done();
      });
    });
  });

  describe('.delete()', () => {
    const doesNotExistError = {
      status: 404,
      title: 'Not Found',
      detail: 'No customer exists with token notexists.',
      _links: {
        documentation: {
          href: 'https://docs.mollie.com/guides/handling-errors',
          type: 'text/html',
        },
      },
    };

    mock.onDelete('/customers/cst_exists').reply(204);
    mock.onDelete('/customers/cst_notexists').reply(doesNotExistError.status, doesNotExistError);

    it('should return the status when the customer could be deleted', done => {
      customers
        .delete('cst_exists')
        .then(result => {
          expect(result).toEqual(true);
          done();
        })
        .catch(error => expect(error).toBeUndefined());
    });

    it('should throw an error when the customer ID was not found', done => {
      customers
        .delete('cst_notexists')
        .then(result => expect(result).toBeUndefined())
        .catch(error => {
          expect(error).toBeInstanceOf(ApiError);
          expect(error.getMessage()).toEqual(doesNotExistError.detail);
          done();
        });
    });

    it('should return the status when the customer could not be deleted', done => {
      customers
        .delete('cst_notexists')
        .then(result => expect(result).toBeUndefined())
        .catch(err => {
          expect(err).toBeInstanceOf(ApiError);
          expect(err.getMessage()).toEqual(doesNotExistError.detail);
          done();
        });
    });
  });
});
