"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";

import { type AppRouter } from "@/server/api/root";
import { getUrl, transformer } from "./shared";
import { toast } from "sonner";

export const api = createTRPCReact<AppRouter>();

const queryCache = new QueryCache({
  onError: (error) => {
    if (error instanceof Error) {
      return toast.error("Une erreur est survenue", {
        description: error.message,
      });
    }
    toast.error("Une erreur inconnue est survenue");
  },
});

const mutationCache = new MutationCache({
  onError: (error) => {
    if (error instanceof Error) {
      return toast.error("Une erreur est survenue", {
        description: error.message,
      });
    }
    toast.error("Une erreur inconnue est survenue");
  },
});

export function TRPCReactProvider(props: {
  children: React.ReactNode;
  cookies: string;
}) {
  const [queryClient] = useState(
    () => new QueryClient({ queryCache, mutationCache }),
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
          headers() {
            return {
              cookie: props.cookies,
              "x-trpc-source": "react",
            };
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
