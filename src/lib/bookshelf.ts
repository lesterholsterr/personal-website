export interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  genre: string;
  status: 'completed' | 'currently-reading' | 'want-to-read';
  isFavourite: boolean;
  coverImage: string;
  fullReview: string;
  dateRead?: string;
  dateAdded: string;
}

export interface BookshelfFilters {
  genre: string;
  status: string;
  sortBy: 'newest' | 'oldest' | 'highest-rated' | 'title';
}


export const GENRES = [
  'All',
  'Classic Fiction',
  'Modern Fiction',
  'Self-Help',
  'Philosophy',
  'Politics',
  'History',
  'Biography',
  'Science',
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