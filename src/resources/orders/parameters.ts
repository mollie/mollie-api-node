import { CommonListParameters } from '../../types/parameters';
import { OrderAddress, OrderData, OrderEmbed } from '../../data/orders/data';
import { OrderLineData } from '../../data/orders/orderlines/OrderLine';
import { PaymentData } from '../../data/payments/data';
import { PaymentMethod } from '../../data/global';
import PickOptional from '../../types/PickOptional';

export type CreateParameters = Pick<OrderData, 'amount' | 'orderNumber' | 'billingAddress' | 'webhookUrl' | 'locale' | 'metadata' | 'expiresAt'> & {
  lines: (Pick<OrderLineData, 'name' | 'quantity' | 'unitPrice' | 'totalAmount' | 'vatRate' | 'vatAmount'> &
    PickOptional<OrderLineData, 'type' | 'discountAmount' | 'sku' | 'metadata'> & {
      category?: string;
      imageUrl?: string;
      productUrl?: string;
    })[];
  /**
   * The shipping address for the order. If omitted, it is assumed to be identical to the `billingAddress`.
   */
  shippingAddress?: OrderAddress;
  /**
   * The URL your customer will be redirected to after the payment process.
   */
  redirectUrl?: string;
  /**
   * Normally, a payment method screen is shown. However, when using this parameter, you can choose a specific payment
   * method and your customer will skip the selection screen and is sent directly to the chosen payment method. The
   * parameter enables you to fully integrate the payment method selection into your website.
   *
   * You can also specify the methods in an array. By doing so we will still show the payment method selection screen
   * but will only show the methods specified in the array. For example, you can use this functionality to only show
   * payment methods from a specific country to your customer `["bancontact", "belfius", "inghomepay"]`.
   */
  method?: PaymentMethod | PaymentMethod[];
  /**
   * Any payment specific properties can be passed here.
   */
  payment?: Partial<PaymentData>;
  /**
   * For digital goods, you must make sure to apply the VAT rate from your customer's country in most jurisdictions.
   * Use this parameter to restrict the payment methods available to your customer to methods from the billing country
   * only.
   */
  shopperCountryMustMatchBillingCountry?: boolean;
  embed?: OrderEmbed.payments[];
  profileId?: string;
  testmode?: boolean;
};

export interface GetParameters {
  testmode?: boolean;
  embed?: OrderEmbed[];
}

export type UpdateParameters = PickOptional<OrderData, 'billingAddress' | 'shippingAddress' | 'redirectUrl' | 'webhookUrl'> & {
  orderNumber?: string;
  testmode?: boolean;
};

export type ListParameters = CommonListParameters & {
  profileId?: string;
  testmode?: boolean;
};

export interface CancelParameters {
  testmode?: boolean;
}
