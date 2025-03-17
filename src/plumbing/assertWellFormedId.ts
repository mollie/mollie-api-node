import ApiError from '../errors/ApiError';
import type Maybe from '../types/Maybe';

const prefixes = {
  'capture': 'cpt_',
  'chargeback': 'chb_',
  'customer': 'cst_',
  'mandate': 'mdt_',
  'order': 'ord_',
  'orderline': 'odl_',
  'organization': 'org_',
  'payment': 'tr_',
  'payment-link': 'pl_',
  'profile': 'pfl_',
  'refund': 're_',
  'shipment': 'shp_',
  'subscription': 'sub_',
} satisfies Record<string, string>;

type ResourceKind = keyof typeof prefixes;

/**
 * Returns whether the passed identifier seems plausible (`true`); or is definitely invalid (`false`).
 */
function checkId(value: Maybe<string>, resource: ResourceKind): value is string {
  if (typeof value != 'string') {
    return false;
  }
  return value.startsWith(prefixes[resource]);
}

/**
 * Asserts that the passed value is a well-formed identifier for the given resource as in 'this looks like it could be a valid identifier for this type of resource'.
 */
export default function assertWellFormedId(value: Maybe<string>, resource: ResourceKind): asserts value is string {
  if (!checkId(value, resource)) {
    throw new ApiError(`The ${resource} id appears invalid: ${value} (unexpected format)`);
  }
}