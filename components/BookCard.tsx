import { UserLibraryWithBookDetails } from "@/types/BookSearch";

import AddToLibraryButton from "./AddToLibraryButton";
import { useState } from "react";

interface Props {
  book: UserLibraryWithBookDetails;
  setSelectedBook: (book: UserLibraryWithBookDetails) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export function BookCard({ book, setSelectedBook, setIsModalOpen }: Props) {
  return (
    <div
      className="group relative h-full cursor-pointer w-full"
      onClick={() => {
        setSelectedBook(book);
        setIsModalOpen(true);
      }}>
      <div className="bg-background-card border border-background-foreground p-4 rounded transition-transform duration-300 transform hover:shadow-xl hover:-translate-y-1 h-full">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 flex-grow">
          <img
            src={book.thumbnail || book.small_thumbnail || "https://via.placeholder.com/150"}
            alt={book.title}
            className="w-full md:w-1/4 h-auto my-2 md:my-0"
          />

          <div className="space-y-2 flex-grow">
            <h2 className="font-bold text-lg text-background-foreground">{book.title}</h2>
            <p className="text-sm text-opacity-80 text-background-foreground font-medium">
              {book.author?.join(" | ") || "No Author Found"}
            </p>
            <p className="text-xs text-opacity-60 text-background-foreground">{book.categories}</p>
            <p className="text-xs text-opacity-70 text-background-foreground italic">
              Avg Rating: {book.average_rating}/5
            </p>
          </div>
        </div>

        {/* <div className="gap-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-2 w-full left-0">
          <AddToLibraryButton
            book={book}
            isInLibrary={isInLibrary}
            setIsInLibrary={setIsInLibrary}
          />
        </div> */}
      </div>
    </div>
  );
}
