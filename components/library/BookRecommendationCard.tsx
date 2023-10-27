import { UserLibraryWithBookDetails } from "@/types/BookSearch";
import { Card, CardFooter, Image } from "@nextui-org/react";

export function BookRecommendationCard({ book }: { book: UserLibraryWithBookDetails }) {
  return (
    <Card>
      <Image
        alt={book.title}
        height={300}
        width={300}
        src={book.small_thumbnail || book.thumbnail || "/images/placeholder.png"}
      />
      {/* <CardFooter className="absolute -bottom-1 z-10 justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <Button className="text-tiny w-full" color="primary" radius="full" size="sm">
          BUILDING...
        </Button>
      </CardFooter> */}
    </Card>
  );
}
