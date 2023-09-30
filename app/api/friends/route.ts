import { EXAMPLE } from "@/lib/client/EXAMPLES";
import APIBuilder from "@/lib/server/APIBuilder";
import { APIErrorHandler, ErrorResponse } from "@/lib/server/APIErrorHandler";
import { AGGREGATE_SERVICE } from "@/types";
import { BookSearchResult } from "@/types/BookSearch";
import { NextRequest, NextResponse } from "next/server";

const SERVICE = process.env.AGGREGATE_SERVICE;
const TOKEN = process.env.TEMP_JWT;

export async function GET() {
  if (!SERVICE || !TOKEN) {
    return NextResponse.error();
  }

  let results = await new APIBuilder<any, BookSearchResult[] | ErrorResponse>(SERVICE)
    .get()
    .setToken(TOKEN)
    .setEndpoint(AGGREGATE_SERVICE.FRIENDS_CURR_READING)
    .execute();

  const errorHandler = new APIErrorHandler(results);
  const error = errorHandler.handle();

  if (error) {
    console.log("Error saving book:", error);
    return NextResponse.error();
  }

  return NextResponse.json(results.data);
}
