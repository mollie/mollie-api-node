import { BalanceTransferStatus } from '../../..';
import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

function composeBalanceTransferResponse(id = 'cbtr_nBprRarXeqXi98AXSqCBJ') {
  return {
    resource: 'connect-balance-transfer',
    id,
    amount: {
      value: '100.00',
      currency: 'EUR',
    },
    source: {
      type: 'organization',
      id: 'org_1',
      description: 'Description for source',
    },
    destination: {
      type: 'organization',
      id: 'org_2',
      description: 'Description for destination',
    },
    description: 'Description for initiating party',
    status: BalanceTransferStatus.succeeded,
    statusReason: {
      code: 'success',
      message: 'Balance transfer completed successfully.',
    },
    category: 'invoice_collection',
    createdAt: '2025-05-01T10:00:00Z',
    executedAt: '2025-05-01T10:05:00Z',
    mode: 'live',
    _links: {
      self: {
        href: `https://api.mollie.com/v2/connect/balance-transfers/${id}`,
        type: 'application/hal+json',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/create-connect-balance-transfer',
        type: 'text/html',
      },
    },
  };
}

function testBalanceTransfer(transfer, id = 'cbtr_nBprRarXeqXi98AXSqCBJ') {
  expect(transfer.resource).toBe('connect-balance-transfer');
  expect(transfer.id).toBe(id);
  expect(transfer.amount).toEqual({ value: '100.00', currency: 'EUR' });
  expect(transfer.source).toEqual({
    type: 'organization',
    id: 'org_1',
    description: 'Description for source',
  });
  expect(transfer.destination).toEqual({
    type: 'organization',
    id: 'org_2',
    description: 'Description for destination',
  });
  expect(transfer.description).toBe('Description for initiating party');
  expect(transfer.status).toBe('succeeded');
  expect(transfer.statusReason).toEqual({
    code: 'success',
    message: 'Balance transfer completed successfully.',
  });
  expect(transfer.category).toBe('invoice_collection');
  expect(transfer.createdAt).toBe('2025-05-01T10:00:00Z');
  expect(transfer.executedAt).toBe('2025-05-01T10:05:00Z');
  expect(transfer.mode).toBe('live');
  expect(transfer._links.self).toEqual({
    href: `https://api.mollie.com/v2/connect/balance-transfers/${id}`,
    type: 'application/hal+json',
  });
}

test('createBalanceTransfer', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('POST', '/connect/balance-transfers', 201, composeBalanceTransferResponse('cbtr_test123')).twice();

    const transfer = await bluster(mollieClient.balanceTransfers.create.bind(mollieClient.balanceTransfers))({
      amount: { value: '100.00', currency: 'EUR' },
      source: { type: 'organization', id: 'org_1', description: 'Description for source' },
      destination: { type: 'organization', id: 'org_2', description: 'Description for destination' },
      description: 'Description for initiating party',
      category: 'invoice_collection',
    });

    testBalanceTransfer(transfer, 'cbtr_test123');
  });
});

test('getBalanceTransfer', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/connect/balance-transfers/cbtr_test456', 200, composeBalanceTransferResponse('cbtr_test456')).twice();

    const transfer = await bluster(mollieClient.balanceTransfers.get.bind(mollieClient.balanceTransfers))('cbtr_test456');

    testBalanceTransfer(transfer, 'cbtr_test456');
  });
});

test('listBalanceTransfers', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('GET', '/connect/balance-transfers', 200, {
        count: 2,
        _embedded: {
          'connect-balance-transfers': [composeBalanceTransferResponse('cbtr_1'), composeBalanceTransferResponse('cbtr_2')],
        },
        _links: {
          documentation: {
            href: 'https://docs.mollie.com/reference/list-connect-balance-transfers',
            type: 'text/html',
          },
          self: {
            href: 'https://api.mollie.com/v2/connect/balance-transfers?limit=50',
            type: 'application/hal+json',
          },
          previous: null,
          next: null,
        },
      })
      .twice();

    const transfers = await bluster(mollieClient.balanceTransfers.page.bind(mollieClient.balanceTransfers))();

    expect(transfers.length).toBe(2);
    expect(transfers.links.documentation).toEqual({
      href: 'https://docs.mollie.com/reference/list-connect-balance-transfers',
      type: 'text/html',
    });
    expect(transfers.links.self).toEqual({
      href: 'https://api.mollie.com/v2/connect/balance-transfers?limit=50',
      type: 'application/hal+json',
    });
    expect(transfers.links.previous).toBeNull();
    expect(transfers.links.next).toBeNull();

    testBalanceTransfer(transfers[0], 'cbtr_1');
    testBalanceTransfer(transfers[1], 'cbtr_2');
  });
});
