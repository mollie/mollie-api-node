import { OrderData } from './data';
import OrderLine, { transform as transformOrderLine } from './orderlines/OrderLine';
import Payment, { transform as transformPayment } from '../payments/Payment';
import Refund, { transform as transformRefund } from '../refunds/Refund';
import Shipment, { transform as transformShipment } from './shipments/Shipment';
import Seal from '../../types/Seal';
import OrderHelper from './OrderHelper';
import TransformingNetworkClient from '../../TransformingNetworkClient';

type Order = Seal<
  Omit<OrderData, '_embedded'> & {
    lines: OrderLine[];
    _embedded?: {
      payments?: Payment[];
      refunds?: Refund[];
      shipments?: Shipment[];
    };
  },
  OrderHelper
>;

export default Order;

export function transform(networkClient: TransformingNetworkClient, input: OrderData): Order {
  let _embedded: Order['_embedded'];
  if (input._embedded != undefined) {
    _embedded = {};
    if (input._embedded.payments != undefined) {
      _embedded.payments = input._embedded.payments.map(transformPayment.bind(undefined, networkClient));
    }
    if (input._embedded.refunds != undefined) {
      _embedded.refunds = input._embedded.refunds.map(transformRefund.bind(undefined, networkClient));
    }
    if (input._embedded.shipments != undefined) {
      _embedded.shipments = input._embedded.shipments.map(transformShipment.bind(undefined, networkClient));
    }
  }
  return Object.assign(new OrderHelper(networkClient, input._links, _embedded), input, {
    lines: input.lines.map(transformOrderLine),
    _embedded,
  });
}
