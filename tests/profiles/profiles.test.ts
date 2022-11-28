import { ApiMode, MollieClient } from '../..';
import NetworkMocker, { getAccessTokenClientProvider } from '../NetworkMocker';

// 'record' ‒ This test interacts with the real Mollie API over the network, and records the communication.
// 'replay' ‒ This test uses existing recordings to simulate the network.
const networkMode = 'replay';

test('profiles', async () => {
  const networkMocker = new NetworkMocker.Auto(networkMode, getAccessTokenClientProvider, 'profiles');
  const mollieClient = await networkMocker.prepare();

  // Create the profile.
  let profile = await mollieClient.profiles.create({
    name: 'Iteration test profile',
    email: 'example@example.org',
    phone: '+31208202070',
    website: 'https://example.org',
    mode: ApiMode.test,
  });
  // Update the profile.
  profile = await mollieClient.profiles.update(profile.id, { businessCategory: 'RESTAURANTS_NIGHTLIFE' });
  expect(profile.businessCategory).toBe('RESTAURANTS_NIGHTLIFE');
  // Enable and disable giftcard issuer.
  const giftcardIssuer = await mollieClient.profileGiftcardIssuers.enable({ profileId: profile.id, id: 'festivalcadeau' });
  await mollieClient.profileGiftcardIssuers.disable({ profileId: profile.id, id: giftcardIssuer.id });
  // Enable and disable voucher issuer.
  const voucherIssuer = await mollieClient.profileVoucherIssuers.enable({ profileId: profile.id, id: 'appetiz', contractId: 'test_contract_id' });
  await mollieClient.profileVoucherIssuers.disable({ profileId: profile.id, id: voucherIssuer.id });
  // Delete the profile.
  expect(await mollieClient.profiles.delete(profile.id)).toBe(true);

  networkMocker.cleanup();
});
