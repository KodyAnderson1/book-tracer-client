import APIBuilder from "@/lib/server/APIBuilder";
import { APIErrorHandler, ErrorResponse } from "@/lib/server/APIErrorHandler";
import { AGGREGATE_SERVICE } from "@/types";

import { SaveBook, SaveBookResponse } from "@/types/UserServiceTypes";
import { NextRequest, NextResponse } from "next/server";

const SERVICE = process.env.AGGREGATE_SERVICE;

export async function POST(req: NextRequest) {
  if (!SERVICE) {
    return NextResponse.error();
  }

  //   const { data } = await req.json();

  //   const { getToken } = auth();
  //   const jwt = await getToken({ template: "Default_JWT" });

  //   if (!data || !jwt) {
  //     return NextResponse.error();
  //   }

  let results = await new APIBuilder<SaveBook, SaveBookResponse | ErrorResponse>(SERVICE)
    .post({ clerkId: "1", isbn_10: "1234567890", isbn_13: "1234567890123" })
    .setEndpoint(AGGREGATE_SERVICE.SAVE_BOOK)
    .execute();

  const errorHandler = new APIErrorHandler(results);
  const error = errorHandler.handle();

  if (error) {
    console.log("Error saving book:", error);
    return NextResponse.error();
  }

  //   return NextResponse.json(results.data);
  return NextResponse.json({ hello: "world" });
}

// export async function POST(req: NextRequest) {
// //   const { getToken } = auth();
//   const { data } = await req.json();

//   const jwt = await getToken({ template: "Default_JWT" });

//   if (!data || !jwt) {
//     return NextResponse.error();
//   }

//   const response = await fetch(`${PARSER_API}/quiz/many`, {
//     method: "POST",
//     cache: "no-store",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${jwt}`,
//     },
//     body: JSON.stringify(dataToSubmit),
//   });

//   return response;
// }
