import Refund from 'models/refund';

describe('refund model', () => {
  const refund = new Refund();

  it('should instantiate with default values', () => {
    const refund = new Refund();

    expect(refund.isQueued()).toBe(false);
    expect(refund.isPending()).toBe(false);
    expect(refund.isProcessing()).toBe(false);
    expect(refund.isRefunded()).toBe(false);
    expect(refund.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const refundProps = {
      resource: 'refund',
      status: Refund.STATUS_REFUNDED,
      refundedDatetime: '2017-05-05T14:01:07.0Z',
    };
    const refund = new Refund(refundProps);

    expect(refund.isQueued()).toBe(false);
    expect(refund.isPending()).toBe(false);
    expect(refund.isProcessing()).toBe(false);
    expect(refund.isRefunded()).toBe(true);
    expect(refund.toPlainObject()).toMatchSnapshot();
  });
});
