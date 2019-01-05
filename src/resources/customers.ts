import Resource from '../resource';
import Customer from '../models/customer';

/**
 * The `customers` resource
 *
 * @since 1.1.1
 */
export default class Customers extends Resource {
  static resource = 'customers';
  static model = Customer;

  create(data: any, cb?: Function): Promise<Customer> {
    return super.create(data, cb);
  }
}
