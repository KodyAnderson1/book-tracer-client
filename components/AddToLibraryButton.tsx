"use client";

import { Button } from "@nextui-org/button";
import React from "react";
import { MinusIcon, PlusIcon } from "./icons";
import APIBuilder from "@/lib/client/APIBuilder";
import { API_SERVICE } from "@/types";
import { SaveBook } from "@/types/UserServiceTypes";
import { customToast } from "@/lib/client/utils";

interface Props {
  isbn10: string | undefined;
  isbn13: string | undefined;
  isInLibrary?: boolean;
  bookId?: string;
}

const AddToLibraryButton = ({ isbn10, isbn13, isInLibrary, bookId }: Props) => {
  return isInLibrary ? (
    <RemoveButton isbn10={isbn10} isbn13={isbn13} bookId={bookId} />
  ) : (
    <AddButton isbn10={isbn10} isbn13={isbn13} />
  );
};

const RemoveButton = ({ isbn10, isbn13, bookId }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);

  function handleRemoveFromLibrary(bookId: string | undefined = "12345") {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    new APIBuilder("/api")
      .delete()
      .setEndpoint(API_SERVICE.SAVE_BOOK)
      .setQueryParameters({ book_id: bookId || "" })
      .execute()
      .then((res) => {
        // Remove from library
        customToast("Successfully removed book.", "success");
      })
      .catch((err) => {
        customToast("Uh oh! The book did not get removed!", "error");
      });

    setIsLoading(false);
  }

  return (
    <Button
      startContent={!isLoading ? <MinusIcon /> : null}
      isLoading={isLoading}
      color="danger"
      fullWidth
      onClick={() => handleRemoveFromLibrary(bookId)}
      className="text-white py-2 rounded h-8 flex justify-center items-center hover:bg-pink">
      Remove from Library
    </Button>
  );
};

const AddButton = ({ isbn10, isbn13 }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);

  function handleAddToLibrary(isbn10: string | undefined, isbn13: string | undefined) {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const saveBook: SaveBook = {
      clerkId: "1234",
      isbn_10: isbn10 || null,
      isbn_13: isbn13 || null,
    };

    new APIBuilder("/api")
      .post(saveBook)
      .setEndpoint(API_SERVICE.SAVE_BOOK)
      .execute()
      .then((res) => {
        // Add to library
        customToast("Saved book to library.", "success");
      })
      .catch((err) => {
        customToast("Uh oh! The book did not save!", "error");
      });

    setIsLoading(false);
  }

  return (
    <Button
      startContent={!isLoading ? <PlusIcon /> : null}
      isLoading={isLoading}
      color="secondary"
      fullWidth
      onClick={() => handleAddToLibrary(isbn10, isbn13)}
      className="text-white w-full py-2 rounded h-8 flex justify-center items-center hover:bg-pink">
      Add to Library
    </Button>
  );
};

export default AddToLibraryButton;
