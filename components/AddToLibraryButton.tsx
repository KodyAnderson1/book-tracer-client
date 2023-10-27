"use client";

import { Button } from "@nextui-org/button";
import React from "react";
import { PlusIcon } from "./icons";
import { customToast } from "@/lib/client/utils";
import { trpc } from "@/app/_trpc/client";
import { UserLibraryWithBookDetails } from "@/types/BookSearch";
import { Check, Trash2 } from "lucide-react";

interface Props {
  book: UserLibraryWithBookDetails;
  isInLibrary: boolean;
  setIsInLibrary: (isInLibrary: boolean) => void;
}

const AddToLibraryButton = ({ book, isInLibrary, setIsInLibrary }: Props) => {
  const [isInLibraryState, setIsInLibraryState] = React.useState<boolean>(book?.inLibrary);

  return isInLibraryState ? (
    <RemoveButton
      book={book}
      isInLibrary={book?.inLibrary || isInLibrary}
      setIsInLibrary={setIsInLibraryState}
    />
  ) : (
    <AddButton
      book={book}
      isInLibrary={book?.inLibrary || isInLibrary}
      setIsInLibrary={setIsInLibraryState}
    />
  );
};

const RemoveButton = ({ book, isInLibrary, setIsInLibrary }: Props) => {
  const utils = trpc.useContext();
  const [isConfirming, setIsConfirming] = React.useState<boolean>(false);
  const { mutate: removeBook, isLoading } = trpc.deleteUserBook.useMutation({
    onSuccess: () => {
      customToast("Successfully removed book.", "success");
      utils.getUserLibrary.invalidate();
      setIsInLibrary(false);
    },
    onError: (err: any) => {
      console.error(err);
      setIsInLibrary(true);
      customToast("The book did not get removed from your library! Try again later", "error");
    },
    onSettled: () => {
      // setIsLoading(false);
    },
  });

  function handleRemoveFromLibrary(book: UserLibraryWithBookDetails) {
    book.inLibrary = false;
    removeBook(book);
    setIsConfirming(false);
  }

  function confirmRemoveFromLibrary(book: UserLibraryWithBookDetails) {
    if (isConfirming) {
      handleRemoveFromLibrary(book);
      return;
    }
    setIsConfirming(true);
  }

  const IconToDisplay = () => {
    if (isLoading) return null;

    if (isConfirming) {
      return <Check />;
    } else {
      return <Trash2 />;
    }
  };

  return (
    <Button
      startContent={<IconToDisplay />}
      isLoading={isLoading}
      color="danger"
      fullWidth
      onClick={() => confirmRemoveFromLibrary(book)}
      className="text-white py-2 rounded h-8 flex justify-center items-center hover:bg-pink">
      {isConfirming ? "Confirm remove from library" : "Remove from Library"}
    </Button>
  );
};

const AddButton = ({ book, isInLibrary, setIsInLibrary }: Props) => {
  const utils = trpc.useContext();

  const { mutate: saveBook, isLoading } = trpc.saveUserBook.useMutation({
    onSuccess: () => {
      customToast("Successfully added book to library.", "success");
      utils.getUserLibrary.invalidate();
      setIsInLibrary(true);
    },
    onError: (err: any) => {
      console.error(err);
      setIsInLibrary(false);
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
