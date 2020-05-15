import { Address, Amount, PaymentMethod } from '../../data/global';
import { CommonListParameters } from '../../types/parameters';
import { Issuer } from '../../data/Issuer';
import { PaymentData, PaymentEmbed, PaymentInclude } from '../../data/payments/data';
import PickOptional from '../../types/PickOptional';

export type CreateParameters = Pick<PaymentData, 'amount' | 'description' | 'redirectUrl' | 'webhookUrl' | 'customerId' | 'mandateId'> &
  PickOptional<PaymentData, 'locale' | 'metadata' | 'sequenceType'> & {
    /**
     * Normally, a payment method screen is shown. However, when using this parameter, you can choose a specific payment
     * method and your customer will skip the selection screen and is sent directly to the chosen payment method. The
     * parameter enables you to fully integrate the payment method selection into your website.
     *
     * You can also specify the methods in an array. By doing so we will still show the payment method selection screen
     * but will only show the methods specified in the array. For example, you can use this functionality to only show
     * payment methods from a specific country to your customer `['bancontact', 'belfius', 'inghomepay']`.
     */
    method?: PaymentMethod | PaymentMethod[];
    /**
     * For digital goods in most jurisdictions, you must apply the VAT rate from your customer's country. Choose the VAT
     * rates you have used for the order to ensure your customer's country matches the VAT country. Use this parameter to
     * restrict the payment methods available to your customer to those from a single country.
     *
     * If available, the credit card method will still be offered, but only cards from the allowed country are accepted.
     */
    restrictPaymentMethodsToCountry?: string;
    billingEmail?: string;
    dueDate?: string;
    billingAddress?: Address;
    shippingAddress?: Address;
    /**
     * Indicate if you're about to deliver digital goods, like for example a license. Setting this parameter can have
     * consequences for your Seller Protection by PayPal. Please see PayPal's help article about Seller Protection for
     * more information.
     */
    digitalGoods?: boolean;
    issuer?: Issuer;
    customerReference?: string;
    consumerName?: string;
    consumerAccount?: string;
    voucherNumber?: string;
    voucherPin?: string;

    include?: PaymentInclude[] | PaymentInclude;

    profileId?: string;
    testmode?: boolean;
    applicationFee?: {
      amount: Amount;
      description: string;
    };
  };

export interface GetParameters {
  include?: PaymentInclude;
  embed?: PaymentEmbed[] | PaymentEmbed;
  testmode?: boolean;
}

export type ListParameters = CommonListParameters & {
  profileId?: string;
  testmode?: boolean;
};

export type UpdateParameters = Pick<PaymentData, 'redirectUrl' | 'webhookUrl'> &
  PickOptional<PaymentData, 'description' | 'metadata'> & {
    /**
     * For digital goods in most jurisdictions, you must apply the VAT rate from your customer's country. Choose the VAT
     * rates you have used for the order to ensure your customer's country matches the VAT country. Use this parameter to
     * restrict the payment methods available to your customer to those from a single country.
     *
     * If available, the credit card method will still be offered, but only cards from the allowed country are accepted.
     */
    restrictPaymentMethodsToCountry?: string;
  };

export interface CancelParameters {
  testmode?: boolean;
}
