import { EXAMPLE } from "@/lib/client/EXAMPLES";
import APIBuilder from "@/lib/server/APIBuilder";
import { APIErrorHandler, ErrorResponse } from "@/lib/server/APIErrorHandler";
import { AGGREGATE_SERVICE } from "@/types";
import { BookSearchResult } from "@/types/BookSearch";
import { NextRequest, NextResponse } from "next/server";

import fs from "fs";
import path from "path";

const SERVICE = process.env.AGGREGATE_SERVICE;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!SERVICE) {
    return NextResponse.error();
  }

  if (!query) {
    return NextResponse.json({});
  }

  let results = await new APIBuilder<any, BookSearchResult[] | ErrorResponse>(SERVICE)
    .get()
    .setEndpoint(AGGREGATE_SERVICE.BOOK_SEARCH)
    .setQueryParameters({ term: query })
    .execute();

  const errorHandler = new APIErrorHandler(results);
  const error = errorHandler.handle();

  if (error) {
    console.log("Error saving book:", error);
    return NextResponse.error();
  }

  return NextResponse.json(results.data);
  // return NextResponse.json(EXAMPLE);
  //   return NextResponse.json({ hello: "world" });
}
