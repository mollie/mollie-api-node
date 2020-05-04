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
 * Retruns whether the passed permission identifier seems plausible (`true`); or is definitely invalid (`false`).
 */
const checkPermissionId = (() => {
  const pattern = /^[a-z.]+$/;
  return function checkPermissionId(value: string) {
    return pattern.test(value);
  };
})();
/**
 * Returns whether the passed identifier seems plausible (`true`); or is definitely invalid (`false`).
 */
export default function checkId(value: string | undefined, resource: ResourceKind): value is string {
  if (value == undefined) {
    return false;
  }
  if (resource == 'permission') {
    return checkPermissionId(value);
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return value.startsWith(prefixes.get(resource)!);
}
