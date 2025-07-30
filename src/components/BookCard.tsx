'use client';

import { Book } from '@/lib/bookshelf';
import { useState } from 'react';
import Link from 'next/link';

interface BookCardProps {
  book: Book;
  className?: string;
  style?: React.CSSProperties;
}

export default function BookCard({ book, className = '', style }: BookCardProps) {
  const [imageError, setImageError] = useState(false);

  const statusColors = {
    'completed': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
    'currently-reading': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
    'want-to-read': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
  };

  const statusLabels = {
    'completed': 'Completed',
    'currently-reading': 'Currently Reading',
    'want-to-read': 'Want to Read'
  };

  return (
    <Link 
      href={`/bookshelf/${book.id}`}
      className={`group cursor-pointer animate-fadeIn ${className}`}
      style={style}
    >
      <div className="relative">
        {/* Favourite Badge */}
        {book.isFavourite && (
          <div className="absolute -top-2 -left-2 z-20 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
            FAVOURITE
          </div>
        )}

        {/* Book Cover */}
        <div className="relative overflow-hidden rounded-lg">
          {!imageError ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-64 sm:h-72 object-cover shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-64 sm:h-72 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <div className="text-center p-4">
                <div className="text-gray-400 dark:text-gray-500 text-4xl mb-2">📚</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {book.title}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                  {book.author}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Book Info (Always Visible) */}
        <div className="mt-3 space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight line-clamp-2">
            {book.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs">
            by {book.author}
          </p>
          
          {/* Book Details */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              {book.rating > 0 ? (
                <span className="text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                  <span>★</span>
                  <span>{book.rating}/10</span>
                </span>
              ) : (
                <span className="text-gray-400 dark:text-gray-500">No rating</span>
              )}
              
              <div className={`px-2 py-1 rounded text-xs ${statusColors[book.status]}`}>
                {statusLabels[book.status]}
              </div>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {book.genre}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}