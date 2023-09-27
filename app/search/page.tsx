"use client";

import { subtitle, title } from "@/components/primitives";
import { useEffect, useState } from "react";
import APIBuilder from "@/lib/client/APIBuilder";
import { BookSearchResult } from "@/types/BookSearch";
import { API_SERVICE } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { BookRecommendationCard } from "@/components/BookRecommendationCard";
import {
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import AddToLibraryButton from "@/components/AddToLibraryButton";
import { BookCard } from "@/components/BookCard";
import { BookSearchModal } from "@/components/SearchResultsModal";

/**
 * TODO: Going to need to make an individual call to each book to get the description
 *
 * For "Other Books you might like" have it be an object that gets the top 5 highest rated books from same return
 *
 * Components:
 * - Add To Library Button
 *    - Have className passable-in to style
 *	  - Have it say "Remove From Library" if it exists in a user's library already
 */
export default function Home() {
  const router = useRouter();
  const routeSearchParams = useSearchParams();

  const [books, setBooks] = useState<BookSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookSearchResult | null>(null);

  useEffect(() => {
    setLoading(true);
    getBooks().then((res) => {
      if (res === undefined || Object.keys(res).length === 0) {
        setLoading(false);
        return;
      }

      setBooks(
        res.sort((a, b) => {
          const hasThumbnailA =
            a.volumeInfo.imageLinks?.smallThumbnail || a.volumeInfo.imageLinks?.thumbnail ? 1 : 0;
          const hasThumbnailB =
            b.volumeInfo.imageLinks?.smallThumbnail || b.volumeInfo.imageLinks?.thumbnail ? 1 : 0;

          const ratingsCountA = a.volumeInfo.ratingsCount ?? 0;
          const ratingsCountB = b.volumeInfo.ratingsCount ?? 0;

          const ratingA = a.volumeInfo.averageRating ?? 0;
          const ratingB = b.volumeInfo.averageRating ?? 0;

          if (hasThumbnailB !== hasThumbnailA) {
            return hasThumbnailB - hasThumbnailA;
          }
          if (ratingsCountB !== ratingsCountA) {
            return ratingsCountB - ratingsCountA;
          }

          return ratingB - ratingA;
        })
      );
      router.refresh();
    });
    setLoading(false);
  }, [routeSearchParams]);

  async function getBooks() {
    return (
      await new APIBuilder<any, BookSearchResult[]>("/api")
        .get()
        .setEndpoint(API_SERVICE.BOOK_SEARCH)
        .setQueryParameters({ q: routeSearchParams.get("q") ?? "" })
        .execute()
    ).data;
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
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

  if (books.length === 0) {
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
        <h1 className={title({ className: "text-background-foreground", size: "md" })}>
          Results <span className="font-semibold">for {routeSearchParams.get("q") ?? ""}</span>
        </h1>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <main className="flex-1 flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Books</h3>
          <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-4">
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

        <aside className="md:w-1/3 2xl:w-1/6 md:ml-4 h-[80vh] flex flex-col">
          <div className="flex flex-col gap-4 h-1/4 justify-center items-center">
            <div className="border-1 border-secondary h-[82%] w-[75%]">
              <h3 className="flex justify-center font-semibold text-lg mt-3">Filters</h3>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-grow justify-center items-center">
            <div className="border-1 border-secondary h-[82%] w-[75%]">
              <h3 className="flex justify-center font-semibold text-lg mt-3">
                You might also like...
              </h3>
            </div>
          </div>
        </aside>
      </div>
      {selectedBook && (
        <BookSearchModal isOpen={isModalOpen} onOpenChange={handleCloseModal} book={selectedBook} />
      )}
    </section>
  );
}
