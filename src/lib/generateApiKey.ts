'use server';

import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

import { ApiKeyType } from '@/types/ApiKeyType';

export const generateKey = (type: ApiKeyType) => {
  return type === ApiKeyType.client ? generateClientKey() : generateSecretKey();
};

const generateClientKey = () => {
  const buffer = randomBytes(32);

  return buffer.toString('base64');
};

const generateSecretKey = () => {
  const key = generateClientKey();
  const salt = randomBytes(8).toString('hex');
  const buffer = scryptSync(key, salt, 64) as Buffer;
  const hash = `${buffer.toString('hex')}.${salt}`;

  return hash;
};

export const compareKeys = (storedKey: string, suppliedKey: string) => {
  const [hashedPassword, salt] = storedKey.split('.');
  const buffer = scryptSync(suppliedKey, salt, 64) as Buffer;

  return timingSafeEqual(Buffer.from(hashedPassword, 'hex'), buffer);
};
