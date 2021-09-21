import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import dotenv from 'dotenv';
import createMollieClient, { PaymentMethod, OrderLineType, Locale, OrderEmbed, Payment } from '../..';

/**
 * Overwrite the default XMLHttpRequestAdapter
 */
axios.defaults.adapter = httpAdapter;

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = createMollieClient({ apiKey: process.env.API_KEY });

describe('orders', () => {
  it('should integrate', async () => {
    const orders = await mollieClient.orders.all();

    let orderExists;

    if (!orders.length) {
      orderExists = mollieClient.orders
        .create({
          amount: { value: '698.00', currency: 'EUR' },
          method: PaymentMethod.ideal,
          redirectUrl: 'https://example.com/redirect',
          orderNumber: 'test',
          lines: [
            {
              type: OrderLineType.physical,
              sku: '5702016116977',
              name: 'LEGO 42083 Bugatti Chiron',
              productUrl: 'https://shop.lego.com/nl-NL/Bugatti-Chiron-42083',
              imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$',
              quantity: 2,
              vatRate: '21.00',
              unitPrice: {
                currency: 'EUR',
                value: '399.00',
              },
              totalAmount: {
                currency: 'EUR',
                value: '698.00',
              },
              discountAmount: {
                currency: 'EUR',
                value: '100.00',
              },
              vatAmount: {
                currency: 'EUR',
                value: '121.14',
              },
            },
          ],
          locale: Locale.nl_NL,
          billingAddress: {
            organizationName: 'Mollie B.V.',
            streetAndNumber: 'Keizersgracht 313',
            city: 'Amsterdam',
            region: 'Noord-Holland',
            postalCode: '1234AB',
            country: 'NL',
            title: 'Dhr.',
            givenName: 'Piet',
            familyName: 'Mondriaan',
            email: 'piet@mondriaan.com',
            phone: '+31309202070',
          },
          shippingAddress: {
            organizationName: 'Mollie B.V.',
            streetAndNumber: 'Keizersgracht 313',
            streetAdditional: '4th floor',
            city: 'Haarlem',
            region: 'Noord-Holland',
            postalCode: '5678AB',
            country: 'NL',
            title: 'Mr.',
            givenName: 'Chuck',
            familyName: 'Norris',
            email: 'norris@chucknorrisfacts.net',
          },
          embed: [OrderEmbed.payments],
        })
        .then(order => {
          expect(order).toBeDefined();
          expect(order.id).toBeDefined();

          return order;
        })
        .catch(fail);
    } else {
      expect(orders[0].id).toBeDefined();
      orderExists = mollieClient.orders.get(orders[0].id, { embed: [OrderEmbed.payments] });
    }

    const order = await orderExists;

    const payment: Payment = order._embedded.payments[0];
    if (!payment.isPaid()) {
      console.log('If you want to test the full flow, set the embedded order payment to paid:', order.redirectUrl);
      return;
    }

    if (!payment.isRefundable()) {
      console.log('This payment is not refundable, you cannot test the full flow.');
      return;
    }

    const paymentRefunds = await mollieClient.paymentsRefunds.all({ paymentId: payment.id });

    let refundExists;

    if (!paymentRefunds.length) {
      refundExists = mollieClient.paymentsRefunds
        .create({
          paymentId: payment.id,
          amount: { value: '5.00', currency: payment.amount.currency },
        })
        .then(refund => {
          expect(refund).toBeDefined();

          return refund;
        })
        .catch(fail);
    } else {
      refundExists = Promise.resolve(paymentRefunds[0]);
    }

    const paymentRefund = await refundExists;

    await mollieClient.paymentsRefunds
      .get(paymentRefund.id, {
        paymentId: payment.id,
      })
      .then(result => {
        expect(result).toBeDefined();
      })
      .catch(fail);
  });

  it('should paginate', async () => {
    let nextPageCursor;

    let orders = await mollieClient.orders.all({ limit: 2 });

    expect(orders.length).toEqual(2);
    expect(orders.nextPageCursor).toBeDefined();
    expect(orders.previousPageCursor).toBeUndefined();

    nextPageCursor = orders.nextPageCursor;

    // Second page
    orders = await orders.nextPage();

    expect(orders.length).toEqual(2);
    expect(orders[0].id).toEqual(nextPageCursor);
    expect(orders.nextPageCursor).toBeDefined();
    expect(orders.previousPageCursor).toBeDefined();

    nextPageCursor = orders.nextPageCursor;

    // Third (and last) page
    orders = await orders.nextPage();

    expect(orders.length).toEqual(2);
    expect(orders[0].id).toEqual(nextPageCursor);
  });
});
