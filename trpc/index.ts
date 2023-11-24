import APIBuilder from "@/lib/server/APIBuilder";
import { protectedProcedure, router } from "./trpc";

import { AGGREGATE_SERVICE } from "@/types";
import {
  Achievement,
  Badge,
  BadgeResponse,
  CustomUser,
  LeaderboardUser,
  SaveBookResponse,
  SingleBookStats,
  SmallUser,
  SmallUserBook,
  Status,
  UpdateProgress,
  UserChallengesExtraDTO,
  UserLibraryWithBookDetails,
} from "@/types/BookSearch";
import {
  AddChallengeSchema,
  AddFriendRequestSchema,
  CustomUserSchema,
  SearchSchema,
  SingleBookStatsSchema,
  UpdateProgressSchema,
  UserLibraryWithBookDetailsSchema,
  updateFriendRequestSchema,
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
      let results = await new APIBuilder<UpdateProgress, Status>(SERVICE)
        .patch({
          clerkId: userId,
          bookId: input.bookId,
          currentPage: input.currentPage,
          pagesRead: input.pagesRead,
          action: input.action,
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
      return results.data as Status;
      // return MOCK_RETURN_DATA;
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

  getUserLatestAchievements: protectedProcedure.query(async ({ ctx }) => {
    const { userId, auth, token } = ctx;
    const realToken = await token;

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

    const variable = await new APIBuilder<any, Achievement[]>(SERVICE)
      .get()
      .setToken(getJWTToken(realToken))
      .setEndpoint(AGGREGATE_SERVICE.GET_LATEST_ACHIEVEMENTS)
      .execute();

    return variable.data;
  }),

  getChallenges: protectedProcedure.query(async ({ ctx }) => {
    const { userId, auth, token } = ctx;
    const realToken = await token;

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

    const variable = await new APIBuilder<any, UserChallengesExtraDTO[]>(SERVICE)
      .get()
      .setToken(getJWTToken(realToken))
      .setEndpoint(AGGREGATE_SERVICE.GET_CHALLENGES)
      .execute();

    return variable.data;
  }),

  addChallenge: protectedProcedure.input(AddChallengeSchema).mutation(async ({ ctx, input }) => {
    const { userId, auth, token } = ctx;
    const realToken = await token;

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

    const variable = await new APIBuilder<any, UserChallengesExtraDTO[]>(SERVICE)
      .post({
        clerkId: userId,
        challengeId: input.challengeId,
      })
      .setToken(getJWTToken(realToken))
      .setEndpoint(AGGREGATE_SERVICE.GET_CHALLENGES)
      .execute();

    return variable.data;
  }),

  getUserPoints: protectedProcedure.query(async ({ ctx }) => {
    const { userId, auth, token } = ctx;
    const realToken = await token;

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

    const variable = await new APIBuilder<any, number>(SERVICE)
      .get()
      .setToken(getJWTToken(realToken))
      .setEndpoint(AGGREGATE_SERVICE.GET_POINTS)
      .execute();

    return variable.data;
  }),

  getSingleBookStats: protectedProcedure
    .input(SingleBookStatsSchema)
    .query(async ({ ctx, input }) => {
      const { userId, auth, token } = ctx;
      const realToken = await token;

      if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

      const variable = await new APIBuilder<any, SingleBookStats>(SERVICE)
        .get()
        .setToken(getJWTToken(realToken))
        .setEndpoint(AGGREGATE_SERVICE.GET_SINGLE_BOOK_STATS)
        .setQueryParameters({ book_id: input })
        .execute();

      return variable.data;
    }),

  getLeaderboard: protectedProcedure.query(async ({ ctx }) => {
    const { userId, auth, token } = ctx;
    const realToken = await token;

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

    const variable = await new APIBuilder<any, LeaderboardUser[]>(SERVICE)
      .get()
      .setToken(getJWTToken(realToken))
      .setEndpoint(AGGREGATE_SERVICE.GET_LEADERBOARD)

      .execute();

    return variable.data;
  }),

  getAllUsersForFriends: protectedProcedure.query(async ({ ctx }) => {
    const { userId, auth, token } = ctx;
    const realToken = await token;

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

    const variable = await new APIBuilder<any, CustomUser[]>(SERVICE)
      .get()
      .setToken(getJWTToken(realToken))
      .setEndpoint(AGGREGATE_SERVICE.GET_USERS_FOR_FRIENDS)
      .setQueryParameters({ clerk_id: userId })
      .execute();

    return variable.data.map((item: CustomUser) => {
      const firstLast = item ? `${item.firstName} ${item.lastName}` : null;
      const username = item.username ? item.username : item.clerkId;
      const displayName = firstLast ?? username;

      const imageUrl = item.imageUrl ?? "https://i.pravatar.cc/300";

      return {
        clerkId: item.clerkId,
        displayName,
        avatarUrl: imageUrl,
      };
    }) as SmallUser[];
  }),

  getPendingFriendsRequests: protectedProcedure.query(async ({ ctx }) => {
    const { userId, auth, token } = ctx;
    const realToken = await token;

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

    const variable = await new APIBuilder<any, SmallUser[]>(SERVICE)
      .get()
      .setToken(getJWTToken(realToken))
      .setEndpoint(AGGREGATE_SERVICE.GET_FRIEND_REQUESTS)
      .execute();

    return variable.data;
  }),

  getFriendsBooks: protectedProcedure.query(async ({ ctx }) => {
    const { userId, auth, token } = ctx;
    const realToken = await token;

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

    const variable = await new APIBuilder<any, SmallUserBook[]>(SERVICE)
      .get()
      .setToken(getJWTToken(realToken))
      .setEndpoint(AGGREGATE_SERVICE.GET_FRIEND_BOOKS)
      .setQueryParameters({ clerkId: userId })
      .execute();

    return variable.data;
  }),

  updateFriendRequest: protectedProcedure
    .input(updateFriendRequestSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId, auth, token } = ctx;
      const realToken = await token;

      if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

      const variable = await new APIBuilder<any, UserChallengesExtraDTO[]>(SERVICE)
        .put({
          clerkId: userId,
          friendId: input.friendId,
          status: input.status,
        })
        .setToken(getJWTToken(realToken))
        .setEndpoint(AGGREGATE_SERVICE.UPDATE_FRIEND_REQUEST)
        .execute();

      return variable.data;
    }),

  addFriend: protectedProcedure.input(AddFriendRequestSchema).mutation(async ({ ctx, input }) => {
    const { userId, auth, token } = ctx;
    const realToken = await token;

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });

    console.log("Inside addFriend mutation");
    console.log(input);

    const variable = await new APIBuilder<any, UserChallengesExtraDTO[]>(SERVICE)
      .post({
        requestingClerkId: userId,
        friendToAddClerkId: input.friendToAddClerkId,
      })
      .setToken(getJWTToken(realToken))
      .setEndpoint(AGGREGATE_SERVICE.ADD_FRIEND)
      .execute();

    return variable.data;
  }),

  getFriendsLeaderboard: protectedProcedure.query(async ({ ctx }) => {
    const { userId, auth, token } = ctx;
    const realToken = await token;

    if (!realToken) throw new TRPCError({ code: "UNAUTHORIZED" });
    const variable = await new APIBuilder<any, LeaderboardUser[]>(SERVICE)
      .get()
      .setToken(getJWTToken(realToken))
      .setEndpoint(AGGREGATE_SERVICE.GET_FRIENDS_LEADERBOARD)
      .setQueryParameters({ clerk_id: userId })
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
