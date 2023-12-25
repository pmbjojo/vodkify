import Profile from "../profile";
import Search from "./search";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-3 px-4">
        <h1 className="text-2xl font-bold tracking-tight">Vodkify</h1>
        <small className="hidden md:block">
          Spotify client for drunk people
        </small>
        <div className="grow" />
        <div className="w-1/3">
          <Search />
        </div>
        <ThemeToggle />
        <Profile />
      </div>
    </header>
  );
}
