import { RefundData } from './data';
import OrderLine, { injectPrototypes as injectOrderLinePrototypes } from '../orders/orderlines/OrderLine';
import Seal from '../../types/Seal';
import refundHelpers from './helpers';

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
