"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { type BlogPostMeta } from '@/lib/blog';

// Client-side date formatting function
function formatDate(dateString: string): string {
  // Parse the date string manually to avoid timezone conversion issues
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day); // month is 0-indexed in JavaScript
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).toUpperCase();
}

// Check if a date string is valid and can be formatted
function isValidDate(dateString: string): boolean {
  if (!dateString || dateString === 'TBD' || dateString === 'TBA') {
    return false;
  }
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    return false;
  }
  
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  // Check if the date is valid by comparing with the input
  return date.getFullYear() === year && 
         date.getMonth() === month - 1 && 
         date.getDate() === day;
}

interface SeriesGroup {
  seriesName: string;
  seriesSubtitle: string;
  seriesPosts: BlogPostMeta[];
  seriesTags: string[];
  seriesDate: string;
}

function groupPostsBySeries(posts: BlogPostMeta[]): {
  seriesGroups: SeriesGroup[];
  standalonePosts: BlogPostMeta[];
} {
  const seriesMap = new Map<string, BlogPostMeta[]>();
  const standalonePosts: BlogPostMeta[] = [];

  // Group posts by series
  posts.forEach(post => {
    if (post.series) {
      const seriesName = post.series.name;
      if (!seriesMap.has(seriesName)) {
        seriesMap.set(seriesName, []);
      }
      seriesMap.get(seriesName)!.push(post);
    } else {
      standalonePosts.push(post);
    }
  });

  // Convert to SeriesGroup objects
  const seriesGroups: SeriesGroup[] = Array.from(seriesMap.entries()).map(([seriesName, seriesPosts]) => {
    // Sort series posts by order (oldest to newest)
    const sortedSeriesPosts = seriesPosts.sort((a, b) => {
      return (a.series?.order || 0) - (b.series?.order || 0);
    });

    // Define series subtitle based on series name
    const seriesSubtitle = seriesName === 'Monopoly Bankers' 
      ? 'Fiat Accompli'
      : 'A multi-part series';

    // Get unique tags from all posts in the series
    const allTags = sortedSeriesPosts.flatMap(post => post.tags);
    const seriesTags = Array.from(new Set(allTags));

    // Calculate the latest date from all valid dates in the series
    const validDates = sortedSeriesPosts
      .map(post => post.date)
      .filter(date => isValidDate(date))
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    // Use the latest valid date, or fallback to earliest possible date for sorting
    const seriesDate = validDates.length > 0 ? validDates[0] : '1900-01-01';

    return {
      seriesName,
      seriesSubtitle,
      seriesPosts: sortedSeriesPosts,
      seriesTags,
      seriesDate,
    };
  });

  return {
    seriesGroups,
    standalonePosts,
  };
}

interface BlogFiltersProps {
  posts: BlogPostMeta[];
  tags: string[];
}

