import { randomBytes, createHash } from 'crypto';

export function generateRandomToken(size = 32): string {
  return randomBytes(size).toString('hex');
}

export function buildPkcePair() {
  const verifier = generateRandomToken(48);
  const challenge = createHash('sha256').update(verifier).digest('base64url');

  return { verifier, challenge };
}
