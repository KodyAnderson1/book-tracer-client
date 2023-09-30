import APIBuilder from "@/lib/server/APIBuilder";
import { APIErrorHandler, ErrorResponse } from "@/lib/server/APIErrorHandler";
import { AGGREGATE_SERVICE } from "@/types";

import { SaveBook, SaveBookResponse } from "@/types/UserServiceTypes";
import { NextRequest, NextResponse } from "next/server";

const SERVICE = process.env.AGGREGATE_SERVICE;
const TOKEN = process.env.TEMP_JWT;

export async function GET() {
  if (!SERVICE || !TOKEN) {
    return NextResponse.error();
  }

  //   const { getToken } = auth();
  //   const jwt = await getToken({ template: "Default_JWT" });

  let results = await new APIBuilder<SaveBook, SaveBookResponse | ErrorResponse>(SERVICE)
    .get()
    .setToken(TOKEN)
    .setEndpoint(AGGREGATE_SERVICE.GET_BOOK)
    .execute();

  const errorHandler = new APIErrorHandler(results);
  const error = errorHandler.handle();

  if (error) {
    console.log("Error saving book:", error);
    return NextResponse.error();
  }

  console.log("SUCCESS GETTING book:", results.data);
  return NextResponse.json(results.data);
  // return NextResponse.json({ hello: "world" });
}

export async function POST(req: NextRequest) {
  if (!SERVICE || !TOKEN) {
    return NextResponse.error();
  }

  const body = await req.json();

  if (!body) {
    return NextResponse.error();
  }

  //   const { getToken } = auth();
  //   const jwt = await getToken({ template: "Default_JWT" });

  let results = await new APIBuilder<SaveBook, SaveBookResponse | ErrorResponse>(SERVICE)
    .post(body)
    .setToken(TOKEN)
    .setEndpoint(AGGREGATE_SERVICE.SAVE_BOOK)
    .execute();

  const errorHandler = new APIErrorHandler(results);
  const error = errorHandler.handle();

  if (error) {
    console.log("Error saving book:", error);
    return NextResponse.error();
  }

  return NextResponse.json(results.data);
  // return NextResponse.json({ hello: "world" });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const bookId = searchParams.get("book_id");

  if (!bookId || !SERVICE || !TOKEN) {
    return NextResponse.error();
  }

  //   const { getToken } = auth();
  //   const jwt = await getToken({ template: "Default_JWT" });

  let results = await new APIBuilder(SERVICE)
    .delete()
    .setToken(TOKEN)
    .setEndpoint(AGGREGATE_SERVICE.REMOVE_BOOK)
    .setQueryParameters({ book_id: bookId })
    .execute();

  const errorHandler = new APIErrorHandler(results);
  const error = errorHandler.handle();

  if (error) {
    console.log("Error saving book:", error);
    return NextResponse.error();
  }

  console.log("SUCCESS REMOVING book:", results.data);

  return NextResponse.json(results.data);
}
