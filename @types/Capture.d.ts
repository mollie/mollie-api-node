declare namespace Mollie {
  interface ICapture {
    resource: string;
    id: string;
    mode: ApiMode;
    amount: IAmount;
    settlementAmount: IAmount;
    paymentId: string;
    shipmentId?: string;
    settlementId?: string;
    createdAt: string;
    _links: ILinks;
  }

  namespace Params {
    interface Create {
      // Access token parameters
      testmode?: false;
    }
  }
}
