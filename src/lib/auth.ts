import { createHmac } from 'crypto';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'drift_session';
const SECRET = process.env.SESSION_SECRET || 'dev-secret-change-in-production-32';

function sign(value: string): string {
  return createHmac('sha256', SECRET).update(value).digest('hex');
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const signature = sign(timestamp);
  return `${timestamp}:${signature}`;
}

export function verifyToken(token: string): boolean {
  const [timestamp, signature] = token.split(':');
  if (!timestamp || !signature) return false;

  const expected = sign(timestamp);
  if (signature !== expected) return false;

  // Sessions expire after 24 hours
  const age = Date.now() - parseInt(timestamp, 10);
  return age < 24 * 60 * 60 * 1000;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60,
    path: '/',
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifyToken(token);
}
