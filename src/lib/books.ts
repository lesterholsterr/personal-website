import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const booksDirectory = path.join(process.cwd(), 'src/content/books');

export interface Book {
  slug: string;
  title: string;
  author: string;
  rating: number;
  genre: string;
  status: 'completed' | 'currently-reading' | 'want-to-read';
  isFavourite: boolean;
  coverImage: string;
  content: string;
  dateRead?: string;
  dateReviewed?: string;
}

export interface BookMeta {
  slug: string;
  title: string;
  author: string;
  rating: number;
  genre: string;
  status: 'completed' | 'currently-reading' | 'want-to-read';
  isFavourite: boolean;
  coverImage: string;
  dateRead?: string;
  dateReviewed?: string;
}

export function getAllBookSlugs(): string[] {
  if (!fs.existsSync(booksDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(booksDirectory);
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx$/, ''));
}

export function getBookBySlug(slug: string): Book {
  const fullPath = path.join(booksDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    author: data.author || '',
    rating: data.rating || 0,
    genre: data.genre || '',
    status: data.status || 'completed',
    isFavourite: data.isFavourite || false,
    coverImage: data.coverImage || '',
    content,
    dateRead: data.dateRead || undefined,
    dateReviewed: data.dateReviewed || undefined,
  };
}

export function getAllBooks(): BookMeta[] {
  const slugs = getAllBookSlugs();
  const books = slugs
    .map((slug) => {
      const book = getBookBySlug(slug);
      return {
        slug: book.slug,
        title: book.title,
        author: book.author,
        rating: book.rating,
        genre: book.genre,
        status: book.status,
        isFavourite: book.isFavourite,
        coverImage: book.coverImage,
        dateRead: book.dateRead,
        dateReviewed: book.dateReviewed,
      };
    })
    .sort((a, b) => {
      // Sort by date read (most recent first), fallback to date reviewed
      const dateA = new Date(a.dateRead || a.dateReviewed || '1970-01-01').getTime();
      const dateB = new Date(b.dateRead || b.dateReviewed || '1970-01-01').getTime();
      return dateB - dateA;
    });

  return books;
}

export function getAllGenres(): string[] {
  const books = getAllBooks();
  const allGenres = books.map((book) => book.genre);
  return Array.from(new Set(allGenres)).sort();
}

export function getBooksByGenre(genre: string): BookMeta[] {
  const allBooks = getAllBooks();
  return allBooks.filter((book) => book.genre === genre);
}

export function getBooksByStatus(status: string): BookMeta[] {
  const allBooks = getAllBooks();
  return allBooks.filter((book) => book.status === status);
}

export function getFavouriteBooks(): BookMeta[] {
  const allBooks = getAllBooks();
  return allBooks.filter((book) => book.isFavourite);
}

export function getAdjacentBooks(currentSlug: string): {
  prev: BookMeta | null;
  next: BookMeta | null;
} {
  const allBooks = getAllBooks();
  const currentIndex = allBooks.findIndex((book) => book.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? allBooks[currentIndex - 1] : null,
    next: currentIndex < allBooks.length - 1 ? allBooks[currentIndex + 1] : null,
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