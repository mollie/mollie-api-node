declare namespace Mollie {
  interface IOrderLine {
    resource: string;
    id: string;
    orderId?: string;
    type: OrderLine.Type;
    name: string;
    status: Order.Status;
    isCancelable: boolean;
    quantity: number;
    quantityShipped: number;
    amountShipped: number;
    quantityRefunded: number;
    amountRefunded: number;
    quantityCanceled: number;
    amountCanceled: number;
    shippableQuantity: number;
    refundableQuantity: number;
    unitPrice: IAmount;
    discountAmount?: IAmount;
    totalAmount: IAmount;
    vatRate: string;
    vatAmount: IAmount;
    sku?: string;
    createdAt: string;
    _links: ILinks;
    imageUrl: string;
    productUrl: string;
  }

  namespace OrderLine {
    type Type =
      | 'physical'
      | 'discount'
      | 'digital'
      | 'shipping_fee'
      | 'store_credit'
      | 'gift_card'
      | 'surcharge';

    namespace Params {
      interface IUpdate {
        orderId: string;
      }

      interface ICancel {
        orderId: string;
      }
    }

    namespace Callback {
      type Update = (error: any, order: IOrder) => void;
      type Cancel = (error: any, success: boolean) => void;
    }
  }
}
