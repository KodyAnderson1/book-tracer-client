"use client";

import React from "react";
import { Tab, Tabs } from "@nextui-org/react";
import { trpc } from "@/app/_trpc/client";
import Skeleton from "react-loading-skeleton";
import LibraryBookCard from "./LibraryBookCard";

enum Status {
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED",
  COMPLETED = "COMPLETED",
}

const LibraryTabs = () => {
  const { data: myBooks, isLoading } = trpc.getUserLibrary.useQuery(undefined, {
    retryDelay: 1000 * 60 * 5,
    refetchOnWindowFocus: false, // default: true
  });

  if (!myBooks) {
    return null;
  }

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
                  <LibraryBookCard key={book.book_id} book={book} />
                ))}
            </div>
          </Tab>
          <Tab key="havent_started" title="New">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {myBooks
                ?.filter((book) => book.reading_status === Status.NOT_STARTED)
                .map((book) => (
                  <LibraryBookCard key={book.book_id} book={book} />
                ))}
            </div>
          </Tab>
          <Tab key="completed" title="Finished">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {myBooks
                ?.filter((book) => book.reading_status === Status.COMPLETED)
                .map((book) => (
                  <LibraryBookCard key={book.book_id} book={book} />
                ))}
            </div>
          </Tab>
        </Tabs>
      )}
    </>
  );
};

export default LibraryTabs;
