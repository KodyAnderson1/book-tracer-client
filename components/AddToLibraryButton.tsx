"use client";

import { Button } from "@nextui-org/button";
import React from "react";
import { MinusIcon, PlusIcon } from "./icons";
import { customToast } from "@/lib/client/utils";
import { trpc } from "@/app/_trpc/client";
import { UserLibraryWithBookDetails } from "@/types/BookSearch";

interface Props {
  book: UserLibraryWithBookDetails;
}

const AddToLibraryButton = ({ book }: Props) => {
  return book.inLibrary ? <RemoveButton book={book} /> : <AddButton book={book} />;
};

const RemoveButton = ({ book }: Props) => {
  const utils = trpc.useContext();

  const { mutate: removeBook, isLoading } = trpc.deleteUserBook.useMutation({
    onSuccess: () => {
      customToast("Successfully removed book.", "success");
      utils.getUserLibrary.invalidate();
    },
    onError: (err) => {
      console.error(err);
      customToast(
        "Uh oh! The book did not get removed from your library! Try again later",
        "error"
      );
    },
    onSettled: () => {
      // setIsLoading(false);
    },
  });

  function handleRemoveFromLibrary(book: UserLibraryWithBookDetails) {
    book.inLibrary = false;
    removeBook(book);
  }

  return (
    <Button
      startContent={!isLoading ? <MinusIcon /> : null}
      isLoading={isLoading}
      color="danger"
      fullWidth
      onClick={() => handleRemoveFromLibrary(book)}
      className="text-white py-2 rounded h-8 flex justify-center items-center hover:bg-pink">
      Remove from Library
    </Button>
  );
};

const AddButton = ({ book }: Props) => {
  const utils = trpc.useContext();

  const { mutate: saveBook, isLoading } = trpc.saveUserBook.useMutation({
    onSuccess: () => {
      customToast("Successfully added book to library.", "success");
      utils.getUserLibrary.invalidate();
    },
    onError: (err) => {
      console.error(err);

      customToast("Uh oh! The book did not get added to your library!", "error");
    },
    onSettled: () => {
      // setIsLoading(false);
    },
  });

  const handleAddToLibrary = (book: UserLibraryWithBookDetails) => {
    book.inLibrary = true;
    saveBook(book);
  };

  return (
    <Button
      startContent={!isLoading ? <PlusIcon /> : null}
      isLoading={isLoading}
      color="secondary"
      fullWidth
      onClick={() => handleAddToLibrary(book)}
      className="text-white w-full py-2 rounded h-8 flex justify-center items-center hover:bg-pink">
      Add to Library
    </Button>
  );
};

export default AddToLibraryButton;
