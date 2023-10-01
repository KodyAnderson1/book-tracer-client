import APIBuilder from "@/lib/server/APIBuilder";
import { protectedProcedure, router } from "./trpc";

import { AGGREGATE_SERVICE } from "@/types";
import { BookSearchResult, LibraryBooks } from "@/types/BookSearch";
import { deleteUserBookSchema, saveUserBookSchema } from "@/types/zodSchemas";
import { SaveBook, SaveBookResponse } from "@/types/UserServiceTypes";
import { TRPCError } from "@trpc/server";

const SERVICE = process.env.AGGREGATE_SERVICE || "";
const TOKEN = process.env.TEMP_JWT || "";
const CLERK_DEV_TOKEN = process.env.CLERK_DEV_JWT || "";

export const appRouter = router({
  getUserLibrary: protectedProcedure.query(async ({ ctx }) => {
    const { userId, auth, token } = ctx;
    const realToken = await token;

    console.error("======================================== LOG getUserLibrary");

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });
    console.error("======================================== LOG getUserLibrary realToken");

    const variable = await new APIBuilder<any, BookSearchResult[]>(SERVICE)
      .get()
      .setToken(realToken)
      .setEndpoint(AGGREGATE_SERVICE.GET_BOOK)
      .execute();

    console.error("======================================== LOG getUserLibrary variable");
    return transformToLibraryBooks(variable.data);
  }),

  saveUserBook: protectedProcedure.input(saveUserBookSchema).mutation(async ({ ctx, input }) => {
    const { userId, auth, token } = ctx;
    const realToken = await token;

    console.error("======================================== LOG saveUserBook");
    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });
    console.error("======================================== LOG saveUserBook realToken");

    const res = await new APIBuilder<SaveBook, SaveBookResponse>(SERVICE)
      .post({
        clerkId: userId,
        isbn10: input.isbn10,
        isbn13: input.isbn13,
      })
      .setToken(realToken)
      .setEndpoint(AGGREGATE_SERVICE.SAVE_BOOK)
      .execute();

    console.error("======================================== LOG saveUserBook res");

    return res.data;
  }),

  deleteUserBook: protectedProcedure
    .input(deleteUserBookSchema)
    .mutation(async ({ ctx, input }) => {
      const { token } = ctx;
      const realToken = await token;

      if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

      const res = await new APIBuilder<SaveBook, SaveBookResponse>(SERVICE)
        .delete()
        .setToken(realToken)
        .setEndpoint(AGGREGATE_SERVICE.REMOVE_BOOK)
        .setQueryParameters({ book_id: input.book_id })
        .execute();

      return res.data;
    }),
});

export type AppRouter = typeof appRouter;

const transformToLibraryBooks = (data: any[] | undefined): LibraryBooks[] => {
  if (!data) return [];

  return data.map((item) => ({
    kind: "",
    id: item.book_id,
    etag: "",
    selfLink: "",
    volumeInfo: {
      title: item.title,
      subtitle: "",
      authors: item.author,
      publisher: item.publisher,
      publishedDate: item.published_date,
      description: item.description,
      industryIdentifiers: [
        { type: "ISBN_10", identifier: item.isbn_10 },
        { type: "ISBN_13", identifier: item.isbn_13 },
      ],
      pageCount: item.page_count,
      averageRating: item.average_rating,
      ratingsCount: item.ratings_count,
      printType: item.print_type,
      categories: item.categories,
      maturityRating: item.maturity_rating,
      imageLinks: {
        smallThumbnail: item.small_thumbnail,
        thumbnail: item.thumbnail,
      },
      language: "",
      previewLink: "",
      infoLink: "",
      canonicalVolumeLink: "",
    },
    searchInfo: {
      textSnippet: "",
    },
    reading_status: item.reading_status,
    last_page_read: item.last_page_read,
    last_reading_update: item.last_reading_update,
  }));
};
