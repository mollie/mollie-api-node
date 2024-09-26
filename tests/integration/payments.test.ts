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

    const existingPayment = payments.find(payment => payment.metadata == 'refund-test' && payment.status == PaymentStatus.paid);

    const payment =
      existingPayment ??
      (await mollieClient.payments
        .create({
          amount: { value: '10.00', currency: 'EUR' },
          description: 'Integration test payment',
          redirectUrl: 'https://example.com/redirect',
          method: PaymentMethod.creditcard, // we want the amount to be immediately refundable, which is not the case for all payment methods
          metadata: 'refund-test',
        })
        .then(payment => {
          expect(payment).toBeDefined();
          return payment;
        })
        .catch(fail));

    if (payment.status != PaymentStatus.paid) {
      console.log('If you want to test the full refund flow, set the payment to paid:', payment.getCheckoutUrl());
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

    await mollieClient.paymentRefunds
      .get(paymentRefund.id, {
        paymentId: payment.id,
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

  it('should capture a payment', async () => {
    const payments = await mollieClient.payments.page();

    const existingPayment = payments.find(payment => payment.metadata == 'capture-test' && payment.status == PaymentStatus.authorized);

    const payment =
      existingPayment ??
      (await mollieClient.payments
        .create({
          amount: { value: '10.00', currency: 'EUR' },
          description: 'Integration test payment',
          redirectUrl: 'https://example.com/redirect',
          metadata: 'capture-test',
          captureMode: CaptureMethod.manual,
          method: PaymentMethod.creditcard,
        })
        .then(payment => {
          expect(payment).toBeDefined();
          expect(payment.captureMode).toBe('manual');
          expect(payment.authorizedAt).toBeUndefined();
          expect(payment.captureDelay).toBeUndefined();
          expect(payment.captureBefore).toBeUndefined();

          return payment;
        })
        .catch(fail));

    if (payment.status != PaymentStatus.authorized) {
      console.log('If you want to test the full authorize-then-capture flow, set the payment to authorized:', payment.getCheckoutUrl());
      return;
    }

    expect(payment.authorizedAt).toBeDefined();
    expect(payment.captureBefore).toBeDefined();

    // Create a capture for this payment.
    const capture = await mollieClient.paymentCaptures
      .create({
        paymentId: payment.id,
        amount: { value: '10.00', currency: 'EUR' },
      })
      .then(capture => {
        expect(capture).toBeDefined();
        return capture;
      })
      .catch(fail);
    // check if the capture was created and assigned to the payment.
    const updatedPayment = await payment.refresh();
    const captureOnPayment = await getHead(updatedPayment.getCaptures());
    expect(capture.id).toBe(captureOnPayment.id);
  });
});
