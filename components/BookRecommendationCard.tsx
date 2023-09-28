import { Button } from "@nextui-org/button";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

export function BookRecommendationCard() {
  return (
    <Card
      className="relative group hover:bg-gray-100 transition w-[7rem] h-[10rem]"
      isPressable
      onPress={() => console.log("Other Books Like This Click...")}>
      <Image
        alt="Card background"
        className="object-cover"
        src="https://books.google.com/books/content?id=1PgKPuFIz1kC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
      />
      <CardFooter className="absolute -bottom-1 z-10 justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <Button className="text-tiny w-full" color="primary" radius="full" size="sm">
          BUILDING...
        </Button>
      </CardFooter>
    </Card>
  );
}
