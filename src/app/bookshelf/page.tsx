import { Book } from '@/lib/bookshelf';
import { getAllBooks } from '@/lib/books';
import BookshelfClient from '@/components/BookshelfClient';

// Convert BookMeta from new system to Book for existing components
function convertBookMetaToBook(bookMeta: ReturnType<typeof getAllBooks>[0]): Book {
  return {
    id: bookMeta.slug, // Use slug as id for existing components
    title: bookMeta.title,
    author: bookMeta.author,
    rating: bookMeta.rating,
    genre: bookMeta.genre,
    status: bookMeta.status,
    isFavourite: bookMeta.isFavourite,
    coverImage: bookMeta.coverImage,
    fullReview: "Click to view full review",
    dateRead: bookMeta.dateRead,
    dateAdded: bookMeta.dateAdded,
  };
}

export default function BookshelfPage() {
  // Get books from MDX system and convert to old format for component compatibility
  const booksData = getAllBooks();
  const books: Book[] = booksData.map(convertBookMetaToBook);

  return (
    <main className="pt-16 min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Bookshelf
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              <em>
                &ldquo;I cannot remember the books I&rsquo;ve read any more than the meals I have eaten; 
                even so, they have made me.&rdquo;
              </em>
              <br />
              <span className="text-sm mt-2 block">—Ralph Waldo Emerson</span>
            </p>
          </div>
        </div>
      </section>

      {/* Client-side bookshelf functionality */}
      <BookshelfClient books={books} />
    </main>
  );
}