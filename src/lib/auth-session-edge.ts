import { Redis } from '@upstash/redis';
import { cookies } from 'next/headers';

export interface Session {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
  ipAddress?: string;
  userAgent?: string;
}

const SESSION_COOKIE_NAME = 'admin_session';

// Initialize Redis client for production (Upstash)
// Edge runtime compatible - only uses Redis (no filesystem fallback)
const redis = process.env.UPSTASH_REDIS_REST_URL ? Redis.fromEnv() : null;

// Get session from token (Edge-compatible - Redis only)
export async function getSessionByToken(token: string): Promise<Session | null> {
  try {
    if (!redis) {
      // In development without Redis, we can't validate sessions in Edge runtime
      // The session will be validated in the Node.js runtime (Server Actions/API routes)
      // For now, allow the request through and let the page/API handle auth
      console.warn('Redis not configured - session validation skipped in Edge middleware (dev mode)');
      return { token, userId: 'admin', createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 86400000).toISOString() };
    }

    const session = await redis.get<Session>(`session:${token}`);

    if (!session) {
      return null;
    }

    // Check if session has expired
    const now = new Date();
    const expiresAt = new Date(session.expiresAt);
    if (now > expiresAt) {
      // Session expired, delete it
      await redis.del(`session:${token}`);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error getting session in Edge runtime:', error);
    return null;
  }
}

// Get session from request cookies (Edge-compatible)
export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie) {
      return null;
    }

    return await getSessionByToken(sessionCookie.value);
  } catch (error) {
    console.error('Error getting session from cookies in Edge runtime:', error);
    return null;
  }
}

// Get session cookie name (for middleware usage)
export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}
