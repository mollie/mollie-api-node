declare namespace Mollie {
  interface IPaymentRefund {
    resource: string;
    id: string;
    amount: IAmount;
    status: Refund.Status;
    createdAt: string;
    description: string;
    paymentId: string;
    settlementAmount?: IAmount;
    _links: ILinks;
  }

  namespace PaymentRefund {
    namespace Params {
      interface ICreate {
        amount: IAmount;
        description?: string;
        paymentId?: string;

        // Access token parameters
        testmode?: boolean;
      }

      interface IGet {
        paymentId: string;
      }

      interface IList {
        paymentId: string;
      }

      interface ICancel {
        paymentId: string;
      }
    }

    namespace Callback {
      type Create = (err: any, refund: IPaymentRefund) => void;
      type Get = (err: any, refund: IPaymentRefund) => void;
      type List = (err: any, refund: Mollie.List<IPaymentRefund>) => void;
      type Cancel = (err: any, status: boolean) => void;
    }
  }
}
