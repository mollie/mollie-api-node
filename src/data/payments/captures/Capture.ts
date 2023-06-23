import type TransformingNetworkClient from '../../../communication/TransformingNetworkClient';
import type Seal from '../../../types/Seal';
import type Payment from '../Payment';
import { transform as transformPayment } from '../Payment';
import CaptureHelper from './CaptureHelper';
import { type CaptureData } from './data';

type Capture = Seal<Omit<CaptureData, '_embedded'> & { _embedded?: { payment?: Payment } }, CaptureHelper>;

export default Capture;

export function transform(networkClient: TransformingNetworkClient, input: CaptureData): Capture {
  let _embedded: Capture['_embedded'];
  if (input._embedded != undefined) {
    _embedded = {};
    if (input._embedded.payment != undefined) {
      _embedded.payment = transformPayment(networkClient, input._embedded.payment);
    }
  }
  return Object.assign(Object.create(new CaptureHelper(networkClient, input._links, _embedded)), input, { _embedded });
}
