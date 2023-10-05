import APIBuilder from "@/lib/server/APIBuilder";
import { protectedProcedure, router } from "./trpc";

import { AGGREGATE_SERVICE } from "@/types";
import { UserLibraryWithBookDetails } from "@/types/BookSearch";
import { UserLibraryWithBookDetailsSchema, deleteUserBookSchema } from "@/types/zodSchemas";
import { SaveBookResponse } from "@/types/UserServiceTypes";
import { TRPCError } from "@trpc/server";
import { getJWTToken } from "@/lib/utils";

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

    // console.log(
    //   "======================================================================================: " +
    //     variable.data
    // );

    // variable.data.forEach((item) => console.log(item));

    return variable.data;
  }),

  saveUserBook: protectedProcedure
    .input(UserLibraryWithBookDetailsSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId, auth, token } = ctx;
      const realToken = await token;

      console.log("REEEEEEEEEEEEEEEEEEE");

      if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

      const res = await new APIBuilder<UserLibraryWithBookDetails, UserLibraryWithBookDetails>(
        SERVICE
      )
        .post(input)
        .setToken(getJWTToken(realToken))
        .setEndpoint(AGGREGATE_SERVICE.SAVE_BOOK)
        .execute();

      return res.data;
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
});

export type AppRouter = typeof appRouter;
