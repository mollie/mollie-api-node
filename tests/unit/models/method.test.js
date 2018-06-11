import Method from 'models/method';

describe('method model', () => {
  it('should instantiate with default values', () => {
    const method = new Method();

    expect(method.getImage()).toBeNull();
    expect(method.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const methodProps = JSON.parse(`{
        "resource": "method",
        "id": "ideal",
        "description": "iDEAL",
        "image": {
            "size1x": "https://www.mollie.com/images/payscreen/methods/ideal.png",
            "size2x": "https://www.mollie.com/images/payscreen/methods/ideal%402x.png"
        },
        "_links": {
            "self": {
                "href": "https://api.mollie.com/v2/methods/ideal",
                "type": "application/hal+json"
            }
        }
    }`);
    const method = new Method(methodProps);

    expect(method.getImage('1x')).toBe(methodProps.image.size1x);
    expect(method.toPlainObject()).toMatchSnapshot();
  });
});
