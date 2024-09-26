import dotenv from 'dotenv';
import { fail } from 'node:assert';

import createMollieClient, { CaptureMethod, PaymentMethod, PaymentStatus } from '../..';
import getHead from '../getHead';

/**
 * Load the API_KEY environment variable
 */
dotenv.config();

const mollieClient = createMollieClient({ apiKey: process.env.API_KEY });

describe('payments', () => {
  it('should integrate', async () => {
    const payments = await mollieClient.payments.page();

    let paymentExists;

    if (!payments.length || payments[0].status == PaymentStatus.expired) {
      paymentExists = mollieClient.payments
        .create({
          amount: { value: '10.00', currency: 'EUR' },
          description: 'Integration test payment',
          redirectUrl: 'https://example.com/redirect',
        })
        .then(payment => {
          expect(payment).toBeDefined();

          return payment;
        })
        .catch(fail);
    } else {
      paymentExists = Promise.resolve(payments[0]);
    }

    const payment = await paymentExists;

    if (payment.status != PaymentStatus.paid) {
      console.log('If you want to test the full flow, set the payment to paid:', payment.getCheckoutUrl());
      return;
    }

    if (!payment.isRefundable()) {
      console.log('This payment is not refundable, you cannot test the full flow.');
      return;
    }

    const paymentRefunds = await mollieClient.paymentRefunds.page({ paymentId: payment.id });

    let refundExists;

    if (!paymentRefunds.length) {
      refundExists = mollieClient.paymentRefunds
        .create({
          paymentId: payments[0].id,
          amount: { value: '5.00', currency: payments[0].amount.currency },
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

    await mollieClient.paymentRefunds
      .get(paymentRefund.id, {
        paymentId: payments[0].id,
      })
      .then(result => {
        expect(result).toBeDefined();
      })
      .catch(fail);
  });

  it('should refresh', async () => {
    // Create a payment.
    const originalPayment = await mollieClient.payments.create({
      amount: { value: '10.00', currency: 'EUR' },
      description: 'Original description',
      redirectUrl: 'https://example.com/redirect',
    });
    // Update the payment.
    await mollieClient.payments.update(originalPayment.id, { description: 'Updated description' });
    // Get the updated payment.
    const updatedPayment = await originalPayment.refresh();
    expect(originalPayment.description).toBe('Original description');
    expect(updatedPayment.description).toBe('Updated description');
  });

  it('should paginate', async () => {
    let nextPageCursor;

    let payments = await mollieClient.payments.page({
      limit: 2,
    });

    expect(payments.length).toEqual(2);
    expect(payments.nextPageCursor).toBeDefined();
    expect(payments.previousPageCursor).toBeUndefined();

    nextPageCursor = payments.nextPageCursor;

    // Second page
    payments = await payments.nextPage();

    expect(payments.length).toEqual(2);
    expect(payments[0].id).toEqual(nextPageCursor);
    expect(payments.nextPageCursor).toBeDefined();
    expect(payments.previousPageCursor).toBeDefined();

    nextPageCursor = payments.nextPageCursor;

    // Third (and last) page
    payments = await payments.nextPage();

    expect(payments.length).toEqual(2);
    expect(payments[0].id).toEqual(nextPageCursor);
  });

  it.skip('should create a capture', async () => {
    // Create a payment.
    const payment = await mollieClient.payments.create({
      amount: { value: '10.00', currency: 'EUR' },
      description: 'Original description',
      redirectUrl: 'https://example.com/redirect',
      captureMode: CaptureMethod.manual,
      method: PaymentMethod.creditcard,
    });
    expect(payment.captureDelay).toBeUndefined();
    expect(payment.captureMode).toBe('manual');
    expect(payment.authorizedAt).toBeUndefined();

    expect(payment.captureBefore).toBeUndefined();

    // TODO: the payment needs to be authorized here, but there doesn't seem to be a way to do this currently...

    payment.refresh();
    expect(payment.captureBefore).not.toBeUndefined();

    // Create a capture for this payment.
    const capture = await mollieClient.paymentCaptures.create({
      paymentId: payment.id,
      amount: { value: '10.00', currency: 'EUR' },
    });
    // check if the capture was created and assigned to the payment.
    payment.refresh();
    const captureOnPayment = await getHead(payment.getCaptures());
    expect(capture.id).toBe(captureOnPayment.id);
  });
});
