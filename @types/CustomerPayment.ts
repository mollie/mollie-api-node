declare namespace Mollie {
  namespace CustomerPayment {
    namespace Params {
      interface ICreate {
        customerId: string;
        sequenceType?: SequenceType;
        redirectUrl?: string;
      }

      interface IList {
        customerId: string;
      }
    }

    namespace Callback {
      type Create = (error: any, payment: IPayment) => void;
      type List = (error: any, payments: Mollie.List<IPayment>) => void;
    }
  }
}
