"use client";

import { Button } from "@nextui-org/button";
import React from "react";
import { MinusIcon, PlusIcon } from "./icons";
import APIBuilder from "@/lib/client/APIBuilder";
import { API_SERVICE } from "@/types";
import { SaveBook } from "@/types/UserServiceTypes";
import { customToast } from "@/lib/client/utils";
import { trpc } from "@/app/_trpc/client";

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
  const utils = trpc.useContext();

  const { mutate: saveBook, isLoading } = trpc.saveUserBook.useMutation({
    onSuccess: () => {
      customToast("Successfully added book to library.", "success");
      utils.getUserLibrary.invalidate();
    },
    onError: (err) => {
      console.error(err);
      // customToast("Uh oh! The book did not get added to your library!", "error");
    },
    onSettled: () => {
      // setIsLoading(false);
    },
  });

  const handleAddToLibrary = (isbn10: string | undefined, isbn13: string | undefined) => {
    saveBook({
      isbn10: isbn10 || null,
      isbn13: isbn13 || null,
    });
  };

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
