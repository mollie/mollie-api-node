declare namespace Mollie {
  namespace PaymentChargeback {
    namespace Params {
      interface IGet {
        paymentId: string;
      }

      interface IList {
        paymentId: string;
      }
    }

    namespace Callback {
      type Get = (error: any, chargeback: IChargeback) => void;
      type List = (error: any, chargebacks: Mollie.List<IChargeback>) => void;
    }
  }
}
