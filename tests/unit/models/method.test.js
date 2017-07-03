import Method from 'models/method';

describe('method model', () => {
  it('should instantiate with default values', () => {
    const method = new Method();

    expect(method.getMinimumAmount()).toBe(0);
    expect(method.getMaximumAmount()).toBe(0);
    expect(method.toPlainObject()).toMatchSnapshot();
  });

  it('should instantiate with given values', () => {
    const methodProps = {
      resource: 'method',
      id: 'ideal',
      amount: {
        minimum: 10,
        maximum: 1000,
      },
    };
    const method = new Method(methodProps);

    expect(method.getMinimumAmount()).toBe(methodProps.amount.minimum);
    expect(method.getMaximumAmount()).toBe(methodProps.amount.maximum);
    expect(method.toPlainObject()).toMatchSnapshot();
  });
});
