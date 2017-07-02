import axios from 'axios';
import mollie from './src/mollie';

export default {
  /**
   * Create a new Mollie client with the default http vendor.
   * @param params
   * @returns {Object}
   */
  createClient(params) {
    return mollie(axios, params);
  },
  /**
   * Create a new mollie client with a custom http vendor.
   * Note: If you want to use a different vendor than axios, make sure it uses promises!
   * @param httpVendor
   * @param params
   * @returns {Object}
   */
  createClientWithCustomHttpVendor(httpVendor, params) {
    return mollie(httpVendor, params);
  },
};
