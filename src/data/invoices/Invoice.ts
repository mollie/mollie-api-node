import type TransformingNetworkClient from '../../communication/TransformingNetworkClient';
import type Seal from '../../types/Seal';
import { type InvoiceData } from './data';
import InvoiceHelper from './InvoiceHelper';

type Invoice = Seal<Omit<InvoiceData, '_links'>, InvoiceHelper>;

export default Invoice;

export function transform(networkClient: TransformingNetworkClient, input: InvoiceData): Invoice {
  return Object.assign(Object.create(new InvoiceHelper(networkClient, input._links)), input);
}
