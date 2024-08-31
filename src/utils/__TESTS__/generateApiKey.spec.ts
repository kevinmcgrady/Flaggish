import { randomBytes, scryptSync } from 'crypto';
import { describe, expect,it } from 'vitest';

import { ApiKeyType } from '@/types/ApiKeyType';
import { compareKeys,generateKey } from '@/utils/generateApiKey';

describe('generateKey', () => {
  it('should generate a client key when ApiKeyType is client', () => {
    const clientKey = generateKey(ApiKeyType.client);

    const buffer = Buffer.from(clientKey, 'base64');
    expect(buffer.length).toBe(32);
  });

  it('should generate a secret key when ApiKeyType is secret', () => {
    const secretKey = generateKey(ApiKeyType.secret);

    const [hash, salt] = secretKey.split('.');
    expect(hash).toBeDefined();
    expect(salt).toBeDefined();

    const keyBuffer = Buffer.from(hash, 'hex');
    expect(keyBuffer.length).toBe(64);
  });
});

describe('compareKeys', () => {
  it('should return true for matching keys', () => {
    const clientKey = generateKey(ApiKeyType.client);
    const salt = randomBytes(8).toString('hex');
    const hashBuffer = scryptSync(clientKey, salt, 64) as Buffer;
    const storedKey = `${hashBuffer.toString('hex')}.${salt}`;

    const result = compareKeys(storedKey, clientKey);

    expect(result).toBe(true);
  });

  it('should return false for non-matching keys', () => {
    const clientKey = generateKey(ApiKeyType.client);
    const differentKey = generateKey(ApiKeyType.client);
    const salt = randomBytes(8).toString('hex');
    const hashBuffer = scryptSync(clientKey, salt, 64) as Buffer;
    const storedKey = `${hashBuffer.toString('hex')}.${salt}`;

    const result = compareKeys(storedKey, differentKey);

    expect(result).toBe(false);
  });

  it('should return false for keys with different salts', () => {
    const clientKey = generateKey(ApiKeyType.client);
    const salt1 = randomBytes(8).toString('hex');
    const salt2 = randomBytes(8).toString('hex');
    const hashBuffer = scryptSync(clientKey, salt1, 64) as Buffer;
    const storedKey = `${hashBuffer.toString('hex')}.${salt2}`;

    const result = compareKeys(storedKey, clientKey);

    expect(result).toBe(false);
  });
});
