import { EXAMPLE } from "@/lib/client/EXAMPLES";
import APIBuilder from "@/lib/server/APIBuilder";
import { APIErrorHandler, ErrorResponse } from "@/lib/server/APIErrorHandler";
import { AGGREGATE_SERVICE } from "@/types";
import { BookSearchResult } from "@/types/BookSearch";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

const SERVICE = process.env.AGGREGATE_SERVICE;
const TOKEN = process.env.TEMP_JWT;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");

  const { userId, getToken } = auth();
  const jwt_TOKEN = await getToken({ template: "default" });

  if (!SERVICE || !jwt_TOKEN) {
    return NextResponse.error();
  }

  if (!query) {
    return NextResponse.json({});
  }

  let results = await new APIBuilder<any, BookSearchResult[] | ErrorResponse>(SERVICE)
    .get()
    .setToken(jwt_TOKEN)
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
