"use client";

import { subtitle, title } from "@/components/primitives";
import { useEffect, useState } from "react";
import { UserLibraryWithBookDetails } from "@/types/BookSearch";
import { useSearchParams } from "next/navigation";
import { BookCard } from "@/components/BookCard";
import { BookSearchModal } from "@/components/SearchResultsModal";
import { trpc } from "../_trpc/client";
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
    if (!routeSearchParams.get("q")) {
      // console.log("No search query");
      return;
    }

    // console.log("searching for books");
    setQueryEnabled(true);
    return () => setQueryEnabled(false); // cleanup
  }, [routeSearchParams]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
    <section className="flex flex-col px-4 md:px-0">
      <header className="mb-4 md:mb-8">
        <h1 className={title({ className: "text-background-foreground", size: "sm" })}>
          Results for {routeSearchParams.get("q") ?? ""}
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 md:grid-rows-5 gap-4">
        {/* Filters section */}
        {/* <div className="border-1 border-secondary p-4 rounded mb-4 md:mb-0 md:col-span-4">
          <h3 className="text-center font-semibold text-lg mb-4">Filters</h3>
        </div> */}

        {/* Books section */}
        <main className="flex-1 mb-4 md:mb-0 md:col-span-4 md:row-span-5">
          <h2 className="hidden">Books</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {bookResults &&
              bookResults.map((book) => (
                <BookCard
                  key={book.book_id}
                  book={book}
                  setSelectedBook={setSelectedBook}
                  setIsModalOpen={setIsModalOpen}
                />
              ))}
          </div>
        </main>

        {/* You might also like section */}
        <aside className="sticky top-20 h-[40rem] border-1 border-secondary p-4 rounded md:col-start-5 md:row-span-5">
          <h3 className="text-center font-semibold text-lg mb-4">You might also like...</h3>
          <div className="flex flex-col gap-4 justify-center">
            {/* {Array.from({ length: 3 }, (_, i) => (
              <BookRecommendationCard key={i} />
            ))} */}
          </div>
        </aside>
      </div>

      {/* <div className="md:grid md:grid-cols-3 md:grid-rows-1 md:gap-4">
        <div className="border-1 border-secondary p-4 rounded mb-4 md:mb-0 md:col-span-2 md:row-span-1">
          <h3 className="text-center font-semibold text-lg mb-4">Filters</h3>
        </div>

        <aside className="md:w-full md:col-start-3 md:row-span-2">
          <div className="border-1 border-secondary p-4 rounded">
            <h3 className="text-center font-semibold text-lg mb-4">You might also like...</h3>
          </div>
        </aside>

        <main className="flex-1 md:col-span-2 md:row-span-1">
          <h2 className="hidden">Books</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                setSelectedBook={setSelectedBook}
                setIsModalOpen={setIsModalOpen}
              />
            ))}
          </div>
        </main>
      </div> */}

      {selectedBook && (
        <BookSearchModal isOpen={isModalOpen} onOpenChange={handleCloseModal} book={selectedBook} />
      )}
    </section>
  );
}
