import { getServerAuthSession } from "@/server/auth";
import { ThemeProvider } from "./theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { cookies } from "next/headers";
import SessionContext from "./session-context";

export default async function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  return (
    <SessionContext session={session}>
      <TRPCReactProvider cookies={cookies().toString()}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </TRPCReactProvider>
    </SessionContext>
  );
}
