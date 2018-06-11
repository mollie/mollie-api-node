import Mandate from 'models/mandate';

describe('mandate model', () => {
  it('should instantiate with default values', () => {
    const mandate = new Mandate();

    expect(mandate.isValid()).toBe(false);
    expect(mandate.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const mandateProps = JSON.parse(`{
        "resource": "mandate",
        "id": "mdt_h3gAaD5zP",
        "status": "valid",
        "method": "directdebit",
        "details": {
            "consumerName": "John Doe",
            "consumerAccount": "NL55INGB0000000000",
            "consumerBic": "INGBNL2A"
        },
        "mandateReference": "YOUR-COMPANY-MD1380",
        "signatureDate": "2018-05-07",
        "createdAt": "2018-05-07T10:49:08+00:00",
        "_links": {
            "self": {
                "href": "https://api.mollie.com/v2/customers/cst_4qqhO89gsT/mandates/mdt_h3gAaD5zP",
                "type": "application/hal+json"
            },
            "customer": {
                "href": "https://api.mollie.com/v2/customers/cst_4qqhO89gsT",
                "type": "application/hal+json"
            },
            "documentation": {
                "href": "https://docs.mollie.com/reference/v2/mandates-api/get-mandate",
                "type": "text/html"
            }
        }
    }`);
    const mandate = new Mandate(mandateProps);

    expect(mandate.isValid()).toBe(true);
    expect(mandate.toPlainObject()).toMatchSnapshot();
  });
});
