declare namespace Mollie {
  interface PaymentRefund {
    amount: Amount;
    description?: string;
    paymentId?: string,

    // Access token parameters
    testmode?: boolean;
  }

  interface OrderRefund {
    description?: string;
    orderId?: string,
    lines: Array<OrderLine>,

    // Access token parameters
    testmode?: boolean;
  }

  type RefundStatus = 'queued' | 'pending' | 'processing' | 'refunded' | 'failed';
}
