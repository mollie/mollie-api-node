declare namespace Mollie {
  interface Order {
    amount: Amount;
    orderNumber: string;
    lines: Array<FullOrderLine>;
    billingAddress: OrderAddress;
    shippingAddress?: OrderAddress;
    consumerDateOfBirth?: string;
    redirectUrl: string;
    webhookUrl?: string;
    locale: Locale;
    method: Method;
    payment?: Partial<Payment>;
    metadata?: any;

    // Access token parameters
    profileId?: string;
    testmode: boolean;
  }

  type OrderLineType =
    | 'physical'
    | 'discount'
    | 'digital'
    | 'shipping_fee'
    | 'store_credit'
    | 'gift_card'
    | 'surcharge';

  interface OrderLine {
    id: string;
    quantity?: number;
  }

  interface FullOrderLine {
    resource?: string,
    id?: string;
    type?: OrderLineType;
    name: string;
    quantity: number;
    unitPrice: Amount;
    discountAmount?: Amount;
    totalAmount: Amount;
    vatRate: string;
    vatAmount: Amount;
    sku: string;
    imageUrl: string;
    productUrl: string;
    _links?: Links,
  }

  interface OrderAddress extends Address {
    title?: string;
    givenName: string;
    familyName: string;
    email: string;
    phone?: string;
  }

  type OrderStatus =
    | 'created'
    | 'paid'
    | 'authorized'
    | 'canceled'
    | 'shipping'
    | 'completed'
    | 'expired';
}
