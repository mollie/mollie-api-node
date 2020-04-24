import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import CustomersResource from '../../../src/resources/customers/CustomersResource';

import page1 from '../__stubs__/list/customers_page_1.json';
import page2 from '../__stubs__/list/customers_page_2.json';
import page3 from '../__stubs__/list/customers_page_3.json';
import List from '../../../src/data/List';

const mock = new MockAdapter(axios);

describe('lists', () => {
  let customers: CustomersResource;
  beforeEach(() => {
    customers = new CustomersResource(axios.create());
  });

  describe('.list()', () => {
    mock.onGet('/customers?limit=3').reply(200, page1);
    mock.onGet('/customers?limit=3&from=cst_kEn1PlbGa').reply(200, page1);
    mock.onGet('/customers?limit=3&from=cst_l4J9zsdzO').reply(200, page2);
    mock.onGet('/customers?limit=3&from=cst_1DVwgVBLS').reply(200, page3);

    it('should retrieve a limited list', done => {
      customers
        .list({ limit: 3 })
        .then(result => {
          expect(result[2].resource).toEqual('customer');
          expect(result[3]).toBeUndefined();
          done();
        })
        .catch(err => {
          expect(err).toBeUndefined();
          done();
        });
    });

    it('should retrieve the next page', done => {
      customers
        .list({ limit: 3 })
        .then(result => {
          result.nextPage().then(list => {
            expect(list[0].id).toEqual('cst_l4J9zsdzO');
            expect(list).toMatchSnapshot();
            done();
          });
        })
        .catch(err => {
          expect(err).toBeUndefined();
          done();
        });
    });

    it('should retrieve the next page', done => {
      customers
        .list({ limit: 3 })
        .then(result => {
          result
            .nextPage()
            .then((list: List<any>) => {
              expect(list[0].id).toEqual('cst_l4J9zsdzO');
              expect(list.nextPageCursor).toEqual('cst_1DVwgVBLS');
              expect(list).toMatchSnapshot();
              done();
            })
            .catch(err => {
              expect(err).toBeUndefined();
            });
        })
        .catch(err => {
          expect(err).toBeUndefined();
        });
    });

    xit('should retrieve all pages with a callback', done => {
      let i = 0;
      const expected = ['cst_kEn1PlbGa', 'cst_l4J9zsdzO', 'cst_1DVwgVBLS', undefined];

      const handleNextPage = (err, result: List<any>): void => {
        expect(err).toBeNull();
        expect(result[0].id).toEqual(expected[i]);
        expect(result.nextPageCursor).toEqual(expected[++i]);
        if (i === 3) {
          done();
        } else {
          result.nextPage().then();
        }
      };

      customers.list({ limit: 3 }, handleNextPage).then();
    });
  });
});
