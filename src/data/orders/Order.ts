import { OrderData } from './data';
import orderHelpers from './helpers';
import Seal from '../../types/Seal';
import OrderLine, { injectPrototypes as injectOrderLinePrototypes } from './orderlines/OrderLine';
import Payment, { injectPrototypes as injectPaymentPrototypes } from '../payments/Payment';

type Order = Seal<
  OrderData & {
    lines: OrderLine[];
    _embedded?: {
      payments?: Omit<Payment, '_embedded'>[];
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
  }
  return Object.assign(Object.create(orderHelpers), input, {
    lines: input.lines.map(injectOrderLinePrototypes),
    _embedded,
  });
}
