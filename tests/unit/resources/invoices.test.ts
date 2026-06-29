import { InvoiceStatus } from '../../..';
import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

function composeInvoiceResponse(id = 'inv_xBEbP9rvAq', status = InvoiceStatus.paid) {
  return {
    resource: 'invoice',
    id,
    reference: '2024.10000',
    vatNumber: 'NL001234567B01',
    status,
    netAmount: { value: '45.00', currency: 'EUR' },
    vatAmount: { value: '9.45', currency: 'EUR' },
    grossAmount: { value: '54.45', currency: 'EUR' },
    lines: [
      {
        period: '2024-09',
        description: 'iDEAL transaction costs',
        count: 100,
        vatPercentage: 21,
        amount: { value: '45.00', currency: 'EUR' },
      },
    ],
    issuedAt: '2024-09-01',
    paidAt: '2024-09-14',
    _links: {
      self: {
        href: `https://api.mollie.com/v2/invoices/${id}`,
        type: 'application/hal+json',
      },
      pdf: {
        href: `https://www.mollie.com/merchant/download/invoice/${id}/2ab44d60b35b1d06090bba955fa2c602`,
        type: 'application/pdf',
      },
      documentation: {
        href: 'https://docs.mollie.com/reference/get-invoice',
        type: 'text/html',
      },
    },
  };
}

function testInvoice(invoice, id = 'inv_xBEbP9rvAq') {
  expect(invoice.resource).toBe('invoice');
  expect(invoice.id).toBe(id);
  expect(invoice.reference).toBe('2024.10000');
  expect(invoice.vatNumber).toBe('NL001234567B01');
  expect(invoice.status).toBe('paid');
  expect(invoice.netAmount).toEqual({ value: '45.00', currency: 'EUR' });
  expect(invoice.vatAmount).toEqual({ value: '9.45', currency: 'EUR' });
  expect(invoice.grossAmount).toEqual({ value: '54.45', currency: 'EUR' });
  expect(invoice.lines).toEqual([
    {
      period: '2024-09',
      description: 'iDEAL transaction costs',
      count: 100,
      vatPercentage: 21,
      amount: { value: '45.00', currency: 'EUR' },
    },
  ]);
  expect(invoice.issuedAt).toBe('2024-09-01');
  expect(invoice.paidAt).toBe('2024-09-14');
  expect(invoice.getPdfUrl()).toBe(`https://www.mollie.com/merchant/download/invoice/${id}/2ab44d60b35b1d06090bba955fa2c602`);
}

test('getInvoice', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('GET', '/invoices/inv_xBEbP9rvAq', 200, composeInvoiceResponse('inv_xBEbP9rvAq')).twice();

    const invoice = await bluster(mollieClient.invoices.get.bind(mollieClient.invoices))('inv_xBEbP9rvAq');

    testInvoice(invoice, 'inv_xBEbP9rvAq');
  });
});

test('getInvoiceWithoutPdf', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    const response = composeInvoiceResponse('inv_open', InvoiceStatus.open);
    delete (response._links as { pdf?: unknown }).pdf;
    networkMocker.intercept('GET', '/invoices/inv_open', 200, response).twice();

    const invoice = await bluster(mollieClient.invoices.get.bind(mollieClient.invoices))('inv_open');

    expect(invoice.status).toBe('open');
    expect(invoice.getPdfUrl()).toBeNull();
  });
});

test('listInvoices', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('GET', '/invoices', 200, {
        count: 2,
        _embedded: {
          invoices: [composeInvoiceResponse('inv_1'), composeInvoiceResponse('inv_2')],
        },
        _links: {
          documentation: {
            href: 'https://docs.mollie.com/reference/list-invoices',
            type: 'text/html',
          },
          self: {
            href: 'https://api.mollie.com/v2/invoices?limit=50',
            type: 'application/hal+json',
          },
          previous: null,
          next: null,
        },
      })
      .twice();

    const invoices = await bluster(mollieClient.invoices.page.bind(mollieClient.invoices))();

    expect(invoices.length).toBe(2);
    expect(invoices.links.documentation).toEqual({
      href: 'https://docs.mollie.com/reference/list-invoices',
      type: 'text/html',
    });
    expect(invoices.links.self).toEqual({
      href: 'https://api.mollie.com/v2/invoices?limit=50',
      type: 'application/hal+json',
    });
    expect(invoices.links.previous).toBeNull();
    expect(invoices.links.next).toBeNull();

    testInvoice(invoices[0], 'inv_1');
    testInvoice(invoices[1], 'inv_2');
  });
});
