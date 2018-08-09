import Refund from 'models/refund';

describe('refund model', () => {
  it('should instantiate with default values', () => {
    const refund = new Refund();

    expect(refund.isQueued()).toBe(false);
    expect(refund.isPending()).toBe(false);
    expect(refund.isProcessing()).toBe(false);
    expect(refund.isRefunded()).toBe(false);
    expect(refund.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const refundProps = JSON.parse(`{
        "resource": "refund",
        "id": "re_4qqhO89gsT",
        "amount": {
            "currency": "EUR",
            "value": "5.95"
        },
        "status": "pending",
        "createdAt": "2018-03-14T17:09:02.0Z",
        "description": "Order",
        "paymentId": "tr_WDqYK6vllg",
        "_links": {
            "self": {
                "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg/refunds/re_4qqhO89gsT",
                "type": "application/hal+json"
            },
            "payment": {
                "href": "https://api.mollie.com/v2/payments/tr_WDqYK6vllg",
                "type": "application/hal+json"
            },
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/refunds-api/get-refund",
                "type": "text/html"
            }
        }
    }`);
    const refund = new Refund(refundProps);

    expect(refund.isQueued()).toBe(false);
    expect(refund.isPending()).toBe(true);
    expect(refund.isProcessing()).toBe(false);
    expect(refund.isRefunded()).toBe(false);
    expect(refund.toPlainObject()).toMatchSnapshot();
  });
});
