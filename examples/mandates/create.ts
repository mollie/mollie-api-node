/**
 * @docs https://docs.mollie.com/reference/v2/mandates-api/create-mandate
 */
import createMollieClient, { Mandate, MandateMethod } from '@mollie/api-client';

const mollieClient = createMollieClient({ apiKey: 'test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM' });

(async () => {
  try {
    const mandate: Mandate = await mollieClient.customerMandates.create({
      customerId: 'cst_pzhEvnttJ2',
      method: MandateMethod.directdebit,
      consumerName: 'John Doe',
      consumerAccount: 'NL55INGB0000000000',
      consumerBic: 'INGBNL2A',
      signatureDate: '2018-05-07',
      mandateReference: 'YOUR-COMPANY-MD13804',
    });

    console.log(mandate);
  } catch (error) {
    console.warn(error);
  }
})();
