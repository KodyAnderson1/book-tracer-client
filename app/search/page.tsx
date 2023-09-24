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

export default function Home() {
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
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
            {/* Loop over BookCard 12 times */}
            {Array.from({ length: 12 }, (_, i) => (
              <BookCard key={i} />
            ))}
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

function BookCard() {
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
          src="http://books.google.com/books/content?id=GZAoAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
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
        <ModalContent className="h-[40rem]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl text-secondary">
                  Harry Potter and the Sorcerer&apos;s Stone{" "}
                </h2>
                {/* Author Names and Genres on same row */}
                <div className="flex flex-row gap-2 justify-between w-[70%]">
                  <h3 className="text-sm">
                    J.K. Rowling&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Author 2
                  </h3>
                  <h3 className="text-sm">
                    Science Fiction&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Fantasy
                  </h3>
                </div>
                <Divider className="mt-2 -mb-4 bg-slate-500" />
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full h-full">
                  <div className="w-[40%] h-full flex flex-col">
                    <Image
                      src="http://books.google.com/books/content?id=GZAoAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                      alt="Placeholder"
                      width={400}
                    />
                    <p className="flex mt-6 -mb-6 justify-center items-center">
                      Click Add To Library to track progress!
                    </p>
                  </div>
                  <div className="flex flex-col w-full ml-2 h-full">
                    <div className="flex-grow w-full h-1/2">
                      <div className=" ml-3 flex justify-between items-center mt-2">
                        <span className="text-lg font-bold">Description</span>
                        <div className="flex gap-4 mr-3">
                          <Link href="#" className="text-blue-500">
                            Amazon
                          </Link>
                          <Link href="#" className="text-blue-500">
                            Google Books
                          </Link>
                        </div>
                      </div>
                      <p className="mt-6 px-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam dolor
                        aliquid libero accusamus tenetur repellendus velit corrupti dolorum dolores
                        aspernatur quos eligendi natus beatae omnis, commodi, inventore qui
                        repudiandae eveniet deleniti itaque non culpa dicta! Tempore ipsa soluta
                        aliquid reiciendis.
                      </p>
                    </div>
                    <Divider className="bg-slate-500 -mt-4" />
                    <div className="flex-grow w-full h-1/2 pt-2">
                      <div className="">
                        <div className="ml-3 mb-3">
                          <span className="text-lg font-bold">Other Books Like This</span>
                        </div>
                        <div className="flex flex-row gap-2 justify-center">
                          <Card
                            className="relative group hover:bg-gray-100 transition"
                            isPressable
                            onPress={() => console.log("Other Books Like This Click...")}>
                            <Image
                              alt="Card background"
                              className="z-0 w-full h-full object-cover"
                              src="http://books.google.com/books/content?id=9oxPEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
                            />
                            <CardFooter className="absolute bottom-0 z-10 justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                className="text-tiny w-full"
                                color="primary"
                                radius="full"
                                size="sm">
                                Add To Library
                              </Button>
                            </CardFooter>
                          </Card>
                          <Card
                            className="relative group hover:bg-gray-100 transition"
                            isPressable
                            onPress={() => console.log("Other Books Like This Click...")}>
                            <Image
                              alt="Card background"
                              className="z-0 w-full h-full object-cover"
                              src="http://books.google.com/books/content?id=9oxPEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
                            />
                            <CardFooter className="absolute bottom-0 z-10 justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                className="text-tiny w-full"
                                color="primary"
                                radius="full"
                                size="sm">
                                Add To Library
                              </Button>
                            </CardFooter>
                          </Card>
                          <Card
                            className="relative group hover:bg-gray-100 transition"
                            isPressable
                            onPress={() => console.log("Other Books Like This Click...")}>
                            <Image
                              alt="Card background"
                              className="z-0 w-full h-full object-cover"
                              src="http://books.google.com/books/content?id=9oxPEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
                            />
                            <CardFooter className="absolute bottom-0 z-10 justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                className="text-tiny w-full"
                                color="primary"
                                radius="full"
                                size="sm">
                                Add To Library
                              </Button>
                            </CardFooter>
                          </Card>
                          <Card
                            className="relative group hover:bg-gray-100 transition"
                            isPressable
                            onPress={() => console.log("Other Books Like This Click...")}>
                            <Image
                              alt="Card background"
                              className="z-0 w-full h-full object-cover"
                              src="http://books.google.com/books/content?id=9oxPEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
                            />
                            <CardFooter className="absolute bottom-0 z-10 justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                className="text-tiny w-full"
                                color="primary"
                                radius="full"
                                size="sm">
                                Add To Library
                              </Button>
                            </CardFooter>
                          </Card>
                          <Card
                            className="relative group hover:bg-gray-100 transition"
                            isPressable
                            onPress={() => console.log("Other Books Like This Click...")}>
                            <Image
                              alt="Card background"
                              className="z-0 w-full h-full object-cover"
                              src="http://books.google.com/books/content?id=9oxPEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
                            />
                            <CardFooter className="absolute bottom-0 z-10 justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                className="text-tiny w-full"
                                color="primary"
                                radius="full"
                                size="sm">
                                Add To Library
                              </Button>
                            </CardFooter>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="primary" onPress={onClose} className="w-full">
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
