import CustomersBinder from '../../../src/binders/customers/CustomersBinder';
import NetworkClient from '../../../src/communication/NetworkClient';

import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';
import page1 from '../__stubs__/list/customers_page_1.json';
import page2 from '../__stubs__/list/customers_page_2.json';

describe('lists', () => {
  let customers: CustomersBinder;
  beforeEach(() => {
    customers = new CustomersBinder(new NetworkClient({ apiKey: 'mock-api-key', nodeVersion: process.version, libraryVersion: 'mock' }));
  });

  describe('.list()', () => {
    it('should retrieve a limited list', () => {
      return new NetworkMocker(getApiKeyClientProvider()).use(async ([, networkMocker]) => {
        networkMocker.intercept('GET', '/customers?limit=3', 200, page1);
        const result = await customers.page({ limit: 3 });
        expect(result).toHaveLength(3);
        expect(result[2].resource).toEqual('customer');
      });
    });

    it('should retrieve the next page', () => {
      return new NetworkMocker(getApiKeyClientProvider()).use(async ([, networkMocker]) => {
        networkMocker.intercept('GET', '/customers?limit=3', 200, page1);
        networkMocker.intercept('GET', '/customers?limit=3&from=cst_l4J9zsdzO', 200, page2);
        const list1 = await customers.page({ limit: 3 });
        const list2 = await list1.nextPage?.();
        expect(list2).toHaveLength(3);
        expect(list2![0].id).toEqual('cst_l4J9zsdzO');
        expect(list2?.nextPageCursor).toEqual('cst_1DVwgVBLS');
        expect(list2).toMatchSnapshot();
      });
    });

    it('should retrieve page with a callback', done => {
      new NetworkMocker(getApiKeyClientProvider()).use(async ([, networkMocker]) => {
        networkMocker.intercept('GET', '/customers?limit=3', 200, page1);
        customers.page({ limit: 3 }, (err, result): void => {
          expect(err).toBeNull();
          expect(result[0].id).toEqual('cst_kEn1PlbGa');
          expect(result.nextPageCursor).toEqual('cst_l4J9zsdzO');
          expect(result.nextPage).toBeDefined();
          done();
        });
      });
    });
  });
});
