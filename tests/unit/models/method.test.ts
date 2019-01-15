import Method from '../../../src/models/Method';
import { PaymentMethod } from '../../../src/types/global';

describe('method model', () => {
  it('should instantiate with default values', () => {
    const method = new Method();

    expect(method.getImage()).toBeNull();
    expect(method.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const methodProps = {
      resource: 'method',
      id: PaymentMethod.ideal,
      description: 'iDEAL',
      image: {
        size1x: 'https://www.mollie.com/external/icons/payment-methods/ideal.png',
        size2x: 'https://www.mollie.com/external/icons/payment-methods/ideal%402x.png',
        svg: 'https://www.mollie.com/external/icons/payment-methods/ideal.svg',
      },
      issuers: [
        {
          resource: 'issuer',
          id: 'ideal_ABNANL2A',
          name: 'ABN AMRO',
          image: {
            size1x: 'https://www.mollie.com/external/icons/ideal-issuers/ABNANL2A.png',
            size2x: 'https://www.mollie.com/external/icons/ideal-issuers/ABNANL2A%402x.png',
            svg: 'https://www.mollie.com/external/icons/ideal-issuers/ABNANL2A.svg',
          },
        },
        {
          resource: 'issuer',
          id: 'ideal_ASNBNL21',
          name: 'ASN Bank',
          image: {
            size1x: 'https://www.mollie.com/external/icons/ideal-issuers/ASNBNL21.png',
            size2x: 'https://www.mollie.com/external/icons/ideal-issuers/ASNBNL21%402x.png',
            svg: 'https://www.mollie.com/external/icons/ideal-issuers/ASNBNL21.svg',
          },
        },
      ],
      pricing: [
        {
          description: 'The Netherlands',
          fixed: {
            value: '0.29',
            currency: 'EUR'
          },
          variable: '0',
        },
      ],
      _links: {
        self: {
          href: 'https://api.mollie.com/v2/methods/ideal',
          type: 'application/hal+json',
        },
        documentation: {
          href: 'https://docs.mollie.com/reference/v2/methods-api/get-method',
          type: 'text/html',
        },
      },
    };
    const method = new Method(methodProps);

    expect(method.getImage('1x')).toBe(methodProps.image.size1x);
    expect(method.toPlainObject()).toMatchSnapshot();
  });
});
