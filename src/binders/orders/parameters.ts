import { PaymentMethod } from '../../data/global';
import { OrderAddress, OrderData, OrderEmbed } from '../../data/orders/data';
import { OrderLineData } from '../../data/orders/orderlines/OrderLine';
import { PaymentData } from '../../data/payments/data';
import { PaginationParameters } from '../../types/parameters';
import PickOptional from '../../types/PickOptional';

export type CreateParameters = Pick<OrderData, 'amount' | 'orderNumber' | 'billingAddress' | 'webhookUrl' | 'locale' | 'metadata' | 'expiresAt'> & {
  /**
   * The lines in the order. Each line contains details such as a description of the item ordered, its price et cetera. See order-lines-details for the exact details on the lines.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order?path=lines#parameters
   */
  lines: (Pick<OrderLineData, 'name' | 'quantity' | 'unitPrice' | 'totalAmount' | 'vatRate' | 'vatAmount'> &
    PickOptional<OrderLineData, 'type' | 'discountAmount' | 'sku' | 'metadata'> & {
      /**
       * The category of product bought. Must be one of the following values:
       *
       * -   `meal`
       * -   `eco`
       * -   `gift`
       *
       * @see https://docs.mollie.com/reference/v2/orders-api/create-order?path=category#order-lines-details
       */
      category?: string;
      /**
       * A link pointing to an image of the product sold.
       *
       * @see https://docs.mollie.com/reference/v2/orders-api/create-order?path=imageUrl#order-lines-details
       */
      imageUrl?: string;
      /**
       * A link pointing to the product page in your web shop of the product sold.
       *
       * @see https://docs.mollie.com/reference/v2/orders-api/create-order?path=productUrl#order-lines-details
       */
      productUrl?: string;
    })[];
  /**
   * The shipping address for the order. See order-address-details for the exact fields needed. If omitted, it is assumed to be identical to the `billingAddress`.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order?path=shippingAddress#parameters
   */
  shippingAddress?: OrderAddress;
  /**
   * The URL your customer will be redirected to after the payment process.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order?path=redirectUrl#parameters
   */
  redirectUrl?: string;
  /**
   * Normally, a payment method screen is shown. However, when using this parameter, you can choose a specific payment method and your customer will skip the selection screen and is sent directly to
   * the chosen payment method. The parameter enables you to fully integrate the payment method selection into your website.
   *
   * You can also specify the methods in an array. By doing so we will still show the payment method selection screen but will only show the methods specified in the array. For example, you can use
   * this functionality to only show payment methods from a specific country to your customer `['bancontact', 'belfius']`.
   *
   * Possible values: `applepay` `bancontact` `banktransfer` `belfius` `creditcard` `directdebit` `eps` `giftcard` `giropay` `ideal` `kbc` `klarnapaylater` `klarnasliceit` `mybank` `paypal`
   * `paysafecard` `przelewy24` `sofort` `voucher`
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order?path=method#parameters
   */
  method?: PaymentMethod | PaymentMethod[];
  /**
   * Any payment specific properties (for example, the `dueDate` for bank transfer payments) can be passed here. See payment-parameters for the possible fields.
   *
   * The `payment` property should be an *object* where the keys are the payment method specific parameters you want to pass.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order?path=payment#parameters
   */
  payment?: Partial<PaymentData>;
  /**
   * For digital goods, you must make sure to apply the VAT rate from your customer's country in most jurisdictions. Use this parameter to restrict the payment methods available to your customer to
   * methods from the billing country only.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order?path=shopperCountryMustMatchBillingCountry#parameters
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

export type ListParameters = PaginationParameters & {
  profileId?: string;
  testmode?: boolean;
};

export interface CancelParameters {
  testmode?: boolean;
}
