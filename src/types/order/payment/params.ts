import { IAmount, PaymentMethod } from '../../global';

/**
 * Create Order Payment parameters
 *
 * An order has an automatically created payment that your customer can use to pay for the order. When the payment expires you can create a new payment for the order using this endpoint.
 *
 * A new payment can only be created while the status of the order is `created`, and when the status of the existing payment is either `expired`, `canceled` or `failed`.
 *
 * @param orderId - Corresponding Order ID
 *
 * @param method - Normally, a payment method screen is shown. However, when using this parameter, you can choose a specific payment method and your customer will skip the selection screen and is sent directly to the chosen payment method. The parameter enables you to fully integrate the payment method selection into your website.
 * @param customerId - The ID of the Customer for whom the payment is being created. This is used for recurring payments and single click payments.
 * @param mandateId - When creating recurring payments, the ID of a specific Mandate may be supplied to indicate which of the consumer’s accounts should be credited.
 *
 * @param testmode - If the new payment is for a test order this parameter is required and you have to set this to true.
 * @param applicationFee - Adding an application fee allows you to charge the merchant a small sum for the payment and transfer this to your own account.
 *
 * @see https://docs.mollie.com/reference/v2/orders-api/create-order-payment
 */
export interface ICreateParams {
  orderId: string;

  method?: PaymentMethod | Array<PaymentMethod>;
  customerId: string;
  mandateId?: string;

  // Access token parameters
  testmode?: boolean;
  applicationFee?: {
    amount: IAmount;
    description: string;
  };
}
