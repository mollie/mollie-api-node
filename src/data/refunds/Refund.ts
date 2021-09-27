import { RefundData } from './data';
import OrderLine, { transform as transformOrderLine } from '../orders/orderlines/OrderLine';
import Seal from '../../types/Seal';
import RefundHelper from './RefundHelper';
import TransformingNetworkClient from '../../TransformingNetworkClient';

type Refund = Seal<RefundData & { lines?: OrderLine[] }, RefundHelper>;

export default Refund;

export function transform(networkClient: TransformingNetworkClient, input: RefundData): Refund {
  let lines: Refund['lines'];
  if (input.lines != undefined) {
    lines = input.lines.map(transformOrderLine);
  }
  return Object.assign(new RefundHelper(networkClient, input._links), input, {
    lines,
  });
}
