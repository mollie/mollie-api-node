import TransformingNetworkClient from '../../../TransformingNetworkClient';
import Seal from '../../../types/Seal';
import Payment, { transform as transformPayment } from '../Payment';
import CaptureHelper from './CaptureHelper';
import { CaptureData } from './data';

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
  return Object.assign(new CaptureHelper(networkClient, input._links, _embedded), input, { _embedded });
}
