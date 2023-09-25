import NextLink from "next/link";
import { title, subtitle } from "@/components/primitives";
import { SearchIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";

export default function Home() {
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
        <Button as={NextLink} variant="solid" href="/search" color="primary">
          <SearchIcon size={20} />
          Go To Search Page
        </Button>
      </div>
    </section>
  );
}
