import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogFilters from './BlogFilters';


export default function BlogPage() {
  // Get actual posts and tags
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  return (
    <main className="pt-16">
      <div className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto">
              &ldquo;If you&rsquo;re thinking without writing, you only think you&rsquo;re thinking.&rdquo; — Leslie Lamport
            </p>
          </div>

          {/* Blog Content with Filtering */}
          <BlogFilters posts={allPosts} tags={allTags} />
        </div>
      </div>
    </main>
  );
}