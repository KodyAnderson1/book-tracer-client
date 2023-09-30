"use client";

import AchievementCard from "@/components/AchievementCard";
import { BookCard } from "@/components/BookCard";
import FriendCard from "@/components/FriendCard";
import { BookSearchModal } from "@/components/SearchResultsModal";
import StatisticsCard from "@/components/StatisticsCard";
import { title, subtitle } from "@/components/primitives";
import APIBuilder from "@/lib/client/APIBuilder";
import { API_SERVICE } from "@/types";
import { BookSearchResult, LibraryBooks } from "@/types/BookSearch";
import { Divider, Tab, Tabs } from "@nextui-org/react";
import { Suspense, useEffect, useState } from "react";

const friendsData = [
  {
    name: "alice_wonder",
    book: "Thinking in Java",
  },
  {
    name: "jane_smith",
    book: "The Hobbit",
  },
  {
    name: "bob_builder",
    book: "Harry Potter and the Chamber of Secrets",
  },
];

const achievementsData = [
  {
    name: "Genre Guru",
    level: "2",
    dateRecieved: "1 Week Ago",
  },
  {
    name: "Book Worm",
    level: "1",
    dateRecieved: "Yesterday",
  },
  {
    name: "Recent Reader",
    level: "3",
    dateRecieved: "Today",
  },
];

const statisticalData = [
  {
    name: "Books Read",
    value: "10",
  },
  {
    name: "Pages Read",
    value: "1000",
  },
  {
    name: "Something Else",
    value: "100",
  },
  {
    name: "Something Else Again",
    value: "200",
  },
];

enum Status {
  IN_PROGRESS = "IN_PROGRESS",
  NOT_STARTED = "NOT_STARTED",
  COMPLETED = "COMPLETED",
}

const transformToLibraryBooks = (data: any[]): LibraryBooks[] => {
  return data.map((item) => ({
    kind: "",
    id: item.book_id,
    etag: "",
    selfLink: "",
    volumeInfo: {
      title: item.title,
      subtitle: "",
      authors: item.author,
      publisher: item.publisher,
      publishedDate: item.published_date,
      description: item.description,
      industryIdentifiers: [
        { type: "ISBN_10", identifier: item.isbn_10 },
        { type: "ISBN_13", identifier: item.isbn_13 },
      ],
      pageCount: item.page_count,
      averageRating: item.average_rating,
      ratingsCount: item.ratings_count,
      printType: item.print_type,
      categories: item.categories,
      maturityRating: item.maturity_rating,
      imageLinks: {
        smallThumbnail: item.small_thumbnail,
        thumbnail: item.thumbnail,
      },
      language: "",
      previewLink: "",
      infoLink: "",
      canonicalVolumeLink: "",
    },
    searchInfo: {
      textSnippet: "",
    },
    reading_status: item.reading_status,
    last_page_read: item.last_page_read,
    last_reading_update: item.last_reading_update,
  }));
};

