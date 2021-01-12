import { CreateParameters } from './parameters';
import { PaymentData } from '../../../data/payments/data';
import ApiError from '../../../errors/ApiError';
import Callback from '../../../types/Callback';
import NetworkClient from '../../../NetworkClient';
import ParentedResource from '../../ParentedResource';
import Payment, { injectPrototypes } from '../../../data/payments/Payment';
import TransformingNetworkClient from '../../../TransformingNetworkClient';
import checkId from '../../../plumbing/checkId';
import renege from '../../../plumbing/renege';

export default class OrdersPaymentsResource extends ParentedResource<PaymentData, Payment> {
  constructor(networkClient: NetworkClient) {
    super(new TransformingNetworkClient(networkClient, injectPrototypes));
  }

  protected getResourceUrl(orderId: string): string {
    return `orders/${orderId}/payments`;
  }

  /**
   * Create order payment
   *
   * @since 3.1.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/create-order-payment
   */
  public create(parameters: CreateParameters): Promise<Payment>;
  public create(parameters: CreateParameters, callback: Callback<Payment>): void;
  public create(parameters: CreateParameters) {
    if (renege(this, this.create, ...arguments)) return;
    const orderId = this.getParentId(parameters.orderId);
    if (!checkId(orderId, 'order')) {
      throw new ApiError('The order id is invalid');
    }
    const { orderId: _, ...data } = parameters;
    return this.networkClient.post<Payment>(this.getResourceUrl(orderId), data);
  }
}
