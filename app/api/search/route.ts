import APIBuilder from "@/lib/server/APIBuilder";
import { APIErrorHandler, ErrorResponse } from "@/lib/server/APIErrorHandler";
import { getJWTToken } from "@/lib/utils";
import { AGGREGATE_SERVICE } from "@/types";
import { UserLibraryWithBookDetails } from "@/types/BookSearch";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

const SERVICE = process.env.AGGREGATE_SERVICE;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");

  const { userId, getToken } = auth();
  const realToken = await getToken({ template: "default" });

  if (!SERVICE || !realToken) {
    return NextResponse.error();
  }

  if (!query) {
    return NextResponse.json({});
  }

  let results = await new APIBuilder<any, UserLibraryWithBookDetails[] | ErrorResponse>(SERVICE)
    .get()
    .setToken(getJWTToken(realToken))
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
