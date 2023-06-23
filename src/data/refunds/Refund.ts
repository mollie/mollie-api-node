import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import type OrderLine from '../orders/orderlines/OrderLine';
import { transform as transformOrderLine } from '../orders/orderlines/OrderLine';
import type Payment from '../payments/Payment';
import { transform as transformPayment } from '../payments/Payment';
import { type RefundData } from './data';
import RefundHelper from './RefundHelper';

type Refund = Seal<Omit<RefundData, 'lines' | '_embedded'> & { lines?: OrderLine[]; _embedded?: { payment?: Payment } }, RefundHelper>;

export default Refund;

export function transform(networkClient: TransformingNetworkClient, input: RefundData): Refund {
  let _embedded: Refund['_embedded'];
  if (input._embedded != undefined) {
    _embedded = {};
    if (input._embedded.payment != undefined) {
      _embedded.payment = transformPayment(networkClient, input._embedded.payment);
    }
  }
  let lines: Refund['lines'];
  if (input.lines != undefined) {
    lines = input.lines.map(transformOrderLine);
  }
  return Object.assign(Object.create(new RefundHelper(networkClient, input._links, _embedded)), input, {
    lines,
    _embedded,
  });
}
