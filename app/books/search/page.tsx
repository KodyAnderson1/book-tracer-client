"use client";

import { subtitle, title } from "@/components/primitives";
import { useEffect, useState } from "react";
import { UserLibraryWithBookDetails } from "@/types/BookSearch";
import { useSearchParams } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { BookSearchModal } from "@/components/SearchResultsModal";
import { trpc } from "../../_trpc/client";
import { customToast } from "@/lib/client/utils";

export default function Home() {
  const routeSearchParams = useSearchParams();
  const [isQueryEnabled, setQueryEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<UserLibraryWithBookDetails | null>(null);

  const { data: bookResults, isLoading } = trpc.searchForBooks.useQuery(
    {
      searchString: routeSearchParams.get("q") ?? "",
    },
    {
      enabled: isQueryEnabled,

      onError: (err) => {
        customToast(err.message, "error");
      },
      onSuccess: (data) => {
        if (data.length === 0) {
          customToast("No results found", "info");
        }
        setQueryEnabled(false);
      },
    }
  );

  useEffect(() => {
    if (!routeSearchParams.get("q")) return;

    setQueryEnabled(true);
    return () => setQueryEnabled(false);
  }, [routeSearchParams]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function setBook(book: UserLibraryWithBookDetails) {
    setSelectedBook(() => book);
  }

  if (isLoading) {
    return (
      <section className="gap-4 py-8 md:py-10">
        <header className="mb-8">
          <h1 className={title({ className: "text-secondary" })}>Search Results</h1>
          <h2 className={subtitle({ className: "text-secondary" })}>
            Results for {routeSearchParams.get("q") ?? ""}
          </h2>
        </header>
        <div className="flex flex-col items-center justify-center ">
          <div className="inline-block max-w-lg text-center justify-center">
            <h1 className={title({ className: "capitalize" })}>Loading...</h1>
          </div>
        </div>
      </section>
    );
  }

  if (bookResults && bookResults.length === 0) {
    return (
      <section className="gap-4 py-8 md:py-10">
        <div className="flex flex-col items-center justify-center ">
          <div className="inline-block max-w-lg text-center justify-center">
            <h1 className={title({ className: "capitalize" })}>No Results Found</h1>
            <br />
            <h4 className={title({ className: "capitalize mt-6", size: "sm" })}>
              Search for a book!
            </h4>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col px-4 md:px-2">
      <header className="mb-4 md:mb-8">
        <h1 className={title({ className: "text-background-foreground", size: "sm" })}>
          Results for {routeSearchParams.get("q") ?? ""}
        </h1>
      </header>

      <div className="px-28">
        {/* Books section */}
        <main className="flex-1 mb-4 md:mb-0 md:col-span-4 md:row-span-5">
          <h2 className="hidden">Books</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {bookResults &&
              bookResults.map((book) => (
                <BookCard
                  key={book.book_id}
                  book={book}
                  setSelectedBook={setBook}
                  setIsModalOpen={setIsModalOpen}
                />
              ))}
          </div>
        </main>
      </div>

      {selectedBook && (
        <BookSearchModal isOpen={isModalOpen} onOpenChange={handleCloseModal} book={selectedBook} />
      )}
    </section>
  );
}
