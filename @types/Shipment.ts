declare namespace Mollie {
  interface Shipment {
    lines: Array<OrderLine>;
    tracking?: Tracking;

    // Access token parameters
    testmode?: boolean;
  }

  interface OrderShipment extends Shipment {
    orderId?: string,
  }

  interface Tracking {
    carrier: string;
    code: string;
    url?: string;
  }
}
