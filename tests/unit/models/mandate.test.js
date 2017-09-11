import Mandate from 'models/mandate';

describe('mandate model', () => {
  it('should instantiate with default values', () => {
    const mandate = new Mandate();

    expect(mandate.isValid()).toBe(false);
    expect(mandate.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const mandateProps = {
      resource: 'mandate',
      id: 'mdt_pO2m5jVgMa',
      status: 'valid',
      method: 'creditcard',
      customerId: 'cst_R6JLAuqEgm',
      details: {
        cardHolder: 'John Doe',
        cardNumber: '1234',
        cardLabel: 'Mastercard',
        cardFingerprint: 'fHB3CCKx9REkz8fPplT8N4nq',
        cardExpiryDate: '2017-03-31',
      },
      createdDatetime: '2017-04-13T11:32:38.0Z',
    };
    const mandate = new Mandate(mandateProps);

    expect(mandate.isValid()).toBe(true);
    expect(mandate.toPlainObject()).toMatchSnapshot();
  });
});
