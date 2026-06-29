import createMollieClient, { PairingCodeStatus, TerminalPairingCodeInclude } from '../../..';
import NetworkMocker, { getApiKeyClientProvider } from '../../NetworkMocker';

const profileId = 'pfl_jA9bC4DkFj3G';

// Built from the example responses in the Mollie reference docs (terminals-get/list-pairing-code). The two strings
// that matter most — the `resource` value used for transform dispatch and the hyphenated `_embedded` key read by
// page()/iterate() — are reproduced verbatim from those examples, which is the whole point of this fixture.
function composePairingCodeResponse(id = 'termpc_R7gX5Ea9bC4DkFj3G', status = PairingCodeStatus.active, { revokedAt = null, details = undefined } = {}) {
  return {
    resource: 'terminal-pairing-code',
    id,
    mode: 'live',
    code: '20eb5ca1f78b48ae9e2b',
    profileId,
    status,
    ...(details && { details }),
    expiresAt: '2026-03-10T10:00:00+00:00',
    revokedAt,
    createdAt: '2025-12-10T10:00:00+00:00',
    _links: {
      self: { href: `https://api.mollie.com/v2/terminals/pairing-codes/${id}`, type: 'application/hal+json' },
      profile: { href: `https://api.mollie.com/v2/profiles/${profileId}`, type: 'application/hal+json' },
      documentation: { href: 'https://docs.mollie.com/reference/terminals-get-pairing-code', type: 'text/html' },
    },
  };
}

function testPairingCode(pairingCode, id = 'termpc_R7gX5Ea9bC4DkFj3G', status = 'active') {
  expect(pairingCode.resource).toBe('terminal-pairing-code');
  expect(pairingCode.id).toBe(id);
  expect(pairingCode.mode).toBe('live');
  expect(pairingCode.code).toBe('20eb5ca1f78b48ae9e2b');
  expect(pairingCode.profileId).toBe(profileId);
  expect(pairingCode.status).toBe(status);
  expect(pairingCode.createdAt).toBe('2025-12-10T10:00:00+00:00');
  expect(pairingCode._links.profile).toEqual({ href: `https://api.mollie.com/v2/profiles/${profileId}`, type: 'application/hal+json' });
}

test('terminalPairingCodes binder is available on the client', () => {
  const mollieClient = createMollieClient({ apiKey: 'test_dummyKey' });
  expect(mollieClient).toHaveProperty('terminalPairingCodes');
  for (const method of ['create', 'get', 'page', 'iterate', 'revoke']) {
    expect(typeof mollieClient.terminalPairingCodes[method]).toBe('function');
  }
});

test('requestPairingCode (create)', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker.intercept('POST', '/terminals/pairing-codes', 201, composePairingCodeResponse('termpc_R7gX5Ea9bC4DkFj3G')).twice();

    const pairingCode = await bluster(mollieClient.terminalPairingCodes.create.bind(mollieClient.terminalPairingCodes))({ profileId });

    testPairingCode(pairingCode);
  });
});

test('getPairingCode', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    const id = 'termpc_K2mN7Pq4sT8vWxYz';
    networkMocker.intercept('GET', `/terminals/pairing-codes/${id}`, 200, composePairingCodeResponse(id, PairingCodeStatus.expired)).twice();

    const pairingCode = await bluster(mollieClient.terminalPairingCodes.get.bind(mollieClient.terminalPairingCodes))(id);

    testPairingCode(pairingCode, id, 'expired');
  });
});

