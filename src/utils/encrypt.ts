// src/utils.ts

import { env } from '../env';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cryptoJs = require('crypto-js');

export const encrypt = (data: string): string => {
  if (!data) {
    return '';
  }

  // 16-byte key (must be exactly 16 chars for AES-128)
  const key = cryptoJs.enc.Utf8.parse(env.app.ENCRYPTION_KEY);

  // Encrypt using AES in ECB mode with PKCS7 padding
  const encrypted = cryptoJs.AES.encrypt(data, key, {
    mode: cryptoJs.mode.ECB,
    padding: cryptoJs.pad.Pkcs7,
  });

  // Return ciphertext as base64 string
  return encrypted.toString();
};

// Optionally, add decrypt function if needed:
export const decrypt = (ciphertext: string): string => {
  if (!ciphertext) {
    return '';
  }

  const key = cryptoJs.enc.Utf8.parse(env.app.ENCRYPTION_KEY);

  const bytes = cryptoJs.AES.decrypt(ciphertext, key, {
    mode: cryptoJs.mode.ECB,
    padding: cryptoJs.pad.Pkcs7,
  });

  return bytes.toString(cryptoJs.enc.Utf8);
};
