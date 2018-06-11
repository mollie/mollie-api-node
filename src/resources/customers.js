import Resource from 'resource';
import Customer from 'models/customer';

/**
 * The `customers` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.1.1
 */
export default class Customers extends Resource {
  static resource = 'customers';
  static model = Customer;
}
