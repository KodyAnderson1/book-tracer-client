import { BookSearchResult } from "@/types/BookSearch";
import { Link } from "@nextui-org/link";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Divider, Image } from "@nextui-org/react";
import React from "react";
import { BookRecommendationCard } from "./BookRecommendationCard";
import AddToLibraryButton from "./AddToLibraryButton";

function readyAmazonLink(searchTerm: string, isISBN13: boolean): string {
  const baseURL = "https://www.amazon.com/s?k=";
  const searchQuery = encodeURIComponent(searchTerm);
  const category = isISBN13 ? "&i=stripbooks&linkCode=qs" : "";

  return baseURL + searchQuery + category;
}

interface BookSearchModelProps {
  book: BookSearchResult | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookSearchModal({ book, isOpen, onOpenChange }: BookSearchModelProps) {
  if (book === null) return null;

  const isbn13 = book.volumeInfo.industryIdentifiers?.find((i) => i.type === "ISBN_13")?.identifier;
  const isbn10 = book.volumeInfo.industryIdentifiers?.find((i) => i.type === "ISBN_10")?.identifier;
  const title = book.volumeInfo.title;

  return (
    <Modal
      placement="center"
      backdrop="blur"
      size={"5xl"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bg-background">
      <ModalContent className="text-background-foreground h-[70%] md:h-auto lg:h-[44rem] bg-background-card border border-background-foreground rounded-lg shadow-lg">
        {(onOpenChange) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold mb-2">
                {book.volumeInfo.title || "No Title Found"}
              </h2>
              <div className="flex flex-row gap-2 justify-between w-full">
                <div className="flex flex-col justify-between">
                  <h3 className="text-base text-background-foreground">
                    {book.volumeInfo.authors?.join(" | ") || "No Author Found"}
                  </h3>
                  <h3 className="text-sm text-background-foreground">
                    {book.volumeInfo.categories?.join(", ") || "No Genre Found"}
                  </h3>
                </div>
                <div className="flex flex-col justify-between text-sm ">
                  <h3>
                    ISBN-10:{" "}
                    {book.volumeInfo.industryIdentifiers?.find((i) => i.type === "ISBN_10")
                      ?.identifier || "Not Available"}
                  </h3>
                  <h3>
                    ISBN-13:{" "}
                    {book.volumeInfo.industryIdentifiers?.find((i) => i.type === "ISBN_13")
                      ?.identifier || "Not Available"}
                  </h3>
                </div>
              </div>
              <Divider className="mt-2 -mb-4 bg-background-foreground" />
            </ModalHeader>

            <ModalBody className="mt-3 flex flex-col lg:flex-row w-full">
              {/* Left side with book details and image */}
              <div className="w-full md:w-[40%] flex flex-col items-center md:p-4">
                <Image
                  src={book.volumeInfo.imageLinks?.thumbnail}
                  alt="Book Image"
                  fallbackSrc="https://via.placeholder.com/150"
                  width={200}
                  className="hidden md:block"
                  // height={300}
                />

                <div className="flex justify-between md:pt-3 w-full ">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-background-foreground font-semibold">
                      Page Count
                    </span>
                    <span className="text-base font-bold">{book.volumeInfo.pageCount}</span>
                  </div>
                  <Divider orientation="vertical" className="-mx-2" />
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-background-foreground font-semibold">
                      Avg Rating
                    </span>
                    <span className="text-base font-bold">{book.volumeInfo.averageRating}/5</span>
                  </div>
                  <Divider orientation="vertical" className="-mx-2" />
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-background-foreground font-semibold">
                      Ratings
                    </span>
                    <span className="text-base font-bold">{book.volumeInfo.ratingsCount}</span>
                  </div>
                </div>
              </div>

              {/* Right side with description */}
              <div className="flex flex-col w-full md:pr-4 h-[10rem] md:h-[30rem]">
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start">
                    <span className="text-lg font-bold text-background-foreground mb-2">
                      Description
                    </span>
                    <div className="flex gap-4">
                      <Link
                        target="_blank"
                        href={readyAmazonLink(!!isbn13 ? isbn13 : title, !!isbn13)}
                        className="text-blue-500 hover:text-blue-600">
                        Amazon
                      </Link>
                      <Link
                        target="_blank"
                        href={book.volumeInfo.infoLink || "https://www.google.com"}
                        className="text-blue-500 hover:text-blue-600">
                        Google Books
                      </Link>
                    </div>
                  </div>

                  <div className="text-sm md:my-2 h-[10rem] md:h-[13rem] overflow-y-auto">
                    {book.volumeInfo.description || "No Description Found"}
                  </div>
                </div>

                <Divider className="hidden md:flex md:bg-background-foreground md:mb-3" />

                <div className="hidden md:block md:flex-grow md:w-full">
                  <div className="mb-2">
                    <span className="text-lg font-bold text-background-foreground">
                      Other Books Like This
                    </span>
                  </div>

                  <div className="hidden md:flex md:flex-row md:gap-5 md:justify-center md:h-[10rem]">
                    {Array.from({ length: 5 }, (_, i) => (
                      <BookRecommendationCard key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="px-4">
              <AddToLibraryButton isbn10={isbn10} isbn13={isbn13} bookId={book.id} />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
