declare namespace Mollie {
  // FIXME: check props
  interface IOrderRefund {
    description?: string;
    orderId?: string;
    lines: Array<IOrderLine>;

    // Access token parameters
    testmode?: boolean;
  }

  namespace OrderRefund {
    namespace Params {
      interface ICreate {
        orderId: string;

        description?: string;
        lines: Array<IOrderLine>;

        // Access token parameters
        testmode?: boolean;
      }

      interface IList {
        orderId: string;

        // Access token parameters
        testmode?: boolean;
      }
    }
  }
}
