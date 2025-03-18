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
    /**
     * This test will
     * - check if a refundable payment created by this test exists (verified using metadata)
     * - if yes: refund the payment - this tests the full flow and will work exactly once for every payment created by this test.
     * - if no:
     *   - check if there's an open payment created by this test and if not create one
     *   - log the checkout URL of the open payment, which a user can use to set the status to `paid` to be able to test the full flow
     *   - exit the test
     */
    const metaIdentifier = 'refund-test';

    const payments = await mollieClient.payments.page();
    const refundPayments = payments.filter(payment => payment.metadata == metaIdentifier);
    const refundablePayment = refundPayments.find(payment => payment.status == PaymentStatus.paid && payment.amountRemaining != null && parseFloat(payment.amountRemaining.value) > 0);

    if (null == refundablePayment) {
      const openPayment =
        refundPayments.find(payment => payment.status == PaymentStatus.open) ??
        (await mollieClient.payments
          .create({
            amount: { value: '10.00', currency: 'EUR' },
            description: 'Integration test payment',
            redirectUrl: 'https://example.com/redirect',
            method: PaymentMethod.creditcard, // we want the amount to be immediately refundable, which is not the case for all payment methods
            metadata: metaIdentifier,
          })
          .then(payment => {
            expect(payment).toBeDefined();
            return payment;
          })
          .catch(fail));
      console.log(`If you want to test the full refund flow, set the payment ${openPayment.id} to paid:`, openPayment.getCheckoutUrl());
      return;
    }

    const paymentRefund = await mollieClient.paymentRefunds
      .create({
        paymentId: refundablePayment.id,
        amount: refundablePayment.amountRemaining,
      })
      .then(refund => {
        expect(refund).toBeDefined();

        return refund;
      })
      .catch(fail);

    await mollieClient.paymentRefunds
      .get(paymentRefund.id, {
        paymentId: refundablePayment.id,
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
    /**
     * This test will
     * - check if a capturable payment created by this test exists (verified using metadata)
     * - if yes: capure the payment - this tests the full flow and will work exactly once for every payment created by this test.
     * - if no:
     *   - check if there's an open payment created by this test and if not create one
     *   - log the checkout URL of the open payment, which a user can use to set the status to `authorized` to be able to test the full flow
     *   - exit the test
     */
    const metaIdentifier = 'capture-test';

    const payments = await mollieClient.payments.page();
    const refundPayments = payments.filter(payment => payment.metadata == metaIdentifier);
    const authorizedPayment = refundPayments.find(payment => payment.status == PaymentStatus.authorized);

    if (null == authorizedPayment) {
      const openPayment =
        refundPayments.find(payment => payment.status == PaymentStatus.open) ??
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
      console.log(`If you want to test the full authorize-then-capture flow, set the payment ${openPayment.id} to authorized:`, openPayment.getCheckoutUrl());
      return;
    }

    expect(authorizedPayment.authorizedAt).toBeDefined();
    expect(authorizedPayment.captureBefore).toBeDefined();

    // Create a capture for this payment.
    const capture = await mollieClient.paymentCaptures
      .create({
        paymentId: authorizedPayment.id,
        amount: authorizedPayment.amount,
      })
      .then(capture => {
        expect(capture).toBeDefined();
        return capture;
      })
      .catch(fail);
    // check if the capture was created and assigned to the payment.
    const updatedPayment = await authorizedPayment.refresh();
    const captureOnPayment = await getHead(updatedPayment.getCaptures());
    expect(capture.id).toBe(captureOnPayment.id);
  });

  it('should release authorization', async () => {
    /**
     * This test will
     * - check if an authorized payment created by this test exists (verified using metadata)
     * - if yes: release the authorization - this tests the full flow and will work exactly once for every payment created by this test.
     * - if no:
     *   - check if there's an open payment created by this test and if not create one
     *   - log the checkout URL of the open payment, which a user can use to set the status to `authorized` to be able to test the full flow
     *   - exit the test
     */
    const metaIdentifier = 'release-auth-test';

    const payments = await mollieClient.payments.page();
    const releaseAuthPayments = payments.filter(payment => payment.metadata == metaIdentifier);
    const authorizedPayment = releaseAuthPayments.find(payment => payment.status == PaymentStatus.authorized);

    if (null == authorizedPayment) {
      const openPayment =
        releaseAuthPayments.find(payment => payment.status == PaymentStatus.open) ??
        (await mollieClient.payments
          .create({
            amount: { value: '10.00', currency: 'EUR' },
            description: 'Integration test payment',
            redirectUrl: 'https://example.com/redirect',
            metadata: metaIdentifier,
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
      console.log(`If you want to test the release authorization flow, set the payment ${openPayment.id} to authorized:`, openPayment.getCheckoutUrl());
      return;
    }

    expect(authorizedPayment.authorizedAt).toBeDefined();
    expect(authorizedPayment.captureBefore).toBeDefined();

    // Release the authorization
    const releaseResult = await mollieClient.payments
      .releaseAuthorization(authorizedPayment.id)
      .then(result => {
        expect(result).toBe(true);
        return result;
      })
      .catch(fail);

    // Note: The payment status might not be updated immediately after calling releaseAuthorization (response code 202)
    // Eventually, the payment status should change to 'canceled' for payments without captures
    // or to 'paid' if there was a successful capture
  });
});
