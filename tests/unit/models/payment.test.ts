import Payment from '../../../src/models/payment';

describe('payment model', () => {
  it('should instantiate with default values', () => {
    const payment = new Payment();

    expect(payment.isOpen()).toBe(false);
    expect(payment.isPaid()).toBe(false);
    expect(payment.isCanceled()).toBe(false);
    expect(payment.isExpired()).toBe(false);
    expect(payment.getPaymentUrl()).toBeNull();
    expect(payment.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const paymentProps = JSON.parse(`{
        "resource": "payment",
        "id": "tr_7UhSN1zuXS",
        "mode": "test",
        "createdAt": "2018-03-20T09:13:37+00:00",
        "amount": {
            "value": "10.00",
            "currency": "EUR"
        },
        "description": "My first payment",
        "method": null,
        "metadata": {
            "order_id": "12345"
        },
        "status": "open",
        "isCancelable": false,
        "expiresAt": "2018-03-20T09:28:37+00:00",
        "details": null,
        "profileId": "pfl_QkEhN94Ba",
        "sequenceType": "oneoff",
        "redirectUrl": "https://webshop.example.org/order/12345/",
        "webhookUrl": "https://webshop.example.org/payments/webhook/",
        "_links": {
            "self": {
                "href": "https://api.mollie.com/v2/payments/tr_7UhSN1zuXS",
                "type": "application/json"
            },
            "checkout": {
                "href": "https://www.mollie.com/payscreen/select-method/7UhSN1zuXS",
                "type": "text/html"
            },
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/payments-api/create-payment",
                "type": "text/html"
            }
        }
    }`);
    const payment = new Payment(paymentProps);

    expect(payment.isOpen()).toBe(true);
    expect(payment.isPaid()).toBe(false);
    expect(payment.isCanceled()).toBe(false);
    expect(payment.isExpired()).toBe(false);
    expect(payment.isAuthorized()).toBe(false);
    expect(payment.getPaymentUrl()).toBe(paymentProps._links.checkout.href);
    expect(payment.toPlainObject()).toMatchSnapshot();
  });
});
