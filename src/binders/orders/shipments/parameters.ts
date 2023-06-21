import { type Amount } from '../../../data/global';
import { type ShipmentData } from '../../../data/orders/shipments/Shipment';
import { type IdempotencyParameter } from '../../../types/parameters';
import type PickRequired from '../../../types/PickRequired';

interface ContextParameters {
  orderId: string;
  testmode?: boolean;
}

export type CreateParameters = ContextParameters &
  Pick<ShipmentData, 'tracking'> & {
    /**
     * An array of objects containing the order line details you want to create a shipment for. If you leave out this parameter, the entire order will be shipped. If the order is already partially
     * shipped, any remaining lines will be shipped.
     *
     * @see https://docs.mollie.com/reference/v2/shipments-api/create-shipment?path=lines#parameters
     */
    lines?: {
      /**
       * The API resource token of the order line, for example: `odl_jp31jz`.
       *
       * @see https://docs.mollie.com/reference/v2/shipments-api/create-shipment?path=lines/id#parameters
       */
      id: string;
      /**
       * The number of items that should be shipped for this order line. When this parameter is omitted, the whole order line will be shipped.
       *
       * Must be less than the number of items already shipped for this order line.
       *
       * @see https://docs.mollie.com/reference/v2/shipments-api/create-shipment?path=lines/quantity#parameters
       */
      quantity?: number;
      /**
       * The amount that you want to ship. In almost all cases, Mollie can determine the amount automatically.
       *
       * The amount is required only if you are *partially* shipping an order line which has a non-zero `discountAmount`.
       *
       * The amount you can ship depends on various properties of the order line and the create shipment request. The maximum that can be shipped is `unit price x quantity to ship`.
       *
       * The minimum amount depends on the discount applied to the line, the quantity already shipped or canceled, the amounts already shipped or canceled and the quantity you want to ship.
       *
       * If you do not send an amount, Mollie will determine the amount automatically or respond with an error if the amount cannot be determined automatically. The error will contain the
       * `extra.minimumAmount` and `extra.maximumAmount` properties that allow you pick the right amount.
       *
       * @see https://docs.mollie.com/reference/v2/shipments-api/create-shipment?path=lines/amount#parameters
       */
      amount?: Amount;
    }[];
  } & IdempotencyParameter;

export type GetParameters = ContextParameters;

export type ListParameters = ContextParameters;

export type UpdateParameters = ContextParameters & PickRequired<ShipmentData, 'tracking'>;
