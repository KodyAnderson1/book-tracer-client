import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { type Context } from "./ClerkContext";

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    console.error("====================================== UNAUTHORIZED LOG");
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      userId: ctx.auth.userId,
      auth: ctx.auth,
      token: ctx.auth.getToken({ template: "default" }),
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
