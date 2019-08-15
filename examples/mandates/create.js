/**
 * @docs https://docs.mollie.com/reference/v2/mandates-api/create-mandate
 */
const { createMollieClient } = require('@mollie/api-client');

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const mandate = await mollieClient.customers_mandates.create({
      customerId: 'cst_pzhEvnttJ2',
      method: 'directdebit',
      consumerName: 'John Doe',
      consumerAccount: 'NL55INGB0000000000',
      consumerBic: 'INGBNL2A',
      signatureDate: '2018-05-07',
      mandateReference: 'YOUR-COMPANY-MD13804',
    });

    console.log(mandate);
  } catch (e) {
    console.log(e);
  }
})();
