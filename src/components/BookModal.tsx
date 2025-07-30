'use client';

import { Book } from '@/lib/bookshelf';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
}

export default function BookModal({ book, onClose }: BookModalProps) {
  const [imageError, setImageError] = useState(false);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (book) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent body scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [book, onClose]);

  if (!book) return null;

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

  // Format the review text with proper line breaks
  const formatReview = (text: string) => {
    return text.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              {book.isFavourite && (
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                  FAVOURITE
                </div>
              )}
              <div className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[book.status]}`}>
                {statusLabels[book.status]}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 text-2xl font-light transition-colors ml-4"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Book Cover */}
              <div className="lg:w-1/3 flex-shrink-0">
                <div className="sticky top-0">
                  {!imageError ? (
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      width={300}
                      height={450}
                      className="w-full max-w-sm mx-auto lg:mx-0 rounded-lg shadow-lg"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full max-w-sm mx-auto lg:mx-0 aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📚</div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                          {book.title}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Quick Stats */}
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Genre:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{book.genre}</span>
                    </div>
                    {book.rating > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                        <span className="font-medium text-yellow-600 dark:text-yellow-400">
                          ★ {book.rating}/10
                        </span>
                      </div>
                    )}
                    {book.dateRead && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Date Read:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {new Date(book.dateRead).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Date Added:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {new Date(book.dateAdded).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="lg:w-2/3">
                <div className="mb-6">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {book.title}
                  </h1>
                  <h2 className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-4">
                    by {book.author}
                  </h2>
                  
                  {/* Excerpt */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                      {book.excerpt}
                    </p>
                  </div>
                </div>

                {/* Full Review */}
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    My Review
                  </h3>
                  {book.fullReview !== 'Review coming soon.' ? (
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                      {formatReview(book.fullReview)}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 dark:text-gray-500 text-4xl mb-3">✍️</div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Review coming soon! I&rsquo;m still working on my thoughts about this book.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}