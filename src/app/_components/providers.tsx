import { ThemeProvider } from "./theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { cookies } from "next/headers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TRPCReactProvider cookies={cookies().toString()}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          {children}
          <Toaster richColors closeButton />
          <ReactQueryDevtools />
        </TooltipProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  );
}
