import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  getBookBySlug,
  getAllBookSlugs,
  getAdjacentBooks,
  formatDate,
  type BookMeta,
} from "@/lib/books";
import { mdxComponents } from "@/mdx-components";

interface BookPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function BookNavigation({
  prev,
  next,
}: {
  prev: BookMeta | null;
  next: BookMeta | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        {prev ? (
          <Link
            href={`/bookshelf/${prev.slug}`}
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
            href={`/bookshelf/${next.slug}`}
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

export default async function BookPage({ params }: BookPageProps) {
  try {
    const { slug } = await params;
    const book = getBookBySlug(slug);
    const { prev, next } = getAdjacentBooks(slug);

    // Compile MDX content with custom components
    const { content } = await compileMDX({
      source: book.content,
      options: {
        parseFrontmatter: false, // We already parsed it
      },
      components: mdxComponents,
    });

    const statusColors = {
      completed:
        "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
      "currently-reading":
        "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
      "want-to-read":
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
    };

    const statusLabels = {
      completed: "Completed",
      "currently-reading": "Currently Reading",
      "want-to-read": "Want to Read",
    };

    return (
      <main className="pt-16 sm:pt-20">
        <div className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            {/* Back to Bookshelf */}
            <Link
              href="/bookshelf"
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
              Back to Bookshelf
            </Link>

            {/* Book Header */}
            <div className="flex flex-col lg:flex-row gap-8 mb-12">
              {/* Book Cover */}
              <div className="lg:w-1/3 flex-shrink-0">
                <div className="sticky top-8">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={400}
                    height={600}
                    className="w-full max-w-sm mx-auto lg:mx-0 rounded-lg shadow-lg"
                  />

                  {/* Book Details */}
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Author:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {book.author}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Genre:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {book.genre}
                      </span>
                    </div>
                    {book.rating > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Rating:
                        </span>
                        <span className="font-medium text-yellow-600 dark:text-yellow-400">
                          ★ {book.rating}/10
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Status:
                      </span>
                      <div
                        className={`px-2 py-1 rounded text-xs ${
                          statusColors[book.status]
                        }`}
                      >
                        {statusLabels[book.status]}
                      </div>
                    </div>
                    {book.dateRead && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Date Read:
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {formatDate(book.dateRead)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Date Added:
                      </span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {formatDate(book.dateAdded)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Info */}
              <div className="lg:w-2/3">
                <header className="mb-8">
                  <div className="flex items-start gap-4 mb-4">
                    {book.isFavourite && (
                      <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                        FAVOURITE
                      </div>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {book.title}
                  </h1>
                  <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-6">
                    by {book.author}
                  </p>
                </header>

                {/* Book Review */}
                <article className="prose prose-lg dark:prose-invert max-w-none">
                  {content}
                </article>
              </div>
            </div>

            {/* Book Navigation */}
            <BookNavigation prev={prev} next={next} />
          </div>
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}

export async function generateStaticParams() {
  const slugs = getAllBookSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}
