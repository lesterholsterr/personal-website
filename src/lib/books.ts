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
  excerpt: string;
  content: string;
  dateRead?: string;
  dateAdded: string;
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
  excerpt: string;
  dateRead?: string;
  dateAdded: string;
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
    excerpt: data.excerpt || '',
    content,
    dateRead: data.dateRead || undefined,
    dateAdded: data.dateAdded || '',
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
        excerpt: book.excerpt,
        dateRead: book.dateRead,
        dateAdded: book.dateAdded,
      };
    })
    .sort((a, b) => {
      // Sort by date read (most recent first), fallback to date added
      const dateA = new Date(a.dateRead || a.dateAdded).getTime();
      const dateB = new Date(b.dateRead || b.dateAdded).getTime();
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
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).toUpperCase();
}