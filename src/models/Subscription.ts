import Model from '../model';
import { ISubscription, SubscriptionStatus } from '../types/subscription';

/**
 * The `Subscription` model
 *
 * {@link ISubscription}
 */
export default class Subscription extends Model implements ISubscription {
  public static resourcePrefix = 'sub_';

  public resource = 'subscription';
  public id = null;
  public mode = null;
  public createdAt = null;
  public status = null;
  public amount = {
    currency: null,
    value: null,
  };
  public times = null;
  public interval = null;
  public startDate = null;
  public description = null;
  public method = null;
  public canceledAt = null;
  public webhookUrl = null;
  public timesRemaining = null;
  public metadata = null;
  public _links = {
    self: null,
    documentation: null,
    customer: null,
  };
  public mandateId = null;
  public nextPaymentDate = null;

  // Access token parameters
  public testmode?: boolean;

  /**
   * Subscription constructor
   *
   * @public ✓ This constructor is part of the public API
   */
  public constructor(props?: Partial<ISubscription>) {
    super();

    Object.assign(this, props);
  }

  /**
   * Get the webhook url
   *
   * @public ✓ This method is part of the public API
   */
  public getWebhookUrl(): string {
    return this.webhookUrl;
  }

  /**
   * If the subscription is active
   *
   * @public ✓ This method is part of the public API
   */
  public isActive(): boolean {
    return this.status === SubscriptionStatus.active;
  }

  /**
   * If the subscription is pending
   *
   * @public ✓ This method is part of the public API
   */
  public isPending(): boolean {
    return this.status === SubscriptionStatus.pending;
  }

  /**
   * If the subscription is completed
   *
   * @public ✓ This method is part of the public API
   */
  public isCompleted(): boolean {
    return this.status === SubscriptionStatus.completed;
  }

  /**
   * If the subscription is suspended
   *
   * @public ✓ This method is part of the public API
   */
  public isSuspended(): boolean {
    return this.status === SubscriptionStatus.suspended;
  }

  /**
   * If the subscription is canceled
   *
   * @public ✓ This method is part of the public API
   */
  public isCanceled(): boolean {
    return SubscriptionStatus.canceled == this.status;
  }
}
