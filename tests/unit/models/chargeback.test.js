import Chargeback from 'models/chargeback';

describe('chargeback model', () => {
  it('should instantiate with default values', () => {
    const chargeback = new Chargeback();

    expect(chargeback.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const chargebackProps = {
      resource: 'chargeback',
      id: 'chb_n9z0tp',
      payment: 'tr_WDqYK6vllg',
      amount: 35.07,
      chargebackDatetime: '2017-11-02T11:41:23.0Z',
      reversedDatetime: null,
    };
    const chargeback = new Chargeback(chargebackProps);

    expect(chargeback.toPlainObject()).toMatchSnapshot();
  });
});
