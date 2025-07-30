'use client';

import { BookshelfFilters, GENRES, STATUS_OPTIONS, SORT_OPTIONS } from '@/lib/bookshelf';

interface FilterControlsProps {
  filters: BookshelfFilters;
  onFiltersChange: (filters: BookshelfFilters) => void;
  bookCount: number;
}

export default function FilterControls({ filters, onFiltersChange, bookCount }: FilterControlsProps) {
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

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-8 animate-scaleIn">
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
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
          
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Reset Filters
            </button>
          )}
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
                className="ml-1 hover:text-blue-600 dark:hover:text-blue-400"
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
                className="ml-1 hover:text-green-600 dark:hover:text-green-400"
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
                className="ml-1 hover:text-purple-600 dark:hover:text-purple-400"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}