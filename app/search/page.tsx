"use client";

import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";
import { useEffect, useState } from "react";
import APIBuilder from "@/lib/client/APIBuilder";
import { BookSearchResult } from "@/types/BookSearch";
import { API_SERVICE } from "@/types";
import { ScrollShadow } from "@nextui-org/react";
import { PlusIcon } from "@/components/icons";

/**
 * TODO: Going to need to make an individual call to each book to get the description
 *
 * Components:
 * - Add To Library Button
 *    - Have className passable-in to style
 *	  - Have it say "Remove From Library" if it exists in a user's library already
 */
export default function Home() {
  const [books, setBooks] = useState<BookSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBooks().then((res) => {
      setBooks(res);
    });
  }, []);

  async function getBooks() {
    return (
      await new APIBuilder<any, BookSearchResult[]>("/api")
        .setEndpoint(API_SERVICE.BOOK_SEARCH)
        .execute()
    ).data;
  }

  return (
    <section className="flex flex-col">
      <header className="mb-8">
        <h1 className={title({ className: "text-secondary" })}>Search Results</h1>
        <h2 className={subtitle({ className: "text-secondary" })}>Results for {"Harry Potter"}</h2>
      </header>

      <div className="flex flex-col md:flex-row justify-start gap-4">
        {/* Main Content: Book List */}
        <main className="flex-1 flex flex-col gap-4">
          <h3 className="font-semibold text-lg">Books</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
            {/* Loop over BookCard 12 times */}
            {books.map((book) => {
              return <BookCard book={book} key={book.id} />;
            })}
            {/* {Array.from({ length: 12 }, (_, i) => (
              <BookCard key={i} />
            ))} */}
          </div>
        </main>

        <aside className="md:w-1/3 2xl:w-1/6 md:ml-4 h-[80vh] flex flex-col">
          {/* Filters */}
          <div className="flex flex-col gap-4 h-1/4 justify-center items-center">
            <div className="border-1 border-secondary h-[82%] w-[75%]">
              <h3 className="flex justify-center font-semibold text-lg mt-3">Filters</h3>
            </div>
          </div>

          {/* Recommendations */}
          <div className="flex flex-col gap-4 flex-grow justify-center items-center">
            <div className="border-1 border-secondary h-[82%] w-[75%]">
              <h3 className="flex justify-center font-semibold text-lg mt-3">
                You might also like...
              </h3>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function BookRecommendationCard() {
  return (
    <Card
      className="relative group hover:bg-gray-100 transition w-[7rem] h-[10rem]"
      isPressable
      onPress={() => console.log("Other Books Like This Click...")}>
      <Image
        alt="Card background"
        className="object-cover"
        src="http://books.google.com/books/content?id=9oxPEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
      />
      <CardFooter className="absolute -bottom-1 z-10 justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <Button className="text-tiny w-full" color="primary" radius="full" size="sm">
          Add To Library
        </Button>
      </CardFooter>
    </Card>
  );
}

function BookCard({ book }: { book: BookSearchResult }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card
        className="h-[300px] relative group hover:bg-gray-100 transition"
        isPressable
        onPress={onOpen}>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
        />
        <CardFooter className="absolute bottom-0 z-10 justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="text-tiny w-full" color="primary" radius="full" size="sm">
            Add To Library
          </Button>
        </CardFooter>
      </Card>
      <Modal
        backdrop="blur"
        size={"5xl"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-background">
        <ModalContent className="h-[41rem]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl text-secondary">
                  {book.volumeInfo.title || "No Title Found"}
                </h2>
                {/* Author Names and Genres */}
                <div className="flex flex-row gap-2 justify-between w-[98%]">
                  <div className="flex flex-col justify-between ">
                    <h3 className="text-sm">
                      {book.volumeInfo.authors?.join("&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;") ||
                        "No Author Found"}
                    </h3>
                    <h3 className="text-sm">
                      {book.volumeInfo.categories?.join("&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;") ||
                        "No Genre Found"}
                    </h3>
                  </div>
                  {/* ISBN 10 && ISBN 13 */}
                  <div className="flex flex-col justify-between ">
                    <h3 className="text-sm">
                      ISBN-10:{" "}
                      {book.volumeInfo.industryIdentifiers?.find((i) => i.type === "ISBN_10")
                        ?.identifier || "Not Available"}
                    </h3>
                    <h3 className="text-sm">
                      ISBN-13:{" "}
                      {book.volumeInfo.industryIdentifiers?.find((i) => i.type === "ISBN_13")
                        ?.identifier || "Not Available"}
                    </h3>
                  </div>
                </div>
                <Divider className="mt-2 -mb-4 bg-slate-500" />
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full h-full">
                  <div className="w-[40%] h-full flex flex-col">
                    <Image
                      src={
                        book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"
                      }
                      alt="Placeholder"
                      width={400}
                    />
                    <div className="flex justify-between pt-2 -mb-4">
                      <div className="flex flex-col">
                        <div className="text-sm text-right font-semibold">Page Count</div>
                        <div className="text-right font-bold">{book.volumeInfo.pageCount}</div>
                      </div>
                      <Divider orientation="vertical" className="-mx-2" />
                      <div className="flex flex-col">
                        <div className="text-sm text-right font-semibold">Avg Rating</div>
                        <div className="text-right font-bold">
                          {book.volumeInfo.averageRating}/5
                        </div>
                      </div>
                      <Divider orientation="vertical" className="-mx-2" />
                      <div className="flex flex-col">
                        <div className="text-sm text-right font-semibold">Ratings</div>
                        <div className="text-right font-bold">{book.volumeInfo.ratingsCount}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full ml-2 h-full">
                    <div className="flex-grow w-full h-1/2">
                      <div className=" ml-2 flex justify-between items-center mt-2">
                        <span className="text-lg font-bold">Description</span>
                        <div className="flex gap-4 mr-3">
                          <Link
                            target="_blank"
                            href={`https://www.amazon.com/s?k=${encodeURIComponent(
                              book.volumeInfo.title
                            )}`}
                            className="text-blue-500">
                            Amazon
                          </Link>
                          <Link
                            target="_blank"
                            href={book.volumeInfo.infoLink || "https://www.google.com"}
                            className="text-blue-500">
                            Google Books
                          </Link>
                        </div>
                      </div>
                      <ScrollShadow className="text-sm my-2 px-2 h-[80%]">
                        {book.volumeInfo.description || "No Description Found"}
                      </ScrollShadow>
                    </div>
                    <Divider className="bg-slate-500 mb-4 mt-4" />
                    <div className="flex-grow w-full h-1/2">
                      <div className="ml-3 -mt-2 mb-2">
                        <span className="text-lg font-bold">Other Books Like This</span>
                      </div>
                      <div className="flex flex-row gap-5 justify-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <BookRecommendationCard key={i} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  startContent={<PlusIcon />}
                  color="primary"
                  onPress={onClose}
                  className="w-full">
                  Add To Library
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
