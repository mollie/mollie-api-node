import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

const terminalResponse = {
  resource: 'terminal',
  id: 'term_7MgL4wea46qkRcoTZjWEH',
  profileId: 'pfl_QkEhN94Ba',
  status: 'active',
  brand: 'PAX',
  model: 'A920',
  serialNumber: '1234567890',
  currency: 'EUR',
  description: 'Terminal #1',
  mode: 'live',
  createdAt: '2022-02-12T11:58:35+00:00',
  updatedAt: '2022-11-15T13:32:11+00:00',
  _links: {
    self: { href: 'https://api.mollie.com/v2/terminals/term_7MgL4wea46qkRcoTZjWEH', type: 'application/hal+json' },
    documentation: { href: 'https://docs.mollie.com/reference/get-terminal', type: 'text/html' },
  },
};

test('getTerminal', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/terminals/term_7MgL4wea46qkRcoTZjWEH', 200, terminalResponse).twice();

    const terminal = await bluster(mollieClient.terminals.get.bind(mollieClient.terminals))('term_7MgL4wea46qkRcoTZjWEH');

    expect(terminal.id).toBe('term_7MgL4wea46qkRcoTZjWEH');
    expect(terminal.status).toBe('active');
    expect(terminal.brand).toBe('PAX');
    expect(terminal.model).toBe('A920');

    expect(terminal._links.self).toEqual({ href: 'https://api.mollie.com/v2/terminals/term_7MgL4wea46qkRcoTZjWEH', type: 'application/hal+json' });
  });
});

test('getTerminalTestmode', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    // The interceptor only matches when the request carries `?testmode=true`, so it fails if the
    // parameter is dropped instead of being threaded into the query string.
    networkMocker.intercept('GET', '/terminals/term_7MgL4wea46qkRcoTZjWEH?testmode=true', 200, { ...terminalResponse, mode: 'test' }).twice();

    const terminal = await bluster(mollieClient.terminals.get.bind(mollieClient.terminals))('term_7MgL4wea46qkRcoTZjWEH', { testmode: true });

    expect(terminal.id).toBe('term_7MgL4wea46qkRcoTZjWEH');
    expect(terminal.mode).toBe('test');
  });
});
