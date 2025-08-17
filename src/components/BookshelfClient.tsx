"use client";

import { useState, useMemo } from "react";
import { Book, BookshelfFilters } from "@/lib/bookshelf";
import FilterControls from "@/components/FilterControls";
import BookGrid from "@/components/BookGrid";

interface BookshelfClientProps {
  books: Book[];
}

const initialFilters: BookshelfFilters = {
  genre: "All",
  status: "All",
  sortBy: "newest",
};

export default function BookshelfClient({ books }: BookshelfClientProps) {
  const [filters, setFilters] = useState<BookshelfFilters>(initialFilters);

  // Calculate filtered book count for display
  const filteredBookCount = useMemo(() => {
    let filtered = books;
    if (filters.genre !== "All") {
      filtered = filtered.filter((book) => book.genre === filters.genre);
    }
    if (filters.status !== "All") {
      filtered = filtered.filter((book) => book.status === filters.status);
    }
    return filtered.length;
  }, [books, filters]);

  return (
    <>
      {/* Filters */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterControls
            filters={filters}
            onFiltersChange={setFilters}
            bookCount={filteredBookCount}
          />
        </div>
      </section>

      {/* Books Display */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookGrid books={books} filters={filters} />
        </div>
      </section>

      {/* Footer */}
      <div className="pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Matthew Yang
          </p>
        </div>
      </div>
    </>
  );
}
