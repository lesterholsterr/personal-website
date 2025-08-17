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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              <em>
                &ldquo;If you&rsquo;re thinking without writing, you only think you&rsquo;re thinking.&rdquo;
              </em>
              <br />
              <span className="text-sm mt-2 block">—Leslie Lamport</span>
            </p>
          </div>

          {/* Blog Content with Filtering */}
          <BlogFilters posts={allPosts} tags={allTags} />
        </div>
      </div>
    </main>
  );
}