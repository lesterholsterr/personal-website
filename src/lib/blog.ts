import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  subtitle?: string;
  tags: string[];
  content: string;
  timeCapsule?: {
    news: string;
    reading: string;
  };
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  subtitle?: string;
  tags: string[];
  timeCapsule?: {
    news: string;
    reading: string;
  };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    subtitle: data.subtitle || '',
    tags: data.tags || [],
    content,
    timeCapsule: data.timeCapsule || undefined,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      return {
        slug: post.slug,
        title: post.title,
        date: post.date,
        subtitle: post.subtitle,
        tags: post.tags,
        timeCapsule: post.timeCapsule,
      };
    })
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return posts;
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const allTags = posts.flatMap((post) => post.tags);
  return Array.from(new Set(allTags)).sort();
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

export function getAdjacentPosts(currentSlug: string): {
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
} {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
}

export function formatDate(dateString: string): string {
  // Parse the date string manually to avoid timezone conversion issues
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day); // month is 0-indexed in JavaScript
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).toUpperCase();
}