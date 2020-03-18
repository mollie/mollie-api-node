import { OrderLineData } from '../../../data/orders/orderlines/OrderLine';
import { PickOptional } from '../../../types/PickOptional';

export interface ContextParameters {
  orderId: string;
  testmode?: boolean;
}

export type UpdateParameters = ContextParameters &
  PickOptional<OrderLineData, 'name' | 'quantity' | 'unitPrice' | 'discountAmount' | 'totalAmount' | 'vatAmount' | 'vatRate'> & {
    /**
     * A link pointing to an image of the product sold.
     */
    imageUrl?: string;
    /**
     * A link pointing to the product page in your web shop of the product sold.
     */
    productUrl?: string;
  };
