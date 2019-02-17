import List from '@models/List';
import page1 from '../__stubs__/list/customers_page_1.json';
import CustomersResource from '@resources/customers';
import Customer from '@models/Customer';

describe('lists', () => {
  it('should instantiate with given values', () => {
    const list = List.buildResourceList({
      response: page1,
      resourceName: CustomersResource.resource,
      params: undefined,
      callback: undefined,
      getResources: undefined,
      Model: Customer,
    });

    expect(list[0].id).toEqual('cst_kEn1PlbGa');
    expect(list.nextPageCursor).toEqual('cst_l4J9zsdzO');
    expect(list.previousPageCursor).toBeUndefined();
  });
});
