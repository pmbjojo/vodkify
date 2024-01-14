import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import Header from "./_components/header/header";
import EmptySession from "./_components/main/empty-session";
import { Suspense } from "react";
import Player from "./_components/player/player";
import { cn } from "@/utils/utils";
import Providers from "./_components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Vodkify",
  description: "Spotify app for blissful events",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "flex h-dvh touch-pan-y flex-col  bg-background font-sans antialiased ",
            inter.variable,
          )}
        >
          <Providers>
            <Header />
            <div id="main" className="flex flex-grow overflow-y-auto">
              <SignedOut>
                <EmptySession />
              </SignedOut>
              <SignedIn>{children}</SignedIn>
            </div>
            <SignedIn>
              <Suspense fallback="Loading...">
                <Player />
              </Suspense>
            </SignedIn>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
