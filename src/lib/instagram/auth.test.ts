import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import { ADMIN_COOKIE, adminAuthorized, adminSessionValue } from './auth';

const SECRET = 'cron-test-secret';

afterEach(() => {
  delete process.env.CRON_SECRET;
});

function request(headers: Record<string, string> = {}) {
  return new Request('http://localhost/admin/instagram', { headers });
}

describe('instagram admin auth', () => {
  it('accepts the bearer secret or the session cookie, and not the secret pasted as the cookie', () => {
    process.env.CRON_SECRET = SECRET;
    assert.equal(adminAuthorized(request()), false);
    assert.equal(adminAuthorized(request({ authorization: `Bearer ${SECRET}` })), true);
    assert.equal(adminAuthorized(request({ authorization: 'Bearer wrong' })), false);
    assert.equal(adminAuthorized(request({ cookie: `${ADMIN_COOKIE}=${adminSessionValue(SECRET)}` })), true);
    assert.equal(adminAuthorized(request({ cookie: `${ADMIN_COOKIE}=${SECRET}` })), false);
    assert.equal(adminSessionValue(SECRET).includes(SECRET), false);
  });
});
