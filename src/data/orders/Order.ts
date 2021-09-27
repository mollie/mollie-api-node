import { OrderData } from './data';
import OrderLine, { transform as transformOrderLine } from './orderlines/OrderLine';
import Payment, { transform as transformPayment } from '../payments/Payment';
import Refund, { transform as transformRefund } from '../refunds/Refund';
import Shipment, { transform as transformShipment } from './shipments/Shipment';
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

export function transform(input: OrderData): Order {
  let _embedded: Order['_embedded'];
  if (input._embedded != undefined) {
    _embedded = {};
    if (input._embedded.payments != undefined) {
      _embedded.payments = input._embedded.payments.map(transformPayment);
    }
    if (input._embedded.refunds != undefined) {
      _embedded.refunds = input._embedded.refunds.map(transformRefund);
    }
    if (input._embedded.shipments != undefined) {
      _embedded.shipments = input._embedded.shipments.map(transformShipment);
    }
  }
  return Object.assign(Object.create(orderHelpers), input, {
    lines: input.lines.map(transformOrderLine),
    _embedded,
  });
}
