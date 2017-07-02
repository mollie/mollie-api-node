import Payment from 'models/payment';

describe('payment model', () => {
  it('should instantiate with default values', () => {
    const payment = new Payment();

    expect(payment.isOpen()).toBe(false);
    expect(payment.isPaid()).toBe(false);
    expect(payment.isCancelled()).toBe(false);
    expect(payment.isExpired()).toBe(false);
    expect(payment.getPaymentUrl()).toBeNull();
    expect(payment.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const paymentProps = {
      resource: 'payment',
      id: 'tr_7UhSN1zuXS',
      mode: 'test',
      status: Payment.STATUS_OPEN,
      createdDatetime: '2017-05-06T21:53:21.561Z',
      links: {
        paymentUrl: 'https://www.mollie.com/payscreen/select-method/7UhSN1zuXS',
      },
      metadata: {
        orderId: '12345',
      },
    };
    const payment = new Payment(paymentProps);

    expect(payment.isOpen()).toBe(true);
    expect(payment.isPaid()).toBe(false);
    expect(payment.isCancelled()).toBe(false);
    expect(payment.isExpired()).toBe(false);
    expect(payment.getPaymentUrl()).toBe(paymentProps.links.paymentUrl);
    expect(payment.toPlainObject()).toMatchSnapshot();
  });
});
