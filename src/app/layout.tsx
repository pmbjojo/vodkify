import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "./_components/providers";
import Header from "./_components/header/header";
import Player from "./_components/player/player";
import { getServerAuthSession } from "@/server/auth";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Vodkify",
  description: "Spotify client for drunk people",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession();
  const content = session ? (
    <>
      {children}
      <Player />
    </>
  ) : (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-5xl">Bienvenue</h1>
      <p>
        Cette application fonctionne uniquement avec un compte spotify premium
      </p>
      <p>Vous devez vous connecter pour utiliser Vodkify</p>
    </main>
  );
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <Header />
          {content}
        </Providers>
      </body>
    </html>
  );
}
