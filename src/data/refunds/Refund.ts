import { RefundData } from './data';
import refundHelpers from './helpers';
import Seal from '../../types/Seal';
import OrderLine, { injectPrototypes as injectOrderLinePrototypes } from '../orders/orderlines/OrderLine';

type Refund = Seal<RefundData & { lines?: OrderLine[] }, typeof refundHelpers>;

export default Refund;

export function injectPrototypes(input: RefundData): Refund {
  let lines: Refund['lines'];
  if (input.lines != undefined) {
    lines = input.lines.map(injectOrderLinePrototypes);
  }
  return Object.assign(Object.create(refundHelpers), input, {
    lines,
  });
}
