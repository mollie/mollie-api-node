import { PaymentMethod } from '../../../data/global';
import { PaymentData } from '../../../data/payments/data';

interface ContextParameters {
  orderId: string;
  testmode?: boolean;
}

export type CreateParameters = ContextParameters &
  Pick<PaymentData, 'mandateId' | 'applicationFee'> & {
    /**
     * Normally, a payment method screen is shown. However, when using this parameter, you can choose a specific payment method and your customer will skip the selection screen and is sent directly to
     * the chosen payment method. The parameter enables you to fully integrate the payment method selection into your website.
     *
     * You can also specify the methods in an array. By doing so we will still show the payment method selection screen but will only show the methods specified in the array. For example, you can use
     * this functionality to only show payment methods from a specific country to your customer `["bancontact", "belfius"]`.
     *
     * Possible values: `applepay` `bancontact` `banktransfer` `belfius` `creditcard` `directdebit` `eps` `giftcard` `giropay` `ideal` `kbc` `klarnapaylater` `klarnapaynow` `klarnasliceit` `paypal`
     * `paysafecard` `przelewy24` `sofort`
     *
     * @see https://docs.mollie.com/reference/v2/orders-api/create-order-payment?path=method#parameters
     */
    method?: PaymentMethod | PaymentMethod[];
    /**
     * The ID of the customer for whom the payment is being created. This is used for recurring payments and single-click payments.
     *
     * @see https://docs.mollie.com/reference/v2/orders-api/create-order-payment?path=customerId#parameters
     */
    customerId?: string;
  };
