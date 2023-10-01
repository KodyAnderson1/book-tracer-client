"use client";

import { BookSearchResult } from "@/types/BookSearch";
import React, { useState } from "react";
import { BookCard } from "../BookCard";
import { Tab, Tabs } from "@nextui-org/react";
import { BookSearchModal } from "../SearchResultsModal";
import { trpc } from "@/app/_trpc/client";
import Skeleton from "react-loading-skeleton";

enum Status {
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED",
  COMPLETED = "COMPLETED",
}

const LibraryTabs = () => {
  const { data: myBooks, isLoading } = trpc.getUserLibrary.useQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookSearchResult | null>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <Skeleton height={200} width={600} className="my-2 bg-background-card" count={6} />
      ) : (
        <Tabs aria-label="Options" size="lg" variant="underlined">
          <Tab key="currently_reading" title="Currently Reading">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {myBooks
                ?.filter((book) => book.reading_status === Status.IN_PROGRESS)
                .map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    setSelectedBook={setSelectedBook}
                    setIsModalOpen={setIsModalOpen}
                  />
                ))}
            </div>
          </Tab>
          <Tab key="havent_started" title="New">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {myBooks
                ?.filter((book) => book.reading_status === Status.NOT_STARTED)
                .map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    setSelectedBook={setSelectedBook}
                    setIsModalOpen={setIsModalOpen}
                  />
                ))}
            </div>
          </Tab>
          <Tab key="completed" title="Finished">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {myBooks
                ?.filter((book) => book.reading_status === Status.COMPLETED)
                .map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    setSelectedBook={setSelectedBook}
                    setIsModalOpen={setIsModalOpen}
                  />
                ))}
            </div>
          </Tab>
        </Tabs>
      )}
      {selectedBook && (
        <BookSearchModal isOpen={isModalOpen} onOpenChange={handleCloseModal} book={selectedBook} />
      )}
    </>
  );
};

export default LibraryTabs;
