declare namespace Mollie {
  interface IChargeback {
    resource: string;
    id: string;
    amount: IAmount;
    settlementAmount: IAmount;
    createdAt: string;
    reversedAt: string;
    paymentId: string;
    _links: ILinks;
  }

  namespace Chargeback {
    namespace Params {
      interface IList {
        from: string,
        limit: number,
      }
    }

    namespace Callback {
      type List = (error: any, chargebacks: Mollie.List<IChargeback>) => void;
    }
  }
}
