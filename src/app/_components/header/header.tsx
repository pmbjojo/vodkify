import Link from "next/link";
import Search from "./search";
import { ThemeToggle } from "./theme-toggle";
import { SignedIn } from "@clerk/nextjs";
import UserMenu from "./user-menu";

export default async function Header() {
  return (
    <header className="flex items-center gap-3 border-b bg-background/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link href="/">
        <h1 className="text-2xl font-bold tracking-tight">Vodkify</h1>
      </Link>
      <small className="hidden md:block">Spotify client for drunk people</small>
      <div className="flex-grow" />
      <ThemeToggle />
      <SignedIn>
        <Search className="md:w-96" />
      </SignedIn>
      <UserMenu />
    </header>
  );
}
