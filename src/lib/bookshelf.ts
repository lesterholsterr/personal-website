export interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  genre: string;
  status: 'completed' | 'currently-reading' | 'want-to-read';
  isFavourite: boolean;
  coverImage: string;
  excerpt: string;
  fullReview: string;
  dateRead?: string;
  dateAdded: string;
}

export interface BookshelfFilters {
  genre: string;
  status: string;
  sortBy: 'newest' | 'oldest' | 'highest-rated' | 'title';
}

export interface BookshelfState {
  view: 'grid' | 'shelf';
  filters: BookshelfFilters;
  selectedBook: Book | null;
  books: Book[];
}

export const GENRES = [
  'All',
  'Philosophy',
  'Self-Help',
  'Science',
  'Fiction',
  'Biography',
  'History',
  'Psychology',
  'Business',
  'Technology'
] as const;

export const STATUS_OPTIONS = [
  'All',
  'completed',
  'currently-reading',
  'want-to-read'
] as const;

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' }, 
  { value: 'highest-rated', label: 'Highest Rated' },
  { value: 'title', label: 'Alphabetical' }
] as const;