export default function Home() {
  const [books, setBooks] = useState<LibraryBooks[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookSearchResult | null>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // TODO: ON ERROR
  useEffect(() => {
    setLoading(true);
    new APIBuilder<any, LibraryBooks[]>("/api")
      .get()
      .setEndpoint(API_SERVICE.GET_BOOKS)
      .execute()
      .then((res) => {
        // console.log("🚀 ~ file: page.tsx:38 ~ .then ~ res:", res);
        setBooks(transformToLibraryBooks(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!books) {
    return <div>Something went wrong...</div>;
  }

  const currentlyReading: LibraryBooks[] = books.filter(
    (book) => book.reading_status === Status.IN_PROGRESS
  );
  const haventStarted: LibraryBooks[] = books.filter(
    (book) => book.reading_status === Status.NOT_STARTED
  );
  const completed: LibraryBooks[] = books.filter(
    (book) => book.reading_status === Status.COMPLETED
  );

  return (
    <section className="flex flex-col px-4 md:px-0">
      <header>
        <h1 className={title({ className: "text-background-foreground", size: "sm" })}>
          Your Library
        </h1>
        <h2 className={subtitle({ className: "text-background-foreground" })}>
          Welcome, {"User.Username"}
        </h2>
      </header>

      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex-grow p-4 w-full min-h-[100vh]">
          <div className="flex w-full flex-col">
            <Tabs aria-label="Options" size="lg" variant="underlined">
              <Tab key="currently_reading" title="Currently Reading">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {Array.from({ length: 1 }, (_, i) =>
                    currentlyReading.map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        setSelectedBook={setSelectedBook}
                        setIsModalOpen={setIsModalOpen}
                      />
                    ))
                  )}

                  {/* {currentlyReading.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      setSelectedBook={setSelectedBook}
                      setIsModalOpen={setIsModalOpen}
                    />
                  ))} */}
                </div>
              </Tab>
              <Tab key="havent_started" title="New">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {Array.from({ length: 1 }, (_, i) =>
                    haventStarted.map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        setSelectedBook={setSelectedBook}
                        setIsModalOpen={setIsModalOpen}
                      />
                    ))
                  )}

                  {/* {haventStarted.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      setSelectedBook={setSelectedBook}
                      setIsModalOpen={setIsModalOpen}
                    />
                  ))} */}
                </div>
              </Tab>
              <Tab key="completed" title="Finished">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {Array.from({ length: 1 }, (_, i) =>
                    completed.map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        setSelectedBook={setSelectedBook}
                        setIsModalOpen={setIsModalOpen}
                      />
                    ))
                  )}

                  {/* {completed.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      setSelectedBook={setSelectedBook}
                      setIsModalOpen={setIsModalOpen}
                    />
                  ))} */}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/4 lg:space-y-2 lg:space-x-0 pt-4 lg:pt-0 px-4 space-y-4 max-h-[57rem]">
          <div className="bg-background-card border border-background-foreground pt-2 px-4 h-1/4 rounded overflow-y-auto pb-3 lg:pb-0 ">
            <h3 className="font-bold">Your Friends are reading...</h3>
            {/* <Suspense fallback={"Loading..."}> */}
            {friendsData.map((friend, i) =>
              i < friendsData.length - 1 ? (
                <>
                  <FriendCard key={friend.name + i} name={friend.name} book={friend.book} />
                  <Divider className="mt-2" />
                </>
              ) : (
                <FriendCard key={friend.name + i} name={friend.name} book={friend.book} />
              )
            )}
            {/* </Suspense> */}
          </div>

          <div className="bg-background-card border border-background-foreground pt-2 px-4 h-1/4 rounded overflow-y-auto pb-3 lg:pb-0 ">
            <h3 className="font-bold">Your Latest Achievements...</h3>
            {/* <Suspense fallback={"Loading..."}> */}
            {achievementsData.map((achiement, i) =>
              i < achievementsData.length - 1 ? (
                <>
                  <AchievementCard
                    key={achiement.name + i}
                    name={achiement.name}
                    level={achiement.level}
                    dateRecieved={achiement.dateRecieved}
                  />
                  <Divider className="mt-2" />
                </>
              ) : (
                <AchievementCard
                  key={achiement.name + i}
                  name={achiement.name}
                  level={achiement.level}
                  dateRecieved={achiement.dateRecieved}
                />
              )
            )}
            {/* </Suspense> */}
          </div>
          <div className="bg-background-card border border-background-foreground pt-2 px-4 h-1/4 rounded overflow-y-auto pb-3 lg:pb-0 ">
            <h3 className="font-bold">Some Statistics...</h3>
            {/* <Suspense fallback={"Loading..."}> */}
            {statisticalData.map((stat, i) =>
              i < statisticalData.length - 1 ? (
                <>
                  <StatisticsCard key={stat.name + i} name={stat.name} value={stat.value} />
                  <Divider className="mt-2" />
                </>
              ) : (
                <StatisticsCard key={stat.name + i} name={stat.name} value={stat.value} />
              )
            )}
            {/* </Suspense> */}
          </div>
        </div>
      </div>
      {selectedBook && (
        <BookSearchModal isOpen={isModalOpen} onOpenChange={handleCloseModal} book={selectedBook} />
      )}
    </section>
  );
}
