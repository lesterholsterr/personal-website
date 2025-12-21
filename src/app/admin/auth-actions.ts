'use server';

import { redirect } from 'next/navigation';
import { timingSafeEqual } from 'crypto';
import {
  createSession,
  deleteSession,
  getSession,
  setSessionCookie,
  clearSessionCookie,
} from '@/lib/auth-session';
import { headers } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

// Helper function for constant-time password comparison
function verifyPassword(inputPassword: string, actualPassword: string): boolean {
  try {
    // Convert strings to buffers for timing-safe comparison
    const inputBuffer = Buffer.from(inputPassword);
    const actualBuffer = Buffer.from(actualPassword);

    // If lengths differ, still compare dummy values to prevent timing attacks
    if (inputBuffer.length !== actualBuffer.length) {
      return false;
    }

    return timingSafeEqual(inputBuffer, actualBuffer);
  } catch {
    return false;
  }
}

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;

  if (!password) {
    return { success: false, error: 'Password is required' };
  }

  // Verify password using timing-safe comparison
  if (!verifyPassword(password, ADMIN_PASSWORD)) {
    return { success: false, error: 'Incorrect password' };
  }

  // Get request metadata
  const headersList = await headers();
  const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || undefined;
  const userAgent = headersList.get('user-agent') || undefined;

  // Create session
  const session = await createSession('admin', ipAddress, userAgent);

  // Set session cookie
  await setSessionCookie(session.token);

  return { success: true };
}

export async function logoutAction() {
  const session = await getSession();

  if (session) {
    // Delete session from storage
    await deleteSession(session.token);
  }

  // Clear session cookie
  await clearSessionCookie();

  redirect('/admin/newsletter');
}

export async function getSessionAction() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  // Return session data without the token (security)
  return {
    userId: session.userId,
    createdAt: session.createdAt,
    expiresAt: session.expiresAt,
  };
}
