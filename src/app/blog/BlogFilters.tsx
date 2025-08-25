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

interface BlogFiltersProps {
  posts: BlogPostMeta[];
  tags: string[];
}

function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-300 hover:translate-y-[-2px] bg-white dark:bg-gray-800">
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
                  className="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-md"
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
  
  const filteredAndSortedPosts = useMemo(() => {
    const filtered = selectedTag 
      ? posts.filter(post => post.tags.includes(selectedTag))
      : posts;
    
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [posts, selectedTag, sortOrder]);

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
      {filteredAndSortedPosts.length > 0 ? (
        <div className="grid gap-6">
          {filteredAndSortedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
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