test('getPairingCode includes the QR code when requested', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    const id = 'termpc_R7gX5Ea9bC4DkFj3G';
    // `src` is truncated from the real (long) base64 SVG data URI for readability.
    const details = { qrCode: { height: 256, width: 256, src: 'data:image/svg+xml;base64,PHN2Zy8+' } };
    networkMocker.intercept('GET', `/terminals/pairing-codes/${id}?include=details.qrCode`, 200, composePairingCodeResponse(id, PairingCodeStatus.active, { details })).twice();

    const pairingCode = await bluster(mollieClient.terminalPairingCodes.get.bind(mollieClient.terminalPairingCodes))(id, { include: TerminalPairingCodeInclude.qrCode });

    expect(pairingCode.details?.qrCode).toEqual({ height: 256, width: 256, src: 'data:image/svg+xml;base64,PHN2Zy8+' });
  });
});

test('listPairingCodes decodes the _embedded "terminal-pairing-codes" array', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    networkMocker
      .intercept('GET', '/terminals/pairing-codes', 200, {
        count: 3,
        _embedded: {
          'terminal-pairing-codes': [
            composePairingCodeResponse('termpc_R7gX5Ea9bC4DkFj3G', PairingCodeStatus.active),
            composePairingCodeResponse('termpc_K2mN7Pq4sT8vWxYz', PairingCodeStatus.expired),
            composePairingCodeResponse('termpc_H5nR2Lp8qM6vBcXe', PairingCodeStatus.revoked, { revokedAt: '2025-11-15T08:30:00+00:00' }),
          ],
        },
        _links: {
          self: { href: 'https://api.mollie.com/v2/terminals/pairing-codes', type: 'application/hal+json' },
          previous: null,
          next: null,
          documentation: { href: 'https://docs.mollie.com/reference/terminals-list-pairing-codes', type: 'text/html' },
        },
      })
      .twice();

    const pairingCodes = await bluster(mollieClient.terminalPairingCodes.page.bind(mollieClient.terminalPairingCodes))();

    expect(pairingCodes.length).toBe(3);
    testPairingCode(pairingCodes[0], 'termpc_R7gX5Ea9bC4DkFj3G', 'active');
    testPairingCode(pairingCodes[1], 'termpc_K2mN7Pq4sT8vWxYz', 'expired');
    testPairingCode(pairingCodes[2], 'termpc_H5nR2Lp8qM6vBcXe', 'revoked');
    expect(pairingCodes[2].revokedAt).toBe('2025-11-15T08:30:00+00:00');
    expect(pairingCodes.links.next).toBeNull();
  });
});

test('revokePairingCode returns the revoked code', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    const id = 'termpc_H5nR2Lp8qM6vBcXe';
    networkMocker.intercept('DELETE', `/terminals/pairing-codes/${id}`, 200, composePairingCodeResponse(id, PairingCodeStatus.revoked, { revokedAt: '2025-11-15T08:30:00+00:00' })).twice();

    const pairingCode = await bluster(mollieClient.terminalPairingCodes.revoke.bind(mollieClient.terminalPairingCodes))(id);

    testPairingCode(pairingCode, id, 'revoked');
    expect(pairingCode.revokedAt).toBe('2025-11-15T08:30:00+00:00');
  });
});

test('getProfile() follows the pairing code profile link', () => {
  return new NetworkMocker(getApiKeyClientProvider()).use(async ([mollieClient, networkMocker]) => {
    const id = 'termpc_R7gX5Ea9bC4DkFj3G';
    networkMocker.intercept('GET', `/terminals/pairing-codes/${id}`, 200, composePairingCodeResponse(id));
    networkMocker
      .intercept('GET', `/profiles/${profileId}`, 200, {
        resource: 'profile',
        id: profileId,
        mode: 'live',
        _links: {
          self: { href: `https://api.mollie.com/v2/profiles/${profileId}`, type: 'application/hal+json' },
          documentation: { href: 'https://docs.mollie.com/reference/get-profile', type: 'text/html' },
        },
      })
      .twice();

    const pairingCode = await mollieClient.terminalPairingCodes.get(id);
    const profile = await bluster(pairingCode.getProfile.bind(pairingCode))();

    expect(profile.resource).toBe('profile');
    expect(profile.id).toBe(profileId);
  });
});
