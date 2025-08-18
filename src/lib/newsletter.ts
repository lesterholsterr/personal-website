import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data/newsletter-emails.json');

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface NewsletterData {
  emails: NewsletterSubscriber[];
  metadata: {
    totalSubscribers: number;
    lastUpdated: string | null;
  };
}

export function readNewsletterData(): NewsletterData {
  try {
    if (!fs.existsSync(dataPath)) {
      // Create the file if it doesn't exist
      const initialData: NewsletterData = {
        emails: [],
        metadata: {
          totalSubscribers: 0,
          lastUpdated: null,
        },
      };
      writeNewsletterData(initialData);
      return initialData;
    }

    const fileContents = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading newsletter data:', error);
    return {
      emails: [],
      metadata: {
        totalSubscribers: 0,
        lastUpdated: null,
      },
    };
  }
}

export function writeNewsletterData(data: NewsletterData): void {
  try {
    // Ensure the data directory exists
    const dataDir = path.dirname(dataPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing newsletter data:', error);
    throw new Error('Failed to save newsletter data');
  }
}

export function addSubscriber(email: string, ipAddress?: string, userAgent?: string): boolean {
  try {
    const data = readNewsletterData();
    
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

    writeNewsletterData(data);
    return true;
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return false;
  }
}

export function getAllSubscribers(): NewsletterSubscriber[] {
  const data = readNewsletterData();
  return data.emails;
}

export function getSubscriberCount(): number {
  const data = readNewsletterData();
  return data.metadata.totalSubscribers;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function exportSubscribersAsCSV(): string {
  const subscribers = getAllSubscribers();
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