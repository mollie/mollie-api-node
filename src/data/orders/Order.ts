import { OrderData } from './data';
import OrderLine, { injectPrototypes as injectOrderLinePrototypes } from './orderlines/OrderLine';
import Payment, { injectPrototypes as injectPaymentPrototypes } from '../payments/Payment';
import Refund, { injectPrototypes as injectRefundPrototypes } from '../refunds/Refund';
import Shipment, { injectPrototypes as injectShipmentPrototypes } from './shipments/Shipment';
import Seal from '../../types/Seal';
import orderHelpers from './helpers';

type Order = Seal<
  OrderData & {
    lines: OrderLine[];
    _embedded?: {
      payments?: Omit<Payment, '_embedded'>[];
      refunds?: Omit<Refund, '_embedded'>[];
      shipments?: Omit<Shipment, '_embedded'>[];
    };
  },
  typeof orderHelpers
>;

export default Order;

export function injectPrototypes(input: OrderData): Order {
  let _embedded: Order['_embedded'];
  if (input._embedded != undefined) {
    _embedded = {};
    if (input._embedded.payments != undefined) {
      _embedded.payments = input._embedded.payments.map(injectPaymentPrototypes);
    }
    if (input._embedded.refunds != undefined) {
      _embedded.refunds = input._embedded.refunds.map(injectRefundPrototypes);
    }
    if (input._embedded.shipments != undefined) {
      _embedded.shipments = input._embedded.shipments.map(injectShipmentPrototypes);
    }
  }
  return Object.assign(Object.create(orderHelpers), input, {
    lines: input.lines.map(injectOrderLinePrototypes),
    _embedded,
  });
}
