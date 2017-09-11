import Issuer from 'models/issuer';

describe('issuer model', () => {
  it('should instantiate with default values', () => {
    const issuer = new Issuer();

    expect(issuer.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const issuerProps = {
      resource: 'issuer',
      id: 'ideal_TESTNL99',
      name: 'TBM Bank',
      method: 'ideal',
    };
    const issuer = new Issuer(issuerProps);

    expect(issuer.toPlainObject()).toMatchSnapshot();
  });
});