function SeriesDropdownItem({ post }: { post: BlogPostMeta }) {
  const isDisabled = post.disabled;

  const content = (
    <article className={`p-4 border-l-2 transition-colors duration-200 ml-4 ${
      isDisabled
        ? 'border-[#EDE8E3] dark:border-gray-600 bg-[#F5F2EE]/50 dark:bg-gray-700/25 opacity-60 cursor-not-allowed'
        : 'border-[#EDE8E3] dark:border-gray-600 bg-[#F5F2EE] dark:bg-gray-700/50 hover:bg-[#F2EDE8] dark:hover:bg-gray-700'
    }`}>
      <div className="space-y-2">
        {isValidDate(post.date) && (
          <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wide">
            {formatDate(post.date)}
          </p>
        )}
        <h3 className={`text-lg font-light transition-colors duration-200 ${
          isDisabled
            ? 'text-gray-500 dark:text-gray-500'
            : 'text-gray-800 dark:text-gray-200 group-hover:text-gray-600 dark:group-hover:text-gray-300'
        }`}>
          {post.title}
        </h3>
        {post.subtitle && (
          <p className={`text-sm font-light ${
            isDisabled
              ? 'text-gray-500 dark:text-gray-500'
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            {post.subtitle}
          </p>
        )}
      </div>
    </article>
  );

  if (isDisabled) {
    return <div className="group block">{content}</div>;
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      {content}
    </Link>
  );
}

function SeriesPostCard({ seriesGroup }: { seriesGroup: SeriesGroup }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { seriesName, seriesSubtitle, seriesPosts, seriesTags } = seriesGroup;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-0">
      <div className="group">
        <article className="p-6 border border-[#EDE8E3] dark:border-gray-700 rounded-lg hover:border-[#E8E3DE] dark:hover:border-gray-600 hover:shadow-sm transition-all duration-300 bg-[#F5F2EE] dark:bg-gray-800 cursor-pointer" onClick={handleToggle}>
          <div className="space-y-3">
            <p className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">
              SERIES
            </p>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-200">
                  {seriesName}
                </h2>
              </div>
              <button
                className="ml-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label={isExpanded ? "Collapse series" : "Expand series"}
              >
                <svg
                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-light">
              {seriesSubtitle}
            </p>
            {seriesTags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {seriesTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-[#F2EDE8] dark:bg-gray-700 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>
      
      {/* Dropdown content */}
      {isExpanded && seriesPosts.length > 0 && (
        <div className="mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
          {seriesPosts.map((post) => (
            <SeriesDropdownItem key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="p-6 border border-[#EDE8E3] dark:border-gray-700 rounded-lg hover:border-[#E8E3DE] dark:hover:border-gray-600 hover:shadow-sm transition-all duration-300 hover:translate-y-[-2px] bg-[#F5F2EE] dark:bg-gray-800">
        <div className="space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">
            {formatDate(post.date)}
          </p>
          <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-200">
            {post.title}
          </h2>
          {post.subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-300 font-light">
              {post.subtitle}
            </p>
          )}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-[#F2EDE8] dark:bg-gray-700 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

function FilterControls({ 
  selectedTag, 
  onTagChange, 
  sortOrder, 
  onSortChange, 
  tags 
}: {
  selectedTag: string;
  onTagChange: (tag: string) => void;
  sortOrder: 'newest' | 'oldest';
  onSortChange: (order: 'newest' | 'oldest') => void;
  tags: string[];
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Filter by tag:
        </label>
        <select
          value={selectedTag}
          onChange={(e) => onTagChange(e.target.value)}
          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
        >
          <option value="">All posts</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sort by:
        </label>
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest')}
          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
    </div>
  );
}

export default function BlogFilters({ posts, tags }: BlogFiltersProps) {
  const [selectedTag, setSelectedTag] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  const { filteredSeriesGroups, filteredStandalonePosts, sortedItems } = useMemo(() => {
    // First filter by tag if selected
    const filtered = selectedTag 
      ? posts.filter(post => post.tags.includes(selectedTag))
      : posts;
    
    // Group into series and standalone posts first
    const { seriesGroups, standalonePosts } = groupPostsBySeries(filtered);

    // Create a combined array for sorting with a common date field
    interface SortableItem {
      type: 'series' | 'standalone';
      date: string;
      data: SeriesGroup | BlogPostMeta;
    }

    const combinedItems: SortableItem[] = [
      ...seriesGroups.map(group => ({
        type: 'series' as const,
        date: group.seriesDate,
        data: group
      })),
      ...standalonePosts.map(post => ({
        type: 'standalone' as const,
        date: post.date,
        data: post
      }))
    ];

    // Sort the combined array by date
    const sortedItems = combinedItems.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    // Separate back into series and standalone arrays while preserving order
    const sortedSeriesGroups: SeriesGroup[] = [];
    const sortedStandalonePosts: BlogPostMeta[] = [];

    sortedItems.forEach(item => {
      if (item.type === 'series') {
        sortedSeriesGroups.push(item.data as SeriesGroup);
      } else {
        sortedStandalonePosts.push(item.data as BlogPostMeta);
      }
    });

    return {
      filteredSeriesGroups: sortedSeriesGroups,
      filteredStandalonePosts: sortedStandalonePosts,
      sortedItems, // Keep the sorted items for proper rendering order
    };
  }, [posts, selectedTag, sortOrder]);

  const hasAnyPosts = filteredSeriesGroups.length > 0 || filteredStandalonePosts.length > 0;

  return (
    <>
      {/* Filters */}
      {posts.length > 0 && (
        <FilterControls
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          tags={tags}
        />
      )}

      {/* Posts Grid */}
      {hasAnyPosts ? (
        <div className="grid gap-6">
          {/* Render items in sorted order */}
          {sortedItems.map((item) => {
            if (item.type === 'series') {
              const seriesGroup = item.data as SeriesGroup;
              return (
                <SeriesPostCard key={seriesGroup.seriesName} seriesGroup={seriesGroup} />
              );
            } else {
              const post = item.data as BlogPostMeta;
              return (
                <PostCard key={post.slug} post={post} />
              );
            }
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {selectedTag 
              ? `No posts found with the tag "${selectedTag}".`
              : 'No blog posts yet. Check back soon!'
            }
          </p>
        </div>
      )}
    </>
  );
}