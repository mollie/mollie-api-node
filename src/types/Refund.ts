declare namespace Mollie {
  type IRefund = IPaymentRefund | IOrderRefund;

  namespace Refund {
    enum Status {
      queued = 'queued',
      pending = 'pending',
      processing = 'processing',
      refunded = 'refunded',
      failed = 'failed',
    }

    namespace Params {
      interface IList {}
    }

    namespace Callback {
      type List = (error: any, refunds: Mollie.List<IRefund>) => void;
    }
  }
}
