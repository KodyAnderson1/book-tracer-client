import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/trpc";
import { createContext } from "@/trpc/ClerkContext";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async (opts: any) => await createContext(opts),
  });

export { handler as GET, handler as POST };
