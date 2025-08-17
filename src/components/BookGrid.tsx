'use client';

import { Book, BookshelfFilters } from '@/lib/bookshelf';
import BookCard from './BookCard';
import { useMemo } from 'react';
import React from 'react';

interface BookGridProps {
  books: Book[];
  filters: BookshelfFilters;
}

export default function BookGrid({ books, filters }: BookGridProps) {
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books;

    // Apply genre filter
    if (filters.genre !== 'All') {
      filtered = filtered.filter(book => book.genre === filters.genre);
    }

    // Apply status filter
    if (filters.status !== 'All') {
      filtered = filtered.filter(book => book.status === filters.status);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          // Sort by dateRead if available, otherwise by dateAdded
          const dateA = new Date(a.dateRead || a.dateAdded).getTime();
          const dateB = new Date(b.dateRead || b.dateAdded).getTime();
          return dateB - dateA;
        
        case 'oldest':
          const oldDateA = new Date(a.dateRead || a.dateAdded).getTime();
          const oldDateB = new Date(b.dateRead || b.dateAdded).getTime();
          return oldDateA - oldDateB;
        
        case 'highest-rated':
          // Handle books without ratings by putting them at the end
          if (a.rating === 0 && b.rating === 0) return 0;
          if (a.rating === 0) return 1;
          if (b.rating === 0) return -1;
          return b.rating - a.rating;
        
        case 'title':
          return a.title.localeCompare(b.title);
        
        default:
          return 0;
      }
    });

    return sorted;
  }, [books, filters]);

  if (filteredAndSortedBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No books found
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-md">
          Try adjusting your filters to see more books, or check back later as I add more to my collection.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredAndSortedBooks.map((book, index) => (
          <BookCard
            key={book.id}
            book={book}
            className="stagger-animation"
            style={{ '--stagger-delay': index } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Reading Statistics */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {filteredAndSortedBooks.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {filters.genre !== 'All' || filters.status !== 'All' ? 'Filtered' : 'Total'} Books
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {filteredAndSortedBooks.filter(book => book.isFavourite).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Favourites
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {filteredAndSortedBooks.filter(book => book.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Completed
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {(filteredAndSortedBooks.filter(book => book.rating > 0)
                .reduce((sum, book) => sum + book.rating, 0) / 
               Math.max(filteredAndSortedBooks.filter(book => book.rating > 0).length, 1) || 0).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Avg Rating
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}