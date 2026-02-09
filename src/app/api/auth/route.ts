import { NextResponse } from 'next/server';
import { createSessionToken, setSessionCookie, clearSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = createSessionToken();
  await setSessionCookie(token);

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  await clearSessionCookie();
  return NextResponse.json({ success: true });
}
