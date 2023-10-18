"use client";

import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import NextLink from "next/link";

const Page = () => {
  const router = useRouter();

  router.push("/books/library");

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ className: "capitalize" })}>Go check out&nbsp;</h1>

        <br />
        <h1 className={title({ className: "capitalize" })}>the </h1>
        <h1 className={title({ color: "violet", className: "capitalize" })}>search page&nbsp;</h1>
        <h2 className={subtitle({ className: "mt-4 capitalize" })}>Give me Feedback </h2>
      </div>

      <div className="flex gap-3">
        <Button as={NextLink} variant="solid" href="/books/search" color="primary">
          <SearchIcon size={20} />
          Go To Search Page
        </Button>
      </div>
    </section>
  );
};

export default Page;
