import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  getPostBySlug,
  getAllPostSlugs,
  getAdjacentPosts,
  formatDate,
  type BlogPostMeta,
} from "@/lib/blog";
import { mdxComponents } from "@/mdx-components";
import Comments from "@/components/Comments";
import NewsletterSignup from "@/components/NewsletterSignup";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function TimeCapsule({ news, reading }: { news: string; reading: string }) {
  return (
    <div className="mt-12 p-6 border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
        Time Capsule
      </h3>
      <div className="space-y-3">
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-semibold">News</span>: {news}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-semibold">Reading</span>: {reading}
        </p>
      </div>
    </div>
  );
}

function PostNavigation({
  prev,
  next,
}: {
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <div className="text-left">
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Previous
              </p>
              <p className="font-medium">{prev.title}</p>
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
          >
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-500">Next</p>
              <p className="font-medium">{next.title}</p>
            </div>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    const { prev, next } = getAdjacentPosts(slug);

    // Compile MDX content with custom components
    const { content } = await compileMDX({
      source: post.content,
      options: {
        parseFrontmatter: false, // We already parsed it
      },
      components: mdxComponents,
    });

    return (
      <main className="pt-16 sm:pt-20">
        <div className="pt-20 lg:pt-32 pb-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto">
            {/* Back to Blog */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 mb-8"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>

            {/* Article Header */}
            <header className="mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 dark:text-gray-100 mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 tracking-wide mb-6">
                {formatDate(post.date)}
              </p>
              {post.subtitle && (
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                  {post.subtitle}
                </p>
              )}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Article Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none">
              {content}
            </article>

            {/* Time Capsule */}
            {post.timeCapsule && (
              <TimeCapsule
                news={post.timeCapsule.news}
                reading={post.timeCapsule.reading}
              />
            )}

            {/* Newsletter Signup */}
            <div className="mt-16">
              <NewsletterSignup />
            </div>

            {/* Comments */}
            <Comments />

            {/* Post Navigation */}
            <PostNavigation prev={prev} next={next} />

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Matthew Yang
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}
