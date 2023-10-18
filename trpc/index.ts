import APIBuilder from "@/lib/server/APIBuilder";
import { protectedProcedure, router } from "./trpc";

import { AGGREGATE_SERVICE } from "@/types";
import {
  Badge,
  BadgeResponse,
  CustomUser,
  SaveBookResponse,
  UpdateProgress,
  UserLibraryWithBookDetails,
} from "@/types/BookSearch";
import {
  CustomUserSchema,
  SearchSchema,
  UpdateProgressSchema,
  UserLibraryWithBookDetailsSchema,
} from "@/types/zodSchemas";
import { TRPCError } from "@trpc/server";
import { getJWTToken } from "@/lib/utils";
import { APIErrorHandler, ErrorResponse } from "@/lib/server/APIErrorHandler";

const SERVICE = process.env.AGGREGATE_SERVICE || "";

export const appRouter = router({
  getUserLibrary: protectedProcedure.query(async ({ ctx }) => {
    const { userId, auth, token } = ctx;
    const realToken = await token;

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

    const variable = await new APIBuilder<any, UserLibraryWithBookDetails[]>(SERVICE)
      .get()
      .setToken(getJWTToken(realToken))
      .setEndpoint(AGGREGATE_SERVICE.GET_BOOK)
      .execute();

    if (variable.data) {
      variable.data.map((item) => {
        item.inLibrary = true;
        return item;
      });
    }

    return variable.data;
  }),

  saveUserBook: protectedProcedure
    .input(UserLibraryWithBookDetailsSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId, auth, token } = ctx;
      const realToken = await token;

      // console.log("Inside Query saveUserBook");

      if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

      const res = await new APIBuilder<UserLibraryWithBookDetails, SaveBookResponse>(SERVICE)
        .post(input)
        .setToken(getJWTToken(realToken))
        .setEndpoint(AGGREGATE_SERVICE.SAVE_BOOK)
        .execute();

      return res.data as SaveBookResponse;
    }),

  deleteUserBook: protectedProcedure
    .input(UserLibraryWithBookDetailsSchema)
    .mutation(async ({ ctx, input }) => {
      const { token } = ctx;
      const realToken = await token;

      if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

      const res = await new APIBuilder<UserLibraryWithBookDetails, SaveBookResponse>(SERVICE)
        .delete(input)
        .setToken(getJWTToken(realToken))
        .setEndpoint(AGGREGATE_SERVICE.REMOVE_BOOK)
        .setQueryParameters({ book_id: input.book_id })
        .execute();

      return res.data;
    }),

  searchForBooks: protectedProcedure.input(SearchSchema).query(async ({ ctx, input }) => {
    const { token } = ctx;
    const realToken = await token;

    // console.log("INSIDE QUERY searchForBooks");

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

    let results = await new APIBuilder<any, UserLibraryWithBookDetails[] | ErrorResponse>(SERVICE)
      .get()
      .setToken(getJWTToken(realToken))
      .setEndpoint(AGGREGATE_SERVICE.BOOK_SEARCH)
      .setQueryParameters({ term: input.searchString })
      .execute();

    const errorHandler = new APIErrorHandler(results);
    const error = errorHandler.handle();

    if (error) {
      console.error("Error saving book:", error);
      throw new TRPCError({ code: "BAD_REQUEST", message: error.errorMessage });
    }

    return results.data as UserLibraryWithBookDetails[];
  }),

  addNewUser: protectedProcedure.input(CustomUserSchema).mutation(async ({ ctx, input }) => {
    const { token } = ctx;
    const realToken = await token;

    // console.log("INSIDE QUERY: addNewUser");

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

    let results = await new APIBuilder<any, CustomUser | ErrorResponse>(SERVICE)
      .post(input)
      .setToken(getJWTToken(realToken))
      .setEndpoint(AGGREGATE_SERVICE.NEW_USER)
      .execute();

    const errorHandler = new APIErrorHandler(results);
    const error = errorHandler.handle();

    if (error) {
      console.error("Error adding user", error);
      throw new TRPCError({ code: "BAD_REQUEST", message: error.errorMessage });
    }

    return results.data as CustomUser;
  }),

  updateBookProgress: protectedProcedure
    .input(UpdateProgressSchema)
    .mutation(async ({ ctx, input }) => {
      const { token, userId } = ctx;
      const realToken = await token;

      // console.log("INSIDE QUERY: updateBookProgress");
      if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });
      let results = await new APIBuilder<UpdateProgress, UpdateProgress>(SERVICE)
        .patch({
          clerkId: userId,
          bookId: input.bookId,
          currentPage: input.currentPage,
        })
        .setToken(getJWTToken(realToken))
        .setEndpoint(AGGREGATE_SERVICE.SAVE_BOOK)
        .execute();

      const errorHandler = new APIErrorHandler(results);
      const error = errorHandler.handle();

      if (error) {
        console.error("Error adding user", error);
        throw new TRPCError({ code: "BAD_REQUEST", message: error.errorMessage });
      }

      // console.log(results.data);
      return results.data as UpdateProgress;
    }),
  getUserBadges: protectedProcedure.query(async ({ ctx }) => {
    const { userId, auth, token } = ctx;
    const realToken = await token;

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

    const variable = await new APIBuilder<any, { [key: string]: Badge[] }>(SERVICE)
      .get()
      .setToken(getJWTToken(realToken))
      .setEndpoint(AGGREGATE_SERVICE.GET_BADGES)
      .execute();

    return variable.data;
  }),

  alwaysFail: protectedProcedure.query(async ({ ctx }) => {
    const { token, userId } = ctx;
    const realToken = await token;

    throw new TRPCError({ code: "BAD_REQUEST", message: "ERROR MESSAGE" });
  }),
});

export type AppRouter = typeof appRouter;
