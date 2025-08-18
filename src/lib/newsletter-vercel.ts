import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

const NEWSLETTER_KEY = 'newsletter:subscribers';
const NEWSLETTER_METADATA_KEY = 'newsletter:metadata';

// Initialize Redis client for production (Upstash)
const redis = process.env.UPSTASH_REDIS_REST_URL ? Redis.fromEnv() : null;

// Fallback to file system for local development
const dataPath = path.join(process.cwd(), 'data/newsletter-emails.json');

interface NewsletterData {
  emails: NewsletterSubscriber[];
  metadata: {
    totalSubscribers: number;
    lastUpdated: string | null;
  };
}

async function readFromFile(): Promise<NewsletterData> {
  try {
    if (!fs.existsSync(dataPath)) {
      const initialData: NewsletterData = {
        emails: [],
        metadata: {
          totalSubscribers: 0,
          lastUpdated: null,
        },
      };
      const dataDir = path.dirname(dataPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2));
      return initialData;
    }

    const fileContents = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading newsletter data from file:', error);
    return {
      emails: [],
      metadata: {
        totalSubscribers: 0,
        lastUpdated: null,
      },
    };
  }
}

async function writeToFile(data: NewsletterData): Promise<void> {
  try {
    const dataDir = path.dirname(dataPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing newsletter data to file:', error);
    throw new Error('Failed to save newsletter data');
  }
}

async function readFromRedis(): Promise<NewsletterData> {
  try {
    if (!redis) {
      throw new Error('Redis client not initialized');
    }

    const subscribers = await redis.get<NewsletterSubscriber[]>(NEWSLETTER_KEY) || [];
    const metadata = await redis.get<{ totalSubscribers: number; lastUpdated: string | null }>(NEWSLETTER_METADATA_KEY) || {
      totalSubscribers: 0,
      lastUpdated: null,
    };

    return {
      emails: subscribers,
      metadata,
    };
  } catch (error) {
    console.error('Error reading newsletter data from Redis:', error);
    return {
      emails: [],
      metadata: {
        totalSubscribers: 0,
        lastUpdated: null,
      },
    };
  }
}

async function writeToRedis(data: NewsletterData): Promise<void> {
  try {
    if (!redis) {
      throw new Error('Redis client not initialized');
    }

    await redis.set(NEWSLETTER_KEY, data.emails);
    await redis.set(NEWSLETTER_METADATA_KEY, data.metadata);
  } catch (error) {
    console.error('Error writing newsletter data to Redis:', error);
    throw new Error('Failed to save newsletter data to Redis');
  }
}

export async function readNewsletterData(): Promise<NewsletterData> {
  if (redis) {
    return readFromRedis();
  } else {
    return readFromFile();
  }
}

export async function writeNewsletterData(data: NewsletterData): Promise<void> {
  if (redis) {
    await writeToRedis(data);
  } else {
    await writeToFile(data);
  }
}

export async function addSubscriber(email: string, ipAddress?: string, userAgent?: string): Promise<boolean> {
  try {
    const data = await readNewsletterData();
    
    // Check if email already exists
    const existingSubscriber = data.emails.find(subscriber => subscriber.email.toLowerCase() === email.toLowerCase());
    if (existingSubscriber) {
      return false; // Email already exists
    }

    // Add new subscriber
    const newSubscriber: NewsletterSubscriber = {
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
      ipAddress,
      userAgent,
    };

    data.emails.push(newSubscriber);
    data.metadata.totalSubscribers = data.emails.length;
    data.metadata.lastUpdated = new Date().toISOString();

    await writeNewsletterData(data);
    return true;
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return false;
  }
}

export async function getAllSubscribers(): Promise<NewsletterSubscriber[]> {
  const data = await readNewsletterData();
  return data.emails.sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime());
}

export async function getSubscriberCount(): Promise<number> {
  const data = await readNewsletterData();
  return data.metadata.totalSubscribers;
}

export async function removeSubscriber(email: string): Promise<boolean> {
  try {
    const data = await readNewsletterData();
    
    // Find the subscriber to remove
    const initialLength = data.emails.length;
    data.emails = data.emails.filter(subscriber => subscriber.email.toLowerCase() !== email.toLowerCase());
    
    // Check if any subscriber was actually removed
    if (data.emails.length === initialLength) {
      return false; // Email not found
    }

    // Update metadata
    data.metadata.totalSubscribers = data.emails.length;
    data.metadata.lastUpdated = new Date().toISOString();

    await writeNewsletterData(data);
    return true;
  } catch (error) {
    console.error('Error removing subscriber:', error);
    return false;
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function exportSubscribersAsCSV(): Promise<string> {
  const subscribers = await getAllSubscribers();
  const headers = ['Email', 'Subscribed At', 'IP Address', 'User Agent'];
  const rows = subscribers.map(subscriber => [
    subscriber.email,
    subscriber.subscribedAt,
    subscriber.ipAddress || '',
    subscriber.userAgent || '',
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  return csvContent;
}