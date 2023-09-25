import APIBuilder from "@/lib/server/APIBuilder";
import { APIErrorHandler, ErrorResponse } from "@/lib/server/APIErrorHandler";
import { AGGREGATE_SERVICE } from "@/types";
import { BookSearchResult } from "@/types/BookSearch";

import { SaveBook, SaveBookResponse } from "@/types/UserServiceTypes";
import { NextRequest, NextResponse } from "next/server";

const SERVICE = process.env.AGGREGATE_SERVICE;

// TODO: Add a grab to get query params from the api url
export async function GET() {
  if (!SERVICE) {
    return NextResponse.error();
  }

  let results = await new APIBuilder<any, BookSearchResult[] | ErrorResponse>(SERVICE)
    .get()
    .setEndpoint(AGGREGATE_SERVICE.BOOK_SEARCH)
    // .setQueryParameters({ q: "harry potter" })
    .execute();

  const errorHandler = new APIErrorHandler(results);
  const error = errorHandler.handle();

  if (error) {
    console.log("Error saving book:", error);
    return NextResponse.error();
  }

  return NextResponse.json(results.data);
  //   return NextResponse.json({ hello: "world" });
}
