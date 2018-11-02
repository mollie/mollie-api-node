declare namespace Mollie {
  interface Refund {
    amount: Amount;
    description?: string;

    // Access token parameters
    testmode?: boolean;
  }

  type RefundStatus = 'queued' | 'pending' | 'processing' | 'refunded' | 'failed';
}
