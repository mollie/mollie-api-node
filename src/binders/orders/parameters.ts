import { PaymentMethod } from '../../data/global';
import { OrderAddress, OrderData, OrderEmbed } from '../../data/orders/data';
import { OrderLineData } from '../../data/orders/orderlines/OrderLine';
import { PaymentData } from '../../data/payments/data';
import { PaginationParameters } from '../../types/parameters';
import { CreateParameters as PaymentCreateParameters } from '../payments/parameters';
import PickOptional from '../../types/PickOptional';

export type CreateParameters = Pick<OrderData, 'amount' | 'orderNumber' | 'billingAddress' | 'webhookUrl' | 'locale' | 'metadata' | 'expiresAt'> & {
  /**
   * All order lines must have the same currency as the order. You cannot mix currencies within a single order.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order?path=lines#parameters
   */
  lines: (Pick<OrderLineData, 'name' | 'quantity' | 'unitPrice' | 'totalAmount' | 'vatRate' | 'vatAmount'> &
    PickOptional<OrderLineData, 'type' | 'discountAmount' | 'sku' | 'metadata'> & {
      /**
       * The category of product bought.
       *
       * This parameter is optional. However, *one* of your order lines should contain it if you want to accept `voucher` payments.
       *
       * Possible values: `meal` `eco` `gift`
       *
       * @see https://docs.mollie.com/reference/v2/orders-api/create-order?path=lines/category#parameters
       */
      category?: string;
      /**
       * A link pointing to an image of the product sold.
       *
       * @see https://docs.mollie.com/reference/v2/orders-api/create-order?path=lines/imageUrl#parameters
       */
      imageUrl?: string;
      /**
       * A link pointing to the product page in your web shop of the product sold.
       *
       * @see https://docs.mollie.com/reference/v2/orders-api/create-order?path=lines/productUrl#parameters
       */
      productUrl?: string;
    })[];
  /**
   * The shipping address for the order.
   *
   * This field is optional, but if it is provided, then the full name and address have to be in a valid format. Please refer to the documentation of the address object for more information on which
   * formats are accepted.
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order?path=shippingAddress#parameters
   */
  shippingAddress?: OrderAddress;
  /**
   * The URL your customer will be redirected to after the payment process. The parameter can be omitted for orders with `payment.sequenceType` set to `recurring`.
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
   * Possible values: `applepay` `bancontact` `banktransfer` `belfius` `creditcard` `directdebit` `eps` `giftcard` `giropay` `ideal` `kbc` `klarnapaylater` `klarnapaynow` `klarnasliceit` `mybank`
   * `paypal` `paysafecard` `przelewy24` `sofort` `voucher`
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
  payment?: Pick<
    PaymentCreateParameters,
    | 'applePayPaymentToken'
    | 'cardToken'
    | 'consumerAccount'
    | 'customerId'
    | 'customerReference'
    | 'issuer'
    | 'mandateId'
    | 'sequenceType'
    | 'voucherNumber'
    | 'voucherPin'
    | 'webhookUrl'
    | 'applicationFee'
  >;
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
