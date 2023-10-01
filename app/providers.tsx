"use client";

import { NextUIProvider } from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { trpc } from "@/app/_trpc/client";
import "react-toastify/dist/ReactToastify.css";
import { httpBatchLink } from "@trpc/react-query";
import { absoluteUrl } from "@/lib/utils";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: absoluteUrl("/api/trpc"),
        }),
      ],
    })
  );

  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
      </NextThemesProvider>
      <ToastContainer />
    </NextUIProvider>
  );
}
