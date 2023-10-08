import { UserLibraryWithBookDetails } from "@/types/BookSearch";
import { readyAmazonLink } from "@/lib/utils";
import { Link } from "@nextui-org/link";
import {
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import AddToLibraryButton from "../AddToLibraryButton";
import UpdateProgressButton from "./UpdateButton";
import { Slider } from "../ui/slider";
import { useState } from "react";

const LibraryBookCard = ({ book }: { book: UserLibraryWithBookDetails }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pageRead, setPageRead] = useState<number[]>(
    ([book.last_page_read || 0] as number[]) || [0]
  );
  const [isValueChanged, setIsValueChanged] = useState<boolean>(false);
  const [isInLibrary, setIsInLibrary] = useState<boolean>(book?.inLibrary || false);

  const handleValueChange = (value: number) => {
    setPageRead([value]);
    setIsValueChanged(value !== book.last_page_read);
  };

  function handleOnOpenChange() {
    onOpenChange();
    setPageRead([book.last_page_read] as number[]);
    setIsValueChanged(false);
  }

  return (
    <>
      <div className="group relative h-full cursor-pointer w-full " onClick={onOpen}>
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
              <p className="text-xs text-opacity-60 text-background-foreground">
                {book.categories}
              </p>
              <p className="text-xs text-opacity-70 text-background-foreground italic">
                Avg Rating: {book.average_rating}/5
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        placement="center"
        backdrop="blur"
        size={"5xl"}
        className="bg-background"
        isOpen={isOpen}
        onOpenChange={() => handleOnOpenChange()}>
        <ModalContent className="text-background-foreground h-[75%] md:h-auto lg:h-[44rem] bg-background-card border border-background-foreground rounded-lg shadow-lg">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold mb-2">{book.title || "No Title Found"}</h2>
                <div className="flex flex-row gap-2 justify-between w-full">
                  <div className="flex flex-col justify-between">
                    <h3 className="text-base text-background-foreground">
                      {book.author?.join(" | ") || "No Author Found"}
                    </h3>
                    <h3 className="text-sm text-background-foreground">
                      {book.categories?.join(", ") || "No Genre Found"}
                    </h3>
                  </div>
                  <div className="flex flex-col justify-between text-sm ">
                    <h3>ISBN-10: {book.isbn_10 || "Not Available"}</h3>
                    <h3>ISBN-13: {book.isbn_13 || "Not Available"}</h3>
                  </div>
                </div>
                <Divider className="mt-2 -mb-4 bg-background-foreground" />
              </ModalHeader>

              <ModalBody className="mt-3 flex flex-col lg:flex-row w-full">
                {/* Left side with book details and image */}
                <div className="w-full md:w-[40%] flex flex-col items-center md:p-4">
                  <Image
                    src={
                      book.thumbnail || book.small_thumbnail || "https://via.placeholder.com/150"
                    }
                    alt="Book Image"
                    fallbackSrc="https://via.placeholder.com/150"
                    width={200}
                    className="hidden md:block"
                  />

                  <div className="flex justify-between md:pt-3 w-full ">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-background-foreground font-semibold">
                        Page Count
                      </span>
                      <span className="text-base font-bold">{book.page_count}</span>
                    </div>
                    <Divider orientation="vertical" className="-mx-2" />
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-background-foreground font-semibold">
                        Avg Rating
                      </span>
                      <span className="text-base font-bold">{book.average_rating}/5</span>
                    </div>
                    <Divider orientation="vertical" className="-mx-2" />
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-background-foreground font-semibold">
                        Ratings
                      </span>
                      <span className="text-base font-bold">{book.ratings_count}</span>
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
                          href={readyAmazonLink(
                            !!book.isbn_13 ? book.isbn_13 : book.title,
                            !!book.isbn_13
                          )}
                          className="text-blue-500 hover:text-blue-600">
                          Amazon
                        </Link>
                      </div>
                    </div>

                    <div className="text-sm md:my-2 h-[10rem] md:h-[13rem] overflow-y-auto">
                      {book.description || "No Description Found"}
                    </div>
                  </div>

                  <Divider className="hidden md:flex md:bg-background-foreground md:mb-3" />

                  <div className="hidden md:block md:flex-grow md:w-full">
                    <div className="mb-2">
                      <span className="text-lg font-bold text-background-foreground">
                        Statistics
                      </span>
                    </div>

                    <div className="hidden md:flex md:flex-row md:gap-5 md:justify-center md:h-[10rem]">
                      {/* {Array.from({ length: 5 }, (_, i) => (
                        <BookRecommendationCard key={i} />
                      ))} */}
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className="px-4 flex flex-col -mt-12">
                <div className="flex justify-center">
                  <div className="flex w-full">
                    <Slider
                      disabled={book.page_count === book.last_page_read}
                      className="w-[72%] md:w-[88%]"
                      onValueChange={(e: any) => handleValueChange(e)}
                      value={pageRead}
                      max={book.page_count || 100}
                      step={1}
                    />

                    {/* <Input
                      className="w-[12%] pl-4"
                      type="number"
                      size="sm"
                      placeholder={pageRead.toString()}
                      value={pageRead.toString()}
                      onChange={(e) => handleValueChange(parseInt(e.target.value))}
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">{book.page_count}</span>
                        </div>
                      }
                    /> */}

                    <div className="w-[28%] text-sm md:text-medium md:w-[12%] bg-background ml-4 px-2 border-secondary border-[0.5px] shadow-md rounded-md text-text flex justify-center">
                      <span>{pageRead}</span>
                      <span>&nbsp; / {book.page_count}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4 justify-center">
                  <UpdateProgressButton
                    book={book}
                    isValueChanged={isValueChanged}
                    setIsValueChanged={setIsValueChanged}
                    currentPage={pageRead[0]}
                  />
                  <AddToLibraryButton
                    book={book}
                    isInLibrary={isInLibrary}
                    setIsInLibrary={setIsInLibrary}
                  />
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LibraryBookCard;
