'use client';

import { useState } from 'react';
import { BookshelfFilters, GENRES, STATUS_OPTIONS, SORT_OPTIONS } from '@/lib/bookshelf';

interface FilterControlsProps {
  filters: BookshelfFilters;
  onFiltersChange: (filters: BookshelfFilters) => void;
  bookCount: number;
}

export default function FilterControls({ filters, onFiltersChange, bookCount }: FilterControlsProps) {
  const [showRatingGuide, setShowRatingGuide] = useState(false);

  const updateFilter = (key: keyof BookshelfFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      genre: 'All',
      status: 'All',
      sortBy: 'newest'
    });
  };

  const hasActiveFilters = filters.genre !== 'All' || filters.status !== 'All' || filters.sortBy !== 'newest';

  const ratingScales = [
    {
      range: "9.0 and above",
      description: "These books significantly change the way I think and live. Because of this, they also tend to be very enjoyable to read. It goes without saying that I think you should read these too!",
      color: "text-emerald-600 dark:text-emerald-400"
    },
    {
      range: "8.5 - 8.9",
      description: "These books are both influential and enjoyable. However, something holds them back from breaking the 9.0 threshold, such as the magnitude of influence/enjoyability, the clarity, the writing style, or the length. I would still confidently recommend these books to most people.",
      color: "text-green-600 dark:text-green-400"
    },
    {
      range: "8.0 - 8.4",
      description: "These books are great. My reaction upon finishing a book with this rating is something like: \"Nice, I'm glad I read that\". While they fall short of being transformative, I would have no problem recommending these books to the right people.",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      range: "7.5 - 7.9",
      description: "These books may change the way I think, but not the way I act. Alternatively, these books may be entertaining to read, but only provide surface level knowledge. I might recommend these books in very selective scenarios.",
      color: "text-yellow-600 dark:text-yellow-400"
    },
    {
      range: "7.0 - 7.4",
      description: "These books are mediocre. My reaction upon finishing a book with this rating is something like: \"Hm, ok cool\". I could live without reading these books, but I don't regret reading them either.",
      color: "text-orange-600 dark:text-orange-400"
    },
    {
      range: "6.0 - 6.9",
      description: "These books are subpar. They weakly satisfy a few metrics and I somewhat regret reading these books due to opportunity cost.",
      color: "text-orange-700 dark:text-orange-500"
    },
    {
      range: "5.9 and below",
      description: "These books are bad. They are neither enjoyable nor influential. Writing style, book length, and clarity determine how low the rating will go.",
      color: "text-red-600 dark:text-red-400"
    }
  ];

  return (
    <div className="bg-[#F5F2EE] dark:bg-gray-800/50 rounded-lg p-4 mb-8 animate-scaleIn">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Genre Filter */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Genre
            </label>
            <select
              value={filters.genre}
              onChange={(e) => updateFilter('genre', e.target.value)}
              className="px-3 py-2 text-sm border border-[#EDE8E3] dark:border-gray-600 rounded-lg bg-[#FEFCF9] dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            >
              {GENRES.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'All' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Reading Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => updateFilter('status', e.target.value)}
              className="px-3 py-2 text-sm border border-[#EDE8E3] dark:border-gray-600 rounded-lg bg-[#FEFCF9] dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            >
              {STATUS_OPTIONS.map(status => (
                <option key={status} value={status}>
                  {status === 'All' ? 'All Books' : 
                   status === 'completed' ? 'Completed' :
                   status === 'currently-reading' ? 'Currently Reading' :
                   'Want to Read'}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value as BookshelfFilters['sortBy'])}
              className="px-3 py-2 text-sm border border-[#EDE8E3] dark:border-gray-600 rounded-lg bg-[#FEFCF9] dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results and Reset */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {bookCount} {bookCount === 1 ? 'book' : 'books'}
          </span>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowRatingGuide(!showRatingGuide)}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              How I Rate Books
              <div className={`transition-transform duration-200 ${showRatingGuide ? 'rotate-180' : ''}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Active filters:
          </span>
          {filters.genre !== 'All' && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
              Genre: {filters.genre}
              <button
                onClick={() => updateFilter('genre', 'All')}
                className="ml-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
              >
                ×
              </button>
            </span>
          )}
          {filters.status !== 'All' && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
              Status: {filters.status === 'completed' ? 'Completed' : 
                       filters.status === 'currently-reading' ? 'Currently Reading' : 'Want to Read'}
              <button
                onClick={() => updateFilter('status', 'All')}
                className="ml-1 hover:text-green-600 dark:hover:text-green-400 cursor-pointer"
              >
                ×
              </button>
            </span>
          )}
          {filters.sortBy !== 'newest' && (
            <span className="inline-flex items-center px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
              Sort: {SORT_OPTIONS.find(opt => opt.value === filters.sortBy)?.label}
              <button
                onClick={() => updateFilter('sortBy', 'newest')}
                className="ml-1 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* Rating Guide */}
      {showRatingGuide && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fadeInUp">
          <div className="mb-4">
            <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
              Rating Criteria
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex gap-2">
                <span className="text-blue-500 dark:text-blue-400 flex-shrink-0" style={{lineHeight: '1.5'}}>•</span>
                <span className="text-gray-700 dark:text-gray-300">How enjoyable was this to read?</span>
              </div>
              <div className="flex gap-2">
                <span className="text-blue-500 dark:text-blue-400 flex-shrink-0" style={{lineHeight: '1.5'}}>•</span>
                <span className="text-gray-700 dark:text-gray-300">Did this change the way I think, the actions I take, and the decisions I make?</span>
              </div>
              <div className="flex gap-2">
                <span className="text-blue-500 dark:text-blue-400 flex-shrink-0" style={{lineHeight: '1.5'}}>•</span>
                <span className="text-gray-700 dark:text-gray-300">How clearly was the information presented?</span>
              </div>
              <div className="flex gap-2">
                <span className="text-blue-500 dark:text-blue-400 flex-shrink-0" style={{lineHeight: '1.5'}}>•</span>
                <span className="text-gray-700 dark:text-gray-300">Did this influence my writing style?</span>
              </div>
              <div className="flex gap-2">
                <span className="text-blue-500 dark:text-blue-400 flex-shrink-0" style={{lineHeight: '1.5'}}>•</span>
                <span className="text-gray-700 dark:text-gray-300">Was the book excessively long, too short, or an appropriate length?</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
              Rating Scale
            </h4>
            <div className="space-y-4">
              {ratingScales.map((scale, index) => (
                <div key={index} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
                  <div className={`font-semibold text-sm mb-1 ${scale.color}`}>
                    {scale.range}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {scale.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}