import { Redis } from '@upstash/redis';
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';
import fs from 'fs';
import path from 'path';

export interface Session {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
  ipAddress?: string;
  userAgent?: string;
}

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Initialize Redis client for production (Upstash)
const redis = process.env.UPSTASH_REDIS_REST_URL ? Redis.fromEnv() : null;

// Fallback to file system for local development
const sessionsPath = path.join(process.cwd(), 'data/sessions.json');

interface SessionStore {
  [token: string]: Session;
}

// File system helpers for local development
async function readSessionsFromFile(): Promise<SessionStore> {
  try {
    if (!fs.existsSync(sessionsPath)) {
      const dataDir = path.dirname(sessionsPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(sessionsPath, JSON.stringify({}, null, 2));
      return {};
    }

    const fileContents = fs.readFileSync(sessionsPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading sessions from file:', error);
    return {};
  }
}

async function writeSessionsToFile(sessions: SessionStore): Promise<void> {
  try {
    const dataDir = path.dirname(sessionsPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(sessionsPath, JSON.stringify(sessions, null, 2));
  } catch (error) {
    console.error('Error writing sessions to file:', error);
    throw new Error('Failed to save session data');
  }
}

// Generate a cryptographically secure session token
function generateSessionToken(): string {
  return randomBytes(32).toString('base64url');
}

// Create a new session
export async function createSession(
  userId: string,
  ipAddress?: string,
  userAgent?: string
): Promise<Session> {
  const token = generateSessionToken();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DURATION);

  const session: Session = {
    token,
    userId,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    ipAddress,
    userAgent,
  };

  // Store session in Redis or file system
  if (redis) {
    await redis.set(`session:${token}`, session, {
      ex: Math.floor(SESSION_DURATION / 1000), // Expiry in seconds
    });
  } else {
    const sessions = await readSessionsFromFile();
    sessions[token] = session;
    await writeSessionsToFile(sessions);
  }

  return session;
}

// Get session from token
export async function getSessionByToken(token: string): Promise<Session | null> {
  try {
    let session: Session | null = null;

    if (redis) {
      session = await redis.get<Session>(`session:${token}`);
    } else {
      const sessions = await readSessionsFromFile();
      session = sessions[token] || null;
    }

    if (!session) {
      return null;
    }

    // Check if session has expired
    const now = new Date();
    const expiresAt = new Date(session.expiresAt);
    if (now > expiresAt) {
      // Session expired, delete it
      await deleteSession(token);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

// Delete a session
export async function deleteSession(token: string): Promise<void> {
  try {
    if (redis) {
      await redis.del(`session:${token}`);
    } else {
      const sessions = await readSessionsFromFile();
      delete sessions[token];
      await writeSessionsToFile(sessions);
    }
  } catch (error) {
    console.error('Error deleting session:', error);
  }
}

// Get session from request cookies
export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie) {
      return null;
    }

    return await getSessionByToken(sessionCookie.value);
  } catch (error) {
    console.error('Error getting session from cookies:', error);
    return null;
  }
}

// Set session cookie
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION / 1000, // In seconds
  });
}

// Clear session cookie
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

// Get session cookie name (for middleware usage)
export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}
