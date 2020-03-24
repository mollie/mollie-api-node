type ResourceKind = 'capture' | 'chargeback' | 'customer' | 'mandate' | 'order' | 'orderline' | 'payment' | 'refund' | 'shipment' | 'subscription';

const prefixes = new Map<ResourceKind, string>([
  ['capture', 'cpt_'],
  ['chargeback', 'chb_'],
  ['customer', 'cst_'],
  ['mandate', 'mdt_'],
  ['order', 'ord_'],
  ['orderline', 'odl_'],
  ['payment', 'tr_'],
  ['refund', 're_'],
  ['shipment', 'shp_'],
  ['subscription', 'sub_'],
]);
/**
 * Returns whether the passed identifier seems plausible (`true`); or is definitely invalid (`false`).
 */
export default function checkId(value: string, resource: ResourceKind): boolean {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return value.startsWith(prefixes.get(resource)!);
}
