import { Amount } from '../../../data/global';
import { ShipmentData } from '../../../data/orders/shipments/Shipment';
import PickRequired from '../../../types/PickRequired';

interface ContextParameters {
  orderId: string;
  testmode?: boolean;
}

export type CreateParameters = ContextParameters &
  Pick<ShipmentData, 'tracking'> & {
    /**
     * An array of objects containing the order line details you want to create a shipment for. If you send an empty
     * array, the entire order will be shipped. If the order is already partially shipped, any remaining lines will be
     * shipped.
     */
    lines: {
      /**
       * The API resource token of the order line, for example: `'odl_jp31jz'`.
       */
      id: string;
      /**
       * The number of items that should be shipped for this order line. When this parameter is omitted, the whole order
       * line will be shipped.
       *
       * Must be less than the number of items already shipped for this order line.
       */
      quantity?: number;
      /**
       * The amount that you want to ship. In almost all cases, Mollie can determine the amount automatically.
       *
       * The amount is required only if you are *partially* shipping an order line which has a non-zero `discountAmount`.
       *
       * The amount you can ship depends on various properties of the order line and the create shipment request. The
       * maximum that can be shipped is `unit price x quantity to ship`.
       *
       * The minimum amount depends on the discount applied to the line, the quantity already shipped or canceled, the
       * amounts already shipped or canceled and the quantity you want to ship.
       *
       * If you do not send an amount, Mollie will determine the amount automatically or respond with an error if the
       * amount cannot be determined automatically. The error will contain the `extra.minimumAmount` and
       * `extra.maximumAmount` properties that allow you pick the right amount.
       */
      amount?: Amount;
    }[];
  };

export type GetParameters = ContextParameters;

export type ListParameters = ContextParameters;

export type UpdateParameters = ContextParameters & PickRequired<ShipmentData, 'tracking'>;

export type CancelParameters = ContextParameters & {
  /**
   * An array of objects containing the order line details you want to cancel.
   */
  lines: {
    /**
     * The API resource token of the order line, for example: `'odl_jp31jz'`.
     */
    id: string;
    /**
     * The number of items that should be canceled for this order line. When this parameter is omitted, the whole order
     * line will be canceled. When part of the line has been shipped, it will cancel the remainder and the order line
     * will be completed.
     *
     * Must be less than the number of items already shipped or canceled for this order line.
     */
    quantity?: number;
    /**
     * The amount that you want to cancel. In almost all cases, Mollie can determine the amount automatically.
     *
     * The amount is required only if you are *partially* canceling an order line which has a non-zero
     * `discountAmount`.
     *
     * The amount you can cancel depends on various properties of the order line and the cancel order lines request.
     * The maximum that can be canceled is `unit price x quantity to cancel`.
     *
     * The minimum amount depends on the discount applied to the line, the quantity already shipped or canceled, the
     * amounts already shipped or canceled and the quantity you want to cancel.
     *
     * If you do not send an amount, Mollie will determine the amount automatically or respond with an error if the
     * amount cannot be determined automatically. The error will contain the `extra.minimumAmount` and
     * `extra.maximumAmount` properties that allow you pick the right amount.
     */
    amount?: Amount;
  }[];
};
