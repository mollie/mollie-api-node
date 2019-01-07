declare namespace Mollie {
  interface IShipment {
    resource: string;
    id: string;
    orderId: string;
    createdAt: string;
    tracking: Shipment.ITracking | null;
    lines: Array<IOrderLine>;
    _links: ILinks;

    // Access token parameters
    testmode?: boolean;
  }

  namespace Shipment {
    interface ITracking {
      carrier: string;
      code: string;
      url?: string;
    }

    namespace Params {
      interface ICreate {
        orderId: string;

        lines: Array<IOrderLine>;
        tracking?: Shipment.ITracking;

        // Access token parameters
        testmode?: boolean;
      }

      interface IGet {
        orderId: string;
      }

      interface IList {
        orderId: string;
      }

      interface IUpdate {
        orderId: string;
      }
    }

    namespace Callback {
      type Create = Function;
      type Get = Function;
      type List = Function;
      type Update = Function;
    }
  }
}
