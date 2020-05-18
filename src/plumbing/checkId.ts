type ResourceKind = 'capture' | 'chargeback' | 'customer' | 'mandate' | 'order' | 'orderline' | 'organization' | 'payment' | 'permission' | 'profile' | 'refund' | 'shipment' | 'subscription';

const prefixes = new Map<ResourceKind, string>([
  ['capture', 'cpt_'],
  ['chargeback', 'chb_'],
  ['customer', 'cst_'],
  ['mandate', 'mdt_'],
  ['order', 'ord_'],
  ['orderline', 'odl_'],
  ['organization', 'org_'],
  ['payment', 'tr_'],
  ['profile', 'pfl_'],
  ['refund', 're_'],
  ['shipment', 'shp_'],
  ['subscription', 'sub_'],
]);
/**
 * Returns whether the passed identifier seems plausible (`true`); or is definitely invalid (`false`).
 */
export default function checkId(value: string | undefined, resource: ResourceKind): value is string {
  if (typeof value != 'string') {
    return false;
  }
  // Examples of permission identifiers are 'payments.read' and 'refunds.write'. This function currently relies on the
  // API to return an error if the identifier is unexpected, instead of returning a client-side check.
  if (resource == 'permission') {
    return true;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return value.startsWith(prefixes.get(resource)!);
}
